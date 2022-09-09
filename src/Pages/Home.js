import React from 'react'
import { useEffect } from "react";
import { useSite } from "../Context/TodoContext"
import { useNavigate } from 'react-router-dom';
import Todo from '../Components/Todo';
import Loading from '../Components/Loading'
import TodoForm from '../Components/TodoForm';
function Home() {
    const {
        userName,
        authenticated,
        setAuthenticated,
        darkMode,
        todos,
        setTodos,
        isLoading,
        setIsLoading,
    } = useSite()

    const axios = require("axios");
    const url = "https://6318c3f76b4c78d91b2e80e8.mockapi.io/todos";
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('darkmode', darkMode);
    }, [darkMode]);

    useEffect(() => {
        if (!localStorage.getItem("username") && !authenticated) {
            setAuthenticated(false)
            navigate("/login")
        }
        setIsLoading(false)
        request();
    }, [userName])

    const request = () => {
        axios.request(url)
            .then(response => {
                setTodos(response.data)
                setIsLoading(true)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className={`App mt-5 ${darkMode ? "dark" : ""} `}>
            {
                <>
                    <TodoForm request={request} />
                    <div className="todo-container">
                        {isLoading ?
                            <>
                                <ul className="w-50 p-0 rounded-bottom">
                                    {todos.map((todo) => (
                                        <Todo key={todo.id} todo={todo} request={request} />
                                    ))}
                                </ul>
                            </>
                            :
                            <Loading />
                        }
                    </div>
                </>}
        </div>
    )
}

export default Home