import React, { useContext } from "react";

import ApiContext from "../context/apiCtx/apiContext";

const BrowseLeaguePopUpItem = ({ headline, leagueData }) => {
    const apiContext = useContext(ApiContext);

    const { pushAdditionalLeagueItem, removeAdditionalLeagueItem } = apiContext;

    const uniqueId = function () {
        return Math.floor(Math.random() * 100000);
    };

    const onClick = (leagueDataArr) => {
        const leagueData = leagueDataArr[0];
        // не исключено что нужно внутрь обьекта поместить еще обьект leagueData
        const newLeagueData = {
            sportName: leagueData.SportName,
            leagueId: leagueData.LeagueId,
            leagueName: leagueData.LeagueName,
            isAdditional: true,
        };
        return function (evt) {
            // удаляем из api state
            removeAdditionalLeagueItem();
            // добавляем в api state
            pushAdditionalLeagueItem(newLeagueData);
            // закрываем попап
            // prettier-ignore
            document.querySelector(".popup-browse__sport-league .popup-browse__close-btn").click();

            const qwe = document.querySelector(
                ".secondary-navigation__list-item.isAdditional"
            );
            console.log(qwe);
        };
    };

    // добавляем класс для открытия под категории с помощью CSS
    const onCountryClick = (evt) => {
        evt.target.classList.toggle("activated");
    };

    return (
        <li className="sports-categories__item" onClick={onCountryClick}>
            {headline}
            <ul className="sports-categories__sub-category-list">
                {Object.keys(leagueData).map((leagueName) => (
                    <li
                        key={uniqueId()}
                        className="sports-categories__item"
                        onClick={onClick(leagueData[leagueName])}
                    >
                        {leagueName}
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default BrowseLeaguePopUpItem;
