
/* =========================================================
   WELCOME SECTION
   ========================================================= */

function initializeWelcome() {

    const section = document.querySelector("#welcome");

    if (!section) {
        console.warn("Welcome section not found.");
        return;
    }

    /* Prevent duplicate initialization */
    if (section.dataset.welcomeInitialized === "true") {
        return;
    }

    section.dataset.welcomeInitialized = "true";

    createWelcomeParticles(section);
    createWelcomePetals(section);

    initializeWelcomeCardTilt(section);
    initializeWelcomeEntrance(section);
}


/* =========================================================
   GOLD PARTICLES
   ========================================================= */

function createWelcomeParticles(section) {

    const container =
        section.querySelector(".welcome-particles");

    if (!container) return;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "welcome-particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;

        particle.style.setProperty(
            "--particle-duration",
            `${3 + Math.random() * 5}s`
        );

        particle.style.animationDelay =
            `${Math.random() * 4}s`;

        const size =
            1.5 + Math.random() * 3;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        fragment.appendChild(particle);
    }

    container.appendChild(fragment);
}


/* =========================================================
   FALLING PETALS
   ========================================================= */

function createWelcomePetals(section) {

    const container =
        section.querySelector(".welcome-petals");

    if (!container) return;

    const fragment =
        document.createDocumentFragment();

    const symbols = [
        "🌸",
        "🌼",
        "✿"
    ];

    for (let i = 0; i < 18; i++) {

        const petal =
            document.createElement("span");

        petal.className =
            "welcome-petal";

        petal.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        petal.style.left =
            `${Math.random() * 100}%`;

        petal.style.setProperty(
            "--petal-x",
            `${-100 + Math.random() * 200}px`
        );

        petal.style.setProperty(
            "--petal-duration",
            `${7 + Math.random() * 7}s`
        );

        petal.style.animationDelay =
            `${Math.random() * 8}s`;

        petal.style.fontSize =
            `${10 + Math.random() * 9}px`;

        fragment.appendChild(petal);
    }

    container.appendChild(fragment);
}


/* =========================================================
   CARD 3D TILT
   ========================================================= */

function initializeWelcomeCardTilt(section) {

    const card =
        section.querySelector("#welcomeCard");

    if (!card) return;

    /* Don't use tilt on touch devices */
    if (
        window.matchMedia("(hover: none)").matches ||
        window.innerWidth < 768
    ) {
        return;
    }

    let animationFrame = null;

    const handleMove = (event) => {

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        animationFrame = requestAnimationFrame(() => {

            const rect =
                card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;

            const rotateY =
                (x - 0.5) * 5;

            const rotateX =
                (0.5 - y) * 5;

            card.style.transform =
                `perspective(1400px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });
    };


    const resetCard = () => {

        card.style.transform =
            "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    };


    section.addEventListener(
        "mousemove",
        handleMove,
        { passive: true }
    );

    section.addEventListener(
        "mouseleave",
        resetCard
    );
}


/* =========================================================
   ENTRANCE ANIMATION
   ========================================================= */

function initializeWelcomeEntrance(section) {

    const card =
        section.querySelector(".welcome-card");

    if (!card) return;


    /* If GSAP exists, use it */
    if (typeof gsap !== "undefined") {

        gsap.set(
            card,
            {
                opacity: 0,
                scale: 0.92,
                y: 35
            }
        );

        gsap.set(
            section.querySelectorAll(
                ".welcome-om, .welcome-mantra, " +
                ".welcome-small-line, .welcome-title-wrapper, " +
                ".welcome-subtitle, .welcome-lotus, " +
                ".welcome-names, .welcome-divider, " +
                ".welcome-message, .welcome-details, " +
                ".welcome-bottom-ornament"
            ),
            {
                opacity: 0,
                y: 18
            }
        );


        const timeline =
            gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });


        timeline
            .to(card, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.1
            })

            .to(
                ".welcome-section .welcome-om",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.55
                },
                "-=0.55"
            )

            .to(
                ".welcome-section .welcome-mantra",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.45
                },
                "-=0.3"
            )

            .to(
                ".welcome-section .welcome-small-line",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4
                },
                "-=0.2"
            )

            .to(
                ".welcome-section .welcome-title-wrapper",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65
                },
                "-=0.15"
            )

            .to(
                ".welcome-section .welcome-subtitle",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4
                },
                "-=0.25"
            )

            .to(
                ".welcome-section .welcome-lotus",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4
                },
                "-=0.15"
            )

            .to(
                ".welcome-section .welcome-names",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65
                },
                "-=0.2"
            )

            .to(
                ".welcome-section .welcome-divider",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4
                },
                "-=0.25"
            )

            .to(
                ".welcome-section .welcome-message",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                },
                "-=0.15"
            )

            .to(
                ".welcome-section .welcome-details",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                },
                "-=0.2"
            )

            .to(
                ".welcome-section .welcome-bottom-ornament",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4
                },
                "-=0.2"
            );


        /* Gentle decoration movement */

        gsap.to(
            section.querySelector(".feather-left"),
            {
                y: -12,
                rotation: -23,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

        gsap.to(
            section.querySelector(".feather-right"),
            {
                y: 12,
                rotation: 149,
                duration: 4.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

        gsap.to(
            section.querySelector(".kalash-left"),
            {
                y: -8,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

        gsap.to(
            section.querySelector(".kalash-right"),
            {
                y: 8,
                duration: 4.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

    } else {

        /* Fallback if GSAP isn't loaded */

        card.style.opacity = "1";
        card.style.transform = "none";
    }
}


/* =========================================================
   DYNAMIC LOADING SUPPORT
   ========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWelcome
    );

} else {

    initializeWelcome();
}
