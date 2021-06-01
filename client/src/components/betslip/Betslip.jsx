import React, { useContext, useEffect, useState } from "react";
import BetslipContext from "../../context/betslip/betslipContext";
import BetslipSelection from "./BetslipSelection";
import BetslipExpressSelection from "./BetslipExpressSelection";
import BetslipExpressStakeRow from "./BetslipExpressStakeRow";
import axios from "axios";

const Betslip = () => {
    /* отслеживаю переход в корзине на вкладку експресс */
    const [expressIsActivated, setExpressIsActivated] = useState(true);

    const betslipContext = useContext(BetslipContext);
    const {
        betslipMatches,
        setZeroFinalStakeAmount,
        finalStakeAmount,
    } = betslipContext;

    useEffect(() => {
        setZeroFinalStakeAmount();
    }, [expressIsActivated]);

    const calculateBetslipFinalCoef = () => {
        let res = betslipMatches.reduce((accum, currentObj) => {
            return accum * currentObj.chosenOutcomeCoeff;
        }, 1);
        const roundedNumber = +res.toFixed(2);
        return roundedNumber;
    };

    const getFinalStakeAmount = () => {
        const betAmountInputs = document.querySelectorAll(".bet-input-amount");
        let arrayAmounts = Array.from(betAmountInputs);
        const sum = arrayAmounts.reduce((a, b) => {
            return a + +b.value;
        }, 0);
        return sum;
    };

    const getStakeDescriptions = () => {
        const arr = [];
        const betAmountInputs = document.querySelectorAll(".bet-input-amount");
        betAmountInputs.forEach((inpt) => {
            if (!inpt.value)
                return console.error("Ставка не может быть меньше 1$");
            let str = `${inpt.name} Bet amount: $${inpt.value}`;
            arr.push(str);
        });
        return arr;
    };

    const onPlaceBetClick = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        // const betslipMatches = [{ name: "Ivan" }, { name: "Vovan" }];
        const stakeDescriptions = getStakeDescriptions();

        try {
            const res = await axios.post(
                "/api/betslip",
                { betslipMatches, expressIsActivated, stakeDescriptions },
                config
            );
            console.log("Ответ из БД", res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="betslip">
            <div className="betslip-header">
                Singles
                <span className="betslip-header__indicator">
                    <p className="betslip-header__indicator-text">
                        {betslipMatches.length}
                    </p>
                </span>
                <span>@ {calculateBetslipFinalCoef()}</span>
                <div className="betslip-header__toggler" />
            </div>
            <div
                className="betslip__body"
                style={{ maxHeight: "calc(100vh - 60px)" }}
            >
                <div className="betslip__content">
                    <div>
                        <nav className="tabs">
                            <div className="row">
                                <a
                                    className={
                                        betslipMatches.length <= 1 ||
                                        expressIsActivated === false
                                            ? "tabs__tab tabs__tab--active row__child"
                                            : "tabs__tab tabs__tab--disabled row__child"
                                    }
                                    onClick={() => setExpressIsActivated(false)}
                                >
                                    Singles
                                </a>
                                <a
                                    className={
                                        betslipMatches.length > 1 &&
                                        expressIsActivated === true
                                            ? "tabs__tab tabs__tab--active row__child"
                                            : "tabs__tab tabs__tab--disabled row__child"
                                    }
                                    onClick={() => setExpressIsActivated(true)}
                                >
                                    Combos
                                </a>
                            </div>
                        </nav>
                    </div>
                    {/* Отталкиватся от кол-ва betslipMatches, дополнительная переменная как варик */}
                    {/* Закладка 24.12 BetslipSelection оставить для ординаров, создать BetslipSelectionExpress для отображения експреса*/}
                    {betslipMatches.length <= 1 || expressIsActivated === false
                        ? betslipMatches.map((match) => (
                              <BetslipSelection
                                  key={match.Id}
                                  matchData={match}
                              />
                          ))
                        : ""}

                    {betslipMatches.length > 1 && expressIsActivated === true
                        ? betslipMatches.map((match) => (
                              <BetslipExpressSelection
                                  key={match.Id}
                                  matchData={match}
                              />
                          ))
                        : ""}

                    {betslipMatches.length > 1 && expressIsActivated && (
                        <BetslipExpressStakeRow />
                    )}
                    {/* <BetslipSelection /> */}

                    <div className="betslip__bottom">
                        <div className="totals">
                            <div className="row totals__row">
                                <span className="totals__total-stake--title row__child">
                                    Total stake
                                    {/* <span>5.2</span> */}
                                    <span>{calculateBetslipFinalCoef()}</span>
                                </span>
                                <span className="totals__total-stake--amount row__child">
                                    $
                                    {expressIsActivated ? finalStakeAmount : ""}
                                </span>
                            </div>
                            <div className="row totals__row">
                                <span className="totals__potential-wins--title row__child">
                                    Potential Wins
                                </span>
                                <span className="totals__potential-wins--amount row__child">
                                    $72.75
                                </span>
                            </div>
                        </div>
                        <div className="taxes" />
                        <button
                            className="button betslip__btn-place-bet"
                            onClick={onPlaceBetClick}
                        >
                            Place bet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Betslip;
