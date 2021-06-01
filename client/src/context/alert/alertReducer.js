import { SET_ALERT, SET_ALERTS, REMOVE_ALERT } from "../types";

export default (state, action) => {
    console.log("state", state);
    console.log("payload", action.payload);
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case SET_ALERTS:
            return [...state, ...action.payload];

        case REMOVE_ALERT:
            return state.filter(
                (alert) =>
                    alert.id !==
                    action.payload /* оставляем любой alert не равняющийся переданному в payload */
            );
        default:
            return state;
    }
};
