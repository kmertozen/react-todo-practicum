import React from 'react'
import { useSite } from "../Context/TodoContext"

function TodoForm({ request }) {

    const {
        userName,
        setAuthenticated,
        setUserName,
        darkMode,
        setDarkMode,
        todo,
        setTodo,
        setIsLoading,
    } = useSite()

    const axios = require("axios");
    const url = "https://6318c3f76b4c78d91b2e80e8.mockapi.io/todos";

    const inputTextHandler = (e) => {
        setTodo(e.target.value)
    }

    const submitHandle = (e) => {
        e.preventDefault();
        if (todo.length >= 3) {
            setIsLoading(false)
            const data = {
                content: todo,
            };
            axios.post(url, data)
                .then(response => {
                    request();
                    setTodo("");
                })
        } else alert("Lütfen en az 3 karakter giriniz.")
    }
    const modHandler = () => {
        setDarkMode(!darkMode)
    }

    const logoutHandler = () => {
        localStorage.removeItem("username");
        setUserName("")
        setAuthenticated(false)
    }


    return (
        <form className="form-todo w-50 mx-auto p-4 position-relative">
            <div className="d-flex w-100 justify-content-between px-4 pointer">Hoş Geldin {userName}
                <div>
                    <span onClick={modHandler} className="logout">Dark Mod</span>
                    <span onClick={logoutHandler} className="logout ml-2">Çıkış Yap</span>
                </div>
            </div>
            <header>
                <h1 className="my-2">To Do List</h1>
            </header>
            <div className="w-75 d-flex">
                <input type="text" className="rounded w-100 px-4" placeholder="Yeni Görev Ekle" onChange={inputTextHandler} value={todo} />
                <button type="submit" onClick={submitHandle}>+</button>
            </div>
        </form>
    )
}

export default TodoForm