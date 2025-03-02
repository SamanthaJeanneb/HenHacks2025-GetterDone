import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../src/context/Context';
import './Chatbox.css'; // Optional: for styling

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { prevPrompts, setPrevPrompts, onSent, input, setInput, resultData, setResultData, loading } = useContext(Context);
    const [responseAdded, setResponseAdded] = useState(false);

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages = [...prevPrompts, { sender: 'user', text: input }];
            setPrevPrompts(newMessages);
            setInput('');
            setResponseAdded(false); // Reset the flag

            // Call onSent to get Gemini's response
            await onSent(input);
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
            <button className="chatbox-toggle" onClick={toggleChatbox}>
                {isOpen ? 'Close' : 'Chat'}
            </button>
            {isOpen && (
                <div className="chatbox-content">
                    <div className="chatbox-messages">
                        {prevPrompts.map((msg, index) => (
                            <p key={index} className={msg.sender === 'user' ? 'user-message' : 'gemini-message'}>
                                {msg.text}
                            </p>
                        ))}
                        {loading && <p className="loading-message">Gemini is typing...</p>}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chatbox;