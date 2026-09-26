function initializeScratchCard() {

    const canvas = document.getElementById("scratchCanvas");
    const area = document.querySelector(".scratch-area");
    const instruction = document.getElementById("scratchInstruction");

    if (!canvas || !area) {
        console.error("Scratch card elements not found.");
        return;
    }

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;

    let isDrawing = false;
    let hasMoved = false;
    let revealed = false;

    let pointerId = null;

    let lastX = 0;
    let lastY = 0;

    let pendingX = 0;
    let pendingY = 0;

    let animationFrame = null;

    let scratchedDistance = 0;

    /*
     * Only allow scratching once the card is
     * mostly settled in the viewport. This stops
     * a scroll gesture that merely passes over the
     * card (finger swiping down the page) from being
     * mistaken for a scratch before the user has even
     * finished scrolling to it.
     */
    let cardInView = false;

    const BRUSH_SIZE = 42;
    const TAP_DISTANCE = 6;

    /*
     * We don't inspect the canvas while scratching.
     * Instead, use approximate movement distance.
     * This is dramatically lighter and prevents freezing.
     */
    const REQUIRED_SCRATCH_DISTANCE = 3000;


    /* =====================================================
       CANVAS SIZE
    ===================================================== */

    function resizeCanvas() {

        const rect = area.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        drawScratchSurface();
    }


    /* =====================================================
       GOLD SURFACE
    ===================================================== */

    function drawScratchSurface() {

        ctx.globalCompositeOperation = "source-over";

        /* Main gold */
        const gradient = ctx.createLinearGradient(
            0,
            0,
            width,
            height
        );

        gradient.addColorStop(0, "#9c5d0a");
        gradient.addColorStop(0.18, "#f4cf67");
        gradient.addColorStop(0.35, "#c28b25");
        gradient.addColorStop(0.52, "#ffe9a0");
        gradient.addColorStop(0.7, "#b97916");
        gradient.addColorStop(0.88, "#f3d477");
        gradient.addColorStop(1, "#a9660d");

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /* Shine */
        const shine = ctx.createLinearGradient(
            0,
            0,
            width,
            0
        );

        shine.addColorStop(
            0,
            "rgba(255,255,255,0)"
        );

        shine.addColorStop(
            0.48,
            "rgba(255,255,255,0.08)"
        );

        shine.addColorStop(
            0.5,
            "rgba(255,255,255,0.35)"
        );

        shine.addColorStop(
            0.52,
            "rgba(255,255,255,0.08)"
        );

        shine.addColorStop(
            1,
            "rgba(255,255,255,0)"
        );

        ctx.fillStyle = shine;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        /* Subtle pattern */
        ctx.fillStyle =
            "rgba(90,45,0,0.12)";

        for (
            let x = 15;
            x < width;
            x += 32
        ) {

            for (
                let y = 15;
                y < height;
                y += 32
            ) {

                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    1.2,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }
        }


        /* Border */
        ctx.strokeStyle =
            "rgba(70,35,0,0.3)";

        ctx.lineWidth = 2;

        ctx.strokeRect(
            10,
            10,
            width - 20,
            height - 20
        );
    }


    /* =====================================================
       POINTER POSITION
    ===================================================== */

    function getPosition(event) {

        const rect =
            canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }


    /* =====================================================
       DRAW ONE SCRATCH STROKE
    ===================================================== */

    function drawStroke(fromX, fromY, toX, toY) {

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.lineWidth =
            BRUSH_SIZE;

        ctx.lineCap =
            "round";

        ctx.lineJoin =
            "round";


        ctx.beginPath();

        ctx.moveTo(
            fromX,
            fromY
        );

        ctx.lineTo(
            toX,
            toY
        );

        ctx.stroke();


        /*
         * Round end of brush
         */

        ctx.beginPath();

        ctx.arc(
            toX,
            toY,
            BRUSH_SIZE / 2,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }


    /* =====================================================
       PROCESS SCRATCH
    ===================================================== */

    function renderScratch() {

        animationFrame = null;

        if (
            !isDrawing ||
            revealed
        ) {
            return;
        }


        const dx =
            pendingX - lastX;

        const dy =
            pendingY - lastY;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distance > 0) {

            /*
             * Interpolate only when the pointer
             * moved a significant distance.
             */

            if (distance > 8) {

                const steps =
                    Math.ceil(
                        distance / 8
                    );

                for (
                    let i = 1;
                    i <= steps;
                    i++
                ) {

                    const t =
                        i / steps;

                    const x =
                        lastX +
                        dx * t;

                    const y =
                        lastY +
                        dy * t;

                    drawStroke(
                        lastX,
                        lastY,
                        x,
                        y
                    );

                    lastX = x;
                    lastY = y;
                }

            } else {

                drawStroke(
                    lastX,
                    lastY,
                    pendingX,
                    pendingY
                );

                lastX = pendingX;
                lastY = pendingY;
            }


            scratchedDistance += distance;


            if (
                scratchedDistance >
                TAP_DISTANCE
            ) {

                hasMoved = true;
            }


            /*
             * Reveal after enough actual movement.
             */

            if (
                scratchedDistance >= REQUIRED_SCRATCH_DISTANCE
            ) {

                revealCard();
            }
        }
    }


    /* =====================================================
       POINTER DOWN
    ===================================================== */

    function pointerDown(event) {

        if (revealed) {
            return;
        }

        if (!cardInView) {
            return;
        }


        event.preventDefault();


        pointerId =
            event.pointerId;


        isDrawing = true;

        hasMoved = false;

        scratchedDistance = 0;


        const pos =
            getPosition(event);


        lastX = pos.x;
        lastY = pos.y;

        pendingX = pos.x;
        pendingY = pos.y;


        /*
         * Capture pointer so scratching continues
         * even if finger/mouse leaves the canvas.
         */

        canvas.setPointerCapture(
            pointerId
        );


        /*
         * Initial brush mark
         */

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.beginPath();

        ctx.arc(
            pos.x,
            pos.y,
            BRUSH_SIZE / 2,
            0,
            Math.PI * 2
        );

        ctx.fill();


        if (instruction) {

            instruction.style.opacity =
                "0";
        }
    }


    /* =====================================================
       POINTER MOVE
    ===================================================== */

    function pointerMove(event) {

        if (
            !isDrawing ||
            revealed ||
            event.pointerId !== pointerId
        ) {
            return;
        }


        event.preventDefault();


        const pos =
            getPosition(event);


        pendingX = pos.x;
        pendingY = pos.y;


        /*
         * Only ONE render request at a time.
         * This prevents hundreds of canvas operations
         * from piling up.
         */

        if (!animationFrame) {

            animationFrame =
                requestAnimationFrame(
                    renderScratch
                );
        }
    }


    /* =====================================================
       POINTER UP
    ===================================================== */

    function pointerUp(event) {

        if (
            !isDrawing ||
            event.pointerId !== pointerId
        ) {
            return;
        }


        event.preventDefault();


        isDrawing = false;


        if (animationFrame) {

            cancelAnimationFrame(
                animationFrame
            );

            animationFrame = null;
        }


        /*
         * Simple tap
         */

        if (
            !hasMoved ||
            scratchedDistance < TAP_DISTANCE
        ) {

            revealCard();
        }


        pointerId = null;
    }


    /* =====================================================
       REVEAL
    ===================================================== */

function revealCard() {

    // Prevent multiple reveals
    if (revealed) return;

    revealed = true;

    const scratchArea =
        document.querySelector(".scratch-area");

    const revealMessage =
        document.getElementById("revealMessage");

    const countdown =
        document.getElementById("countdownContainer");

    const buttons =
        document.getElementById("saveDateActions");

    const counter =
        document.getElementById("loveCounter");


    // =========================================
    // HIDE SCRATCH COVER
    // =========================================

    if (scratchArea) {
        scratchArea.classList.add("revealed");
    }


    // =========================================
    // SHOW REVEAL MESSAGE
    // =========================================

    if (revealMessage) {

        setTimeout(() => {

            revealMessage.classList.add("show");

        }, 300);
    }


    // =========================================
    // SHOW COUNTDOWN
    // =========================================

   if (countdown) {

    setTimeout(() => {

        // Show countdown
        countdown.classList.add(
            "countdown-visible"
        );

        // Start countdown
        initializeCountdown();

    }, 700);
}


    // =========================================
    // SHOW BUTTONS
    // =========================================

    if (buttons) {

        setTimeout(() => {

            buttons.classList.add(
                "buttons-visible"
            );

        }, 900);
    }


    // =========================================
    // SHOW LOVE COUNTER
    // =========================================

    if (counter) {

        setTimeout(() => {

            counter.classList.add(
                "counter-visible"
            );

        }, 1100);
    }


    // =========================================
    // 🎉 CONFETTI
    // =========================================

   // 🎉 INSTANT CELEBRATION
launchBigConfetti();
launchCelebrationHearts();
createGoldenSparkles();
}

    /* =====================================================
       POINTER EVENTS
    ===================================================== */

    canvas.addEventListener(
        "pointerdown",
        pointerDown
    );

    canvas.addEventListener(
        "pointermove",
        pointerMove
    );

    canvas.addEventListener(
        "pointerup",
        pointerUp
    );

    canvas.addEventListener(
        "pointercancel",
        pointerUp
    );


    /* =====================================================
       PREVENT CONTEXT MENU
    ===================================================== */

    canvas.addEventListener(
        "contextmenu",
        event => {
            event.preventDefault();
        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    resizeCanvas();


    window.addEventListener(
        "resize",
        () => {

            if (!revealed) {

                resizeCanvas();
            }
        }
    );


    /* =====================================================
       ONLY ARM SCRATCHING ONCE CARD IS IN VIEW
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const cardObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    cardInView =
                        entry.isIntersecting &&
                        entry.intersectionRatio >= 0.6;
                });
            },
            {
                threshold: [0, 0.6, 1]
            }
        );

        cardObserver.observe(area);

    } else {

        /*
         * No IntersectionObserver support:
         * fall back to always-armed behaviour.
         */

        cardInView = true;
    }
}


function launchBigConfetti() {

    let layer = document.getElementById("celebrationLayer");

    if (!layer) {
        layer = document.createElement("div");
        layer.id = "celebrationLayer";
        document.body.appendChild(layer);
    }

    layer.innerHTML = "";
    layer.classList.add("active");

    const colors = [
        "#D4AF37",
        "#F5D77A",
        "#E8B4C8",
        "#C85A7C",
        "#FFFFFF"
    ];

    /*
     * Create a beautiful burst from the
     * centre of the screen.
     */

    for (let i = 0; i < 110; i++) {

        const piece = document.createElement("span");

        piece.className = "wedding-confetti";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            180 + Math.random() * 420;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        const size =
            4 + Math.random() * 5;

        const duration =
            2.8 + Math.random() * 1.8;

        const delay =
            Math.random() * 0.25;

        piece.style.left = "50%";
        piece.style.top = "45%";

        piece.style.width =
            size + "px";

        piece.style.height =
            (size * 1.7) + "px";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        piece.style.setProperty(
            "--x",
            x + "px"
        );

        piece.style.setProperty(
            "--y",
            y + "px"
        );

        piece.style.setProperty(
            "--rotate",
            (Math.random() * 720 - 360) + "deg"
        );

        piece.style.animationDuration =
            duration + "s";

        piece.style.animationDelay =
            delay + "s";

        /*
         * Slightly different shapes
         */

        if (Math.random() > 0.65) {

            piece.style.borderRadius =
                "50%";

        } else {

            piece.style.borderRadius =
                "2px";
        }

        layer.appendChild(piece);
    }


    /*
     * Small golden particles
     */

    for (let i = 0; i < 30; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.className =
            "wedding-sparkle";

        sparkle.innerHTML = "✦";

        sparkle.style.left =
            (35 + Math.random() * 30) + "%";

        sparkle.style.top =
            (35 + Math.random() * 20) + "%";

        sparkle.style.setProperty(
            "--spark-x",
            (Math.random() * 220 - 110) + "px"
        );

        sparkle.style.setProperty(
            "--spark-y",
            (-80 - Math.random() * 220) + "px"
        );

        sparkle.style.animationDelay =
            Math.random() * 0.5 + "s";

        layer.appendChild(sparkle);
    }


    /*
     * Remove everything after animation
     */

    setTimeout(() => {

        layer.classList.remove("active");

        layer.innerHTML = "";

    }, 5500);
}





/* =================================================
   CONFETTI SIDE BURST
   ================================================= */

function createConfettiBurst(originX, originY) {

    const layer =
        document.getElementById("celebrationLayer");

    if (!layer) return;


    const colors = [
        "#FFD700",
        "#F7D774",
        "#FF4D8D",
        "#E91E63",
        "#FFFFFF",
        "#C026D3"
    ];


    for (let i = 0; i < 45; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "burst-confetti";


        piece.style.left =
            originX + "vw";

        piece.style.top =
            originY + "vh";


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        piece.style.setProperty(
            "--burst-x",
            (Math.random() * 300 - 150) + "px"
        );


        piece.style.setProperty(
            "--burst-y",
            (Math.random() * 300 - 150) + "px"
        );


        piece.style.setProperty(
            "--burst-rotate",
            (Math.random() * 720 - 360) + "deg"
        );


        piece.style.animationDelay =
            Math.random() * 0.15 + "s";


        layer.appendChild(piece);
    }
}


/* =================================================
   GOLDEN SPARKLES
   ================================================= */

function createGoldenSparkles() {

    const layer =
        document.getElementById("celebrationLayer");

    if (!layer) return;


    for (let i = 0; i < 35; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.className =
            "golden-sparkle";


        sparkle.innerHTML = "✦";


        sparkle.style.left =
            Math.random() * 100 + "vw";


        sparkle.style.top =
            (20 + Math.random() * 50) + "vh";


        sparkle.style.fontSize =
            (8 + Math.random() * 14) + "px";


        sparkle.style.animationDelay =
            Math.random() * 1.5 + "s";


        sparkle.style.animationDuration =
            (1.5 + Math.random() * 2) + "s";


        layer.appendChild(sparkle);
    }
}



function launchCelebrationHearts() {

    let layer = document.getElementById("celebrationLayer");

    if (!layer) return;

    for (let i = 0; i < 20; i++) {

        const heart = document.createElement("span");

        heart.className = "celebration-heart";

        heart.innerHTML = "♥";

        heart.style.left =
            (20 + Math.random() * 60) + "vw";

        heart.style.top =
            (35 + Math.random() * 20) + "vh";

        heart.style.animationDelay =
            Math.random() * 0.8 + "s";

        heart.style.fontSize =
            (18 + Math.random() * 22) + "px";

        layer.appendChild(heart);
    }

    setTimeout(() => {
        const hearts =
            layer.querySelectorAll(".celebration-heart");

        hearts.forEach(heart => heart.remove());

    }, 5000);
}
function initializeCountdown() {

    const weddingDate =
        new Date("2026-12-06T00:00:00+05:30").getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.error("Countdown elements not found.");
        return;
    }

    function updateCountdown() {

        const now = Date.now();
        const distance = weddingDate - now;

        if (distance <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}
/* =========================================================
   ADD TO CALENDAR
========================================================= */

function initializeCalendarButton() {

    const calendarBtn =
        document.getElementById("calendarBtn");

    if (!calendarBtn) {
        console.error("Calendar button not found.");
        return;
    }

    calendarBtn.addEventListener("click", function () {

        // Wedding details
        const title =
            "Anusua & Raghvendra - Wedding";

        const details =
            "Join us as we celebrate the wedding of Anusua & Raghvendra. ❤️";

        const location =
            "Wedding Venue";

        // 3 December 2026
        // Example timing: 6:00 PM - 10:00 PM IST
        const start =
            "20261203T180000";

        const end =
            "20261203T220000";

        // Google Calendar URL
        const calendarURL =
            "https://calendar.google.com/calendar/render" +
            "?action=TEMPLATE" +
            "&text=" + encodeURIComponent(title) +
            "&dates=" + start + "/" + end +
            "&details=" + encodeURIComponent(details) +
            "&location=" + encodeURIComponent(location);

        // Open Google Calendar
        window.open(
            calendarURL,
            "_blank"
        );
    });
}
function initializeLoveButton() {

    const loveBtn = document.getElementById("loveBtn");
    const loveCount = document.getElementById("loveCount");

    if (!loveBtn || !loveCount) {
        console.error("❌ Love button or counter not found");
        return;
    }

    // Prevent duplicate event listeners
    if (loveBtn.dataset.initialized === "true") {
        return;
    }

    loveBtn.dataset.initialized = "true";

    let count = parseInt(localStorage.getItem("weddingLoveCount")) || 0;

    loveCount.textContent = count;


   loveBtn.addEventListener("click", () => {

    // Increase count
    count++;

    localStorage.setItem("weddingLoveCount", count);

    loveCount.textContent = count;

    // ❤️ Make heart inside button red
    loveBtn.classList.add("love-active");

    // Button animation
    loveBtn.classList.remove("love-clicked");
    void loveBtn.offsetWidth;
    loveBtn.classList.add("love-clicked");

    // Red heart burst
    createHeartBurst(loveBtn);
});
}
function createLoveHearts(button) {

    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-love-heart";
        heart.innerHTML = "♥";

        heart.style.left =
            rect.left + rect.width / 2 + "px";

        heart.style.top =
            rect.top + rect.height / 2 + "px";

        // Random movement
        heart.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 180}px`
        );

        heart.style.setProperty(
            "--y",
            `${-80 - Math.random() * 120}px`
        );

        heart.style.setProperty(
            "--rotate",
            `${(Math.random() - 0.5) * 60}deg`
        );

        document.body.appendChild(heart);


        setTimeout(() => {
            heart.remove();
        }, 1200);
    }
}
function createHeartBurst(button) {

    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create multiple red hearts
    for (let i = 0; i < 18; i++) {

        const heart = document.createElement("div");

        heart.className = "heart-burst";
        heart.innerHTML = "♥";

        heart.style.left = centerX + "px";
        heart.style.top = centerY + "px";

        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 130;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        heart.style.setProperty("--x", `${x}px`);
        heart.style.setProperty("--y", `${y}px`);

        // Random size
        heart.style.setProperty(
            "--size",
            `${14 + Math.random() * 18}px`
        );

        // Random rotation
        heart.style.setProperty(
            "--rotate",
            `${-40 + Math.random() * 80}deg`
        );

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}