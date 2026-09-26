// // // const video = document.querySelector(".opening-video");
// // // const button = document.querySelector(".tap-button");
// // // const welcomeText = document.querySelector(".welcome-text");

// // // // Play video when button is clicked
// // // button.addEventListener("click", () => {
// // //     video.play();
// // //     button.style.display = "none";
// // // });

// // // // When the video finishes
// // // video.addEventListener("ended", () => {
// // //     video.style.display = "none";
// // //     welcomeText.style.display = "block";
// // // });

// // (function () {

// //     function initializeWelcome() {

// //         const welcome = document.getElementById("welcome");

// //         if (!welcome) {
// //             return;
// //         }

// //         if (welcome.dataset.initialized === "true") {
// //             return;
// //         }

// //         welcome.dataset.initialized = "true";


// //         /* =====================================================
// //            ELEMENTS
// //            ===================================================== */

// //         const diyaHolder =
// //             document.getElementById("diyaHolder");

// //         const enterButton =
// //             document.getElementById("diyaEnter");

// //         const grandScene =
// //             document.getElementById("grandWeddingScene");

// //         const diyaParticles =
// //             document.getElementById("diyaParticles");

// //         const grandParticles =
// //             document.getElementById("grandSceneParticles");


// //         if (!diyaHolder) {
// //             console.error("Diya element not found.");
// //             return;
// //         }


// //         /* =====================================================
// //            DIYA PARTICLES
// //            ===================================================== */

// //         function createDiyaParticles() {

// //             if (!diyaParticles) {
// //                 return;
// //             }

// //             diyaParticles.innerHTML = "";

// //             const count =
// //                 window.innerWidth <= 768 ? 25 : 50;

// //             for (let i = 0; i < count; i++) {

// //                 const particle =
// //                     document.createElement("span");

// //                 particle.className =
// //                     "diya-particle";

// //                 particle.style.left =
// //                     Math.random() * 100 + "%";

// //                 particle.style.top =
// //                     40 + Math.random() * 45 + "%";

// //                 particle.style.width =
// //                     2 + Math.random() * 3 + "px";

// //                 particle.style.height =
// //                     2 + Math.random() * 3 + "px";

// //                 particle.style.setProperty(
// //                     "--particle-x",
// //                     (Math.random() * 180 - 90) + "px"
// //                 );

// //                 particle.style.setProperty(
// //                     "--particle-duration",
// //                     (3 + Math.random() * 4) + "s"
// //                 );

// //                 particle.style.setProperty(
// //                     "--particle-delay",
// //                     Math.random() * 4 + "s"
// //                 );

// //                 diyaParticles.appendChild(particle);
// //             }
// //         }


// //         /* =====================================================
// //            GRAND SCENE PARTICLES
// //            ===================================================== */

// //         function createGrandParticles() {

// //             if (!grandParticles) {
// //                 return;
// //             }

// //             grandParticles.innerHTML = "";

// //             const count =
// //                 window.innerWidth <= 768 ? 18 : 35;

// //             for (let i = 0; i < count; i++) {

// //                 const particle =
// //                     document.createElement("span");

// //                 particle.className =
// //                     "grand-scene-particle";

// //                 particle.style.left =
// //                     Math.random() * 100 + "%";

// //                 particle.style.top =
// //                     55 + Math.random() * 40 + "%";

// //                 particle.style.setProperty(
// //                     "--grand-x",
// //                     (Math.random() * 160 - 80) + "px"
// //                 );

// //                 particle.style.setProperty(
// //                     "--grand-duration",
// //                     (3 + Math.random() * 4) + "s"
// //                 );

// //                 particle.style.setProperty(
// //                     "--grand-delay",
// //                     Math.random() * 3 + "s"
// //                 );

// //                 grandParticles.appendChild(particle);
// //             }
// //         }


// //         /* =====================================================
// //            INITIALIZE
// //            ===================================================== */

// //         createDiyaParticles();


// //         /* =====================================================
// //            LIGHT DIYA
// //            ===================================================== */

// //         let diyaLit = false;

// //         function lightDiya() {

// //             if (diyaLit) {
// //                 return;
// //             }

// //             diyaLit = true;

// //             welcome.classList.add("is-lit");
// //             welcome.classList.add("is-bursting");

// //             createDiyaParticles();

// //             setTimeout(function () {

// //                 welcome.classList.add("is-revealed");

// //             }, 900);

// //             setTimeout(function () {

// //                 welcome.classList.remove("is-bursting");

// //             }, 1400);
// //         }


// //         /* =====================================================
// //            DIYA CLICK
// //            ===================================================== */

// //         diyaHolder.addEventListener(
// //             "click",
// //             function (event) {

// //                 event.preventDefault();
// //                 event.stopPropagation();

// //                 lightDiya();
// //             }
// //         );


// //         /* =====================================================
// //            TOUCH
// //            ===================================================== */

// //         diyaHolder.addEventListener(
// //             "touchend",
// //             function (event) {

// //                 event.preventDefault();
// //                 event.stopPropagation();

// //                 lightDiya();
// //             },
// //             {
// //                 passive: false
// //             }
// //         );


// //         /* =====================================================
// //            KEYBOARD
// //            ===================================================== */

// //         diyaHolder.addEventListener(
// //             "keydown",
// //             function (event) {

// //                 if (
// //                     event.key === "Enter" ||
// //                     event.key === " "
// //                 ) {

// //                     event.preventDefault();

// //                     lightDiya();
// //                 }
// //             }
// //         );


// //         /* =====================================================
// //            ENTER OUR STORY
// //            ===================================================== */

// //         if (enterButton) {
// //             enterButton.addEventListener("click", function (e) {
// //                 e.preventDefault();

// //                 const grandScene = document.getElementById("grandWeddingScene");

// //                 if (!grandScene) {
// //                     console.error("grandWeddingScene not found");
// //                     return;
// //                 }

// //                 grandScene.removeAttribute("aria-hidden");

// //                 grandScene.scrollIntoView({
// //                     behavior: "smooth",
// //                     block: "start"
// //                 });

// //                 createGrandParticles();
// //             });
// //         }

// //     }


// //     /* =========================================================
// //        GLOBAL FUNCTION
// //        ========================================================= */

// //     window.initializeWelcome =
// //         initializeWelcome;


// //     /* =========================================================
// //        DYNAMIC PAGE SUPPORT
// //        ========================================================= */

// //     function checkWelcome() {

// //         if (
// //             document.getElementById("welcome") &&
// //             typeof window.initializeWelcome === "function"
// //         ) {
// //             window.initializeWelcome();
// //         }
// //     }


// //     if (document.readyState === "loading") {

// //         document.addEventListener(
// //             "DOMContentLoaded",
// //             checkWelcome
// //         );

// //     } else {

// //         checkWelcome();
// //     }


// //     /* =========================================================
// //        OBSERVE DYNAMIC HTML
// //        ========================================================= */

// //     const observer =
// //         new MutationObserver(function () {

// //             checkWelcome();

// //         });

// //     observer.observe(
// //         document.body,
// //         {
// //             childList: true,
// //             subtree: true
// //         }
// //     );

// // })();

// // const video = document.querySelector(".opening-video");
// // const button = document.querySelector(".tap-button");
// // const welcomeText = document.querySelector(".welcome-text");

// // // Play video when button is clicked
// // button.addEventListener("click", () => {
// //     video.play();
// //     button.style.display = "none";
// // });

// // // When the video finishes
// // video.addEventListener("ended", () => {
// //     video.style.display = "none";
// //     welcomeText.style.display = "block";
// // });

// (function () {

//     function initializeWelcome() {

//         const welcome = document.getElementById("welcome");

//         if (!welcome) {
//             return;
//         }

//         if (welcome.dataset.initialized === "true") {
//             return;
//         }

//         welcome.dataset.initialized = "true";


//         /* =====================================================
//            ELEMENTS
//            ===================================================== */

//         const diyaHolder =
//             document.getElementById("diyaHolder");

//         const enterButton =
//             document.getElementById("diyaEnter");

//         const grandScene =
//             document.getElementById("grandWeddingScene");

//         const diyaParticles =
//             document.getElementById("diyaParticles");

//         const grandParticles =
//             document.getElementById("grandSceneParticles");


//         if (!diyaHolder) {
//             console.error("Diya element not found.");
//             return;
//         }


//         /* =====================================================
//            DIYA PARTICLES
//            ===================================================== */

//         function createDiyaParticles() {

//             if (!diyaParticles) {
//                 return;
//             }

//             diyaParticles.innerHTML = "";

//             const count =
//                 window.innerWidth <= 768 ? 25 : 50;

//             for (let i = 0; i < count; i++) {

//                 const particle =
//                     document.createElement("span");

//                 particle.className =
//                     "diya-particle";

//                 particle.style.left =
//                     Math.random() * 100 + "%";

//                 particle.style.top =
//                     40 + Math.random() * 45 + "%";

//                 particle.style.width =
//                     2 + Math.random() * 3 + "px";

//                 particle.style.height =
//                     2 + Math.random() * 3 + "px";

//                 particle.style.setProperty(
//                     "--particle-x",
//                     (Math.random() * 180 - 90) + "px"
//                 );

//                 particle.style.setProperty(
//                     "--particle-duration",
//                     (3 + Math.random() * 4) + "s"
//                 );

//                 particle.style.setProperty(
//                     "--particle-delay",
//                     Math.random() * 4 + "s"
//                 );

//                 diyaParticles.appendChild(particle);
//             }
//         }


//         /* =====================================================
//            GRAND SCENE PARTICLES
//            ===================================================== */

//         function createGrandParticles() {

//             if (!grandParticles) {
//                 return;
//             }

//             grandParticles.innerHTML = "";

//             const count =
//                 window.innerWidth <= 768 ? 18 : 35;

//             for (let i = 0; i < count; i++) {

//                 const particle =
//                     document.createElement("span");

//                 particle.className =
//                     "grand-scene-particle";

//                 particle.style.left =
//                     Math.random() * 100 + "%";

//                 particle.style.top =
//                     55 + Math.random() * 40 + "%";

//                 particle.style.setProperty(
//                     "--grand-x",
//                     (Math.random() * 160 - 80) + "px"
//                 );

//                 particle.style.setProperty(
//                     "--grand-duration",
//                     (3 + Math.random() * 4) + "s"
//                 );

//                 particle.style.setProperty(
//                     "--grand-delay",
//                     Math.random() * 3 + "s"
//                 );

//                 grandParticles.appendChild(particle);
//             }
//         }


//         /* =====================================================
//            INITIALIZE
//            ===================================================== */

//         createDiyaParticles();


//         /* =====================================================
//            LIGHT DIYA
//            ===================================================== */

//         let diyaLit = false;

//         function lightDiya() {

//             if (diyaLit) {
//                 return;
//             }

//             diyaLit = true;

//             welcome.classList.add("is-lit");
//             welcome.classList.add("is-bursting");

//             createDiyaParticles();

//             setTimeout(function () {

//                 welcome.classList.add("is-revealed");

//             }, 900);

//             setTimeout(function () {

//                 welcome.classList.remove("is-bursting");

//             }, 1400);
//         }


//         /* =====================================================
//            DIYA CLICK
//            ===================================================== */

//         diyaHolder.addEventListener(
//             "click",
//             function (event) {

//                 event.preventDefault();
//                 event.stopPropagation();

//                 lightDiya();
//             }
//         );


//         /* =====================================================
//            TOUCH
//            ===================================================== */

//         diyaHolder.addEventListener(
//             "touchend",
//             function (event) {

//                 event.preventDefault();
//                 event.stopPropagation();

//                 lightDiya();
//             },
//             {
//                 passive: false
//             }
//         );


//         /* =====================================================
//            KEYBOARD
//            ===================================================== */

//         diyaHolder.addEventListener(
//             "keydown",
//             function (event) {

//                 if (
//                     event.key === "Enter" ||
//                     event.key === " "
//                 ) {

//                     event.preventDefault();

//                     lightDiya();
//                 }
//             }
//         );


//         /* =====================================================
//            ENTER OUR STORY
//            ===================================================== */

//         if (enterButton) {
//             enterButton.addEventListener("click", function (e) {
//                 e.preventDefault();

//                 const grandScene = document.getElementById("grandWeddingScene");

//                 if (!grandScene) {
//                     console.error("grandWeddingScene not found");
//                     return;
//                 }

//                 grandScene.removeAttribute("aria-hidden");

//                 grandScene.scrollIntoView({
//                     behavior: "smooth",
//                     block: "start"
//                 });

//                 createGrandParticles();

//                 // Load the rest of the wedding website (Save The Date,
//                 // Meet The Couple, etc.) so it's already appended below
//                 // the grand scene by the time the user scrolls into it.
//                 if (typeof window.loadHome === "function") {
//                     window.loadHome();
//                 }
//             });
//         }

//     }


//     /* =========================================================
//        GLOBAL FUNCTION
//        ========================================================= */

//     window.initializeWelcome =
//         initializeWelcome;


//     /* =========================================================
//        DYNAMIC PAGE SUPPORT
//        ========================================================= */

//     function checkWelcome() {

//         if (
//             document.getElementById("welcome") &&
//             typeof window.initializeWelcome === "function"
//         ) {
//             window.initializeWelcome();
//         }
//     }


//     if (document.readyState === "loading") {

//         document.addEventListener(
//             "DOMContentLoaded",
//             checkWelcome
//         );

//     } else {

//         checkWelcome();
//     }


//     /* =========================================================
//        OBSERVE DYNAMIC HTML
//        ========================================================= */

//     const observer =
//         new MutationObserver(function () {

//             checkWelcome();

//         });

//     observer.observe(
//         document.body,
//         {
//             childList: true,
//             subtree: true
//         }
//     );

// })();

// const video = document.querySelector(".opening-video");
// const button = document.querySelector(".tap-button");
// const welcomeText = document.querySelector(".welcome-text");

// // Play video when button is clicked
// button.addEventListener("click", () => {
//     video.play();
//     button.style.display = "none";
// });

// // When the video finishes
// video.addEventListener("ended", () => {
//     video.style.display = "none";
//     welcomeText.style.display = "block";
// });

(function () {

    function initializeWelcome() {

        const welcome = document.getElementById("welcome");

        if (!welcome) {
            return;
        }

        if (welcome.dataset.initialized === "true") {
            return;
        }

        welcome.dataset.initialized = "true";


        /* =====================================================
           ELEMENTS
           ===================================================== */

        const diyaHolder =
            document.getElementById("diyaHolder");

        const enterButton =
            document.getElementById("diyaEnter");

        const grandScene =
            document.getElementById("grandWeddingScene");

        const diyaParticles =
            document.getElementById("diyaParticles");

        const grandParticles =
            document.getElementById("grandSceneParticles");

        const diyaClickHint =
            document.getElementById("diyaClickHint");


        if (!diyaHolder) {
            console.error("Diya element not found.");
            return;
        }


        /* =====================================================
           DIYA PARTICLES
           ===================================================== */

        function createDiyaParticles() {

            if (!diyaParticles) {
                return;
            }

            diyaParticles.innerHTML = "";

            const count =
                window.innerWidth <= 768 ? 25 : 50;

            for (let i = 0; i < count; i++) {

                const particle =
                    document.createElement("span");

                particle.className =
                    "diya-particle";

                particle.style.left =
                    Math.random() * 100 + "%";

                particle.style.top =
                    40 + Math.random() * 45 + "%";

                particle.style.width =
                    2 + Math.random() * 3 + "px";

                particle.style.height =
                    2 + Math.random() * 3 + "px";

                particle.style.setProperty(
                    "--particle-x",
                    (Math.random() * 180 - 90) + "px"
                );

                particle.style.setProperty(
                    "--particle-duration",
                    (3 + Math.random() * 4) + "s"
                );

                particle.style.setProperty(
                    "--particle-delay",
                    Math.random() * 4 + "s"
                );

                diyaParticles.appendChild(particle);
            }
        }


        /* =====================================================
           GRAND SCENE PARTICLES
           ===================================================== */

        function createGrandParticles() {

            if (!grandParticles) {
                return;
            }

            grandParticles.innerHTML = "";

            const count =
                window.innerWidth <= 768 ? 18 : 35;

            for (let i = 0; i < count; i++) {

                const particle =
                    document.createElement("span");

                particle.className =
                    "grand-scene-particle";

                particle.style.left =
                    Math.random() * 100 + "%";

                particle.style.top =
                    55 + Math.random() * 40 + "%";

                particle.style.setProperty(
                    "--grand-x",
                    (Math.random() * 160 - 80) + "px"
                );

                particle.style.setProperty(
                    "--grand-duration",
                    (3 + Math.random() * 4) + "s"
                );

                particle.style.setProperty(
                    "--grand-delay",
                    Math.random() * 3 + "s"
                );

                grandParticles.appendChild(particle);
            }
        }


        /* =====================================================
           INITIALIZE
           ===================================================== */

        createDiyaParticles();


        /* =====================================================
           LIGHT DIYA
           ===================================================== */

        let diyaLit = false;

        function lightDiya() {

            if (diyaLit) {
                return;
            }

            diyaLit = true;

            welcome.classList.add("is-lit");
            welcome.classList.add("is-bursting");

            createDiyaParticles();

            // Belt-and-braces: don't just rely on the CSS class fading
            // the hint out — actually remove it from layout so it can
            // never sit underneath the revealed invitation text.
            if (diyaClickHint) {

                diyaClickHint.setAttribute("aria-hidden", "true");

                setTimeout(function () {

                    diyaClickHint.style.display = "none";

                }, 500);
            }

            setTimeout(function () {

                welcome.classList.add("is-revealed");

            }, 900);

            setTimeout(function () {

                welcome.classList.remove("is-bursting");

            }, 1400);
        }


        /* =====================================================
           DIYA CLICK
           ===================================================== */

        diyaHolder.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                lightDiya();
            }
        );


        /* =====================================================
           TOUCH
           ===================================================== */

        diyaHolder.addEventListener(
            "touchend",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                lightDiya();
            },
            {
                passive: false
            }
        );


        /* =====================================================
           KEYBOARD
           ===================================================== */

        diyaHolder.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    lightDiya();
                }
            }
        );


        /* =====================================================
           ENTER OUR STORY
           ===================================================== */

        if (enterButton) {
            enterButton.addEventListener("click", function (e) {
                e.preventDefault();

                // Swap the opening out for the main site immediately,
                // no scrolling required.
                if (typeof window.loadHome === "function") {
                    window.loadHome();
                }
            });
        }

    }


    /* =========================================================
       GLOBAL FUNCTION
       ========================================================= */

    window.initializeWelcome =
        initializeWelcome;


    /* =========================================================
       DYNAMIC PAGE SUPPORT
       ========================================================= */

    function checkWelcome() {

        if (
            document.getElementById("welcome") &&
            typeof window.initializeWelcome === "function"
        ) {
            window.initializeWelcome();
        }
    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            checkWelcome
        );

    } else {

        checkWelcome();
    }


    /* =========================================================
       OBSERVE DYNAMIC HTML
       ========================================================= */

    const observer =
        new MutationObserver(function () {

            checkWelcome();

        });

    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

})();