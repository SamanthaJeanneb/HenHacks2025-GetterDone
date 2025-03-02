// import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TaskDashboardPage from "./pages/TaskDashboard";

export default function Component() { 
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TaskDashboardPage/>}>
                
                        {/*<Route path="project" element={<ProjectPage/>}/>*/}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
