const keycodes = {
    ESC: 27,
    ENTER: 13,
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
