/* =========================================================
   WEDDING CONFIGURATION
   ================================================
   EDIT HERE
========================================================= */

const weddingConfig = {

    // COUPLE NAMES 
    groomName: "Beshoy",
    brideName: "Rola",

    // WEDDING DATE
    // Format:
    // YYYY-MM-DDTHH:MM:SS 
    weddingDate: "2026-09-30T19:00:00",


    // DISPLAY DATE
    displayDate: "30 · 09 · 2026",

    // WEDDING TIME
    weddingTime: "7:00 PM",

    // VENUE
  

    // VENUE LOCATION
    location: "Bride's House",

   

    // HERO VIDEO
    heroVideo: "assets/hero-video.mp4",

    // BACKGROUND MUSIC
    music: "assets/music.mp4"

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const openingScreen =
    document.getElementById("opening-screen");

const openButton =
    document.getElementById("open-invitation");

const mainContent =
    document.getElementById("main-content");

const hero =
    document.getElementById("hero");

const heroVideo =
    document.getElementById("hero-video");

const backgroundMusic =
    document.getElementById("background-music");

const musicControl =
    document.getElementById("music-control");

const petalContainer =
    document.getElementById("opening-petals");


/* =========================================================
   APPLY CONFIGURATION
========================================================= */

function applyWeddingConfig() {

    /* -----------------------------------------
       COUPLE
    ----------------------------------------- */

    document.getElementById("groom-name").textContent =
        weddingConfig.groomName;

    document.getElementById("bride-name").textContent =
        weddingConfig.brideName;

    document.getElementById("closing-groom").textContent =
        weddingConfig.groomName;

    document.getElementById("closing-bride").textContent =
        weddingConfig.brideName;


    /* -----------------------------------------
       DATE
    ----------------------------------------- */

    document.getElementById("display-date").textContent =
        weddingConfig.displayDate;

    document.getElementById("venue-date").textContent =
        weddingConfig.displayDate;


    /* -----------------------------------------
       VENUE
    ----------------------------------------- */

    document.getElementById("venue-name").textContent =
        weddingConfig.venueName;

    document.getElementById("venue-location").textContent =
        weddingConfig.location;

    document.getElementById("venue-time").textContent =
        weddingConfig.weddingTime;


    /* -----------------------------------------
       GOOGLE MAPS
    ----------------------------------------- */

    const mapsLink =
        document.getElementById("maps-link");

    mapsLink.href = weddingConfig.mapsUrl;


    /* -----------------------------------------
       HERO VIDEO
    ----------------------------------------- */

    const videoSource =
        heroVideo.querySelector("source");

    videoSource.src =
        weddingConfig.heroVideo;

    heroVideo.load();


    /* -----------------------------------------
       MUSIC
    ----------------------------------------- */

    const musicSource =
        backgroundMusic.querySelector("source");

    musicSource.src =
        weddingConfig.music;

    backgroundMusic.load();
}


/* =========================================================
   PETAL SYSTEM
========================================================= */

function createPetal() {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }

    const petal =
        document.createElement("span");

    petal.className = "petal";

    const size =
        Math.random() * 7 + 5;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 5 + 7;

    const delay =
        Math.random() * 2;

    const drift =
        Math.random() * 160 - 80;

    const opacity =
        Math.random() * 0.35 + 0.2;

    petal.style.left =
        `${left}%`;

    petal.style.width =
        `${size}px`;

    petal.style.height =
        `${size * 1.35}px`;

    petal.style.opacity =
        opacity;

    petal.style.setProperty(
        "--drift",
        `${drift}px`
    );

    petal.style.animationDuration =
        `${duration}s, ${duration / 2}s`;

    petal.style.animationDelay =
        `${delay}s, ${delay}s`;

    petalContainer.appendChild(petal);


    /* Remove after animation */

    setTimeout(() => {

        petal.remove();

    }, (duration + delay) * 1000);
}


function startPetals() {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }

    setInterval(() => {

        if (!openingScreen.classList.contains("opened")) {

            createPetal();

        }

    }, 650);
}


/* =========================================================
   OPEN INVITATION
========================================================= */

let invitationOpened = false;

function openInvitation() {

    // Prevent double clicks
    if (invitationOpened) return;

    invitationOpened = true;
    openButton.disabled = true;

    // Open curtains immediately
    openingScreen.classList.add("opened");

    // Reveal the website
    setTimeout(function () {
        mainContent.classList.add("visible");
    }, 350);

    // Start hero animation
    setTimeout(function () {
        hero.classList.add("started");
        musicControl.classList.add("visible");
    }, 800);

    // Allow scrolling
    document.body.classList.remove("lock-scroll");

    // Start music after the user's click.
    // This is intentionally not awaited, so a music loading
    // problem can NEVER prevent the curtain animation.
    backgroundMusic.play()
        .then(function () {
            musicControl.classList.add("playing");
            musicControl.setAttribute("aria-label", "Pause music");
            musicControl.setAttribute("aria-pressed", "true");
        })
        .catch(function (error) {
            console.warn("Music could not start:", error);
        });

    // Remove the opening layer after the curtain animation.
    setTimeout(function () {
        openingScreen.classList.add("closed");
        openingScreen.style.pointerEvents = "none";
    }, 1900);
}

// Attach the click handler only after the DOM is ready.
if (openButton) {
    openButton.addEventListener("click", openInvitation);
}


/* =========================================================
   MUSIC CONTROL
========================================================= */

if (musicControl) {
    musicControl.addEventListener("click", async function () {

        if (backgroundMusic.paused) {

            try {
                await backgroundMusic.play();

                musicControl.classList.add("playing");
                musicControl.setAttribute("aria-label", "Pause music");
                musicControl.setAttribute("aria-pressed", "true");

            } catch (error) {
                console.warn("Music could not start:", error);
            }

        } else {

            backgroundMusic.pause();

            musicControl.classList.remove("playing");
            musicControl.setAttribute("aria-label", "Play music");
            musicControl.setAttribute("aria-pressed", "false");
        }
    });
}


/* =========================================================
   COUNTDOWN
========================================================= */

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const countdownElement =
    document.getElementById("countdown");

const countdownFinished =
    document.getElementById("countdown-finished");


const weddingTimestamp =
    new Date(
        weddingConfig.weddingDate
    ).getTime();


function updateCountdown() {

    const now =
        Date.now();

    const difference =
        weddingTimestamp - now;


    if (difference <= 0) {

        countdownElement.hidden = true;

        countdownFinished.hidden = false;

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
            24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
            60
        );

    const seconds =
        Math.floor(
            (difference / 1000) %
            60
        );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

const countdownInterval =
    setInterval(
        updateCountdown,
        1000
    );


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   HERO VIDEO
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            heroVideo.pause();

        } else {

            if (
                invitationOpened
            ) {

                heroVideo.play().catch(
                    () => { }
                );

            }

        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

    if (!openButton || !openingScreen || !mainContent || !hero) {
        console.error("Wedding invitation: required HTML elements are missing.");
        return;
    }

    /*
     * Lock scrolling while
     * opening screen is visible.
     */

    document.body.classList.add(
        "lock-scroll"
    );


    applyWeddingConfig();

    startPetals();

}


init();