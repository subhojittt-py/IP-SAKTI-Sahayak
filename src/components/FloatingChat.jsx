import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import sahayakIcon from "../assets/sahayak-icon.png";

function FloatingChat() {
  const navigate = useNavigate();

  const [position, setPosition] = useState({
    right: 30,
    bottom: 30,
  });

  const dragging = useRef(false);
  const hasMoved = useRef(false);

  const startPointer = useRef({
    x: 0,
    y: 0,
  });

  const startPosition = useRef({
    right: 30,
    bottom: 30,
  });

  const handlePointerDown = (event) => {
    dragging.current = true;
    hasMoved.current = false;

    startPointer.current = {
      x: event.clientX,
      y: event.clientY,
    };

    startPosition.current = {
      ...position,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragging.current) {
      return;
    }

    const deltaX =
      event.clientX - startPointer.current.x;

    const deltaY =
      event.clientY - startPointer.current.y;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMoved.current = true;
    }

    setPosition({
      right: Math.max(
        10,
        Math.min(
          window.innerWidth - 70,
          startPosition.current.right - deltaX
        )
      ),
      bottom: Math.max(
        10,
        Math.min(
          window.innerHeight - 70,
          startPosition.current.bottom - deltaY
        )
      ),
    });
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  const handleClick = () => {
    if (!hasMoved.current) {
      navigate("/chat");
    }
  };

  return (
    <button
      type="button"
      className="floating-chat-button"
      style={{
        right: `${position.right}px`,
        bottom: `${position.bottom}px`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      aria-label="Open IP-SAKTI-Sahayak chat"
      title="Chat with IP-SAKTI-Sahayak"
    >
      <img
        src={sahayakIcon}
        alt="Sahayak"
        className="floating-chat-icon"
        draggable="false"
      />
    </button>
  );
}

export default FloatingChat;