import React, { useEffect } from "react";
import SportCard from "./SportCard";
import SportEventPageCard from "./SportEventPageCard";
import toggleAccordion from "../utils/toggleAccordion";

const Accordion = (props) => {
    const {
        accordionHeadline,
        sportMatchesArr,
        eventMarketsArr,
        cardData,
    } = props;

    const uniqueId = function () {
        return Math.floor(Math.random() * 1000);
    };

    const onTitleClick = (evt) => {
        evt.preventDefault();
        var accordion = evt.target.closest(".accordion");

        if (!accordion) return;

        toggleAccordion(accordion);
    };

    return (
        <section className="accordion">
            <div className="accordion__title" onClick={onTitleClick}>
                <div className="accordion-title__text">{accordionHeadline}</div>
                <span className="icon accordion-title__icon--arrow ">
                    <span>
                        <svg
                            className="icon__svg"
                            width="13px"
                            height="6px"
                            viewBox="0 0 13 6"
                            version="1.1"
                        >
                            <polygon
                                id="path-1"
                                points="0 0 12 0 6 6"
                            ></polygon>
                        </svg>
                    </span>
                </span>
            </div>
            <div className="accordion__inner-content accordion-isVisible">
                <div className="card-list__cards">
                    {sportMatchesArr
                        ? sportMatchesArr.map((leagueItem) => (
                              <SportCard
                                  {...props}
                                  key={uniqueId()}
                                  cardData={leagueItem}
                              />
                          ))
                        : eventMarketsArr.map((item) => (
                              <SportEventPageCard
                                  eventMarketData={item}
                                  cardData={cardData}
                                  key={uniqueId()}
                              />
                          ))}
                </div>
            </div>
        </section>
    );
};

export default Accordion;
