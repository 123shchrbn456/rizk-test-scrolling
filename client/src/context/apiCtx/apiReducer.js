import {
    PUSH_ADDITIONAL_LEAGUE_ITEM,
    REMOVE_ADDITIONAL_LEAGUE_ITEM,
    PUSH_ADDITIONAL_SPORT_TYPE_ITEM,
    REMOVE_ADDITIONAL_SPORT_TYPE_ITEM,
    SET_POPULAR_LEAGUES_DATA,
    SET_CURRENT_PAGE_SPORT_TYPE_DATA,
    SET_CURRENT_PAGE_SPORT_LEAGUES_DATA,
    SET_CURRENT_PAGE_SPORT_EVENT_DATA,
    DELETE_API_MATCHES,
    ACTIVATE_BETSLIP,
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case SET_POPULAR_LEAGUES_DATA:
            return {
                ...state,
                popularLeaguesData: action.payload,
                loading: false,
            };
        case SET_CURRENT_PAGE_SPORT_TYPE_DATA:
            return {
                ...state,
                currentSportTypeData: action.payload,
                loading: false,
            };
        case SET_CURRENT_PAGE_SPORT_LEAGUES_DATA:
            return {
                ...state,
                currentSportLeaguesData: action.payload,
                loading: false,
            };
        case SET_CURRENT_PAGE_SPORT_EVENT_DATA:
            return {
                ...state,
                currentSportEventData: action.payload,
                loading: false,
            };
        case PUSH_ADDITIONAL_LEAGUE_ITEM:
            return {
                ...state,
                additionalLeagueItem: action.payload,
            };
        case REMOVE_ADDITIONAL_LEAGUE_ITEM:
            return {
                ...state,
                additionalLeagueItem: null,
            };
        case PUSH_ADDITIONAL_SPORT_TYPE_ITEM:
            return {
                ...state,
                additionalSportTypeItem: action.payload,
            };
        case REMOVE_ADDITIONAL_SPORT_TYPE_ITEM:
            return {
                ...state,
                additionalSportTypeItem: null,
            };

        default:
            return state;
    }
};
