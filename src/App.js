import { useState, useEffect } from "react";
function App() {

  const axios = require("axios");
  const [userName, setUserName] = useState(localStorage.getItem("username") || "")
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [changedTodo, setChangedTodo] = useState("")
  const url = "https://6318c3f76b4c78d91b2e80e8.mockapi.io/todos";

  useEffect(() => {
    setIsLoading(false)
    request();
  }, [])

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
        .catch(error => {
          console.error(error);
        });
    } else alert("Lütfen en az 3 karakter giriniz.")
  }

  const deleteHandler = (id) => {
    setIsLoading(false)
    axios.delete(`${url}/${id}`)
      .then(response => {
        request();
      })
      .catch(error => {
        console.error(error);
      });
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

  const loginHandler = (e) => {
    e.preventDefault();
    setUserName(e.target.username.value)
    localStorage.setItem('username', e.target.username.value)
  }

  const logoutHandler = () => {
    localStorage.removeItem("username");
    setUserName("")
  }

  return (
    <div className="App mt-5">
      {userName == "" ?
        <form className="form-signin w-25 m-auto p-4 bg-white" onSubmit={loginHandler}>
          <h1 className="h3 mb-3 font-weight-normal">Kullanıcı Adı Giriniz</h1>
          <input type="text" className="form-control mt-4" name="username" placeholder="Kullanıcı Adı" />
          <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Giriş Yap</button>
        </form> :
        <>
          <form className="w-50 mx-auto bg-white pt-4 position-relative">
            <div className="d-flex w-100 justify-content-between px-4 pointer">Hoş Geldin {userName}
              <span onClick={logoutHandler} className="logout">Çıkış Yap</span>
            </div>
            <header>
              <h1 className="text-dark my-2">To Do List</h1>
            </header>
            <div className="w-75 d-flex">
              <input type="text" className="bg-light rounded w-100 px-4" placeholder="Yeni Görev Ekle" onChange={inputTextHandler} value={todo} />
              <button type="submit" onClick={submitHandle}>+</button>
            </div>
          </form>
          <div className="todo-container">
            {isLoading ?
              <>
                <ul className="w-50 p-0 rounded-bottom">
                  {todos.map((todo) => (
                    <li key={todo.id} className={`todo list-group-item d-flex  rounded-0`}>

                      <span className="todo-item mr-auto" >{edit.id == todo.id ? <input type="text" value={changedTodo} className="bg-light rounded w-100 px-4" onChange={(e) => setChangedTodo(e.target.value)} /> : todo.content}</span>
                      {edit.id == todo.id ?
                        <button className="btn btn-secondary mr-2" onClick={(e) => putHandler(todo.id)}>Kaydet</button>
                        :
                        <button className="btn btn-secondary mr-2" onClick={() => editHandler(todo.id, todo.content)}>Düzenle</button>
                      }
                      <button className="btn btn-success mr-2">Tamamla</button>
                      <button className="btn btn-danger" onClick={() => deleteHandler(todo.id)}>Kaldır</button>
                    </li>
                  ))}
                </ul>
              </>
              :
              <div className="w-50 p-4 loading"><h1>Yükleniyor...</h1></div>
            }
          </div>
        </>
      }
    </div>
  );
}

export default App;
