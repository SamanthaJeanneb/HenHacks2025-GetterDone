import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function TimerModal({ isOpen, onClose, duration }) {
  const [timeLeft, setTimeLeft] = useState(duration > 0 ? duration * 60 : 0); // Ensure it's not 0 on load
  const [isActive, setIsActive] = useState(false); // Track whether the timer has started

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(duration * 60); // Reset timer when modal opens
      setIsActive(true); // Timer is now active
    }
  }, [isOpen, duration]);

  useEffect(() => {
    if (timeLeft <= 0 && isActive) {
      alert("Time's up! Please check off the completed subtasks.");
      setIsActive(false); // Prevent re-triggering the alert
      return;
    }

    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft, isActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Timer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{formatTime(timeLeft)}</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
