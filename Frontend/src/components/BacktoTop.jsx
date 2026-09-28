import React, { useEffect, useState } from "react";

function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) {
    return null;
  }

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={goTop}
      aria-label="Back to top"
      title="Back to top"
    >
      ↑
    </button>
  );
}

export default BackToTop;