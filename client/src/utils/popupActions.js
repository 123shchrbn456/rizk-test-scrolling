const keycodes = {
    ESC: 27,
    ENTER: 13,
};

//-------------------------------------- Касается открытия Попапа выбора Вида-спорта----------------

const onSportTypePopupEscPress = (evt) => {
    if (evt.keyCode === keycodes.ESC) {
        closeSportTypePopup();
    }
};

// функция-обработчик закрытия попапа
export const closeSportTypePopup = () => {
    // prettier-ignore
    const browseSportTypePopup = document.querySelector(".popup-browse__sport-type");
    browseSportTypePopup.classList.add("visually-hidden");
    document.removeEventListener("keydown", onSportTypePopupEscPress);
};

// функция-обработчик открытия попапа
export const openSportTypePopup = () => {
    // prettier-ignore
    const browseSportTypePopup = document.querySelector(".popup-browse__sport-type");
    browseSportTypePopup.classList.remove("visually-hidden");

    document.addEventListener("keydown", onSportTypePopupEscPress);
};

//-------------------------------------- Касается открытия Попапа выбора лиги--------------

const onLeaguesPopupEscPress = (evt) => {
    if (evt.keyCode === keycodes.ESC) {
        closeLeaguesPopup();
    }
};

// функция-обработчик закрытия попапа
export const closeLeaguesPopup = () => {
    // prettier-ignore
    const browseLeaguePopup = document.querySelector(".popup-browse__sport-league");
    browseLeaguePopup.classList.add("visually-hidden");
    document.removeEventListener("keydown", onLeaguesPopupEscPress);
};

// функция-обработчик открытия попапа
export const openLeaguesPopup = () => {
    // prettier-ignore
    const browseLeaguePopup = document.querySelector(".popup-browse__sport-league");
    browseLeaguePopup.classList.remove("visually-hidden");

    document.addEventListener("keydown", onLeaguesPopupEscPress);
};

// функция-обработчик нажатия на Esc
const onLoginPopupEscPress = function (evt) {
    if (evt.keyCode === keycodes.ESC) {
        closeLoginPopup();
    }
};

// функция-обработчик закрытия попапа
export function closeLoginPopup() {
    const loginPopup = document.querySelector(".popup-login");
    const loginShade = document.querySelector(".login-shade");

    loginPopup.classList.add("visually-hidden");
    loginShade.classList.add("visually-hidden");
    document.removeEventListener("keydown", onLoginPopupEscPress);
}

// функция-обработчик открытия попапа
export function openLoginPopup() {
    const loginPopup = document.querySelector(".popup-login");
    const loginShade = document.querySelector(".login-shade");

    loginPopup.classList.remove("visually-hidden");
    loginShade.classList.remove("visually-hidden");

    document.addEventListener("keydown", onLoginPopupEscPress);
}

// функция-обработчик нажатия на Esc
const onRegisterPopupEscPress = function (evt) {
    if (evt.keyCode === keycodes.ESC) {
        closeRegisterPopup();
    }
};

// функция-обработчик закрытия попапа
export function closeRegisterPopup() {
    const registrationPopup = document.querySelector(".popup-registration");
    const registrationShade = document.querySelector(".registration-shade");

    registrationPopup.classList.add("visually-hidden");
    registrationShade.classList.add("visually-hidden");
    document.removeEventListener("keydown", onRegisterPopupEscPress);
}

// функция-обработчик открытия попапа
export function openRegisterPopup() {
    const registrationPopup = document.querySelector(".popup-registration");
    const registrationShade = document.querySelector(".registration-shade");

    registrationPopup.classList.remove("visually-hidden");
    registrationShade.classList.remove("visually-hidden");

    document.addEventListener("keydown", onRegisterPopupEscPress);
}

// функция-обработчик закрытия попапа
// const closePopup = () => {
//     browseSportTypePopup.classList.add("visually-hidden");
//     document.removeEventListener("keydown", onEscPress);
// };

// // функция-обработчик открытия попапа
// const openPopup = (evt) => {
//     evt.preventDefault();
//     browseSportTypePopup.classList.remove("visually-hidden");

//     document.addEventListener("keydown", onEscPress);
// };

// const onEscPress = (yep) => {
//     if (evt.keyCode === keycodes.ESC) {
//         console.log(yep);
//         // closePopup();
//     }
// };

// // функция-обработчик закрытия попапа
// const closePopup = () => {
//     browseSportTypePopup.classList.add("visually-hidden");
//     document.removeEventListener("keydown", onEscPress);
// };

// // функция-обработчик открытия попапа
// const openPopup = (evt) => {
//     evt.preventDefault();
//     browseSportTypePopup.classList.remove("visually-hidden");

//     document.addEventListener("keydown", onEscPress);
// };

// const onEscPress = (yep) => {
//     if (evt.keyCode === keycodes.ESC) {
//         console.log(yep);
//         // closePopup();
//     }
// };
