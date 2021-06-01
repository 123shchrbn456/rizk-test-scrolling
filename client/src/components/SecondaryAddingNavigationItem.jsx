import React from "react";
import { openLeaguesPopup } from "../utils/popupActions";

const SecondaryAddingNavigationItem = () => {
    const onOpenLeaguesPopup = (evt) => {
        evt.preventDefault();
        openLeaguesPopup();
    };

    return (
        <li className="secondary-navigation__list-wrap popup-browse-league__open-btn">
            <a
                className="secondary-navigation__list-item"
                href="#"
                onClick={onOpenLeaguesPopup}
            >
                <div className="button secondary-navigation__button">
                    <div className="button-svg-text">
                        <div className="button__liga-name">
                            <span>Выбрать чемпионат</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
};

export default SecondaryAddingNavigationItem;
