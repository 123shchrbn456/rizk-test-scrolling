// Анимирование скрытия Аккордеонов

const accordionTitles = document.querySelectorAll(".accordion__title");
const accordionInnerContent = document.querySelector(
    ".accordion__inner-content"
);
// Show an element

function show(accordion) {
    // Get the natural height of the element
    var getHeight = function () {
        accordion.style.display = "flex"; // Make it visible
        var height = accordion.scrollHeight + "px"; // Get it's height
        accordion.style.display = ""; //  Hide it again
        return height;
    };

    var height = getHeight(); // Get the natural height
    accordion.classList.add("accordion-isVisible"); // Make the element visible
    accordion.style.height = height; // Update the max-height

    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(function () {
        accordion.style.height = "";
    }, 350);
}

// Hide an element
function hide(accordion) {
    // Give the element a height to change from
    accordion.style.height = accordion.scrollHeight + "px";

    // Set the height back to 0
    window.setTimeout(function () {
        accordion.style.height = "0";
    }, 1);

    // When the transition is complete, hide it
    window.setTimeout(function () {
        accordion.classList.remove("accordion-isVisible");
    }, 350);
}

// Toggle element visibility
function toggle(accordion) {
    const accordionElem = accordion;
    const accordionInnerContent = accordionElem.querySelector(
        ".accordion__inner-content "
    );

    // If the element is visible, hide it
    if (accordionInnerContent.classList.contains("accordion-isVisible")) {
        accordionElem.classList.add("accordion-closed");
        hide(accordionInnerContent);
        return;
    }

    // Otherwise, show it
    accordionElem.classList.remove("accordion-closed");
    show(accordionInnerContent);
}

// Listen for click events
accordionTitles.forEach((elem) => {
    elem.addEventListener(
        "click",
        function (event) {
            // Prevent default link behavior
            event.preventDefault();

            // Get the content
            var accordion = event.target.closest(".accordion");

            if (!accordion) return;

            // Toggle the content
            toggle(accordion);
        },
        false
    );
});
