/* ============================= */
/*       HEART BACKGROUND        */
/* ============================= */
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

class Heart {
    constructor() {
        this.reset();
        this.size = Math.random() * 8 + 4;
        this.speed = Math.random() * 1 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "pink";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x - this.size, this.y - this.size,
            this.x - this.size * 2, this.y + this.size,
            this.x, this.y + this.size * 2
        );
        ctx.bezierCurveTo(
            this.x + this.size * 2, this.y + this.size,
            this.x + this.size, this.y - this.size,
            this.x, this.y
        );
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y -= this.speed;
        if (this.y < -10) this.reset();
    }
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (hearts.length < 80) hearts.push(new Heart());

    hearts.forEach(h => {
        h.update();
        h.draw();
    });

    requestAnimationFrame(animateHearts);
}
animateHearts();

/* ============================= */
/*       STEP NAVIGATION         */
/* ============================= */
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

// GIFT REVEAL
document.getElementById("giftBox").addEventListener("click", () => {
    const giftReveal = document.getElementById("giftReveal");
    giftReveal.classList.remove("hidden");

    // Dim and disable the gift emoji
    const giftBox = document.getElementById("giftBox");
    giftBox.style.opacity = "0.3";
    giftBox.style.pointerEvents = "none";
});

// MOVE TO STEP 2 (MAP)
document.getElementById("toStep2").addEventListener("click", () => {
    step1.classList.remove("active");
    step1.classList.add("hidden");

    step2.classList.remove("hidden");
    step2.classList.add("active");

    // Animate map card
    setTimeout(() => {
        document.getElementById("mapCard").classList.add("show");
    }, 200);
});

// MOVE TO STEP 3 (KISSING FACES)
document.getElementById("toStep3").addEventListener("click", () => {
    step2.classList.remove("active");
    step2.classList.add("hidden");

    step3.classList.remove("hidden");
    step3.classList.add("active");

    triggerKissAnimation();
});

/* ============================= */
/*      KISSING FACE ANIMATION   */
/* ============================= */
function triggerKissAnimation() {
    const yourFace = document.getElementById("yourFace");
    const herFace = document.getElementById("herFace");

    // Remove old animation
    yourFace.classList.remove("kiss-animation");
    herFace.classList.remove("kiss-animation");

    // Trigger reflow to restart animation
    void yourFace.offsetWidth;
    void herFace.offsetWidth;

    // Add animation class
    yourFace.classList.add("kiss-animation");
    herFace.classList.add("kiss-animation");

    // Trigger floating hearts during kiss
    triggerKissHearts();
}

/* ============================= */
/*      FLOATING HEARTS DURING KISS */
/* ============================= */
const heartsContainer = document.querySelector('.hearts-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 80 + '%';
    heartsContainer.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => heart.remove(), 3000);
}

function startHearts(duration = 4000, interval = 150) {
    const heartInterval = setInterval(createHeart, interval);
    setTimeout(() => clearInterval(heartInterval), duration);
}

function triggerKissHearts() {
    startHearts(4000, 150);
}

/* ============================= */
/*        WINDOW RESIZE           */
/* ============================= */
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
