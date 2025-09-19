import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageWrapper = ({
  children,
  currentPage,
  onPageChange,
}: PageWrapperProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevPage, setPrevPage] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "backward"
  >("forward");

  useEffect(() => {
    if (currentPage !== prevPage) {
      // Determine transition direction
      const direction = currentPage > prevPage ? "forward" : "backward";
      setTransitionDirection(direction);
      setIsTransitioning(true);

      // Reset transition state after animation completes
      // Using 1200ms to ensure CSS transition (1000ms) is fully complete with buffer
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevPage(currentPage);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [currentPage, prevPage]);

  // Add scroll event listener for smooth page transitions
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevent default scroll behavior

      if (isTransitioning) return;

      if (e.deltaY > 0 && currentPage < children.length - 1) {
        // Scrolling down - go to next page
        onPageChange(currentPage + 1);
      } else if (e.deltaY < 0 && currentPage > 0) {
        // Scrolling up - go to previous page
        onPageChange(currentPage - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      if (e.key === "ArrowDown" && currentPage < children.length - 1) {
        e.preventDefault();
        onPageChange(currentPage + 1);
      } else if (e.key === "ArrowUp" && currentPage > 0) {
        e.preventDefault();
        onPageChange(currentPage - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, isTransitioning, onPageChange, children.length]);

  return (
    <div className="page-wrapper">
      {children.map((child, index) => {
        const isActive = index === currentPage;
        const isPrevious = index === prevPage && isTransitioning;
        const isHidden = index !== currentPage && index !== prevPage;

        // Base style for all pages with transitions
        let style: React.CSSProperties = {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transition: "transform 1s ease-in-out, opacity 1s ease-in-out",
        };

        if (isActive && !isTransitioning) {
          // Active page when not transitioning - show normally
          style.transform = "translateX(0%)";
          style.zIndex = 20;
          style.opacity = 1;
        } else if (isActive && isTransitioning) {
          // Active page during transition - always slide in from the correct side
          style.transform = "translateX(0%)";
          style.zIndex = 15;
          style.opacity = 1;
        } else if (isPrevious && isTransitioning) {
          // Previous page during transition - slide out based on direction
          if (transitionDirection === "forward") {
            // Going forward: previous page slides out to left
            style.transform = "translateX(-100%)";
            style.zIndex = 10;
            style.opacity = 0.6;
          } else {
            // Going backward: previous page slides out to right
            style.transform = "translateX(100%)";
            style.zIndex = 10;
            style.opacity = 0.6;
          }
        } else if (isHidden) {
          // Hidden pages - position based on their relationship to current page
          if (index < currentPage) {
            // Pages before current - position to the left
            style.transform = "translateX(-100%)";
          } else {
            // Pages after current - position to the right
            style.transform = "translateX(100%)";
          }
          style.zIndex = 0;
          style.opacity = 0;
        } else {
          // Default case - keep off screen to the right
          style.transform = "translateX(100%)";
          style.zIndex = 0;
          style.opacity = 0;
        }

        return (
          <div key={index} style={style}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default PageWrapper;
