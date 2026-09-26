function initializeOurVenues() {

    const page = document.querySelector(".ep-page");

    if (!page) {
        return;
    }

    requestAnimationFrame(() => {
        page.classList.add("ep-loaded");
    });

}