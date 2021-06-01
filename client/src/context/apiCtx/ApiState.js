import React, { useReducer } from "react";
import axios from "axios";
import ApiContext from "./apiContext";
import apiReducer from "./apiReducer";
import sportPopularLeagues from "../sportLeaguesIDs";
import tableSportNameToID from "../../utils/tableSportNameToID";
import {
    GET_SPORT_DATA,
    SET_POPULAR_LEAGUES_DATA,
    SET_CURRENT_PAGE_SPORT_TYPE_DATA,
    SET_CURRENT_PAGE_SPORT_LEAGUES_DATA,
    SET_CURRENT_PAGE_SPORT_EVENT_DATA,
    PUSH_ADDITIONAL_LEAGUE_ITEM,
    REMOVE_ADDITIONAL_LEAGUE_ITEM,
    PUSH_ADDITIONAL_SPORT_TYPE_ITEM,
    REMOVE_ADDITIONAL_SPORT_TYPE_ITEM,
    DELETE_API_MATCHES,
    ACTIVATE_BETSLIP,
} from "../types";

// фейковое API
import {
    POPULAR_LEAGUES_ARR,
    currentSportLeaguesData2,
    currentSportEventData2,
} from "./apiFakeData";

const ApiState = (props) => {
    const initialState = {
        sportsData: null,
        popularLeaguesData: null,
        currentSportTypeData: null,
        currentSportLeaguesData: null,
        currentSportEventData: null,
        additionalSportTypeItem: null,
        additionalLeagueItem: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(apiReducer, initialState);

    function getAllData(URLs) {
        return Promise.all(URLs.map(fetchData));
    }

    function fetchData(URL) {
        return axios
            .get(URL)
            .then(function (response) {
                // Условие: если пустой массив
                if (response.data.length < 1) {
                    return null;
                }

                // Как варик записывать в data только LeagueId или название лиги
                return {
                    date: response.data[0]["Date"],
                    leagueId: response.data[0]["LeagueId"],
                    sportId: response.data[0]["SportId"],
                    leagueName: response.data[0]["LeagueName"],
                    sportName: response.data[0]["SportName"],
                    regionName: response.data[0]["RegionName"],
                    leagueMatches: response.data,
                };
            })
            .catch(function (error) {
                console.error("Ошибка в Apis state.js:", error);
            });
    }

    // Получить популярные лиги
    const getPopularLeaguesData = () => {
        try {
            dispatch({
                type: SET_POPULAR_LEAGUES_DATA,
                payload: POPULAR_LEAGUES_ARR,
            });
        } catch (err) {
            console.error("Ошибка в ApiState.js, 122 line:", err);
        }
    };

    // Нажатие на ВИД спорта
    const getCurrentPageSportTypeData = async (currentPageSportType) => {
        try {
            const currentSportTypeData2 = {
                austria: {},
                ukraine: {},
                russia: {},
                poland: {},
                germany: {},
                italy: {},
                spain: {},
                austria: {},
                ukr1aine: {},
                russ2ia: {},
                polan3d: {},
                german4y: {},
                italy: {},
                sp5ain: {},
                aus6tria: {},
                ukra7ine: {},
                russi8a: {},
                pol9and: {},
                germ12any: {},
                ital13y: {},
                spa15in: {},
                a15ustria: {},
                ukraine: {},
                rus16sia: {},
                polan16d: {},
            };
            console.log(currentSportTypeData2);

            dispatch({
                type: SET_CURRENT_PAGE_SPORT_TYPE_DATA,
                payload: currentSportTypeData2,
            });
        } catch (err) {
            console.error("Ошибка в ApiState.js, 140 line:", err);
        }
    };

    // Нажатие на ЛИГУ спорта
    const getCurrentPageSportLeagueData = async (currentPageSportLeagues) => {
        try {
            dispatch({
                type: SET_CURRENT_PAGE_SPORT_LEAGUES_DATA,
                payload: currentSportLeaguesData2,
            });
        } catch (err) {
            console.error(
                "Ошибка в ApiState.js, getCurrentPageSportLeagueData:",
                err
            );
        }
    };

    // Нажатие на Спортивную карточку
    const getCurrentPageSportEventData = async (currentPageSportEvent) => {
        try {
            dispatch({
                type: SET_CURRENT_PAGE_SPORT_EVENT_DATA,
                payload: currentSportEventData2,
            });
        } catch (err) {
            console.error(
                "Ошибка в ApiState.js, getCurrentPageSportEventData:",
                err
            );
        }
    };

    const pushAdditionalLeagueItem = (leagueData) => {
        const nestedLeagueData = {
            leagueData: {
                sportName: leagueData.sportName,
                leagueId: leagueData.leagueId,
                isAdditional: leagueData.isAdditional,
            },
        };
        dispatch({
            type: PUSH_ADDITIONAL_LEAGUE_ITEM,
            payload: leagueData,
        });
    };

    const removeAdditionalLeagueItem = () => {
        dispatch({
            type: REMOVE_ADDITIONAL_LEAGUE_ITEM,
        });
    };

    const pushAdditionalSportTypeItem = (sportTypeName) => {
        dispatch({
            type: PUSH_ADDITIONAL_SPORT_TYPE_ITEM,
            payload: sportTypeName,
        });
    };

    const removeAdditionalSportTypeItem = () => {
        dispatch({
            type: REMOVE_ADDITIONAL_SPORT_TYPE_ITEM,
        });
    };

    return (
        <ApiContext.Provider
            value={{
                sportsData: state.sportsData,
                popularLeaguesData: state.popularLeaguesData,
                currentSportTypeData: state.currentSportTypeData,
                currentSportLeaguesData: state.currentSportLeaguesData,
                currentSportEventData: state.currentSportEventData,
                additionalSportTypeItem: state.additionalSportTypeItem,
                additionalLeagueItem: state.additionalLeagueItem,
                loading: state.loading,
                getPopularLeaguesData,
                getCurrentPageSportTypeData,
                getCurrentPageSportLeagueData,
                getCurrentPageSportEventData,
                pushAdditionalLeagueItem,
                removeAdditionalLeagueItem,
                pushAdditionalSportTypeItem,
                removeAdditionalSportTypeItem,
            }}
        >
            {props.children}
        </ApiContext.Provider>
    );
};

export default ApiState;
