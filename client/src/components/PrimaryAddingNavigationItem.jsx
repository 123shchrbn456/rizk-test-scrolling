import React from "react";
import { NavLink } from "react-router-dom";
import getSvgIcon from "../utils/svgIcons";
import createSportPath from "../utils/createSportPath";
import { openSportTypePopup } from "../utils/popupActions";

const PrimaryAddingNavigationItem = () => {
    const onOpenSportTypesPopup = (evt) => {
        evt.preventDefault();
        openSportTypePopup();
    };

    return (
        <li className="primary-navigation__list-wrap">
            <NavLink
                className="primary-navigation__list-item popup-browse-sport-type__open-btn"
                to={createSportPath["Добавить вид спорта"]}
                title="Добавить вид спорта"
                onClick={onOpenSportTypesPopup}
            >
                {getSvgIcon("Добавить вид спорта")}
            </NavLink>
        </li>
    );
};

export default PrimaryAddingNavigationItem;
