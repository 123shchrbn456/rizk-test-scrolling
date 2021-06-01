import {
    ADD_MATCH_TO_BETSLIP,
    DELETE_MATCH_FROM_BETSLIP,
    CALCULATE_FINAL_STAKE_AMOUNT,
    SET_ZERO__FINAL_STAKE_AMOUNT,
    GET_PERFORMED_STAKES,
    BETSLIP_ERROR,
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case ADD_MATCH_TO_BETSLIP:
            return {
                ...state,
                betslipMatches: action.payload,
            };
        case DELETE_MATCH_FROM_BETSLIP:
            return {
                ...state,
                betslipMatches: state.betslipMatches.filter(
                    (betslipMatch) => betslipMatch.Id !== action.payload
                ),
            };
        case CALCULATE_FINAL_STAKE_AMOUNT:
            return {
                ...state,
                finalStakeAmount: state.finalStakeAmount + action.payload,
            };
        case SET_ZERO__FINAL_STAKE_AMOUNT:
            return {
                ...state,
                finalStakeAmount: 0,
            };
        case GET_PERFORMED_STAKES:
            return {
                ...state,
                performedStakes: action.payload,
            };
        case BETSLIP_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
