// const swiperElement = document.querySelector(".capturedSwiper");

// if (swiperElement) {

//     new Swiper(".capturedSwiper", {

//         effect: "coverflow",

//         grabCursor: true,

//         centeredSlides: true,

//         loop: true,

//         slidesPerView: "auto",

//         speed: 800,

//         autoplay: {
//             delay: 3000,
//             disableOnInteraction: false,
//         },

//         coverflowEffect: {

//             rotate: 0,

//             stretch: 0,

//             depth: 250,

//             modifier: 1.8,

//             scale: 0.85,

//             slideShadows: false,

//         },

//         navigation: {

//             nextEl: ".swiper-button-next",

//             prevEl: ".swiper-button-prev",

//         },

//         pagination: {

//             el: ".swiper-pagination",

//             clickable: true,

//         },

//         breakpoints: {

//             0: {

//                 spaceBetween: -60,

//             },

//             768: {

//                 spaceBetween: -100,

//             },

//             1200: {

//                 spaceBetween: -140,

//             }

//         }

//     });

// }

// function initializeCapturedMoments() {

//     const swiper = document.querySelector(".capturedSwiper");

//     if (!swiper) return;

//     new Swiper(".capturedSwiper", {

//         effect: "coverflow",

//         grabCursor: true,

//         centeredSlides: true,

//         slidesPerView: "auto",

//         loop: true,

//         speed: 800,

//         autoplay: {
//             delay: 3000,
//             disableOnInteraction: false,
//         },

//         coverflowEffect: {
//             rotate: 0,
//             stretch: -80,
//             depth: 350,
//             modifier: 2,
//             scale: 0.8,
//             slideShadows: false,
//         },

//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },

//         pagination: {
//             el: ".swiper-pagination",
//             clickable: true,
//         }

//     });

// }

function initializeCapturedMoments() {

    const marquee = document.querySelector(".gallery-marquee");
    const track = document.querySelector(".gallery-track");

    if (!marquee || !track) {
        return;
    }

    const items = Array.from(
        track.querySelectorAll(".gallery-item")
    );

    if (items.length < 2) {
        return;
    }


    /* -----------------------------------------------------
       SETTINGS
    ----------------------------------------------------- */

    const originalCount = items.length / 2;

    const speed = 0.05; 
    // Increase to 0.6 / 0.7 for faster movement


    let position = 0;

    let lastTime = performance.now();


    /* -----------------------------------------------------
       GET WIDTH OF ONE COMPLETE SET
    ----------------------------------------------------- */

    function getSetWidth() {

        const first = items[0];
        const duplicate = items[originalCount];

        if (!first || !duplicate) {
            return 0;
        }

        return duplicate.offsetLeft - first.offsetLeft;
    }


    /* -----------------------------------------------------
       UPDATE PHOTO SIZES
    ----------------------------------------------------- */

    function updatePhotoSizes() {

        const screenCenter =
            window.innerWidth / 2;


        items.forEach(item => {

            const rect = item.getBoundingClientRect();

            const itemCenter =
                rect.left + rect.width / 2;


            /*
               Distance from centre of screen
            */

            const distance =
                Math.abs(screenCenter - itemCenter);


            /*
               Maximum distance where scaling happens
            */

            const maxDistance = 500;


            /*
               Convert distance to 0 → 1
            */

            let factor =
                1 - (distance / maxDistance);


            factor =
                Math.max(0, Math.min(1, factor));


            /*
               SIDE IMAGE
               scale = 0.72

               CENTRE IMAGE
               scale = 1.15
            */

            const scale =
                0.72 + (factor * 0.43);


            /*
               Opacity also changes slightly
            */

            const opacity =
                0.55 + (factor * 0.45);


            item.style.transform =
                `scale(${scale})`;

            item.style.opacity =
                opacity;
        });
    }


    /* -----------------------------------------------------
       CONTINUOUS ANIMATION
    ----------------------------------------------------- */

    function animate(currentTime) {

        const delta =
            currentTime - lastTime;

        lastTime = currentTime;


        /*
           Move continuously
        */

        position -=
            speed * delta;


        const setWidth =
            getSetWidth();


        /*
           When first set has completely moved away,
           jump back by exactly one set width.

           Because the second set is identical,
           the user will NOT see the jump.
        */

        if (setWidth > 0 && Math.abs(position) >= setWidth) {

            position += setWidth;
        }


        /*
           Move gallery
        */

        track.style.transform =
            `translate3d(${position}px, 0, 0)`;


        /*
           Resize based on centre position
        */

        updatePhotoSizes();


        requestAnimationFrame(animate);
    }


    /* -----------------------------------------------------
       START
    ----------------------------------------------------- */

    requestAnimationFrame(animate);


    /* -----------------------------------------------------
       RECALCULATE ON RESIZE
    ----------------------------------------------------- */

    window.addEventListener("resize", () => {

        updatePhotoSizes();

    });

}