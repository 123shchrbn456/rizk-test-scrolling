import React, { useReducer } from "react";
import axios from "axios";
import BetslipContext from "./betslipContext";
import betslipReducer from "./betslipReducer";

import {
    ADD_MATCH_TO_BETSLIP,
    DELETE_MATCH_FROM_BETSLIP,
    CALCULATE_FINAL_STAKE_AMOUNT,
    SET_ZERO__FINAL_STAKE_AMOUNT,
    GET_PERFORMED_STAKES,
    BETSLIP_ERROR,
} from "../types";

const BetslipState = (props) => {
    const initialState = {
        firstAddedMatch: null,
        betslipMatches: null,
        finalStakeAmount: 0,
        performedStakes: null,
        error: null,
    };

    const [state, dispatch] = useReducer(betslipReducer, initialState);

    // Add Match
    const addMatchToBetslip = (matchData) => {
        dispatch({ type: ADD_MATCH_TO_BETSLIP, payload: matchData });
    };

    // Delete Match
    const deleteMatchFromBetslip = (matchId) => {
        dispatch({ type: DELETE_MATCH_FROM_BETSLIP, payload: matchId });
    };

    const calculateFinalStakeAmount = (number) => {
        dispatch({ type: CALCULATE_FINAL_STAKE_AMOUNT, payload: number });
    };

    const setZeroFinalStakeAmount = () => {
        dispatch({ type: SET_ZERO__FINAL_STAKE_AMOUNT });
    };

    // Получить все сделанные ставки
    const getPerformedStakes = async () => {
        console.log("woriking2");
        try {
            const res = await axios.get("/api/betslip");
            // console.log("REZULT", res);
            dispatch({ type: GET_PERFORMED_STAKES, payload: res.data });
        } catch (err) {
            dispatch({ type: BETSLIP_ERROR, payload: err.response.msg });
        }
    };

    return (
        <BetslipContext.Provider
            value={{
                firstAddedMatch: state.firstAddedMatch,
                betslipMatches: state.betslipMatches,
                finalStakeAmount: state.finalStakeAmount,
                performedStakes: state.performedStakes,
                error: state.error,
                addMatchToBetslip,
                deleteMatchFromBetslip,
                calculateFinalStakeAmount,
                setZeroFinalStakeAmount,
                getPerformedStakes,
            }}
        >
            {props.children}
        </BetslipContext.Provider>
    );
};

export default BetslipState;
