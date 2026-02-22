// JavaScript Document
let datetxt = "27 march 2025";
let datatxtletter = "Happy Birthday Kane Kadimi.channag made Neet na.Daily message madalla antha althiyalla kushi na ivaga.Ee sala sigak agalla antha idanna madini.once again Happy birthday kane 😊🎂🎉";
let titleLetter = "To you";
let charArrDate = datetxt.split('');
let charArrDateLetter = datatxtletter.split('');
let charArrTitle = titleLetter.split('');
let currentIndex = 0;
let currentIndexLetter = 0;
let currentIndexTitle = 0;
let date__of__birth = document.querySelector(".date__of__birth span");
let text__letter = document.querySelector(".text__letter p");

// ===== CONFIG =====
const config = {
    heartColor: '#ff7882',
    particleCount: 20
};

// ===== TYPING EFFECT FOR DATE =====
setTimeout(function () {
    timeDatetxt = setInterval(function () {
        if (currentIndex < charArrDate.length) {
            date__of__birth.textContent += charArrDate[currentIndex];
            currentIndex++;
        }
        else {
            let i = document.createElement("i");
            i.className = "fa-solid fa-star"
            document.querySelector(".date__of__birth").prepend(i)
            document.querySelector(".date__of__birth").appendChild(i.cloneNode(true))
            clearInterval(timeDatetxt)
        }
    }, 100)
}, 12000)

// ===== LETTER BOX LOGIC =====
var intervalContent;
var intervalTitle;
$("#btn__letter").on("click", function () {
    $(".box__letter").slideDown()
    setTimeout(function () {
        $(".letter__border").slideDown();
    }, 1000)
    setTimeout(function () {
        intervalTitle = setInterval(function () {
            if (currentIndexTitle < charArrTitle.length) {
                document.querySelector(".title__letter").textContent += charArrTitle[currentIndexTitle];
                let i = document.createElement("i");
                i.className = "fa-solid fa-heart"
                document.querySelector(".title__letter").appendChild(i)
                currentIndexTitle++;
            }
            else {
                clearInterval(intervalTitle)
            }
        }, 100)
    }, 2000)
    setTimeout(function () {
        document.querySelector("#heart__letter").classList.add("animationOp");
        document.querySelector(".love__img").classList.add("animationOp");
        document.querySelector("#mewmew").classList.add("animationOp");
    }, 2800)
    setTimeout(function () {
        document.querySelectorAll(".heart").forEach((item) => {
            item.classList.add("animation")
        })
    }, 3500)
    setTimeout(function () {
        intervalContent = setInterval(function () {
            if (currentIndexLetter < charArrDateLetter.length) {
                text__letter.textContent += charArrDateLetter[currentIndexLetter];
                currentIndexLetter++;
            }
            else {
                clearInterval(intervalContent)
            }
        }, 50)
    }, 6000)
})

$(".close").on("click", function () {
    clearInterval(intervalContent)
    document.querySelector(".title__letter").textContent = "";
    text__letter.textContent = "";
    currentIndexLetter = 0
    currentIndexTitle = 0
    document.querySelector("#heart__letter").classList.remove("animationOp");
    document.querySelector(".love__img").classList.remove("animationOp");
    document.querySelector("#mewmew").classList.remove("animationOp");
    document.querySelectorAll(".heart").forEach((item) => {
        item.classList.remove("animation")
    })
    $(".box__letter").slideUp();
    $(".letter__border").slideUp();
})

// ===== PARTICLE HEARTS BACKGROUND =====
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = config.heartColor;
        ctx.font = `${this.size}px Arial`;
        ctx.fillText('❤️', this.x, this.y);
    }
    update() {
        this.y -= this.speed;
        if (this.y < -20) this.reset();
    }
}

function initHearts() {
    for (let i = 0; i < config.particleCount; i++) {
        hearts.push(new Heart());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    requestAnimationFrame(animate);
}

initHearts();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== CONFETTI ON LOAD =====
window.addEventListener('load', () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff7882', '#feecea', '#F61F1F']
    });
});

// ===== MUSIC TOGGLE =====
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
    }
});

// ===== LIGHTBOX LOGIC =====
function openLightbox(item) {
    const img = item.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox__img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}
