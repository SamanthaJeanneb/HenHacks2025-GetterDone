import { useState, useContext, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from '../src/context/Context';
import { getAllTasks } from "../lib/TaskUtils";
import TimerModal from "./TimerModal"; // Import TimerModal

export default function WorkNowModal({ isOpen, onClose }) {
  const [timer, setTimer] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [suggestedTask, setSuggestedTask] = useState(null);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false); // State for TimerModal
  const [isWorkNowVisible, setIsWorkNowVisible] = useState(true); // Controls visibility
  const { onSent, resultData, setResultData } = useContext(Context);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    if (isOpen) {
      fetchTasks();
    }
  }, [isOpen]);

  const handleSuggestTask = async () => {
    const taskDescriptions = tasks.map(task => task.objective).join(", ");
    await onSent(`Suggest a task to work on based on the following tasks: ${taskDescriptions}`);
  };

  const handleStartTimer = () => {
    setIsTimerModalOpen(true); // Open the TimerModal
    setIsWorkNowVisible(false); // Hide WorkNowModal
  };

  const handleTimerClose = () => {
    setIsTimerModalOpen(false);
    setIsWorkNowVisible(true); // Show WorkNowModal again after timer ends
  };

  useEffect(() => {
    if (resultData) {
      setSuggestedTask(resultData);
      setResultData(''); // Clear the resultData after processing
    }
  }, [resultData, setResultData]);

  return (
    <>
      {/* Work Now Modal - Hidden when timer starts */}
      {isWorkNowVisible && (
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
                  onChange={(e) => setTimer(Number(e.target.value))}
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
      )}

      {/* Timer Modal - Opens when timer starts */}
      <TimerModal isOpen={isTimerModalOpen} onClose={handleTimerClose} duration={timer} />
    </>
  );
}
