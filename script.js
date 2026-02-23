// ============================================================
// BIRTHDAY WEBSITE - script.js
// ============================================================

// ============================================================
// 🎉 UPGRADE #2: CONFETTI BURST ON PAGE LOAD
// ============================================================
// 🎓 LESSON: window.onload runs code AFTER the entire page
// has finished loading. This is important — if you try to
// run JS too early, the HTML elements don't exist yet!
//
// The confetti() function comes from the canvas-confetti
// LIBRARY we loaded in index.html with a <script> tag.
// A library = code someone else wrote that you can reuse.
//
// We call it TWICE with a small delay between shots to create
// a "double burst" — like two fireworks going off!
// ============================================================

window.onload = function () {
    // 🎓 setTimeout(function, delay) = run ONCE after 'delay' ms
    // 500ms = 0.5 seconds after page loads

    // First burst — from left side
    setTimeout(function () {
        confetti({
            particleCount: 120,   // number of confetti pieces
            angle: 60,            // direction (60 = upper-right)
            spread: 70,           // how wide the spray is
            origin: { x: 0, y: 0.7 }, // left side of screen
            colors: ['#ff7882', '#F61F1F', '#fff', '#ffd700', '#ff69b4']
        });
    }, 500);

    // Second burst — from right side (300ms later)
    setTimeout(function () {
        confetti({
            particleCount: 120,
            angle: 120,           // direction (120 = upper-left)
            spread: 70,
            origin: { x: 1, y: 0.7 }, // right side of screen
            colors: ['#ff7882', '#F61F1F', '#fff', '#ffd700', '#ff69b4']
        });
    }, 800);

    // Third burst — big center explosion at 2 seconds
    setTimeout(function () {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { x: 0.5, y: 0.5 }, // center of screen
            colors: ['#ff7882', '#F61F1F', '#fff', '#ffd700', '#ff69b4'],
            scalar: 1.2  // makes the pieces slightly bigger
        });
    }, 2000);
};

// ============================================================
// 🎵 UPGRADE #6: BACKGROUND MUSIC PLAYER
// ============================================================
// 🎓 KEY FIX: We use DOMContentLoaded to make sure the
// <audio> and <button> elements exist before we grab them.
// Previously, if JS ran before HTML was ready, we'd get null!
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    // Guard: if elements don't exist, stop here
    if (!musicBtn || !bgMusic) {
        console.error('Music elements not found!');
        return;
    }

    let isPlaying = false;

    musicBtn.addEventListener('click', function () {

        if (!isPlaying) {
            // ▶️ START — set volume before play
            bgMusic.volume = 0.7;

            bgMusic.play().then(function () {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.querySelector('i').className = 'fa-solid fa-pause';
                // Now fade UP from 0
                bgMusic.volume = 0;
                fadeVolume(0, 0.7, 1500);

            }).catch(function (err) {
                console.log('Autoplay blocked:', err);
                // Try again at full volume (some browsers need this)
                bgMusic.volume = 0.7;
                bgMusic.play().then(function () {
                    isPlaying = true;
                    musicBtn.classList.add('playing');
                    musicBtn.querySelector('i').className = 'fa-solid fa-pause';
                });
            });

        } else {
            // ⏸ PAUSE — fade out then pause
            fadeVolume(bgMusic.volume, 0, 800);
            setTimeout(function () {
                bgMusic.pause();
                isPlaying = false;
                musicBtn.classList.remove('playing');
                musicBtn.querySelector('i').className = 'fa-solid fa-music';
            }, 800);
        }
    });

    // Smooth volume fade function
    function fadeVolume(from, to, duration) {
        const steps = duration / 50;
        const stepSize = (to - from) / steps;
        let current = from;

        const fade = setInterval(function () {
            current += stepSize;
            bgMusic.volume = Math.min(1, Math.max(0, parseFloat(current.toFixed(3))));
            if ((stepSize > 0 && current >= to) || (stepSize < 0 && current <= to)) {
                clearInterval(fade);
            }
        }, 50);
    }

});

// 🎓 LESSON: These are our text strings stored as variables.
// We split them into arrays of characters so we can type them
// one letter at a time (like a typewriter effect).
let datetxt = "27 march 2025";
let datatxtletter = "Happy Birthday Kane Kadimi. channag made Neet na. Daily message madalla antha althiyalla kushi na ivaga. Ee sala sigak agalla antha idanna madini. once again Happy birthday kane 😊🎂🎉";
let titleLetter = "To you";

// split('') turns "Hi" into ['H','i'] — an array of individual letters
let charArrDate = datetxt.split('');
let charArrDateLetter = datatxtletter.split('');
let charArrTitle = titleLetter.split('');

// These track which letter we're currently typing
let currentIndex = 0;
let currentIndexLetter = 0;
let currentIndexTitle = 0;

// Grab the elements we'll be writing text into
let date__of__birth = document.querySelector(".date__of__birth span");
let text__letter = document.querySelector(".text__letter p");

// ============================================================
// 🎓 LESSON: setTimeout vs setInterval
//   - setTimeout(fn, 4000) = run fn ONCE after 4 seconds
//   - setInterval(fn, 100) = run fn EVERY 100 milliseconds
//
// Here we wait 4 seconds (for animations to finish), then
// start typing the date one character at a time every 100ms.
// ============================================================
setTimeout(function () {
    timeDatetxt = setInterval(function () {
        if (currentIndex < charArrDate.length) {
            // Add the next character to the date display
            date__of__birth.textContent += charArrDate[currentIndex];
            currentIndex++;
        } else {
            // All letters typed! Add ⭐ icons on each side and stop.
            let i = document.createElement("i");
            i.className = "fa-solid fa-star";
            document.querySelector(".date__of__birth").prepend(i);
            document.querySelector(".date__of__birth").appendChild(i.cloneNode(true));
            clearInterval(timeDatetxt);
        }
    }, 100); // types one character every 100ms
}, 4000); // wait 4 seconds before starting (was 12000ms = 12s!)

// ============================================================
// Letter button click handler
// ============================================================
var intervalContent;
var intervalTitle;

$("#btn__letter").on("click", function () {
    // Show the dark overlay
    $(".box__letter").slideDown();

    // Then show the letter card (1 second later)
    setTimeout(function () {
        $(".letter__border").slideDown();
    }, 1000);

    // Type the title "To you ❤️" letter by letter
    setTimeout(function () {
        intervalTitle = setInterval(function () {
            if (currentIndexTitle < charArrTitle.length) {
                document.querySelector(".title__letter").textContent += charArrTitle[currentIndexTitle];
                let i = document.createElement("i");
                i.className = "fa-solid fa-heart";
                document.querySelector(".title__letter").appendChild(i);
                currentIndexTitle++;
            } else {
                clearInterval(intervalTitle);
            }
        }, 100);
    }, 2000);

    // Fade in the heart image and love image
    setTimeout(function () {
        document.querySelector("#heart__letter").classList.add("animationOp");
        document.querySelector(".love__img").classList.add("animationOp");
        document.querySelector("#mewmew").classList.add("animationOp");
    }, 2800);

    // Start the floating hearts animation
    setTimeout(function () {
        document.querySelectorAll(".heart").forEach((item) => {
            item.classList.add("animation");
        });
    }, 3500);

    // Type the main letter text
    setTimeout(function () {
        intervalContent = setInterval(function () {
            if (currentIndexLetter < charArrDateLetter.length) {
                text__letter.textContent += charArrDateLetter[currentIndexLetter];
                currentIndexLetter++;
            } else {
                clearInterval(intervalContent);
            }
        }, 50);
    }, 6000);
});

// Close button — resets everything back to default
$(".close").on("click", function () {
    clearInterval(intervalContent);
    document.querySelector(".title__letter").textContent = "";
    text__letter.textContent = "";
    currentIndexLetter = 0;
    currentIndexTitle = 0;
    document.querySelector("#heart__letter").classList.remove("animationOp");
    document.querySelector(".love__img").classList.remove("animationOp");
    document.querySelector("#mewmew").classList.remove("animationOp");
    document.querySelectorAll(".heart").forEach((item) => {
        item.classList.remove("animation");
    });
    $(".box__letter").slideUp();
    $(".letter__border").slideUp();
});

// ============================================================
// UPGRADE #8: MEMORIES GALLERY LIGHTBOX
// 🎓 LESSON: We use querySelectorAll() to grab ALL gallery items
// at once (returns a NodeList). Then we loop through them with
// forEach() and add a click listener to each one.
//
// data-src is a custom HTML attribute we read with:
//   element.dataset.src
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    const lightbox         = document.getElementById("lightbox");
    const lightboxImg      = document.getElementById("lightboxImg");
    const lightboxClose    = document.getElementById("lightboxClose");
    const lightboxBackdrop = document.getElementById("lightboxBackdrop");

    if (!lightbox) return; // safety check

    // Grab every gallery item and add click handler
    document.querySelectorAll(".gallery__item").forEach(function (item) {
        item.addEventListener("click", function () {
            const src = item.dataset.src;   // read data-src attribute
            lightboxImg.src = src;          // put the image into lightbox
            lightbox.classList.add("open"); // show the lightbox
            document.body.style.overflow = "hidden"; // stop page scrolling
        });
    });

    // Close on X button click
    lightboxClose.addEventListener("click", closeLightbox);

    // Close on dark backdrop click
    lightboxBackdrop.addEventListener("click", closeLightbox);

    // Close on Escape key press
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";  // restore scrolling
        lightboxImg.src = "";               // clear image to free memory
    }
});

// ============================================================
// DRAG-TO-SCROLL FOR GALLERY (Desktop mouse drag support)
// 🎓 LESSON: On desktop, horizontal scroll needs mouse drag.
// We track mousedown (grab), mousemove (drag), mouseup (release).
// The trick: scrollLeft -= (mouseMoved) shifts the scroll position.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".gallery__grid");
    if (!slider) return;

    let isDown   = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", function (e) {
        isDown = true;
        slider.style.cursor = "grabbing";
        startX     = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", function () {
        isDown = false;
        slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseup", function () {
        isDown = false;
        slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", function (e) {
        if (!isDown) return;       // only runs while mouse is held
        e.preventDefault();
        const x    = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;  // *1.5 = faster drag
        slider.scrollLeft = scrollLeft - walk;
    });
});

// ============================================================
// CAROUSEL — One photo at a time with card slide transition
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    const cards   = Array.from(document.querySelectorAll(".carousel__card"));
    const dotsEl  = document.getElementById("carouselDots");
    const counter = document.getElementById("carouselCounter");
    const prevBtn = document.getElementById("carouselPrev");
    const nextBtn = document.getElementById("carouselNext");

    if (!cards.length) return;

    let current = 0;
    let animating = false;
    const total = cards.length;

    // Build dot indicators dynamically
    cards.forEach(function (_, i) {
        const dot = document.createElement("span");
        dot.className = "carousel__dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", function () { goTo(i); });
        dotsEl.appendChild(dot);
    });

    function getDots() { return Array.from(dotsEl.querySelectorAll(".carousel__dot")); }

    function updateCounter() {
        counter.textContent = (current + 1) + " / " + total;
    }

    function goTo(next, direction) {
        if (animating || next === current) return;
        animating = true;

        // Decide slide direction automatically if not given
        if (!direction) direction = next > current ? "next" : "prev";

        const oldCard = cards[current];
        const newCard = cards[next];

        // 1. Set the new card just off-screen (right or left)
        newCard.classList.remove("active", "exit-left", "exit-right", "enter-left", "enter-right");
        newCard.classList.add(direction === "next" ? "enter-right" : "enter-left");
        newCard.style.display = "";

        // 2. Force browser to register the starting position
        newCard.getBoundingClientRect();

        // 3. Trigger transitions on both cards simultaneously
        requestAnimationFrame(function () {
            oldCard.classList.add(direction === "next" ? "exit-left" : "exit-right");
            oldCard.classList.remove("active");
            newCard.classList.remove("enter-right", "enter-left");
            newCard.classList.add("active");
        });

        // 4. Update dots and counter
        getDots().forEach(function (d, i) {
            d.classList.toggle("active", i === next);
        });
        current = next;
        updateCounter();

        // 5. Unlock after animation finishes
        setTimeout(function () {
            animating = false;
        }, 550);
    }

    nextBtn.addEventListener("click", function () {
        goTo((current + 1) % total, "next");
    });

    prevBtn.addEventListener("click", function () {
        goTo((current - 1 + total) % total, "prev");
    });

    // Keyboard arrow support
    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") goTo((current + 1) % total, "next");
        if (e.key === "ArrowLeft")  goTo((current - 1 + total) % total, "prev");
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    document.querySelector(".carousel__track").addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
    });
    document.querySelector(".carousel__track").addEventListener("touchend", function (e) {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) goTo((current + 1) % total, "next");
            else          goTo((current - 1 + total) % total, "prev");
        }
    });

    updateCounter();
});

// Scroll hint arrow — smooth scroll to memories section
document.addEventListener("DOMContentLoaded", function () {
    const hint    = document.getElementById("scrollHint");
    const gallery = document.querySelector(".gallery__section");
    if (hint && gallery) {
        hint.addEventListener("click", function () {
            gallery.scrollIntoView({ behavior: "smooth" });
        });
    }
});

// ============================================================
// UPGRADE #9: DAYS SINCE BIRTHDAY COUNTER
// 🎓 LESSON: JavaScript Date objects
//
// new Date("2025-03-27")  → a date object for March 27 2025
// new Date()              → RIGHT NOW (updates every time called)
// date1 - date2           → difference in MILLISECONDS
//
// Convert ms to days:
//   ms / 1000        = seconds
//   seconds / 60     = minutes
//   minutes / 60     = hours
//   hours / 24       = days
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    const birthday = new Date("2025-03-27T00:00:00");

    const dayEl  = document.getElementById("dayCount");
    const hrEl   = document.getElementById("hourCount");
    const minEl  = document.getElementById("minCount");
    const secEl  = document.getElementById("secCount");

    if (!dayEl) return;

    // Count-up animation for the big DAYS number
    function animateCount(el, target, duration) {
        let start    = 0;
        let stepTime = Math.max(Math.floor(duration / target), 5);
        let timer    = setInterval(function () {
            start += Math.ceil(target / (duration / stepTime));
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            el.textContent = start.toLocaleString(); // adds commas e.g. "8,040"
        }, stepTime);
    }

    // Calculate time since birthday
    function updateCounter() {
        let now     = new Date();
        let diffMs  = now - birthday;

        if (diffMs < 0) {
            dayEl.textContent = "Not yet!";
            return;
        }

        let totalSeconds = Math.floor(diffMs / 1000);
        let totalMinutes = Math.floor(totalSeconds / 60);
        let totalHours   = Math.floor(totalMinutes / 60);
        let totalDays    = Math.floor(totalHours / 24);

        // Hours, minutes, seconds need to show current "clock" values
        let hrs  = totalHours;
        let mins = totalMinutes;
        let secs = totalSeconds;

        hrEl.textContent  = hrs.toLocaleString();
        minEl.textContent = mins.toLocaleString();
        secEl.textContent = secs.toLocaleString();

        return totalDays;
    }

    // First run: animate the days number counting up
    let days = updateCounter();
    if (days !== undefined) {
        animateCount(dayEl, days, 1800); // count up in 1.8 seconds
    }

    // Then tick the seconds live every second (only hours/mins/secs update)
    setInterval(function () {
        let now      = new Date();
        let diffMs   = now - birthday;
        let totalSec = Math.floor(diffMs / 1000);
        let totalMin = Math.floor(totalSec / 60);
        let totalHr  = Math.floor(totalMin / 60);

        hrEl.textContent  = totalHr.toLocaleString();
        minEl.textContent = totalMin.toLocaleString();
        secEl.textContent = totalSec.toLocaleString();
        dayEl.textContent = Math.floor(totalHr / 24).toLocaleString();
    }, 1000);
});

// ============================================================
// UPGRADE #10: SHARE BUTTON
// 🎓 LESSON: Web Share API
//
// navigator.share()  → opens native share sheet (WhatsApp etc.)
// navigator.clipboard.writeText()  → copies text to clipboard
//
// We check if navigator.share exists first, because not all
// browsers support it (mainly desktop Chrome/Firefox don't).
// If not supported, we fallback to copying the URL.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    const shareBtn = document.getElementById("shareBtn");
    if (!shareBtn) return;

    shareBtn.addEventListener("click", async function () {

        const shareData = {
            title: "Happy Birthday Rakshita! 🎂",
            text:  "Wishing you a very Happy Birthday! Check out this special page made just for you! 🎉🎈",
            url:   window.location.href
        };

        // 🎓 Check if Web Share API is available (mainly mobile browsers)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                // user shared successfully — no need for feedback
            } catch (err) {
                // User cancelled — that's fine, do nothing
                if (err.name !== "AbortError") {
                    console.log("Share failed:", err);
                }
            }

        } else {
            // 🎓 Fallback for desktop: copy URL to clipboard
            // navigator.clipboard.writeText() returns a Promise
            try {
                await navigator.clipboard.writeText(window.location.href);
                showCopied();
            } catch (err) {
                // Last resort: old execCommand method
                const dummy = document.createElement("input");
                document.body.appendChild(dummy);
                dummy.value = window.location.href;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
                showCopied();
            }
        }
    });

    // Show "Copied!" feedback on the button for 2 seconds
    function showCopied() {
        const icon = shareBtn.querySelector("i");
        const text = shareBtn.querySelector("span");

        shareBtn.classList.add("copied");
        icon.className = "fa-solid fa-check";
        text.textContent = "Copied!";

        setTimeout(function () {
            shareBtn.classList.remove("copied");
            icon.className = "fa-solid fa-share-nodes";
            text.textContent = "Share";
        }, 2000);
    }
});
