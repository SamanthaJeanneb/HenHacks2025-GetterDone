import { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from '../src/context/Context';

export default function WorkNowModal({ isOpen, onClose }) {
  const [timer, setTimer] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [suggestedTask, setSuggestedTask] = useState(null);
  const { onSent, resultData, setResultData } = useContext(Context);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:8080/tasks/getAllTasks");
        if (response.ok) {
          const fetchedTasks = await response.json();
          setTasks(fetchedTasks);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    if (isOpen) {
      fetchTasks();
    }
  }, [isOpen]);

  const handleSuggestTask = async () => {
    const taskDescriptions = tasks.map(task => task.description).join(", ");
    await onSent(`Suggest a task to work on based on the following tasks: ${taskDescriptions}`);
  };

  const handleStartTimer = () => {
    // Logic to start the timer
    console.log(`Timer started for ${timer} minutes`);
  };

  useEffect(() => {
    if (resultData) {
      setSuggestedTask(resultData);
      setResultData(''); // Clear the resultData after processing
    }
  }, [resultData, setResultData]);

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Work Now</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="timer">
            <Form.Label>Set Timer (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              placeholder="Enter time in minutes"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSuggestTask} style={{ backgroundColor: "#005c59", borderColor: "#005c59" }}>
            Suggest Task
          </Button>
          {suggestedTask && (
            <div className="mt-3">
              <h5>Suggested Task:</h5>
              <p>{suggestedTask}</p>
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleStartTimer} style={{ backgroundColor: "#005c59", borderColor: "#005c59" }}>
          Start Timer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}