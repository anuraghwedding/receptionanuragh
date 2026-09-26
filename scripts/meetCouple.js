function initializeMeetCouple() {

    gsap.registerPlugin(ScrollTrigger);

    const container = document.querySelector(".burst-container");

    if (!container) return;

    container.innerHTML = "";

    /* =========================================
       GALLERY
    ========================================= */

    const images = [
        "./public/images/gallery/1.webp",
        "./public/images/gallery/2.webp",
        "./public/images/gallery/3.webp",
        "./public/images/gallery/4.webp",
        "./public/images/gallery/5.webp",
        "./public/images/gallery/6.webp",
        "./public/images/gallery/7.webp",
        "./public/images/gallery/8.webp"
    ];

    /* =========================================
       CREATE BURST PHOTOS
    ========================================= */

    const TOTAL = 40;

    for (let i = 0; i < TOTAL; i++) {

        const img = document.createElement("img");

        img.src = images[
            Math.floor(Math.random() * images.length)
        ];

        img.classList.add("small-photo");

        gsap.set(img, {
            opacity: 0,
            scale: 0.25,
            x: gsap.utils.random(-60, 60),
            y: gsap.utils.random(-60, 60),
            rotation: gsap.utils.random(-35, 35),
            force3D: true
        });

        container.appendChild(img);
    }

    const photos = container.querySelectorAll(".small-photo");

    const tl = gsap.timeline({
        defaults: {
            ease: "sine.out"
        },
        scrollTrigger: {
            trigger: ".meet-couple",
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });
 tl.to(".couple-intro", {
    opacity: 0,
    scale: 0.96,
    y: -25,
    duration: 0.8,
    ease: "power2.inOut"
}, 0);
    photos.forEach((photo) => {

        const x = gsap.utils.random(-900, 900);
        const y = gsap.utils.random(-600, 600);

        const start = gsap.utils.random(0, 0.15);

        // Fade in
        tl.to(photo, {
            opacity: 1,
            scale: 0.8,
            duration: 0.6,
            ease: "power2.out"
        }, start);

        // Fly away
        tl.to(photo, {
            x,
            y,
            scale: gsap.utils.random(0.9, 1.4),
            rotation: gsap.utils.random(-25, 25),
            duration: 3,
            ease: "none"
        }, start + 0.05);

    });

    tl.to(".burst-container", {
        opacity: 0,
        duration: 0.6,
        ease: "expo.out"
    });

    tl.to(".couple-final", {
        opacity: 1,
        duration: 0.8,
        ease: "expo.out"
    }, "-=0.25");

    tl.fromTo(".bride",
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }
    );

    tl.fromTo(".groom",
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        },
        "-=0.7"
    );

}