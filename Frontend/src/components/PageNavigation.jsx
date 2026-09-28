import React from "react";
import { useNavigate } from "react-router-dom";

function PageNavigation() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="page-navigation">
      <button
        type="button"
        className="page-nav-button"
        onClick={goBack}
      >
        ← Previous
      </button>

      <button
        type="button"
        className="page-nav-button"
        onClick={goForward}
      >
        Next →
      </button>

      <button
        type="button"
        className="page-nav-button home-nav-button"
        onClick={goHome}
      >
        Home
      </button>
    </div>
  );
}

export default PageNavigation;