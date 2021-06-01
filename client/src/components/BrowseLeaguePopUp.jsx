import React, { Fragment, useEffect } from "react";
import ScriptTag from "react-script-tag";
import BrowseLeaguePopUpItem from "./BrowseLeaguePopUpItem";
import { closeLeaguesPopup } from "../utils/popupActions";

const BrowseLeaguePopUp = (props) => {
    const { currentSportTypeData } = props;

    const uniqueId = function () {
        return Math.floor(Math.random() * 1000000);
    };

    const onCloseLeaguesPopup = () => {
        closeLeaguesPopup();
    };

    return (
        <Fragment>
            <div className="modal popup-browse__sport-league visually-hidden">
                <div className="modal-content">
                    <header className="popup-browse__header">
                        <h1 className="popup-browse__header--title">
                            Выбрать лигу
                        </h1>
                        <button
                            className="close-button popup-browse__close-btn"
                            onClick={onCloseLeaguesPopup}
                        >
                            <svg className="icon__svg" viewBox="0 0 21.9 21.9">
                                <path
                                    id="a"
                                    d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z"
                                ></path>
                            </svg>
                        </button>
                    </header>
                    <section className="popup-browse__sports-categories">
                        <ul className="popup-browse__sports-categories--list">
                            {Object.keys(currentSportTypeData)
                                .sort()
                                .map((country) => (
                                    <BrowseLeaguePopUpItem
                                        key={uniqueId()}
                                        headline={country}
                                        leagueData={
                                            currentSportTypeData[country]
                                        }
                                    />
                                ))}
                        </ul>
                    </section>
                </div>
            </div>
            {/* <ScriptTag src="/scripts/browsePopups.js" /> */}
        </Fragment>
    );
};

export default BrowseLeaguePopUp;
