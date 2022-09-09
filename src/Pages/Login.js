import React, { useEffect } from 'react'
import { useSite } from "../Context/TodoContext"
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (authenticated||localStorage.getItem("username")) {
            navigate("/")
        }
    }, [])

    const { setUserName, authenticated,setAuthenticated, darkMode } = useSite()
    const loginHandler = (e) => {
        e.preventDefault();
        setUserName(e.target.username.value)
        setAuthenticated(true)
        localStorage.setItem("username", e.target.username.value)
        if (localStorage.getItem("username")) {
            navigate("/")
        }
    }

    return (
        <div className={`App mt-5 ${darkMode ? "dark" : ""}`}>
            <form className="form-signin w-25 m-auto p-4 " onSubmit={loginHandler}>
                <h1 className="h3 mb-3 font-weight-normal">Kullanıcı Adı Giriniz</h1>
                <input type="text" className="form-control mt-4" name="username" placeholder="Kullanıcı Adı" />
                <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Giriş Yap</button>
            </form>
        </div>
    )
}

export default Login