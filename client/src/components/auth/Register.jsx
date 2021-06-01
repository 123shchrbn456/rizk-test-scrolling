import React, { Fragment, useState, useContext, useEffect } from "react";
import axios from "axios";
import CountriesOptions from "./CountriesOptions";
import DayOptions from "./DayOptions";
import MonthsOptions from "./MonthsOptions";
import YearsOptions from "./YearsOptions";
import Alerts from "../layout/Alerts";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

import { closeRegisterPopup } from "../../utils/popupActions";

const Register = () => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { register, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert, setAlerts } = alertContext;

    useEffect(() => {
        if (error && error.length === 1) {
            setAlert(error, "danger");
        }
        if (error && error.length > 1) {
            console.log("РАс", error);
            setAlerts(error, "danger");
        }
    }, [error]);

    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        surname: "",
        address: "",
        postCode: "",
        city: "",
        country: "",
        dayBirth: "",
        monthBirth: "",
        yearBirth: "",
        sex: "",
        terms_and_conditions: "",
        privacy_and_cookie: "",
    });

    // извлекли значение каждого поля формы из localState
    const {
        email,
        password,
        password2,
        name,
        surname,
        address,
        postCode,
        city,
        country,
        dayBirth,
        monthBirth,
        yearBirth,
        sex,
        terms_and_conditions,
        privacy_and_cookie,
    } = user;

    const onInputChange = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (
            name === "" ||
            password === "" ||
            password2 === "" ||
            surname === "" ||
            address === "" ||
            postCode === "" ||
            city === "" ||
            country === "" ||
            dayBirth === "" ||
            monthBirth === "" ||
            yearBirth === "" ||
            sex === "" ||
            terms_and_conditions === "" ||
            privacy_and_cookie === ""
        ) {
            // Закладка 25.12
            setAlert("Please enter all fields", "danger");
        } else if (password !== password2) {
            // Закладка 25.12
            setAlert("Passwords do not match", "danger");
        } else {
            // регистрируем Пользователя
            register({
                email,
                password,
                password2,
                name,
                surname,
                address,
                postCode,
                city,
                country,
                dayBirth,
                monthBirth,
                yearBirth,
                sex,
                terms_and_conditions,
                privacy_and_cookie,
            });

            // Обнуляем форму
            setUser({
                email: "",
                password: "",
                name: "",
                surname: "",
                address: "",
                postCode: "",
                city: "",
                country: "",
                dayBirth: "",
                monthBirth: "",
                yearBirth: "",
                sex: "",
                terms_and_conditions: false,
                privacy_and_cookie: false,
            });
            // Закрываем форму
            onBtnCloseClick();
        }
    };

    // Закрытие попапа
    const onBtnCloseClick = (e) => {
        closeRegisterPopup();
    };

    return (
        <Fragment>
            <div className="mudal visually-hidden popup-registration">
                <div className="mudal-container">
                    <div className="mudal-content">
                        <div
                            className="registration-modal"
                            id="registration-modal"
                        >
                            <div className="mudal-dialog green">
                                <header className="progress-slogan">
                                    <h1>Регистрация</h1>
                                    <button
                                        className="registration-close"
                                        name="close"
                                        onClick={onBtnCloseClick}
                                    />
                                </header>
                                {/* <!-- Закладка стиили! --> */}
                                <div className="register-form">
                                    <div className="reg-inner">
                                        <form name="form" onSubmit={onSubmit}>
                                            {/* <!--первая часть регистрации --> */}
                                            <section className="regsect">
                                                <div className="clearfix">
                                                    {/* <!-- Блок с почтой --> */}
                                                    <div className="form-group ss">
                                                        <label
                                                            className="required"
                                                            htmlFor="form_user_email"
                                                        >
                                                            <span>Почта</span>
                                                        </label>
                                                        <input
                                                            id="form_user_email"
                                                            className="form-email valid"
                                                            type="email"
                                                            name="email"
                                                            value={email}
                                                            onChange={
                                                                onInputChange
                                                            }
                                                        />
                                                        <span className="validator-icon form-control-feedback" />
                                                    </div>
                                                    {/* <!-- Блок с паролем --> */}
                                                    <div className="password-wrap">
                                                        <div className="form-group">
                                                            <label
                                                                className="required"
                                                                htmlFor="form_user_password"
                                                            >
                                                                <span>
                                                                    Пароль
                                                                </span>
                                                            </label>
                                                            <input
                                                                id="form_user_password"
                                                                className="form-password valid"
                                                                type="password"
                                                                name="password"
                                                                minLength="5"
                                                                maxLength="25"
                                                                value={password}
                                                                onChange={
                                                                    onInputChange
                                                                }
                                                            />
                                                            <span className="validator-icon form-control-feedback" />
                                                        </div>
                                                        <p className="requirements">
                                                            Password must be
                                                            8-25 characters long
                                                            and include at least
                                                            1 digit, 1 lowercase
                                                            letter and 1
                                                            uppercase letter
                                                        </p>
                                                        <a
                                                            href="#"
                                                            className="toggle-password"
                                                        >
                                                            <span className="show-password">
                                                                Show password
                                                            </span>
                                                            <span className="hide-password hidden">
                                                                Hide password
                                                            </span>
                                                        </a>
                                                    </div>
                                                    {/* <!-- Блок с повтором пароля,закладка --> */}
                                                    <div className="password-wrap">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="form_user_password2"
                                                                className="required"
                                                            >
                                                                <span>
                                                                    Повторите
                                                                    пароль
                                                                </span>
                                                            </label>
                                                            <input
                                                                className="form-password"
                                                                type="password"
                                                                id="form_user_password2"
                                                                name="password2"
                                                                minLength="5"
                                                                maxLength="25"
                                                                // required
                                                                onChange={
                                                                    onInputChange
                                                                }
                                                            />
                                                            <span
                                                                className="validator-icon form-control-feedback"
                                                                aria-hidden="true"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            {/* <!-- вторая часть регистрации  --> */}
                                            <section className="regsect regsect-second">
                                                {/* <!-- Поле имени --> */}
                                                <div className="form-group ">
                                                    <label
                                                        htmlFor="form_user_firstname"
                                                        className="required"
                                                    >
                                                        <span>Имя</span>
                                                    </label>
                                                    <input
                                                        className="form-text"
                                                        type="text"
                                                        id="form_user_firstname"
                                                        name="name"
                                                        minLength="1"
                                                        maxLength="50"
                                                        value={name}
                                                        // required
                                                        onChange={onInputChange}
                                                    />
                                                    <span className="validator-icon form-control-feedback" />
                                                </div>
                                                {/* <!-- Поле фамилии --> */}
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="form_user_lastname"
                                                        className="required"
                                                    >
                                                        <span>Фамилия</span>
                                                    </label>
                                                    <input
                                                        className="form-text"
                                                        type="text"
                                                        id="form_user_lastname"
                                                        name="surname"
                                                        minLength="1"
                                                        maxLength="50"
                                                        value={surname}
                                                        onChange={onInputChange}
                                                    />
                                                    <span className="validator-icon form-control-feedback" />
                                                </div>
                                                {/* <!-- Поле адреса --> */}
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="form_user_address1"
                                                        className="required"
                                                    >
                                                        <span>Адрес</span>
                                                    </label>
                                                    <input
                                                        className="form-text"
                                                        type="text"
                                                        id="form_user_address1"
                                                        name="address"
                                                        minLength="1"
                                                        maxLength="100"
                                                        value={address}
                                                        // required
                                                        onChange={onInputChange}
                                                    />
                                                    <span className="validator-icon form-control-feedback" />
                                                </div>
                                                {/* <!-- Поле почтового кода --> */}
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="form_user_postal_code"
                                                        className="required"
                                                    >
                                                        <span>
                                                            Почтовый индекс
                                                        </span>
                                                    </label>
                                                    <input
                                                        className="form-text"
                                                        type="text"
                                                        id="form_user_postal_code"
                                                        name="postCode"
                                                        minLength="1"
                                                        maxLength="20"
                                                        value={postCode}
                                                        // required
                                                        onChange={onInputChange}
                                                    />
                                                    <span className="validator-icon form-control-feedback" />
                                                </div>
                                                {/* <!-- Поле города --> */}
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="form_user_city"
                                                        className="required"
                                                    >
                                                        <span>Город</span>
                                                    </label>
                                                    <input
                                                        className="form-text"
                                                        type="text"
                                                        id="form_user_city"
                                                        name="city"
                                                        minLength="1"
                                                        maxLength="50"
                                                        value={city}
                                                        // required
                                                        onChange={onInputChange}
                                                    />
                                                    <span className="validator-icon form-control-feedback" />
                                                </div>
                                                {/* <!-- Поле выбора страны проживания --> */}
                                                <div className="form-group">
                                                    <label
                                                        htmlFor="form_user_country"
                                                        className="required"
                                                    >
                                                        <span>Страна</span>
                                                    </label>
                                                    <div className="select-wrap">
                                                        <span className="select-container">
                                                            <select
                                                                className="form-control valid"
                                                                id="form_user_country"
                                                                name="country"
                                                                autoComplete="off"
                                                                value={country}
                                                                onChange={
                                                                    onInputChange
                                                                }
                                                            >
                                                                {/* <!-- Здесь находяться страны посетителей --> */}
                                                                <CountriesOptions />
                                                            </select>
                                                            <span
                                                                className="arrow-down"
                                                                htmlFor="form_user_country"
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* <!-- Поле выбора даты рождения --> */}
                                                <div className="form-group mobile-wide">
                                                    <label className="required">
                                                        Дата рождения
                                                    </label>
                                                    <div className="select-wrap dob">
                                                        <div
                                                            id="form_user_dob"
                                                            data-error="Please check your details"
                                                        >
                                                            {/* <!-- селект дней --> */}
                                                            <span className="select-container">
                                                                <select
                                                                    className="form-control valid"
                                                                    id="form_user_dob_day"
                                                                    name="dayBirth"
                                                                    value={
                                                                        dayBirth
                                                                    }
                                                                    onChange={
                                                                        onInputChange
                                                                    }
                                                                >
                                                                    {/* <!-- Опции выбора дня рождения --> */}
                                                                    <DayOptions />
                                                                </select>
                                                                <span
                                                                    className="arrow-down"
                                                                    htmlFor="form_user_dob_day"
                                                                />
                                                            </span>
                                                            {/* <!-- селект месяцей --> */}
                                                            <span className="select-container">
                                                                <select
                                                                    className="form-control valid"
                                                                    id="form_user_dob_month"
                                                                    name="monthBirth"
                                                                    value={
                                                                        monthBirth
                                                                    }
                                                                    onChange={
                                                                        onInputChange
                                                                    }
                                                                >
                                                                    {/* <!-- Опции выбора месяца рождения --> */}
                                                                    <MonthsOptions />
                                                                </select>
                                                                <span
                                                                    className="arrow-down"
                                                                    htmlFor="form_user_dob_month"
                                                                />
                                                            </span>
                                                            {/* <!-- селект года --> */}
                                                            <span className="select-container">
                                                                <select
                                                                    className="form-control valid"
                                                                    id="form_user_dob_year"
                                                                    name="yearBirth"
                                                                    value={
                                                                        yearBirth
                                                                    }
                                                                    onChange={
                                                                        onInputChange
                                                                    }
                                                                >
                                                                    {/* <!-- Опции выбора года рождения --> */}
                                                                    <YearsOptions />
                                                                </select>
                                                                <span
                                                                    className="arrow-down"
                                                                    htmlFor="form_user_dob_year"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span
                                                        id="invalid-age"
                                                        className="color-red hidden"
                                                    >
                                                        You need to be 18 years
                                                        of age to register
                                                    </span>
                                                </div>
                                                {/* <!-- Поле выбора пола --> */}
                                                <span className="sex mobile-wide">
                                                    <div className="form-group">
                                                        <label className="required">
                                                            <span>Пол</span>
                                                        </label>
                                                        <div
                                                            id="form_user_sex"
                                                            pattern="([0|1|2|9])"
                                                        >
                                                            <input
                                                                className="form-control"
                                                                type="radio"
                                                                id="form_user_sex_0"
                                                                name="sex"
                                                                defaultValue="male"
                                                                onChange={
                                                                    onInputChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="form_user_sex_0"
                                                                className="required"
                                                            >
                                                                <span />
                                                                Мужчина
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="radio"
                                                                id="form_user_sex_1"
                                                                name="sex"
                                                                defaultValue="female"
                                                                onChange={
                                                                    onInputChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="form_user_sex_1"
                                                                className="required"
                                                            >
                                                                <span />
                                                                Женщина
                                                            </label>
                                                        </div>
                                                        <span
                                                            className="validator-icon form-control-feedback"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                </span>
                                            </section>
                                            {/* <!-- третья часть регистрации --> */}
                                            <section className="regsect">
                                                <h2 className="accept-terms">
                                                    Я принимаю
                                                </h2>
                                                <div className="align-labels-last">
                                                    <div className="clearfix">
                                                        <span className="form-group">
                                                            <input
                                                                className="form-control"
                                                                type="checkbox"
                                                                id="form_terms_and_conditions_consented"
                                                                name="terms_and_conditions"
                                                                defaultValue="accept"
                                                                onChange={
                                                                    onInputChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="form_terms_and_conditions_consented"
                                                                className="required"
                                                            >
                                                                <span />
                                                                The
                                                                <a
                                                                    href="https://rizk.com/en/terms-and-conditions"
                                                                    target="“_blank”"
                                                                >
                                                                    terms &amp;
                                                                    conditions
                                                                </a>{" "}
                                                                &amp; confirm
                                                                that I am 18+.
                                                            </label>
                                                        </span>
                                                    </div>
                                                    <div className="clearfix">
                                                        <span className="form-group">
                                                            <input
                                                                className="form-control"
                                                                type="checkbox"
                                                                id="form_privacy_and_cookie_notice_consented"
                                                                name="privacy_and_cookie"
                                                                defaultValue="accept"
                                                                onChange={
                                                                    onInputChange
                                                                }
                                                            />
                                                            <label
                                                                htmlFor="form_privacy_and_cookie_notice_consented"
                                                                className="required"
                                                            >
                                                                <span />
                                                                That my personal
                                                                data will be
                                                                processed
                                                                according to the
                                                                <a
                                                                    href="https://rizk.com/en/privacy-policy"
                                                                    target="“_blank”"
                                                                >
                                                                    privacy
                                                                    notice
                                                                </a>{" "}
                                                                &amp;
                                                                <a
                                                                    href="https://rizk.com/en/privacy-policy"
                                                                    target="“_blank”"
                                                                >
                                                                    cookie
                                                                    notice
                                                                </a>
                                                                by Gaming
                                                                Innovation Group
                                                                plc, as data
                                                                controller.
                                                            </label>
                                                        </span>
                                                    </div>
                                                </div>
                                            </section>
                                            <Alerts />
                                            <button
                                                className="btn btn-continue btn-validate-mobile btn-green"
                                                type="submit"
                                            >
                                                Зарегистрироваться
                                            </button>
                                        </form>

                                        <a>Уже есть аккаунт? Войдите</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mudal-shade registration-shade visually-hidden" />
        </Fragment>
    );
};

export default Register;
