import React, { useState, useEffect, useContext, Fragment } from "react";
import BetslipContext from "../context/betslip/betslipContext";
import dissectEventCoefiicient from "../utils/dissectEventCoefiicient";

function addToLocalStorageArr(cardData, chosenOutcome, nameOutcome) {
    let localStorageData = JSON.parse(localStorage.getItem("activeSportCards"));
    cardData.chosenOutcome = chosenOutcome;
    cardData.nameOutcome = nameOutcome;
    cardData.chosenOutcomeCoeff = dissectEventCoefiicient(
        cardData.Markets,
        chosenOutcome,
        nameOutcome
    );

    // Если localStorage пустой
    if (localStorageData === null) {
        const data = [cardData];
        localStorage.setItem("activeSportCards", JSON.stringify(data));
    }

    // Если localStorage с обьектами
    if (localStorageData !== null) {
        const isSameCard = localStorageData.find(
            (element) => element.Id === cardData.Id
        );

        if (!isSameCard) {
            localStorageData.push(cardData);
        }

        // Если одна и таже спорт-карточка и нажата таже самая кнопка
        if (isSameCard && isSameCard.chosenOutcome === chosenOutcome) {
            // удалить полностью из массива
            localStorageData = localStorageData.filter(
                (item) => item !== isSameCard
            );
        }

        // Если одна и таже спорт-карточка, но нажата другая кнопка
        if (isSameCard && isSameCard.chosenOutcome !== chosenOutcome) {
            // удалить из массива
            localStorageData = localStorageData.filter(
                (item) => item !== isSameCard
            );
            // обновить chosenOutcome
            isSameCard.chosenOutcome = chosenOutcome;
            // добавить в массив
            localStorageData.push(isSameCard);
        }

        // записываем в localStorage обновленный массив
        localStorage.setItem(
            "activeSportCards",
            JSON.stringify(localStorageData)
        );
    }
}

function deleteFromLocalStorage(cardId) {
    let localStorageData = JSON.parse(localStorage.getItem("activeSportCards"));
    localStorageData = localStorageData.filter(
        (item) => item.Id.toString() !== cardId.toString()
    );
    localStorage.setItem("activeSportCards", JSON.stringify(localStorageData));
}

//
//
//
//
//
//

// Компонент
/* Реализовать массив обьектов с нажатыми кофами в localStorage и отображение активной кнопки кофа, реализовать отображениие корзины с корректным исходом(кнопки)  */
const SportCard = (props) => {
    const { cardData } = props;
    const [activebtn, setActivebtn] = useState("");

    const betslipContext = useContext(BetslipContext);
    let { addMatchToBetslip } = betslipContext;

    useEffect(() => {
        const db = localStorage.getItem(cardData.Id);
        setActivebtn(db);
    }, []);

    const deactivateActiveBtns = (sportCard) => {
        let activeBtns = sportCard.querySelectorAll(".outcome__button--active");
        activeBtns.forEach((activeBtn) =>
            activeBtn.classList.remove("outcome__button--active")
        );
    };

    const onCardClick = (evt) => {
        const btnIsClicked = evt.target.closest(".outcome__button ");

        if (btnIsClicked) {
            const cardId = cardData.Id;
            /* выясняем наличине активного класа */
            const btnIsAlreadyActive = btnIsClicked.classList.contains(
                "outcome__button--active"
            );

            if (btnIsAlreadyActive) {
                btnIsClicked.classList.remove(
                    "outcome__button--active"
                ); /* удаляем активность кнопки */
                localStorage.removeItem(cardId);
                deleteFromLocalStorage(cardId);
                setActivebtn("");
                addMatchToBetslip(
                    JSON.parse(localStorage.getItem("activeSportCards"))
                );
                // Betslip.removeSelection(id); /* удаляем из корзины матч */
            } else {
                /* активна ли какая то кнопка  */
                const anyActiveBtn = evt.currentTarget.querySelector(
                    ".outcome__button--active"
                );
                if (anyActiveBtn) {
                    /* Betslip.removeSelection(id); */
                    deactivateActiveBtns(evt.currentTarget);
                    deleteFromLocalStorage(cardId);
                    localStorage.removeItem(cardId);
                    setActivebtn("");
                }
                btnIsClicked.classList.add("outcome__button--active");

                localStorage.setItem(
                    cardId,
                    `${btnIsClicked.dataset.chosen_outcome} ${btnIsClicked.dataset.name_outcome}`
                );

                addToLocalStorageArr(
                    cardData,
                    btnIsClicked.dataset.chosen_outcome,
                    btnIsClicked.dataset.name_outcome
                );
                addMatchToBetslip(
                    JSON.parse(localStorage.getItem("activeSportCards"))
                );
            }
        } else {
            // Перейти на Detail-event page

            const currentPath = props.location.pathname;
            const createdLinkName = `/${cardData.Id}`;

            props.history.push(currentPath + createdLinkName);
        }
    };

    return (
        <div className="sport-card" onClick={onCardClick}>
            {/* <!-- Спорт карточка --> */}
            <div className="sport-card__header">
                <div className="sport-card__leagueSpec">
                    <svg
                        className="sport-card__icon category__icon-svg category__icon-svg--active"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M21.026 18.267c-.112.104-.268.178-.42.248a3.742 3.742 0 0 0-.266-.754c-.126-.287-.235-.534-.224-.79.01-.218.252-.702.447-1.091.174-.349.34-.678.422-.949.244-.794.367-1.543.47-2.41.274-.252.569-.497.854-.733.149-.124.298-.247.445-.372.207.366.287.757.235 1.528-.118 1.764-.983 4.415-1.963 5.323zm-1.443.933c-.084.495-1.017 1.286-1.369 1.584l-.09.076c-.748.635-1.773 1.505-2.863 1.617-.744.075-1.408-.106-2.049-.28-.205-.057-.4-.11-.595-.154-.199-.436-.338-.941-.452-1.41 1.232-.71 2.204-1.683 3.144-2.625l.208-.207c1.124.126 2.476.027 3.67-.26.253.519.491 1.089.396 1.659zm-8.096.694c-.467.066-1.564-.327-2.132-.526l-.139-.048a8.306 8.306 0 0 1-1.86-.917c-.2-.457-.337-.97-.48-1.51l-.116-.425c-.059-.214-.14-.442-.22-.661-.177-.496-.361-1.01-.302-1.386.044-.276.754-.849 1.096-1.124.103-.082.196-.158.273-.223.424-.361.792-.636 1.147-.903.202-.152.399-.3.596-.455 1.025.375 2.076.743 3.094 1.099.417.146.835.291 1.251.438l.164.565c.307 1.055.624 2.144.88 3.269-.256.42-.653.746-1.108 1.119-.137.113-.277.227-.416.348a10.96 10.96 0 0 0-.37.344c-.392.376-.983.943-1.358.996zm-5.92-.256c-.098.09-.195.179-.291.27-2.086-.717-3.523-2.784-3.68-5.317-.008-.148-.025-.297-.042-.441-.03-.247-.06-.5-.024-.645.087-.349.395-.575.753-.837.159-.117.32-.235.47-.371.768.89 1.684 1.602 2.505 2.19.22 1.285.55 2.884 1.17 4.218-.226.353-.535.636-.86.933zM1.12 12.322c-.214-.813-.073-2.139.405-3.674.423-1.358 1.01-2.4 1.747-3.108.023.095.048.191.074.29.1.39.204.792.183 1.124-.02.318-.213.711-.417 1.128-.177.36-.36.731-.456 1.108-.093.36-.115.723-.136 1.074-.022.36-.043.702-.144.94-.112.264-.546.586-.895.844-.13.096-.252.187-.36.274zm3.171-7.56c.058-.212.405-.542.683-.807.133-.127.261-.25.366-.362.101-.11.2-.226.3-.341.268-.313.522-.608.81-.78.98-.59 2.328-.675 3.517-.751.301-.02.59-.038.866-.063l.138.526c.094.35.186.7.273 1.057C9.96 3.98 8.86 4.953 7.895 6.208a4.671 4.671 0 0 0-1.39-.187c-.691 0-1.445.114-2.059.305a7.001 7.001 0 0 0-.095-.49c-.084-.386-.157-.72-.06-1.075zm7.608-.72c1.433.064 3.038.798 4.213 1.335l.127.058c.233.54.491 1.146.643 1.783.024.101.05.207.078.315.154.614.33 1.309.215 1.844-.08.374-.684.87-1.126 1.232-.137.113-.265.219-.37.312a19.53 19.53 0 0 1-1.674 1.362c-.675-.215-1.34-.455-1.983-.688-.765-.277-1.553-.562-2.371-.81l-.123-.394c-.247-.798-.502-1.624-.707-2.488a7.557 7.557 0 0 0-.098-.357c-.054-.186-.144-.497-.132-.594.045-.347.687-.888 1.112-1.246.115-.096.224-.188.319-.272.635-.564 1.1-.959 1.764-1.31a.551.551 0 0 0 .113-.082zm-.03-.298v.297-.297zm6.827.351c2.324 1.532 3.083 2.621 3.31 3.27.13.377.486 2.442.344 3-.066.264-.348.44-.676.644-.205.127-.416.259-.595.427-.202-.171-.4-.35-.593-.523-.675-.607-1.37-1.233-2.317-1.621-.066-1.538-.37-2.874-.928-4.074a10.835 10.835 0 0 1 1.455-1.123zm3.538 1.66l.107.063-.166-.158a12.22 12.22 0 0 0-1.734-2.187C18 1.035 14.588-.244 11.21.04 7.214.372 4.98 2.11 3.322 3.767 1.252 5.835.042 8.8 0 11.903c-.04 3.07 1.066 5.905 3.196 8.195 2.129 2.29 4.726 3.586 7.717 3.854.359.032.723.048 1.08.048 3.018 0 6.029-1.18 8.262-3.24 2.356-2.173 3.65-5.17 3.74-8.669.057-2.169-.58-4.402-1.762-6.337z"
                        ></path>
                    </svg>
                    <div className="sport-card__leagueName">
                        {cardData.LeagueName}
                    </div>
                </div>

                <div className="sport-card__market-count">324</div>
            </div>
            <p className="sport-card__start-time--wrapper">
                <span className="sport-card__start-time">Starting in 32</span>
            </p>
            <p className="sport-card__team-paragraph sport-card__home-team-name">
                <span className="team__name">{cardData.HomeTeam}</span>
            </p>
            <p className="sport-card__team-paragraph sport-card__away-team-name">
                <span className="team__name">{cardData.AwayTeam}</span>
            </p>
            <div className="sport-card__btns-container">
                <button
                    className={
                        activebtn == "1 Match Result"
                            ? "button outcome__button button--large match-card__onethird-button outcome__button--active"
                            : "button outcome__button button--large match-card__onethird-button"
                    }
                    data-name_outcome="Match Result"
                    data-chosen_outcome="1"
                >
                    <div className="row">
                        {/* <!-- закладка название команды и коф --> */}
                        <span
                            className="button__text--text-1-total-2 row__child"
                            data-outcome="first-team"
                        >
                            {cardData.HomeTeam}
                        </span>
                        <span className="button__text--text-2-total-2 row__child">
                            <span
                                className=""
                                test-id="betslip-odd"
                                data-cof="first-team"
                            >
                                {dissectEventCoefiicient(
                                    cardData.Markets,
                                    "1",
                                    "Match Result"
                                ) || "NaN"}
                            </span>
                        </span>
                    </div>
                </button>
                <button
                    className={
                        activebtn == "X Match Result"
                            ? "button outcome__button button--large match-card__onethird-button outcome__button--active"
                            : "button outcome__button button--large match-card__onethird-button"
                    }
                    data-name_outcome="Match Result"
                    data-chosen_outcome="X"
                >
                    <div className="row">
                        <span
                            className="button__text--text-1-total-2 row__child"
                            data-outcome="draw"
                        >
                            Draw
                        </span>
                        <span className="button__text--text-2-total-2 row__child">
                            <span
                                className=""
                                test-id="betslip-odd"
                                data-cof="draw"
                            >
                                {dissectEventCoefiicient(
                                    cardData.Markets,
                                    "X",
                                    "Match Result"
                                ) || "NaN"}
                            </span>
                        </span>
                    </div>
                </button>
                <button
                    className={
                        activebtn == "2 Match Result"
                            ? "button outcome__button button--large match-card__onethird-button outcome__button--active"
                            : "button outcome__button button--large match-card__onethird-button"
                    }
                    data-name_outcome="Match Result"
                    data-chosen_outcome="2"
                >
                    <div className="row">
                        <span
                            className="button__text--text-1-total-2 row__child"
                            data-outcome="second-team"
                        >
                            {cardData.AwayTeam}
                        </span>
                        <span className="button__text--text-2-total-2 row__child">
                            <span
                                className=""
                                test-id="betslip-odd"
                                data-cof="second-team"
                            >
                                {dissectEventCoefiicient(
                                    cardData.Markets,
                                    "2",
                                    "Match Result"
                                ) || "NaN"}
                            </span>
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SportCard;
