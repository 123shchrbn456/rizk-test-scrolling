import React, { useState, useContext, useEffect } from "react";
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

/* {











    
} */

// Компонент
const SportEventPageCard = ({ eventMarketData, cardData }) => {
    // закладка
    // console.log("eventMarketData", eventMarketData);

    // сделать универсальный OnCardClick как для SportCard так и для SportEventPageCard,
    const [activebtn, setActivebtn] = useState("");

    const betslipContext = useContext(BetslipContext);
    let { addMatchToBetslip } = betslipContext;

    useEffect(() => {
        const db = localStorage.getItem(cardData.Id);
        setActivebtn(db);
    }, []);

    const uniqueId = function () {
        return Math.floor(Math.random() * 1000);
    };

    // Удаляем активный класс со всех спорт-кнопок
    const deactivateActiveBtns = (accordionsContainer) => {
        let activeBtns = accordionsContainer.querySelectorAll(
            ".outcome__button--active"
        );
        activeBtns.forEach((activeBtn) =>
            activeBtn.classList.remove("outcome__button--active")
        );
    };

    const onCardClick = (evt) => {
        console.dir(evt.target.closest(".accordions-container"));
        const btnIsClicked = evt.target.closest(".outcome__button ");

        if (btnIsClicked) {
            const cardId = cardData.Id;
            /* выясняем наличине активного класа */
            const btnIsAlreadyActive = btnIsClicked.classList.contains(
                "outcome__button--active"
            );

            // Если нажатая кнопка была активна
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
                const accordionsContainer = evt.target.closest(
                    ".accordions-container"
                );
                const anyActiveBtn = accordionsContainer.querySelector(
                    ".outcome__button--active"
                );
                if (anyActiveBtn) {
                    /* Betslip.removeSelection(id); */
                    deactivateActiveBtns(accordionsContainer);
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
        }
    };

    return (
        <div className="event-markets__wrap sport-card">
            <div className="event-markets-header__header">
                <h2>{eventMarketData.name.value}</h2>
            </div>
            <div className="sport-card__btns-container" onClick={onCardClick}>
                {/* Карточка на 3 исхода */}
                {eventMarketData.results.length === 3 &&
                    eventMarketData.results.map((result) => (
                        <button
                            className={
                                activebtn ==
                                `${result.name.value} ${eventMarketData.name.value}`
                                    ? "button outcome__button button--large match-card__onethird-button outcome__button--active"
                                    : "button outcome__button button--large match-card__onethird-button"
                            }
                            data-name_outcome={eventMarketData.name.value}
                            data-chosen_outcome={result.name.value}
                            key={uniqueId()}
                        >
                            <div className="row">
                                {/* <!-- закладка название команды и коф --> */}
                                <span className="button__text--text-1-total-2 row__child">
                                    {result.name.value}
                                </span>
                                <span className="button__text--text-2-total-2 row__child">
                                    <span className="" test-id="betslip-odd">
                                        {result.odds}
                                    </span>
                                </span>
                            </div>
                        </button>
                    ))}

                {/* Карточка на 2 исхода */}
                {eventMarketData.results.length === 2 &&
                    eventMarketData.results.map((result) => (
                        <button
                            className={
                                activebtn ==
                                `${result.name.value} ${eventMarketData.name.value}`
                                    ? "button outcome__button button--large match-card__half-button outcome__button--active"
                                    : "button outcome__button button--large match-card__half-button"
                            }
                            data-name_outcome={eventMarketData.name.value}
                            data-chosen_outcome={result.name.value}
                            key={uniqueId()}
                        >
                            <div className="row">
                                {/* <!-- закладка название команды и коф --> */}
                                <span className="button__text--text-1-total-2 row__child">
                                    {result.name.value}
                                </span>
                                <span className="button__text--text-2-total-2 row__child">
                                    <span className="" test-id="betslip-odd">
                                        {result.odds}
                                    </span>
                                </span>
                            </div>
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default SportEventPageCard;
