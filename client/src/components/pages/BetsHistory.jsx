import React, { useEffect, useContext } from "react";
import BetslipContext from "../../context/betslip/betslipContext";

const BetsHistory = () => {
    const betslipContext = useContext(BetslipContext);
    const { performedStakes, getPerformedStakes } = betslipContext;

    useEffect(() => {
        console.log("working");
        getPerformedStakes();
    }, []);

    const uniqueId = function () {
        return Math.floor(Math.random() * 100000);
    };

    return (
        <main className="all-content" id="all-content">
            <section id="main-content" className="main-content">
                <h3>Текущие ставки</h3>
                <h3>Расчитанные ставки</h3>
                <section className="bets-history__wrapper">
                    {performedStakes && performedStakes.length > 0 ? (
                        performedStakes.map((performedStake) => (
                            <div
                                className="bet-table"
                                style={{
                                    border: "2px solid purple",
                                    marginBottom: "5px",
                                }}
                                key={uniqueId()}
                            >
                                {performedStake.stakeDescriptions.map(
                                    (stakeDescription) => (
                                        <p
                                            className="stake-description"
                                            key={uniqueId()}
                                        >
                                            {stakeDescription}
                                        </p>
                                    )
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Ставки отсутсвуют</p>
                    )}
                </section>
            </section>
        </main>
    );
};

export default BetsHistory;
