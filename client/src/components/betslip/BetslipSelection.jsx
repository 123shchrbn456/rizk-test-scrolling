import { set } from "mongoose";
import React, { useContext, useEffect, useState } from "react";
import BetslipContext from "../../context/betslip/betslipContext";
import dissectEventCoefiicient from "../../utils/dissectEventCoefiicient";

function deleteFromLocalStorage(cardId) {
    let localStorageData = JSON.parse(localStorage.getItem("activeSportCards"));
    localStorageData = localStorageData.filter(
        (item) => item.Id.toString() !== cardId.toString()
    );
    localStorage.setItem("activeSportCards", JSON.stringify(localStorageData));
}

function improveBetName(matchData) {
    if (matchData.chosenOutcome === "1") {
        return matchData.HomeTeam;
    }

    if (matchData.chosenOutcome === "2") {
        return matchData.AwayTeam;
    }

    if (matchData.chosenOutcome === "X") {
        return "Draw";
    }

    return matchData.chosenOutcome;
}

// Компонент
const BetslipSelection = ({ matchData }) => {
    const [betStake, setBetStake] = useState("");

    const betslipContext = useContext(BetslipContext);
    const {
        deleteMatchFromBetslip,
        calculateFinalStakeAmount,
    } = betslipContext;

    useEffect(() => {
        setBetStake(15);
        calculateFinalStakeAmount(15);
    }, []);

    const onChange = (evt) => {
        const betAmount = evt.target.value;
        setBetStake(betAmount);
        calculateFinalStakeAmount(betAmount);
    };

    const onSelectionClose = () => {
        deleteFromLocalStorage(matchData.Id);
        localStorage.removeItem(matchData.Id);
        deleteMatchFromBetslip(matchData.Id);
    };

    return (
        <div className="selection__container">
            <div className="selection">
                <div className="row selection__title">
                    <span className="selection__sport-icon row__child icon__tooltipContainer icon__tooltipContainer">
                        <span>
                            <svg
                                className="selection__sport-icon-svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M21.026 18.267c-.112.104-.268.178-.42.248a3.742 3.742 0 0 0-.266-.754c-.126-.287-.235-.534-.224-.79.01-.218.252-.702.447-1.091.174-.349.34-.678.422-.949.244-.794.367-1.543.47-2.41.274-.252.569-.497.854-.733.149-.124.298-.247.445-.372.207.366.287.757.235 1.528-.118 1.764-.983 4.415-1.963 5.323zm-1.443.933c-.084.495-1.017 1.286-1.369 1.584l-.09.076c-.748.635-1.773 1.505-2.863 1.617-.744.075-1.408-.106-2.049-.28-.205-.057-.4-.11-.595-.154-.199-.436-.338-.941-.452-1.41 1.232-.71 2.204-1.683 3.144-2.625l.208-.207c1.124.126 2.476.027 3.67-.26.253.519.491 1.089.396 1.659zm-8.096.694c-.467.066-1.564-.327-2.132-.526l-.139-.048a8.306 8.306 0 0 1-1.86-.917c-.2-.457-.337-.97-.48-1.51l-.116-.425c-.059-.214-.14-.442-.22-.661-.177-.496-.361-1.01-.302-1.386.044-.276.754-.849 1.096-1.124.103-.082.196-.158.273-.223.424-.361.792-.636 1.147-.903.202-.152.399-.3.596-.455 1.025.375 2.076.743 3.094 1.099.417.146.835.291 1.251.438l.164.565c.307 1.055.624 2.144.88 3.269-.256.42-.653.746-1.108 1.119-.137.113-.277.227-.416.348a10.96 10.96 0 0 0-.37.344c-.392.376-.983.943-1.358.996zm-5.92-.256c-.098.09-.195.179-.291.27-2.086-.717-3.523-2.784-3.68-5.317-.008-.148-.025-.297-.042-.441-.03-.247-.06-.5-.024-.645.087-.349.395-.575.753-.837.159-.117.32-.235.47-.371.768.89 1.684 1.602 2.505 2.19.22 1.285.55 2.884 1.17 4.218-.226.353-.535.636-.86.933zM1.12 12.322c-.214-.813-.073-2.139.405-3.674.423-1.358 1.01-2.4 1.747-3.108.023.095.048.191.074.29.1.39.204.792.183 1.124-.02.318-.213.711-.417 1.128-.177.36-.36.731-.456 1.108-.093.36-.115.723-.136 1.074-.022.36-.043.702-.144.94-.112.264-.546.586-.895.844-.13.096-.252.187-.36.274zm3.171-7.56c.058-.212.405-.542.683-.807.133-.127.261-.25.366-.362.101-.11.2-.226.3-.341.268-.313.522-.608.81-.78.98-.59 2.328-.675 3.517-.751.301-.02.59-.038.866-.063l.138.526c.094.35.186.7.273 1.057C9.96 3.98 8.86 4.953 7.895 6.208a4.671 4.671 0 0 0-1.39-.187c-.691 0-1.445.114-2.059.305a7.001 7.001 0 0 0-.095-.49c-.084-.386-.157-.72-.06-1.075zm7.608-.72c1.433.064 3.038.798 4.213 1.335l.127.058c.233.54.491 1.146.643 1.783.024.101.05.207.078.315.154.614.33 1.309.215 1.844-.08.374-.684.87-1.126 1.232-.137.113-.265.219-.37.312a19.53 19.53 0 0 1-1.674 1.362c-.675-.215-1.34-.455-1.983-.688-.765-.277-1.553-.562-2.371-.81l-.123-.394c-.247-.798-.502-1.624-.707-2.488a7.557 7.557 0 0 0-.098-.357c-.054-.186-.144-.497-.132-.594.045-.347.687-.888 1.112-1.246.115-.096.224-.188.319-.272.635-.564 1.1-.959 1.764-1.31a.551.551 0 0 0 .113-.082zm-.03-.298v.297-.297zm6.827.351c2.324 1.532 3.083 2.621 3.31 3.27.13.377.486 2.442.344 3-.066.264-.348.44-.676.644-.205.127-.416.259-.595.427-.202-.171-.4-.35-.593-.523-.675-.607-1.37-1.233-2.317-1.621-.066-1.538-.37-2.874-.928-4.074a10.835 10.835 0 0 1 1.455-1.123zm3.538 1.66l.107.063-.166-.158a12.22 12.22 0 0 0-1.734-2.187C18 1.035 14.588-.244 11.21.04 7.214.372 4.98 2.11 3.322 3.767 1.252 5.835.042 8.8 0 11.903c-.04 3.07 1.066 5.905 3.196 8.195 2.129 2.29 4.726 3.586 7.717 3.854.359.032.723.048 1.08.048 3.018 0 6.029-1.18 8.262-3.24 2.356-2.173 3.65-5.17 3.74-8.669.057-2.169-.58-4.402-1.762-6.337z"
                                />
                            </svg>
                            <span className="selection__tooltip icon__tooltipContent">
                                {matchData.SportName}
                            </span>
                        </span>
                    </span>
                    <span className="selection__event_name row__child">
                        {matchData.HomeTeam + " vs " + matchData.AwayTeam}
                    </span>
                    <span
                        className="selection__close row__child"
                        onClick={onSelectionClose}
                    >
                        <span>
                            <svg
                                className="selection__close-icon"
                                viewBox="0 0 21.9 21.9"
                            >
                                <path
                                    id="a"
                                    d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"
                                />
                            </svg>
                        </span>
                    </span>
                </div>
                <div>
                    <div className="selection__market_name">
                        {matchData.nameOutcome}
                    </div>
                    <div className="row selection__outcome">
                        <span className="selection__outcome_name">
                            {improveBetName(matchData)}
                        </span>
                        <span>
                            <span className="odd__value">
                                <span>{matchData.chosenOutcomeCoeff}</span>
                            </span>
                        </span>
                    </div>
                </div>
                <div className="selection__bet-buttons row">
                    <div className="row__child text-input disabled-bet-suggestions">
                        <span className="text-input__label--inside text-input__label text-input__label--disabled-bet-suggestions">
                            $
                        </span>
                        <input
                            name={`bet-ordinar:${matchData.HomeTeam} vs ${matchData.AwayTeam}; 
                                   Name of outcome:${matchData.nameOutcome};
                                   Coefficicent of outcome: ${matchData.chosenOutcomeCoeff}`}
                            type="number"
                            className="text-input__control bet-input-amount"
                            placeholder=""
                            value={betStake}
                            onChange={onChange}
                        />
                    </div>
                    <button
                        className="button european-selection__button row__child"
                        onClick={() => {
                            setBetStake(20);
                            calculateFinalStakeAmount(20);
                        }}
                    >
                        $20.00
                    </button>
                    <button
                        className="button european-selection__button row__child"
                        onClick={() => {
                            setBetStake(30);
                            calculateFinalStakeAmount(20);
                        }}
                    >
                        $30.00
                    </button>
                </div>
            </div>

            <div className="selection__separator">
                <span className="selection__separator--svg ">
                    <span>
                        <svg
                            className="icon__svg"
                            width="354px"
                            height="12px"
                            viewBox="0 0 354 12"
                            version="1.1"
                        >
                            <g
                                id="Bet-Slip"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            >
                                <g
                                    id="Betslip-375-bet-placed"
                                    transform="translate(-11.000000, -188.000000)"
                                >
                                    <g
                                        id="Group-2"
                                        transform="translate(11.000000, 188.000000)"
                                    >
                                        <g id="Group">
                                            <g
                                                id="rizk-seperator"
                                                transform="translate(0.000000, 0.159275)"
                                            >
                                                <path
                                                    fill="#393939"
                                                    stroke="#393939"
                                                    className="seperator-line"
                                                    d="M0.5,5.34072542 L149.600006,5.34072542"
                                                    id="Line-2"
                                                    strokeLinecap="square"
                                                />
                                                <path
                                                    fill="#393939"
                                                    stroke="#393939"
                                                    className="seperator-line"
                                                    d="M203.5,5.34072542 L352.600006,5.34072542"
                                                    id="Line-2"
                                                    strokeLinecap="square"
                                                />
                                                <path
                                                    fill="#393939"
                                                    stroke="none"
                                                    className="seperator-text"
                                                    d="M164.77602,4.54364746 C163.86522,4.59103729 163.38422,4.62541017 163.26602,4.63151186 C163.49022,3.95890169 163.71562,3.28547797 163.94302,2.61246102 C164.34162,2.60168136 164.74162,2.58581695 165.14022,2.58581695 C166.27922,2.58581695 166.18062,4.47042712 164.77602,4.54364746 M166.14822,0.0477152542 L157.85202,0.0477152542 C158.62722,0.680257627 160.15602,1.91727458 160.15082,1.93334237 C160.07582,2.15971525 157.25302,10.9750373 157.00002,11.7965288 C158.36962,11.5831729 159.74102,11.3850712 161.11402,11.2032407 C161.52802,9.91008814 161.94682,8.61612203 162.37042,7.32093559 C162.76482,8.51096949 163.16302,9.70161356 163.56982,10.8922576 C164.81882,10.7452068 166.06862,10.6085288 167.31962,10.4818169 C166.89462,9.3007322 166.06382,6.93835932 166.06382,6.93835932 C169.70102,6.43130847 171.86062,0.0477152542 166.14822,0.0477152542"
                                                    id="Fill-1"
                                                />
                                                <path
                                                    fill="#393939"
                                                    stroke="none"
                                                    className="seperator-text"
                                                    d="M171.7684,0.0476135593 C171.7662,0.0533084746 171.7642,0.0594101695 171.762,0.0653084746 C171.4742,0.837579661 168.3168,9.55263051 168.0138,10.4148 C169.3868,10.2836136 170.7606,10.1684949 172.1348,10.0700542 C172.4336,9.23839322 174.8736,2.55785085 175.8146,0.0476135593 C174.467,0.0435457627 173.1158,0.0514779661 171.7684,0.0476135593"
                                                    id="Fill-3"
                                                />
                                                <path
                                                    fill="#393939"
                                                    stroke="none"
                                                    className="seperator-text"
                                                    d="M185.04848,2.36792542 C185.34768,1.61375593 185.66928,0.803857627 185.96988,0.0476542373 L176.87048,0.0476542373 C176.78648,0.267315254 176.19088,1.8344339 175.97988,2.39070508 C177.25788,2.37870508 178.53628,2.37056949 179.81408,2.36467119 C179.32048,2.79382373 174.46628,7.14941695 173.98968,7.59321356 C173.69228,8.39762034 173.39548,9.20080678 173.10008,10.0037898 C176.13568,9.80873898 179.17008,9.6883322 182.20588,9.64216271 C182.49908,8.88209492 182.79368,8.12141695 183.08928,7.3603322 C181.81028,7.3684678 180.53088,7.38555254 179.25148,7.41219661 C180.20568,6.56223051 184.56048,2.78528136 185.04848,2.36792542"
                                                    id="Fill-5"
                                                />
                                                <path
                                                    fill="#393939"
                                                    stroke="none"
                                                    className="seperator-text"
                                                    d="M193.31294,0.0476135593 C192.97354,0.39459661 190.06434,3.35005424 189.43594,3.98402034 C189.92554,2.70469831 190.45354,1.33242712 190.94314,0.0476135593 C189.59594,0.0366305085 188.23634,0.0557491525 186.88954,0.0476135593 C186.81554,0.236766102 184.30314,6.66042712 183.14874,9.63317288 C183.52774,9.63052881 186.76474,9.64741017 187.26034,9.65656271 C187.54734,8.91093559 188.69714,5.92069831 188.98514,5.1708 C189.30054,6.68727458 189.61594,8.20639322 189.93114,9.72835932 C191.29854,9.77635932 192.66574,9.84225763 194.03174,9.92564746 C193.65874,8.33371525 193.28434,6.74544407 192.90874,5.16164746 C193.30774,4.75344407 196.64874,1.30395254 197.83774,0.0476135593 L193.31294,0.0476135593 Z"
                                                    id="Fill-7"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </span>
                </span>
            </div>
        </div>
    );
};

export default BetslipSelection;
