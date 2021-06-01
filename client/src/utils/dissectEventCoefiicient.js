export default function (marketsArray, chosenOutcome, nameOutcome) {
    const neededMarketEvent = marketsArray.find(
        (elem) => elem.name.value === nameOutcome
    );

    const neededResultItem = neededMarketEvent.results.find((elem) => {
        if (nameOutcome === "Match Result") {
            return elem.sourceName.value === chosenOutcome;
        } else {
            return elem.name.value === chosenOutcome;
        }
    });

    if (!neededResultItem) {
        console.log("!neededResultItem", chosenOutcome);
        console.log("!neededResultItem", marketsArray);
    }

    const result = neededResultItem.odds;
    return result;
}
