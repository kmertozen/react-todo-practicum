import React from 'react'
import { useSite } from "../Context/TodoContext"

function Todo({todo,request}) {
  const axios = require("axios");
  const {
    setIsLoading,
    edit,
    setEdit,
    changedTodo,
    setChangedTodo
} = useSite()
const url = "https://6318c3f76b4c78d91b2e80e8.mockapi.io/todos";

  const completeHandler = (id, complete) => {
    setIsLoading(false)
    axios.put(`${url}/${id}`, { isCompleted: !complete })
        .then(response => {
            request();
        })
}

const deleteHandler = (id) => {
    setIsLoading(false)
    axios.delete(`${url}/${id}`)
        .then(response => {
            request();
        })
}

const editHandler = (id, content) => {
    setEdit({ id: id })
    setChangedTodo(content)
}

const putHandler = (id) => {
    setEdit(false)
    setIsLoading(false)
    axios.put(`${url}/${id}`, { content: changedTodo })
        .then(response => {
            request();
        })
}

  return (
    <li key={todo.id} className={`todo list-group-item d-flex ${todo.isCompleted ? "completed" : ""}  rounded-0`}>

      <span className="todo-item mr-auto">{edit.id === todo.id ? <input type="text" value={changedTodo} className="rounded w-100 p-2" onChange={(e) => setChangedTodo(e.target.value)} /> : todo.content}</span>
      {edit.id === todo.id ?
        <button className="btn btn-secondary mr-2" onClick={(e) => putHandler(todo.id)}>Kaydet</button>
        :
        <button className="btn btn-secondary mr-2" onClick={() => editHandler(todo.id, todo.content)}>Düzenle</button>}
      <button className="btn btn-success mr-2" onClick={() => completeHandler(todo.id, todo.isCompleted)}>Tamamla</button>
      <button className="btn btn-danger" onClick={() => deleteHandler(todo.id)}>Kaldır</button>
    </li>
  )
}

export default Todo