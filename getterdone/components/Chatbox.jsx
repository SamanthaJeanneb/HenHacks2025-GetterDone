import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../src/context/Context';
import './Chatbox.css'; // Optional: for styling
import { getAllTasks } from '../lib/TaskUtils'; // Assuming you have a function to fetch tasks

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { prevPrompts, setPrevPrompts, onSent, input, setInput, resultData, setResultData, loading } = useContext(Context);
    const [responseAdded, setResponseAdded] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');

    useEffect(() => {
        async function fetchTasks() {
            try {
                const fetchedTasks = await getAllTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }

        fetchTasks();
    }, []);

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async () => {
        if (input.trim() && selectedTask) {
            const newMessages = [...prevPrompts, { sender: 'user', text: input }];
            setPrevPrompts(newMessages);
            setInput('');
            setResponseAdded(false); // Reset the flag

            // Call onSent to get Gemini's response
            await onSent(`Task: ${selectedTask}\nQuestion: ${input}`);
        }
    };

    useEffect(() => {
        if (resultData && !responseAdded) {
            setPrevPrompts((prev) => [...prev, { sender: 'gemini', text: resultData }]);
            setResponseAdded(true); // Set the flag to true after adding the response
            setResultData(''); // Clear the resultData after processing
        }
    }, [resultData, responseAdded, setPrevPrompts]);

    return (
        <div className={`chatbox ${isOpen ? 'open' : ''}`}>
            <button className="chatbox-toggle" onClick={toggleChatbox} style={{ backgroundColor: '#005c59', color: 'white' }}>
                {isOpen ? 'Close' : 'Chat'}
            </button>
            {isOpen && (
                <div className="chatbox-content">
                    <div className="chatbox-header" style={{ backgroundColor: 'white', color: 'white' }}>
                        <div className="chatbox-messages">
                            {prevPrompts.map((msg, index) => (
                                <p key={index} className={msg.sender === 'user' ? 'user-message' : 'gemini-message'}>
                                    {msg.text}
                                </p>
                            ))}
                            {loading && <p className="loading-message">Gemini is typing...</p>}
                        </div>
                    </div>
                    <div className="chatbox-footer" style={{ backgroundColor: 'white', color: 'black' }}>
                        <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} style={{ backgroundColor: 'white', color: 'black' }}>
                            <option value="">Select a task</option>
                            {tasks.map((task) => (
                                <option key={task.id} value={task.objective}>
                                    {task.objective}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message here..."
                            style={{ backgroundColor: 'white', color: 'black' }} // Make text input white
                        />
                        <button onClick={handleSend} style={{ backgroundColor: '#005c59', color: 'white' }}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbox;