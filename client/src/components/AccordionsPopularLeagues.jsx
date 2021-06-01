import React, { Fragment, useEffect } from "react";
import SingleAccordion from "./SingleAccordion";
import SportCard from "./SportCard";

import createFullDate from "../utils/createFullDate";

const Accordions = (props) => {
    const { leagueData } = props;
    // функция получения массивов матчей по отдельным дням
    const getTimeDividedSportDataObj = function (sportDataArr) {
        var timeDividedData = sportDataArr.reduce(function (obj, item) {
            var dateHeadline = createDateAccordionHeadlineName(item.Date);

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
        return Math.floor(Math.random() * 1000);
    };

    // var dateDividedSportDataObj = getTimeDividedSportDataObj(leagueData);
    // var dateDividedArr = Object.keys(dateDividedSportDataObj);

    return (
        <Fragment>
            {leagueData.map((leagueDataItem) => (
                <SingleAccordion
                    {...props}
                    key={uniqueId()}
                    accordionHeadline={leagueDataItem.leagueName}
                    sportMatchesArr={leagueDataItem.leagueMatches}
                ></SingleAccordion>
            ))}
        </Fragment>
        // <Fragment>
        //     {dateDividedArr.map((item) => (
        //         <SingleAccordion
        //             key={uniqueId()}
        //             accordionHeadline={item}
        //             sportMatchesArr={dateDividedSportDataObj[item]}
        //         ></SingleAccordion>
        //     ))}
        // </Fragment>
    );
};

export default Accordions;
