export default function(currentPageSportLeague) {
	const adaptedLinkName = currentPageSportLeague.split('%20').join(' ');
	const btn = document.querySelector(`[data-league=${adaptedLinkName}]`);
	btn.classList.add('secondary-navigation__button--isActive');
}
