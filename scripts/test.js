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

            enterButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    if (!grandScene) {

                        console.error(
                            "grandWeddingScene not found."
                        );

                        return;
                    }

                    /* Show the next section */

                    grandScene.classList.add(
                        "grand-scene-active"
                    );

                    grandScene.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    createGrandParticles();


                    /* Scroll to the next section */

                    setTimeout(function () {

                        grandScene.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 100);
                }
            );
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