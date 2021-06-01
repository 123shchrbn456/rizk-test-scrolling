import React, { useEffect, Fragment, useState } from "react";
import SingleAccordion from "./SingleAccordion";

const SportEventPage = ({ cardData }) => {
    const [sortedMarkets, setSortedMarkets] = useState({});

    useEffect(() => {
        if (cardData) {
            const marketsArray = cardData[0].Markets;
            const sortedMarketsObj = createBetCategoriesObject(marketsArray);
            setSortedMarkets(sortedMarketsObj);
        }
    }, [cardData]);

    const uniqueId = function () {
        return Math.floor(Math.random() * 100000);
    };

    function createBetCategoriesObject(marketsArray) {
        const finalObject = marketsArray.reduce(function (obj, item) {
            const nameOfBet = item.name.value;
            const categoryOfBet = createBetCategoryHeadline(nameOfBet);

            if (!obj[categoryOfBet]) {
                obj[categoryOfBet] = [];
            }
            obj[categoryOfBet].push(item);
            return obj;
        }, {});
        return finalObject;
    }

    function createBetCategoryHeadline(nameOfBet) {
        const main = [
            "Match Result",
            "Total Goals - Over/Under",
            "Double Chance",
            "Both Teams to Score",
            "Match Result and Both Teams to Score",
            "Draw No Bet",
            "1st Goal",
            "1X2 and Over/Under 2,5",
            "Half Time result",
        ];

        const handicaps = ["Handicap 0:1", "Handicap 1:0"];

        const goalAmounts = [
            "Total Goals O/U - 1st Half",
            "Total Goals O/U - 1st Half",
            "Total Goals O/U - 1st Half",
            "Total Goals O/U - 1st Half",
            "Total Goals O/U - 2nd Half",
            "Total Goals O/U - 2nd Half",
            "Total Goals O/U - 2nd Half",
            "Total Goals O/U - 2nd Half",
            "Total Goals - Over/Under",
            "Total Goals - Over/Under",
            "Total Goals - Over/Under",
            "Total Goals - Over/Under",
            "Total Goals - Over/Under",
        ];

        const preciseGoalsResult = [];

        const findedInMain = main.indexOf(nameOfBet) !== -1 && "findedInMain";
        const findedInHandicaps =
            handicaps.indexOf(nameOfBet) !== -1 && "findedInHandicaps";
        const findedInGoalAmounts =
            goalAmounts.indexOf(nameOfBet) !== -1 && "findedInGoalAmounts";

        const result = findedInMain || findedInHandicaps || findedInGoalAmounts;

        const translateIntoRussian = {
            findedInMain: "Основные",
            findedInHandicaps: "Гандикапы",
            findedInGoalAmounts: "Количество голов",
            preciseGoalsResult: "Точный счет",
        };
        return translateIntoRussian[result];
    }

    return (
        <Fragment>
            <div className="event-page__card sport-card">
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
                            {cardData[0].LeagueName}
                        </div>
                    </div>
                    <span className="sport-card__start-time">
                        Starting in 32
                    </span>
                </div>
                <p className="sport-card__team-paragraph sport-card__home-team-name">
                    <span className="team__name">{cardData[0].HomeTeam}</span>
                </p>
                <p className="sport-card__team-paragraph sport-card__away-team-name">
                    <span className="team__name">{cardData[0].AwayTeam}</span>
                </p>
            </div>
            <div className="accordions-container">
                {Object.keys(sortedMarkets).map((singleMarketObj) => (
                    <SingleAccordion
                        accordionHeadline={singleMarketObj}
                        eventMarketsArr={sortedMarkets[singleMarketObj]}
                        cardData={cardData[0]}
                        key={uniqueId()}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default SportEventPage;
