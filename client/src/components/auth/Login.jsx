import React, { Fragment, useContext, useState } from "react";
import axios from "axios";

import Alerts from "../layout/Alerts";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import { closeLoginPopup } from "../../utils/popupActions";

const Login = () => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { login, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;

    const onChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const ontry = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please fill in all fields", "danger");
        } else {
            login({ email, password });
            setUser({ email: "", password: "" });
            onBtnCloseClick();
        }
    };

    // Закрытие попапа
    const onBtnCloseClick = (e) => {
        closeLoginPopup();
    };

    return (
        <Fragment>
            <div className="mudal popup-login visually-hidden">
                <div className="mudal-container">
                    <div className="mudal-content">
                        <div className="mudal-dialog green">
                            <header>
                                <h1>Вход</h1>
                            </header>
                            <div>
                                <form
                                    className="login-form"
                                    name="form"
                                    onSubmit={ontry}
                                >
                                    <label htmlFor="">Почта</label>
                                    <input
                                        name="email"
                                        type="text"
                                        value={email}
                                        onChange={onChange}
                                    />
                                    <label>Пароль</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                    />
                                    <Alerts />
                                    <button
                                        className="rizk-btn green-btn"
                                        type="submit"
                                    >
                                        Войти
                                    </button>
                                </form>
                                <div className="login-links clearfix">
                                    <a className="left" href="">
                                        Забыли пароль?
                                    </a>
                                    <a className="right" href="">
                                        Зарегистрироваться сейчас!
                                    </a>
                                </div>
                            </div>

                            <button
                                className="close-button login-close"
                                name="close"
                                onClick={onBtnCloseClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* // <!-- Овэрлэй модал-логин --> */}
            <div className="mudal-shade login-shade visually-hidden" />
        </Fragment>
    );
};

export default Login;
