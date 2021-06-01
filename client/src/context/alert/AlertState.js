import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, SET_ALERTS, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type, timeout = 3000) => {
        const id = uuid();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id },
        });
        // Удаляем предупреждение
        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: id }),
            timeout
        );
    };

    // Set Alerts
    const setAlerts = (alertsArr, type, timeout = 3000) => {
        const id = uuid();
        const messages = alertsArr.map((alert) => {
            return {
                msg: alert.msg,
                type: type,
                id: id,
            };
        });

        dispatch({
            type: SET_ALERTS,
            payload: messages,
        });
        // Удаляем предупреждение
        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: id }),
            timeout
        );
    };

    return (
        <AlertContext.Provider
            value={{
                alerts: state /* массив ошибок */,
                setAlert,
                setAlerts,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
