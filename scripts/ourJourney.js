function initializeOurJourney() {

    const diaryBook =
        document.getElementById("diaryBook");

    const diaryEntrance =
        document.getElementById("diaryEntrance");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!diaryBook || !diaryEntrance) {

        console.warn(
            "Our Journey elements were not found."
        );

        return;
    }


    /* =====================================================
       PREVENT DOUBLE INITIALIZATION
    ===================================================== */

    if (
        diaryBook.dataset.initialized === "true"
    ) {
        return;
    }


    /* =====================================================
       CHECK STPAGEFLIP
    ===================================================== */

    if (
        typeof St === "undefined" ||
        typeof St.PageFlip === "undefined"
    ) {

        console.error(
            "StPageFlip library is not loaded."
        );

        return;
    }


    diaryBook.dataset.initialized = "true";


    /* =====================================================
       GET PAGES
    ===================================================== */

    const pages =
        Array.from(
            diaryBook.querySelectorAll(
                ".diary-page"
            )
        );


    if (!pages.length) {

        console.error(
            "No diary pages found."
        );

        return;
    }


    /* =====================================================
       DEVICE
    ===================================================== */

    const isMobile =
        window.matchMedia(
            "(max-width: 768px)"
        ).matches;


    let pageFlip;


    /* =====================================================
       CREATE PAGE FLIP
    ===================================================== */

    if (isMobile) {

        pageFlip =
            new St.PageFlip(
                diaryBook,
                {

                    width: 360,

                    height: 500,

                    size: "stretch",

                    minWidth: 270,

                    maxWidth: 390,

                    minHeight: 380,

                    maxHeight: 570,

                    showCover: true,

                    usePortrait: true,

                    /*
                     * SMOOTH FLIP
                     */
                    flippingTime: 1450,

                    drawShadow: true,

                    maxShadowOpacity: 0.30,

                    /*
                     * Touch
                     */
                    mobileScrollSupport: true,

                    swipeDistance: 18,

                    useMouseEvents: true,

                    disableFlipByClick: false,

                    autoSize: true,

                    startPage: 0

                }
            );

    }

    else {

        pageFlip =
            new St.PageFlip(
                diaryBook,
                {

                    width: 560,

                    height: 440,

                    size: "fixed",

                    minWidth: 500,

                    maxWidth: 560,

                    minHeight: 400,

                    maxHeight: 440,

                    showCover: true,

                    usePortrait: false,

                    /*
                     * IMPORTANT
                     * Longer duration gives
                     * a softer page turn.
                     */
                    flippingTime: 1450,

                    /*
                     * Softer shadow
                     */
                    drawShadow: true,

                    maxShadowOpacity: 0.30,

                    /*
                     * Interaction
                     */
                    mobileScrollSupport: true,

                    swipeDistance: 25,

                    useMouseEvents: true,

                    disableFlipByClick: false,

                    autoSize: false,

                    startPage: 0

                }
            );

    }


    /* =====================================================
       LOAD PAGES
    ===================================================== */

    pageFlip.loadFromHTML(
        pages
    );


    /* =====================================================
       VARIABLES
    ===================================================== */

    let autoTimer = null;

    let userInteracted = false;

    let flipping = false;

    let started = false;

    const scrollHint = document.getElementById("journeyScrollHint");

    function updateScrollHint(pageIndex) {
        if (!scrollHint) return;

        const lastIndex = pageFlip.getPageCount() - 1;

        scrollHint.classList.toggle("is-visible", pageIndex >= lastIndex);
    }


    /* =====================================================
       STOP AUTO FLIP
    ===================================================== */

    function stopAutoFlip() {

        if (autoTimer !== null) {

            clearTimeout(
                autoTimer
            );

            autoTimer = null;
        }

    }


    /* =====================================================
       AUTO FLIP
    ===================================================== */

    function scheduleAutoFlip(
        delay = 5000
    ) {

        stopAutoFlip();


        autoTimer =
            setTimeout(
                function () {

                    if (
                        userInteracted ||
                        flipping
                    ) {

                        return;
                    }


                    const current =
                        pageFlip
                            .getCurrentPageIndex();


                    const total =
                        pageFlip
                            .getPageCount();


                    if (
                        current >=
                        total - 1
                    ) {

                        return;
                    }


                    flipping = true;


                    /*
                     * Smooth automatic turn
                     */

                    pageFlip.flipNext(
                        "bottom"
                    );

                },
                delay
            );

    }


    /* =====================================================
       FLIP EVENT
    ===================================================== */

    pageFlip.on(
        "flip",
        function (event) {

             updateScrollHint(event.data);

            /*
             * Wait until the physical
             * page animation has finished.
             */

            setTimeout(
                function () {

                    flipping = false;

                },
                80
            );


            /*
             * Give the reader time to
             * look at the new page.
             */

            if (!userInteracted) {

                scheduleAutoFlip(
                    5000
                );

            }

        }
    );


    /* =====================================================
       CHANGE STATE
    ===================================================== */

    pageFlip.on(
        "changeState",
        function (event) {

            /*
             * User has started dragging
             */

            if (
                event.data ===
                "user_fold" ||

                event.data ===
                "fold_corner"
            ) {

                userInteracted = true;

                stopAutoFlip();

            }


            /*
             * Page is completely still
             */

            if (
                event.data ===
                "read"
            ) {

                flipping = false;

            }

        }
    );


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    const previousButton =
        document.getElementById(
            "diaryPrev"
        );


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                userInteracted = true;

                stopAutoFlip();


                if (flipping) {
                    return;
                }


                flipping = true;


                pageFlip.flipPrev(
                    "top"
                );

            }
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    const nextButton =
        document.getElementById(
            "diaryNext"
        );


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                userInteracted = true;

                stopAutoFlip();


                if (flipping) {
                    return;
                }


                flipping = true;


                pageFlip.flipNext(
                    "bottom"
                );

            }
        );

    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    diaryBook.setAttribute(
        "tabindex",
        "0"
    );


    diaryBook.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();


                userInteracted = true;

                stopAutoFlip();


                if (flipping) {
                    return;
                }


                flipping = true;


                pageFlip.flipNext(
                    "bottom"
                );

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();


                userInteracted = true;

                stopAutoFlip();


                if (flipping) {
                    return;
                }


                flipping = true;


                pageFlip.flipPrev(
                    "top"
                );

            }

        }
    );


    /* =====================================================
       DIARY ENTRANCE
    ===================================================== */

    function startDiaryAnimation() {

        if (started) {
            return;
        }


        started = true;


        /*
         * Smooth arrival
         */

        requestAnimationFrame(
            function () {

                diaryEntrance.classList.add(
                    "is-arrived"
                );

            }
        );


        /*
         * Let the book settle.
         */

        setTimeout(
            function () {

                diaryEntrance.classList.add(
                    "is-settled"
                );

            },
            2500
        );


        /*
         * Wait before opening.
         *
         * This makes the entrance feel
         * cinematic instead of rushed.
         */

        setTimeout(
            function () {

                if (userInteracted) {
                    return;
                }


                flipping = true;


                pageFlip.flipNext(
                    "bottom"
                );

            },
            4200
        );

    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting &&
                            entry.intersectionRatio >
                            0.15
                        ) {

                            startDiaryAnimation();

                            observer.disconnect();

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    observer.observe(
        diaryEntrance
    );


    /* =====================================================
       FALLBACK
    ===================================================== */

    setTimeout(
        function () {

            if (started) {
                return;
            }


            const rect =
                diaryEntrance
                    .getBoundingClientRect();


            const visible =
                rect.top <
                window.innerHeight &&
                rect.bottom >
                0;


            if (visible) {

                startDiaryAnimation();

                observer.disconnect();

            }

        },
        700
    );


    /* =====================================================
       GLOBAL ACCESS
    ===================================================== */

    window.ourJourneyPageFlip =
        pageFlip;

}