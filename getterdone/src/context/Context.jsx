import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [suggestedSubtasks, setSuggestedSubtasks] = useState([]);

    const onSent = async (prompt, isSubtask = false) => {
        setLoading(true);
        const response = await runChat(prompt + " respond in one sentence");
        if (isSubtask) {
            setSuggestedSubtasks(response.split(';').map(subtask => subtask.trim()));
        } else {
            setResultData(response);
        }
        setLoading(false);
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setResultData,
        input,
        setInput,
        suggestedSubtasks,
        setSuggestedSubtasks,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;