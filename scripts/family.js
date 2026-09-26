function initializeFamilySection() {

    const section =
        document.getElementById("familySection");

    if (!section) {
        return;
    }

    if (
        section.dataset.initialized === "true"
    ) {
        return;
    }

    section.dataset.initialized = "true";


    /* =====================================================
       GSAP
    ===================================================== */

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {

        console.warn(
            "GSAP / ScrollTrigger not loaded."
        );

        return;
    }

    gsap.registerPlugin(
        ScrollTrigger
    );


    /* =====================================================
       FAMILY DATA
    ===================================================== */

    const families = [

        {
            label: "THE BRIDE",

            title: "Anusua's Family",

            image:
                "../public/images/family/bride-family.jpeg"

        },

        {
            label: "THE GROOM",

            title: "Raghvendra's Family",

            image:
                "../public/images/family/groom-family.jpeg"

        }

    ];


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    gsap.set(
        [
            ".family-feature-bride",
            ".family-feature-groom"
        ],
        {
            opacity: 0
        }
    );

    gsap.set(
        ".family-union",
        {
            opacity: 0,
            scale: .7
        }
    );

    gsap.set(
        ".family-conclusion",
        {
            opacity: 0,
            y: 25
        }
    );


    /* =====================================================
       VINES
    ===================================================== */

    const vines =
        section.querySelectorAll(
            ".vine-path"
        );

    vines.forEach(function(vine) {

        const length =
            vine.getTotalLength();

        vine.style.strokeDasharray =
            length;

        vine.style.strokeDashoffset =
            length;

    });


    /* =====================================================
       MAIN SCROLL ANIMATION
    ===================================================== */

    const timeline =
        gsap.timeline({

            scrollTrigger: {

                trigger: section,

                start: "top top",

                end: "+=1900",

                scrub: 1.3,

                pin: true,

                anticipatePin: 1,

                invalidateOnRefresh: true

            }

        });


    /* =====================================================
       HEADER
    ===================================================== */

    timeline.fromTo(

        ".family-heading",

        {
            opacity: 0,
            y: 35
        },

        {
            opacity: 1,
            y: 0,
            duration: .7,
            ease: "power3.out"
        }

    );


    /* =====================================================
       LEFT FAMILY
    ===================================================== */

    timeline.to(

        ".family-feature-bride",

        {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }

    );


    /* =====================================================
       LEFT VINE
    ===================================================== */

    timeline.to(

        ".vine-left",

        {
            strokeDashoffset: 0,
            duration: .8,
            ease: "power2.out"
        },

        "<"

    );


    /* =====================================================
       CENTRE VINE
    ===================================================== */

    timeline.to(

        ".vine-center",

        {
            strokeDashoffset: 0,
            duration: .7,
            ease: "power2.out"
        }

    );


    /* =====================================================
       UNION
    ===================================================== */

    timeline.to(

        ".family-union",

        {
            opacity: 1,
            scale: 1,
            duration: .8,
            ease: "back.out(1.6)"
        }

    );


    /* =====================================================
       RIGHT VINE
    ===================================================== */

    timeline.to(

        ".vine-right",

        {
            strokeDashoffset: 0,
            duration: .8,
            ease: "power2.out"
        }

    );


    /* =====================================================
       RIGHT FAMILY
    ===================================================== */

    timeline.to(

        ".family-feature-groom",

        {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }

    );


    /* =====================================================
       ROOTS
    ===================================================== */

    timeline.to(

        [
            ".vine-root-left",
            ".vine-root-right"
        ],

        {
            strokeDashoffset: 0,
            duration: .8,
            stagger: .1,
            ease: "power2.out"
        }

    );


    /* =====================================================
       FINAL MESSAGE
    ===================================================== */

    timeline.to(

        ".family-conclusion",

        {
            opacity: 1,
            y: 0,
            duration: .8,
            ease: "power3.out"
        }

    );


    /* =====================================================
       FAMILY ART HOVER
    ===================================================== */

    section
        .querySelectorAll(".family-art")
        .forEach(function(button) {

            button.addEventListener(
                "mousemove",
                function(event) {

                    const frame =
                        button.querySelector(
                            ".art-frame"
                        );

                    if (!frame) {
                        return;
                    }

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateY =
                        ((x / rect.width) - .5) * 5;

                    const rotateX =
                        -((y / rect.height) - .5) * 5;


                    gsap.to(
                        frame,
                        {
                            rotateX:
                                rotateX,

                            rotateY:
                                rotateY,

                            duration: .35,

                            ease: "power2.out"
                        }
                    );

                }
            );


            button.addEventListener(
                "mouseleave",
                function() {

                    const frame =
                        button.querySelector(
                            ".art-frame"
                        );

                    gsap.to(
                        frame,
                        {
                            rotateX: 0,
                            rotateY: 0,
                            duration: .6,
                            ease: "power3.out"
                        }
                    );

                }
            );

        });


    /* =====================================================
       MODAL
    ===================================================== */

    const modal =
        document.getElementById(
            "familyModal"
        );

    const modalImage =
        document.getElementById(
            "modalFamilyImage"
        );

    const modalLabel =
        document.getElementById(
            "modalLabel"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const closeButton =
        document.getElementById(
            "familyModalClose"
        );


    function openFamily(index) {

        const family =
            families[index];


        modalImage.src =
            family.image;

        modalImage.alt =
            family.title;

        modalLabel.textContent =
            family.label;

        modalTitle.textContent =
            family.title;


        modal.classList.add(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";


        gsap.fromTo(

            ".modal-content",

            {
                opacity: 0,
                scale: .92,
                y: 25
            },

            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: .5,
                ease: "power3.out"
            }

        );

    }


    function closeFamily() {

        modal.classList.remove(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    section
        .querySelectorAll(".family-art")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const type =
                        button.dataset.family;

                    const index =
                        type === "bride"
                            ? 0
                            : 1;

                    openFamily(index);

                }
            );

        });


    closeButton.addEventListener(
        "click",
        closeFamily
    );


    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal
            ) {

                closeFamily();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeFamily();

            }

        }
    );

}