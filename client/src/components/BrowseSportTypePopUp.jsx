import React, { Fragment, useEffect, useContext } from "react";
import ScriptTag from "react-script-tag";
import ApiContext from "../context/apiCtx/apiContext";

import { closeSportTypePopup } from "../utils/popupActions";

const BrowseSportTypePopUp = (props) => {
    const { currentSportTypeData } = props;
    const apiContext = useContext(ApiContext);
    const { pushAdditionalSportTypeItem, removeAdditionalSportTypeItem } =
        apiContext;

    const onSportTypeClick = (evt) => {
        const sportTypeName = evt.target.textContent;
        // удаляем из api state
        removeAdditionalSportTypeItem();
        // добавляем в api state
        pushAdditionalSportTypeItem({ sportTypeName, isAdditional: true });
        // закрываем попап
        // prettier-ignore
        document.querySelector(".popup-browse__sport-type .popup-browse__close-btn").click();
    };

    // Обработчик-закрытия попапа
    const onCloseSportTypesPopup = () => {
        closeSportTypePopup();
    };

    return (
        <Fragment>
            <div className="modal popup-browse__sport-type visually-hidden">
                <div className="modal-content">
                    <header className="popup-browse__header">
                        <h1 className="popup-browse__header--title">
                            Добавить вид спорта
                        </h1>
                        <button
                            className="close-button popup-browse__close-btn"
                            onClick={onCloseSportTypesPopup}
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
                            <li
                                className="sports-categories__item"
                                onClick={onSportTypeClick}
                            >
                                Baseball
                            </li>
                            <li
                                className="sports-categories__item"
                                onClick={onSportTypeClick}
                            >
                                Volleyball
                            </li>
                            <li
                                className="sports-categories__item"
                                onClick={onSportTypeClick}
                            >
                                Biathlon
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
            {/* <ScriptTag src="/scripts/sportTypePopup.js" /> */}
        </Fragment>
    );
};

export default BrowseSportTypePopUp;
