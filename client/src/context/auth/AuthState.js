import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            // load token into global headers
            setAuthToken(localStorage.token);
        } else {
            return;
        }

        try {
            // в res обьект пользователя из БД
            const res = await axios.get("/api/auth");

            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
        }
    };

    // Регистрация пользователя
    const register = async (formData) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        try {
            const res = await axios.post("/api/users", formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload:
                    res.data /* в res.data будет token из route 'api/users' */,
            });

            loadUser();
        } catch (err) {
            /* msg вернулось из route 'api/users' при возврате ошибки, err.response.data.errors появилось так как там мульти-валидация */
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg || err.response.data.errors,
            });
        }
    };

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        try {
            const res = await axios.post("/api/auth", formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload:
                    res.data /* в res.data будет token из route 'api/users' */,
            });

            loadUser();
        } catch (err) {
            /* msg вернулось из route 'api/users' при возврате ошибки, err.response.data.errors появилось так как там мульти-валидация */
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg || err.response.data.errors,
            });
        }
    };

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
