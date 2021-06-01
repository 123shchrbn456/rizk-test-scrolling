import React, { Fragment, useEffect, useContext } from "react";

import MobileMenus from "../layout/MobileMenus";
import PrimaryNavigationItem from "../PrimaryNavigationItem";
import PrimaryAddingNavigationItem from "../PrimaryAddingNavigationItem";
import SecondaryNavigationItem from "../SecondaryNavigationItem";
import SecondaryAddingNavigationItem from "../SecondaryAddingNavigationItem";

import AccordionsPopularLeagues from "../AccordionsPopularLeagues";
import Accordions from "../Accordions";
import SportEventPage from "../SportEventPage";

import BrowseSportTypePopUp from "../BrowseSportTypePopUp";
import BrowseLeaguePopUp from "../BrowseLeaguePopUp";
import Betslip from "../betslip/Betslip";

import ApiContext from "../../context/apiCtx/apiContext";
import BetslipContext from "../../context/betslip/betslipContext";
import AuthContext from "../../context/auth/authContext";

const Home = (props) => {
    const apiContext = useContext(ApiContext);
    const betslipContext = useContext(BetslipContext);
    const authContext = useContext(AuthContext);

    const {
        getPopularLeaguesData,
        getCurrentPageSportTypeData,
        getCurrentPageSportLeagueData,
        getCurrentPageSportEventData,
        sportsData,
        popularLeaguesData,
        currentSportTypeData,
        currentSportLeaguesData,
        currentSportEventData,
        additionalSportTypeItem,
        additionalLeagueItem,
        loading,
    } = apiContext;

    const { betslipMatches, addMatchToBetslip } = betslipContext;

    // Узнаем какие есть параметы в URL
    const currentPageSportType = props.match.params.sportType;
    const currentPageSportLeague = props.match.params.sportLeague;
    const currentPageSportEvent = props.match.params.sportEvent;

    // if (!loading && currentPageSportEvent) {
    //     eventPageObject = sportsData[currentPageSportType][
    //         currentPageSportLeague
    //     ].find((elem) => elem.Id == currentPageSportEvent);
    // }

    useEffect(() => {
        // authContext.loadUser();
        // eslint-disable-next-line
        getPopularLeaguesData();
        addMatchToBetslip(JSON.parse(localStorage.getItem("activeSportCards")));
    }, []);

    useEffect(() => {
        if (currentPageSportType)
            getCurrentPageSportTypeData(currentPageSportType);
        if (currentPageSportLeague)
            getCurrentPageSportLeagueData(currentPageSportLeague);
        if (currentPageSportEvent)
            getCurrentPageSportEventData(currentPageSportEvent);
    }, [currentPageSportType, currentPageSportLeague, currentPageSportEvent]);

    return (
        <Fragment>
            <main className="all-content" id="all-content">
                <MobileMenus />
                <section id="main-content" className="main-content">
                    <div className="primary-navigation__container">
                        <ul className="primary-navigation__list">
                            <PrimaryNavigationItem sportName={"Главная"} />
                            <PrimaryNavigationItem sportName={"Поиск"} />
                            <PrimaryNavigationItem sportName={"football"} />
                            <PrimaryNavigationItem sportName={"tennis"} />
                            <PrimaryNavigationItem sportName={"basketball"} />
                            <PrimaryNavigationItem sportName={"icehockey"} />
                            {/* Дополнительный Вид спорта */}
                            {additionalSportTypeItem !== null && (
                                <PrimaryNavigationItem
                                    sportName={additionalSportTypeItem}
                                />
                            )}
                            <PrimaryAddingNavigationItem />
                        </ul>
                    </div>
                    <div className="secondary-navigation__container">
                        <ul className="secondary-navigation__list">
                            {popularLeaguesData &&
                                loading !== true &&
                                popularLeaguesData.map((item) => (
                                    <SecondaryNavigationItem
                                        key={item.leagueId}
                                        leagueData={item}
                                    />
                                ))}

                            {additionalLeagueItem && loading !== true && (
                                <SecondaryNavigationItem
                                    leagueData={additionalLeagueItem}
                                />
                            )}

                            {/* Доработать с юзеффекта запрос с currentPageSportLeague , поместить его в стейт,  */}
                            {/* {popularLeaguesData &&
                                currentPageSportLeague &&
                                loading !== true &&
                                HADMSDMSDMSDMSDMSDM.map((item) => (
                                    <SecondaryNavigationItem
                                        key={item.leagueId}
                                        leagueData={item}
                                    />
                                ))} */}

                            {currentPageSportType && (
                                <SecondaryAddingNavigationItem />
                            )}
                        </ul>
                    </div>

                    {/* Отображаем аккордеоны выбранной спорт-лиги */}

                    {popularLeaguesData &&
                        !currentPageSportLeague &&
                        loading !== true && (
                            <div className="accordions-container">
                                <AccordionsPopularLeagues
                                    {...props}
                                    leagueData={popularLeaguesData}
                                />
                            </div>
                        )}

                    {currentPageSportLeague &&
                        !currentPageSportEvent &&
                        currentSportLeaguesData &&
                        loading !== true && (
                            <div className="accordions-container">
                                <Accordions
                                    {...props}
                                    leagueData={currentSportLeaguesData}
                                />
                            </div>
                        )}
                    {/* {!currentPageSportEvent &&
                    currentPageSportLeague &&
                    loading !== true ? (
                        <div className="accordions-container">
                            <Accordions
                                leagueData={
                                    sportsData[currentPageSportType][
                                        currentPageSportLeague
                                    ]
                                }
                            />
                        </div>
                    ) : (
                        ""
                    )} */}

                    {/* Отображаем подробную табличку конкретного Event-a */}

                    {currentPageSportEvent &&
                        currentSportEventData &&
                        loading !== true && (
                            <section className="event-page-container">
                                <SportEventPage
                                    cardData={currentSportEventData}
                                />
                            </section>
                        )}
                </section>
            </main>

            {/* Модальное окно добавления Вида спорта */}
            <BrowseSportTypePopUp />

            {/* Модальное окно добавления лиги */}
            {currentPageSportType &&
                currentSportTypeData &&
                loading !== true && (
                    <BrowseLeaguePopUp
                        {...props}
                        currentSportTypeData={currentSportTypeData}
                    />
                )}

            {/* Отображаем корзину */}
            {betslipMatches && betslipMatches.length ? <Betslip /> : ""}
        </Fragment>
    );
};

export default Home;
