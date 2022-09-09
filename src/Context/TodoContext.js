import { createContext, useContext, useState } from "react";


const Context = createContext();

const Provider = ({children}) => {


    const [userName, setUserName] = useState(localStorage.getItem("username") || "")
    const [authenticated, setAuthenticated] = useState(false)
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode') === 'true')
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [changedTodo, setChangedTodo] = useState("")

    const data = {
        userName,
        setUserName,
        authenticated,
        setAuthenticated,
        darkMode,
        setDarkMode,
        todos,
        setTodos,
        todo,
        setTodo,
        isLoading,
        setIsLoading,
        edit,
        setEdit,
        changedTodo,
        setChangedTodo
    }
    return(
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export const useSite = () => useContext(Context);

export default Provider;

