import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function TaskPopup({ task, isOpen, onClose }) {
  if (!task) return null;

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Category:</strong> {task.category}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Due Date:</strong> {task.date}</p>
        <p><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}