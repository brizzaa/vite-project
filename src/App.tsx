import { useState } from "react";
import SecondPage from "./components/SecondPage";
import FirstPage from "./components/FirstPage";
import PageWrapper from "./components/PageWrapper";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [triggerFirstPageAnimations, setTriggerFirstPageAnimations] =
    useState(false);
  const pages = [
    <FirstPage triggerScrollAnimations={triggerFirstPageAnimations} />,
    <SecondPage />,
  ];

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    // Trigger scroll animations when leaving first page
    if (currentPage === 0 && page === 1) {
      setTriggerFirstPageAnimations(true);
    } else if (currentPage === 1 && page === 0) {
      // Reset animations when returning to first page
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
