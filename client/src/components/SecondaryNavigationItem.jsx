import React, { useEffect, useRef } from "react";
import getSvgIcon from "../utils/svgIcons";
import { NavLink } from "react-router-dom";

const SecondaryNavigationItem = ({ leagueData }) => {
    const linkRef = useRef("");

    useEffect(() => {
        if (leagueData.isAdditional) {
            console.log("zzzzzzzzzz", linkRef);
            linkRef.current.click();
        }
    }, [leagueData]);

    return (
        <li className="secondary-navigation__list-wrap">
            <NavLink
                to={`/sportbook/${leagueData.sportName.toLowerCase()}/${
                    leagueData.leagueId
                }`}
                className={`secondary-navigation__list-item ${
                    leagueData.isAdditional ? "isAdditional" : ""
                }`}
                activeClassName="isActive"
                ref={linkRef}
                // onClick={() => console.log("clicked")}
                // onClick={leagueData.isAdditional ? () => simulateClick() : ""}
            >
                <div className="button secondary-navigation__button">
                    <div className="button-svg-text">
                        {getSvgIcon(leagueData.regionName)}
                        <div className="button__liga-name">
                            <span>{leagueData.leagueName}</span>
                        </div>
                    </div>
                </div>
            </NavLink>
        </li>

        // <div>
        // 	<li className="secondary-navigation__list-item">
        // 		<span className="secondary-navigation__img-btn-container">
        // 			<NavLink
        // 				to={`/sportbook/${currentPageSportType}/${legueName}`}
        // 				className="button secondary-navigation__button"
        // 				activeClassName="secondary-navigation__button--isActive"
        // 			>
        // 				<div className="row row--align-center">
        // 					<div className="button__img row__child">
        // 						<span className="icon icon__tooltipContainer icon--round">
        // 							<svg
        // 								className="icon"
        // 								id="flag-icon-css-de"
        // 								width="512"
        // 								height="512"
        // 								viewBox="0 0 512 512"
        // 							>
        // 								<path fill="#ffce00" d="M0 341.338h512.005v170.67H0z" />
        // 								<path d="M0 0h512.005v170.67H0z" />
        // 								<path fill="#d00" d="M0 170.67h512.005v170.668H0z" />
        // 							</svg>
        // 						</span>
        // 					</div>
        // 					<div className="row__child">
        // 						<span name="league-name">{legueName}</span>
        // 					</div>
        // 				</div>
        // 			</NavLink>
        // 		</span>
        // 	</li>
        // </div>
    );
};

export default SecondaryNavigationItem;
