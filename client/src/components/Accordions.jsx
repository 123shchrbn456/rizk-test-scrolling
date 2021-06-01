import React, { Fragment, useEffect } from "react";
import SingleAccordion from "./SingleAccordion";

import createFullDate from "../utils/createFullDate";

const Accordions = (props) => {
    let { leagueData } = props;
    leagueData = leagueData.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    // console.log("Инфа из Accordions.js:", leagueData);

    // функция получения массивов матчей по отдельным дням
    const getTimeDividedSportDataObj = function (sportDataArr) {
        const timeDividedData = sportDataArr.reduce(function (obj, item) {
            var matchDate = item.Date;
            var dateHeadline = createDateAccordionHeadlineName(matchDate);

            if (!obj[dateHeadline]) {
                obj[dateHeadline] = [];
            }
            obj[dateHeadline].push(item);
            return obj;
        }, {});
        return timeDividedData;
    };

    // функция создания заголовка аккордеона
    const createDateAccordionHeadlineName = function (matchDate) {
        var matchTime = new Date(matchDate);
        var dateOfMatch = matchTime.getDate();
        var dayOfMatch = matchTime.getDay();
        var monthOfMatch = matchTime.getMonth();
        var fullDate = createFullDate(dateOfMatch, monthOfMatch, dayOfMatch);
        return fullDate;
    };

    const uniqueId = function () {
        return Math.floor(Math.random() * 100000);
    };

    var dateDividedSportDataObj = getTimeDividedSportDataObj(leagueData);
    var dateDividedArr = Object.keys(dateDividedSportDataObj);

    return (
        <Fragment>
            {dateDividedArr.map((item) => (
                <SingleAccordion
                    {...props}
                    key={uniqueId()}
                    accordionHeadline={item}
                    sportMatchesArr={dateDividedSportDataObj[item]}
                ></SingleAccordion>
            ))}
        </Fragment>
    );
};

export default Accordions;
