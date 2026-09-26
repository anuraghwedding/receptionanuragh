// // Register GSAP ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// function initializeHorizontalScroll() {
//     const pinnedContainer = document.querySelector(".pinned-container");
//     const slider = document.querySelector(".event-slider");

//     if (!pinnedContainer || !slider) return;

//     // Refresh ScrollTrigger in case dynamically loaded elements shifted layout height
//     ScrollTrigger.refresh();

//     // Calculate the horizontal distance the slider needs to translate
//     const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

//     gsap.to(slider, {
//         x: getScrollAmount,
//         ease: "none",
//         scrollTrigger: {
//             trigger: pinnedContainer,
//             pin: true,
//             scrub: 1, // Smooth scrubbing effect
//             start: "top top",
//             end: () => `+=${slider.scrollWidth - window.innerWidth}`,
//             invalidateOnRefresh: true, // Recalculates dynamically on window resize
//         }
//     });
// }

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function initializeHorizontalScroll() {
    const pinnedContainer = document.querySelector(".pinned-container");
    const slider = document.querySelector(".event-slider");
    const cards = gsap.utils.toArray(".event-card", slider);

    if (!pinnedContainer || !slider || !cards.length) return;

    // Refresh ScrollTrigger in case dynamically loaded elements shifted layout height
    ScrollTrigger.refresh();

    // Calculate the horizontal distance the slider needs to translate
    const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

    // For a given raw scroll progress (0-1), find the nearest progress value
    // that centers one of the cards in the viewport, and return that instead.
    // Recomputed live (using current offsetLeft/offsetWidth) so it stays
    // correct after resize/invalidateOnRefresh.
    const getSnapProgress = (rawProgress) => {
        const maxScroll = -getScrollAmount(); // total scrollable distance, positive
        if (maxScroll <= 0) return 0;

        const viewportCenter = window.innerWidth / 2;

        const cardProgressPoints = cards.map((card) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            let x = viewportCenter - cardCenter; // translateX needed to center this card
            x = Math.min(0, Math.max(-maxScroll, x)); // clamp to valid scroll range
            return -x / maxScroll; // convert to a 0-1 progress value
        });

        return cardProgressPoints.reduce((closest, point) =>
            Math.abs(point - rawProgress) < Math.abs(closest - rawProgress) ? point : closest
        );
    };

    gsap.to(slider, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
            trigger: pinnedContainer,
            pin: true,
            scrub: 1, // Smooth scrubbing effect
            start: "top top",
            end: () => `+=${slider.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true, // Recalculates dynamically on window resize
            snap: {
                snapTo: (value) => getSnapProgress(value),
                duration: { min: 0.001, max: 0.001 },
                ease: "power1.inOut",
            },
        }
    });
}
/* =========================================================
   EVENT LOCATION + ADD TO CALENDAR
========================================================= */

function initializeEventButtons() {

    const calendarButtons = document.querySelectorAll(".calendar-btn");

    if (!calendarButtons.length) return;


    /* -----------------------------------------------------
       GOOGLE MAPS LOCATION
    ----------------------------------------------------- */

    document.querySelectorAll(".location-btn").forEach(button => {

        button.addEventListener("click", function () {

            // Small click feedback
            this.classList.add("location-opened");

            setTimeout(() => {
                this.classList.remove("location-opened");
            }, 400);

        });

    });


    /* -----------------------------------------------------
       ADD TO CALENDAR
    ----------------------------------------------------- */

    calendarButtons.forEach(button => {

        button.addEventListener("click", function () {

            const title = this.dataset.title;
            const date = this.dataset.date;
            const time = this.dataset.time;
            const location = this.dataset.location;
            const description = this.dataset.description || "";

            createCalendarFile({
                title,
                date,
                time,
                location,
                description
            });

            // Visual feedback
            const originalHTML = this.innerHTML;

            this.classList.add("added");

            this.innerHTML = `
                <span>✓</span>
                Added to Calendar
            `;

            setTimeout(() => {

                this.classList.remove("added");

                this.innerHTML = originalHTML;

            }, 2200);

        });

    });
}


/* =========================================================
   CREATE ICS CALENDAR FILE
========================================================= */

function createCalendarFile({
    title,
    date,
    time,
    location,
    description
}) {

    /*
       Convert local Kolkata time to ICS format.

       Wedding events are in India, so timezone is
       Asia/Kolkata (UTC +05:30).
    */

    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);


    /* -----------------------------------------------------
       START DATE
    ----------------------------------------------------- */

    const startDate = new Date(
        year,
        month - 1,
        day,
        hour,
        minute,
        0
    );


    /* -----------------------------------------------------
       END DATE

       "ONWARDS" doesn't provide an exact ending time,
       so the calendar event is created as a 2-hour event.
    ----------------------------------------------------- */

    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000));


    const formatICSDate = (dateObject) => {

        const yyyy = dateObject.getFullYear();

        const mm = String(
            dateObject.getMonth() + 1
        ).padStart(2, "0");

        const dd = String(
            dateObject.getDate()
        ).padStart(2, "0");

        const hh = String(
            dateObject.getHours()
        ).padStart(2, "0");

        const min = String(
            dateObject.getMinutes()
        ).padStart(2, "0");

        const ss = String(
            dateObject.getSeconds()
        ).padStart(2, "0");

        return `${yyyy}${mm}${dd}T${hh}${min}${ss}`;
    };


    /* -----------------------------------------------------
       ESCAPE ICS TEXT
    ----------------------------------------------------- */

    const escapeICS = (text = "") => {

        return String(text)
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/,/g, "\\,")
            .replace(/;/g, "\\;");

    };


    const start = formatICSDate(startDate);
    const end = formatICSDate(endDate);


    /* -----------------------------------------------------
       UNIQUE EVENT ID
    ----------------------------------------------------- */

    const uid =
        `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}@wedding-invitation`;


    /* -----------------------------------------------------
       ICS CONTENT
    ----------------------------------------------------- */

    const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Wedding Invitation//Wedding Events//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",

        `UID:${uid}`,

        `DTSTAMP:${formatICSDate(new Date())}Z`,

        `DTSTART;TZID=Asia/Kolkata:${start}`,

        `DTEND;TZID=Asia/Kolkata:${end}`,

        `SUMMARY:${escapeICS(title)}`,

        `DESCRIPTION:${escapeICS(description)}`,

        `LOCATION:${escapeICS(location)}`,

        "STATUS:CONFIRMED",

        "TRANSP:OPAQUE",

        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n");


    /* -----------------------------------------------------
       DOWNLOAD ICS FILE
    ----------------------------------------------------- */

    const blob = new Blob(
        [icsContent],
        {
            type: "text/calendar;charset=utf-8"
        }
    );


    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");

    downloadLink.href = url;

    downloadLink.download =
        `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.ics`;

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
}