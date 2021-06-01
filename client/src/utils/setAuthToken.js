import axios from "axios";
// Делается для доступа к private routes в бэкэнде
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
};

export default setAuthToken;
