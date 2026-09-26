// // // let lenis;

// // // function initializeLenis() {
// // //     if (lenis) return; // Prevent creating multiple instances

// // //     lenis = new Lenis({
// // //         autoRaf: true,
// // //         duration: 1.2,
// // //         smoothWheel: true,
// // //         wheelMultiplier: 1,
// // //         touchMultiplier: 1,
// // //         infinite: false,
// // //     });
// // // }

// // // async function loadPage(page) {
// // //     const response = await fetch(`./pages/${page}.html`);
// // //     const html = await response.text();

// // //     document.getElementById("app").innerHTML = html;

// // //     initializePage(page);
// // // }

// // // async function loadHome() {


// // //     const welcome = await fetch("./pages/welcome.html").then(res => res.text());
// // //     const saveTheDate = await fetch("./pages/saveTheDate.html").then(res => res.text());
// // //     const meetCouple = await fetch("./pages/meetCouple.html").then(res => res.text());
// // //     const ourJourney = await fetch("./pages/ourJourney.html").then(res => res.text());
// // //     const capturedMoments = await fetch("./pages/capturedMoments.html").then(res => res.text());
// // //     const eventSchedule = await fetch("./pages/event-schedule.html").then(res => res.text());
// // //     const ourVenues = await fetch("./pages/our-venues.html").then(res => res.text());
// // //     const family = await fetch("./pages/family.html").then(res => res.text());
// // //     const contact = await fetch("./pages/contact.html").then(res => res.text());
// // //     const footer = await fetch("./pages/footer.html").then(res => res.text());

// // //     document.getElementById("app").innerHTML =
// // //         welcome +
// // //         saveTheDate +
// // //         meetCouple +
// // //         ourJourney +
// // //         capturedMoments +
// // //         eventSchedule +
// // //         ourVenues +
// // //         family +
// // //         contact +
// // //         footer;

// // //     initializePetals();
// // //     initializeMeetCouple();
// // //     initializeScratchCard();
// // //     initializeCapturedMoments();
// // //     initializeOurVenues();
// // //     initializeOurJourney();
// // //     initializeCalendarButton();
// // //     initializeLoveButton();
// // //     initializeHorizontalScroll();
// // //     initializeContactForm()
// // //     initializeLenis();
// // // }

// // // function initializePage(page) {

// // //     if (page === "opening") {

// // //         const video = document.querySelector(".opening-video");
// // //         const button = document.querySelector(".tap-button");

// // //         button.addEventListener("click", () => {

// // //             video.play();

// // //             button.style.display = "none";

// // //         });

// // //         video.addEventListener("ended", () => {

// // //             loadHome();

// // //         });

// // //     }

// // // }

// // // loadPage("opening");

// // let lenis;

// // // Fragments that make up the home page, in the order they're stitched together.
// // const HOME_PAGES = [
// //     // "test",
// //     "welcome",
// //     "saveTheDate",
// //     "meetCouple",
// //     "ourJourney",
// //     "capturedMoments",
// //     "event-schedule",
// //     "our-venues",
// //     "family",
// //     "contact",
// //     "footer"
// // ];

// // // Kicks off all the fetches for the home page in parallel (instead of one
// // // after another) and caches the in-flight promise so calling this more than
// // // once (e.g. once on load to prefetch, once when the video ends) doesn't
// // // re-fetch anything.
// // let homePagesPromise = null;

// // function prefetchHomePages() {
// //     if (homePagesPromise) return homePagesPromise;

// //     homePagesPromise = Promise.all(
// //         HOME_PAGES.map((page) =>
// //             fetch(`./pages/${page}.html`).then((res) => res.text())
// //         )
// //     );

// //     return homePagesPromise;
// // }

// // function initializeLenis() {
// //     if (lenis) return; // Prevent creating multiple instances

// //     lenis = new Lenis({
// //         autoRaf: true,
// //         duration: 1.2,
// //         smoothWheel: true,
// //         wheelMultiplier: 1,
// //         touchMultiplier: 1,
// //         infinite: false,
// //     });
// // }

// // async function loadPage(page) {
// //     const response = await fetch(`./pages/${page}.html`);
// //     const html = await response.text();

// //     document.getElementById("app").innerHTML = html;

// //     initializePage(page);
// // }

// // async function loadHome() {

// //     // If prefetchHomePages() was already triggered while the video was
// //     // playing, this resolves instantly (or much sooner) instead of starting
// //     // 10 fresh sequential requests only now.
// //     const htmlParts = await prefetchHomePages();

// //     document.getElementById("app").innerHTML = htmlParts.join("");

// //     initializePetals();
// //     initializeWelcome();
// //     initializeMeetCouple();
// //     initializeScratchCard();
// //     initializeCapturedMoments();
// //     initializeOurVenues();
// //     initializeOurJourney();
// //     initializeCalendarButton();
// //     initializeLoveButton();
// //     initializeHorizontalScroll();
// //     initializeContactForm()
// //     initializeLenis();
// // }

// // function initializePage(page) {

// //     if (page === "opening") {

// //         const video = document.querySelector(".opening-video");
// //         const button = document.querySelector(".tap-button");

// //         // Start loading the home page content now, in the background,
// //         // instead of waiting until the video ends to begin fetching it.
// //         prefetchHomePages();

// //         button.addEventListener("click", () => {

// //             video.play();

// //             button.style.display = "none";

// //         });

// //         video.addEventListener("ended", () => {

// //             loadHome();

// //         });

// //     }

// // }

// // loadPage("opening");

// // let lenis;

// // function initializeLenis() {
// //     if (lenis) return; // Prevent creating multiple instances

// //     lenis = new Lenis({
// //         autoRaf: true,
// //         duration: 1.2,
// //         smoothWheel: true,
// //         wheelMultiplier: 1,
// //         touchMultiplier: 1,
// //         infinite: false,
// //     });
// // }

// // async function loadPage(page) {
// //     const response = await fetch(`./pages/${page}.html`);
// //     const html = await response.text();

// //     document.getElementById("app").innerHTML = html;

// //     initializePage(page);
// // }

// // async function loadHome() {


// //     const welcome = await fetch("./pages/welcome.html").then(res => res.text());
// //     const saveTheDate = await fetch("./pages/saveTheDate.html").then(res => res.text());
// //     const meetCouple = await fetch("./pages/meetCouple.html").then(res => res.text());
// //     const ourJourney = await fetch("./pages/ourJourney.html").then(res => res.text());
// //     const capturedMoments = await fetch("./pages/capturedMoments.html").then(res => res.text());
// //     const eventSchedule = await fetch("./pages/event-schedule.html").then(res => res.text());
// //     const ourVenues = await fetch("./pages/our-venues.html").then(res => res.text());
// //     const family = await fetch("./pages/family.html").then(res => res.text());
// //     const contact = await fetch("./pages/contact.html").then(res => res.text());
// //     const footer = await fetch("./pages/footer.html").then(res => res.text());

// //     document.getElementById("app").innerHTML =
// //         welcome +
// //         saveTheDate +
// //         meetCouple +
// //         ourJourney +
// //         capturedMoments +
// //         eventSchedule +
// //         ourVenues +
// //         family +
// //         contact +
// //         footer;

// //     initializePetals();
// //     initializeMeetCouple();
// //     initializeScratchCard();
// //     initializeCapturedMoments();
// //     initializeOurVenues();
// //     initializeOurJourney();
// //     initializeCalendarButton();
// //     initializeLoveButton();
// //     initializeHorizontalScroll();
// //     initializeContactForm()
// //     initializeLenis();
// // }

// // function initializePage(page) {

// //     if (page === "opening") {

// //         const video = document.querySelector(".opening-video");
// //         const button = document.querySelector(".tap-button");

// //         button.addEventListener("click", () => {

// //             video.play();

// //             button.style.display = "none";

// //         });

// //         video.addEventListener("ended", () => {

// //             loadHome();

// //         });

// //     }

// // }

// // loadPage("opening");

// let lenis;

// // Fragments that make up the home page, in the order they're stitched together.
// const HOME_PAGES = [
//     // "test",
//     "welcome",
//     "saveTheDate",
//     "meetCouple",
//     "ourJourney",
//     "capturedMoments",
//     "event-schedule",
//     "our-venues",
//     "family",
//     "contact",
//     "footer"
// ];

// // Kicks off all the fetches for the home page in parallel (instead of one
// // after another) and caches the in-flight promise so calling this more than
// // once (e.g. once on load to prefetch, once when the video ends) doesn't
// // re-fetch anything.
// let homePagesPromise = null;

// function prefetchHomePages() {
//     if (homePagesPromise) return homePagesPromise;

//     homePagesPromise = Promise.all(
//         HOME_PAGES.map((page) =>
//             fetch(`./pages/${page}.html`).then((res) => res.text())
//         )
//     );

//     return homePagesPromise;
// }

// function initializeLenis() {
//     if (lenis) return; // Prevent creating multiple instances

//     lenis = new Lenis({
//         autoRaf: true,
//         duration: 1.2,
//         smoothWheel: true,
//         wheelMultiplier: 1,
//         touchMultiplier: 1,
//         infinite: false,
//     });
// }

// async function loadPage(page) {
//     const response = await fetch(`./pages/${page}.html`);
//     const html = await response.text();

//     document.getElementById("app").innerHTML = html;

//     initializePage(page);
// }

// let homeLoaded = false;

// async function loadHome() {

//     // Guard against loadHome() being triggered more than once (e.g. the
//     // user double-tapping "Enter Our Story").
//     if (homeLoaded) return;
//     homeLoaded = true;

//     // If prefetchHomePages() was already triggered while the opening
//     // animation was playing, this resolves instantly (or much sooner)
//     // instead of starting 10 fresh sequential requests only now.
//     const htmlParts = await prefetchHomePages();

//     // Append rather than overwrite: #app already contains the opening
//     // section (#welcome, the diya) and #grandWeddingScene, and those need
//     // to stay in place, right before Save The Date.
//     document.getElementById("app").insertAdjacentHTML(
//         "beforeend",
//         htmlParts.join("")
//     );

//     initializePetals();
//     initializeWelcome();
//     initializeMeetCouple();
//     initializeScratchCard();
//     initializeCapturedMoments();
//     initializeOurVenues();
//     initializeOurJourney();
//     initializeCalendarButton();
//     initializeLoveButton();
//     initializeHorizontalScroll();
//     initializeContactForm()
//     initializeLenis();
// }

// function initializePage(page) {

//     if (page === "opening") {

//         // Start loading the home page content now, in the background,
//         // so it's already fetched by the time the user taps
//         // "Enter Our Story" in openingVideo.js.
//         prefetchHomePages();

//     }

// }

// // Let openingVideo.js (a separate script/IIFE) trigger this when the
// // "Enter Our Story" button is clicked.
// window.loadHome = loadHome;

// loadPage("opening");

// let lenis;

// function initializeLenis() {
//     if (lenis) return; // Prevent creating multiple instances

//     lenis = new Lenis({
//         autoRaf: true,
//         duration: 1.2,
//         smoothWheel: true,
//         wheelMultiplier: 1,
//         touchMultiplier: 1,
//         infinite: false,
//     });
// }

// async function loadPage(page) {
//     const response = await fetch(`./pages/${page}.html`);
//     const html = await response.text();

//     document.getElementById("app").innerHTML = html;

//     initializePage(page);
// }

// async function loadHome() {


//     const welcome = await fetch("./pages/welcome.html").then(res => res.text());
//     const saveTheDate = await fetch("./pages/saveTheDate.html").then(res => res.text());
//     const meetCouple = await fetch("./pages/meetCouple.html").then(res => res.text());
//     const ourJourney = await fetch("./pages/ourJourney.html").then(res => res.text());
//     const capturedMoments = await fetch("./pages/capturedMoments.html").then(res => res.text());
//     const eventSchedule = await fetch("./pages/event-schedule.html").then(res => res.text());
//     const ourVenues = await fetch("./pages/our-venues.html").then(res => res.text());
//     const family = await fetch("./pages/family.html").then(res => res.text());
//     const contact = await fetch("./pages/contact.html").then(res => res.text());
//     const footer = await fetch("./pages/footer.html").then(res => res.text());

//     document.getElementById("app").innerHTML =
//         welcome +
//         saveTheDate +
//         meetCouple +
//         ourJourney +
//         capturedMoments +
//         eventSchedule +
//         ourVenues +
//         family +
//         contact +
//         footer;

//     initializePetals();
//     initializeMeetCouple();
//     initializeScratchCard();
//     initializeCapturedMoments();
//     initializeOurVenues();
//     initializeOurJourney();
//     initializeCalendarButton();
//     initializeLoveButton();
//     initializeHorizontalScroll();
//     initializeContactForm()
//     initializeLenis();
// }

// function initializePage(page) {

//     if (page === "opening") {

//         const video = document.querySelector(".opening-video");
//         const button = document.querySelector(".tap-button");

//         button.addEventListener("click", () => {

//             video.play();

//             button.style.display = "none";

//         });

//         video.addEventListener("ended", () => {

//             loadHome();

//         });

//     }

// }

// loadPage("opening");

let lenis;

// Fragments that make up the home page, in the order they're stitched together.
const HOME_PAGES = [
    // "test",
    "welcome",
    "saveTheDate",
    "meetCouple",
    "ourJourney",
    "capturedMoments",
    "event-schedule",
    "our-venues",
    "family",
    "contact",
    "footer"
];

// Kicks off all the fetches for the home page in parallel (instead of one
// after another) and caches the in-flight promise so calling this more than
// once (e.g. once on load to prefetch, once when the video ends) doesn't
// re-fetch anything.
let homePagesPromise = null;

function prefetchHomePages() {
    if (homePagesPromise) return homePagesPromise;

    homePagesPromise = Promise.all(
        HOME_PAGES.map((page) =>
            fetch(`./pages/${page}.html`).then((res) => res.text())
        )
    );

    return homePagesPromise;
}

function initializeLenis() {
    if (lenis) return; // Prevent creating multiple instances

    lenis = new Lenis({
        autoRaf: true,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        infinite: false,
    });
}

async function loadPage(page) {
    const response = await fetch(`./pages/${page}.html`);
    const html = await response.text();

    document.getElementById("app").innerHTML = html;

    initializePage(page);
}

let homeLoaded = false;

/* =====================================================
   BACKGROUND MUSIC

   playBackgroundMusic() is called synchronously, before any
   `await`, from inside the "Enter Our Story" click handler — so
   it still runs within the user-gesture window and browsers won't
   block it. If a browser blocks it anyway, the floating toggle
   button lets the user start it with one tap.
   ===================================================== */

let musicInitialized = false;

function playBackgroundMusic() {

    const audio = document.getElementById("bgMusic");
    const toggle = document.getElementById("musicToggle");

    if (!audio || !toggle) {
        return;
    }

    if (!musicInitialized) {

        musicInitialized = true;

        toggle.classList.add("is-visible");

        toggle.addEventListener("click", function () {

            if (audio.paused) {

                audio.play().catch(function () {
                    // Still blocked (rare) — leave the button in its
                    // "not playing" state so the user can try again.
                });

            } else {

                audio.pause();
            }
        });

        audio.addEventListener("play", function () {
            toggle.classList.add("is-playing");
            toggle.setAttribute("aria-label", "Pause background music");
            toggle.title = "Pause music";
        });

        audio.addEventListener("pause", function () {
            toggle.classList.remove("is-playing");
            toggle.setAttribute("aria-label", "Play background music");
            toggle.title = "Play music";
        });
    }

    audio.play().catch(function () {
        // Autoplay blocked — toggle button stays available so the
        // user can start it manually.
    });
}

async function loadHome() {

  
    if (homeLoaded) return;
    homeLoaded = true;

    playBackgroundMusic();

   
    const htmlParts = await prefetchHomePages();

    // Replace the opening (diya + grand scene) entirely with the main site.
    document.getElementById("app").innerHTML = htmlParts.join("");

    // Start the main site at the top instead of wherever the opening left
    // the scroll position.
    window.scrollTo(0, 0);

    initializePetals();
    initializeWelcome();
    initializeMeetCouple();
    initializeScratchCard();
    initializeCapturedMoments();
    initializeOurVenues();
    initializeOurJourney();
    initializeCalendarButton();
    initializeLoveButton();
    initializeHorizontalScroll();
    initializeContactForm()
    initializeLenis();
}

function initializePage(page) {

    if (page === "opening") {

        // Start loading the home page content now, in the background,
        // so it's already fetched by the time the user taps
        // "Enter Our Story" in openingVideo.js.
        prefetchHomePages();

    }

}

// Let openingVideo.js (a separate script/IIFE) trigger this when the
// "Enter Our Story" button is clicked.
window.loadHome = loadHome;

loadPage("opening");