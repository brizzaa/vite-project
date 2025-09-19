import { useState } from "react";
import SecondPage from "./components/SecondPage";
import FirstPage from "./components/FirstPage";
import PageWrapper from "./components/PageWrapper";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [triggerFirstPageAnimations, setTriggerFirstPageAnimations] =
    useState(false);
  const [triggerSecondPageAnimations, setTriggerSecondPageAnimations] =
    useState(false);
  const pages = [
    <FirstPage triggerScrollAnimations={triggerFirstPageAnimations} />,
    <SecondPage
      triggerScrollAnimations={triggerSecondPageAnimations}
      isActive={currentPage === 1}
    />,
  ];

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    // Trigger scroll animations when leaving first page
    if (currentPage === 0 && page === 1) {
      setTriggerFirstPageAnimations(true);
      // Non attivare le animazioni di scroll della SecondPage qui
      setTriggerSecondPageAnimations(false);
    } else if (currentPage === 1 && page === 0) {
      // Trigger second page scroll animations when leaving second page
      setTriggerSecondPageAnimations(true);
      // Reset first page animations when returning
      setTriggerFirstPageAnimations(false);
    }

    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <PageWrapper currentPage={currentPage} onPageChange={handlePageChange}>
        {pages}
      </PageWrapper>
    </div>
  );
}

export default App;
