import React, { useState, useEffect, useContext } from "react";
import BetslipContext from "../../context/betslip/betslipContext";

const BetslipExpressStakeRow = () => {
    const [expressStake, setExpressStake] = useState("");

    const betslipContext = useContext(BetslipContext);
    const { calculateFinalStakeAmount } = betslipContext;

    useEffect(() => {
        setExpressStake(15);
        calculateFinalStakeAmount(15);
    }, []);

    return (
        <div className="selection">
            <div className="row">
                <div className="row__child text-input disabled-bet-suggestions">
                    <span className="text-input__label--inside text-input__label text-input__label--disabled-bet-suggestions">
                        $
                    </span>
                    <input
                        name="bet-express"
                        type="number"
                        className="text-input__control bet-input-amount"
                        placeholder="15"
                        value={expressStake}
                        onChange={(evt) => {
                            setExpressStake(evt.target.value);
                            calculateFinalStakeAmount(evt.target.value);
                        }}
                    />
                </div>
                <button
                    className="button european-selection__button row__child"
                    onClick={() => {
                        setExpressStake(20);
                        calculateFinalStakeAmount(20);
                    }}
                >
                    $20.00
                </button>
                <button
                    className="button european-selection__button row__child"
                    onClick={() => {
                        setExpressStake(30);
                        calculateFinalStakeAmount(30);
                    }}
                >
                    $30.00
                </button>
            </div>
        </div>
    );
};

export default BetslipExpressStakeRow;
