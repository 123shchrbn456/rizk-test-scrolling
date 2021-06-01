import React, { Fragment, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import getSvgIcon from "../utils/svgIcons";
import createSportPath from "../utils/createSportPath";

const PrimaryNavigationItem = ({ sportName }) => {
    const linkRef = useRef("");
    // prettier-ignore
    const additionalSport = sportName.sportTypeName && sportName.sportTypeName.toLowerCase();

    useEffect(() => {
        if (sportName.isAdditional) {
            // при добавлении иконки, сразу совершать на ней нажатие
            linkRef.current.click();
        }
    }, [sportName]);

    return (
        // sportName.sportTypeName указан в случае когда добавляется допполнительный вид спорта
        <li className="primary-navigation__list-wrap">
            <NavLink
                // className="primary-navigation__list-item"
                className="primary-navigation__list-item"
                activeClassName="primary-navigation__list-item--active"
                to={
                    createSportPath[additionalSport] ||
                    createSportPath[sportName] ||
                    "/undefined"
                }
                title={sportName.sportTypeName || sportName}
                ref={linkRef}
            >
                {getSvgIcon(sportName.sportTypeName || sportName) || (
                    <Fragment>
                        <p>!!! </p>
                    </Fragment>
                )}
            </NavLink>
        </li>
    );
};

export default PrimaryNavigationItem;
