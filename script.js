document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const giftBox = document.getElementById("giftBox");
    const giftReveal = document.getElementById("giftReveal");
    const playAgain = document.getElementById("playAgain");
    const heartsContainer = document.querySelector(".hearts-container");

    /* ============================= */
    /*       HEART BACKGROUND        */
    /* ============================= */
    class Heart {
        constructor() { this.reset(); this.size = Math.random() * 8 + 4; this.speed = Math.random() * 1 + 0.5; this.alpha = Math.random() * 0.5 + 0.5; }
        reset() { this.x = Math.random() * canvas.width; this.y = canvas.height + Math.random() * 100; }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = "pink";
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x - this.size, this.y - this.size, this.x - this.size * 2, this.y + this.size, this.x, this.y + this.size * 2);
            ctx.bezierCurveTo(this.x + this.size * 2, this.y + this.size, this.x + this.size, this.y - this.size, this.x, this.y);
            ctx.fill();
            ctx.restore();
        }
        update() { this.y -= this.speed; if (this.y < -10) this.reset(); }
    }
    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (hearts.length < 80) hearts.push(new Heart());
        hearts.forEach(h => { h.update(); h.draw(); });
        requestAnimationFrame(animateHearts);
    }
    animateHearts();

    /* ============================= */
    /*       STEP NAVIGATION         */
    /* ============================= */
    giftBox.addEventListener("click", () => {
        giftReveal.classList.remove("hidden");
        giftBox.style.display = "none";
        giftBox.style.opacity = "0.3";
        giftBox.style.pointerEvents = "none";
    });

    document.getElementById("toStep2").addEventListener("click", () => {
        step1.classList.replace("active", "hidden");
        step2.classList.replace("hidden", "active");
        setTimeout(() => { document.getElementById("mapCard").classList.add("show"); }, 200);
    });

    document.getElementById("toStep3").addEventListener("click", () => {
        step2.classList.replace("active", "hidden");
        step3.classList.replace("hidden", "active");
        startFloatingFaces();
        triggerHearts(4000, 150);
    });

    /* ============================= */
    /*       FLOATING FACES          */
    /* ============================= */
    function startFloatingFaces() {
        const yourFace = document.getElementById("yourFace");
        const herFace = document.getElementById("herFace");
        yourFace.style.animation = "none";
        herFace.style.animation = "none";
        void yourFace.offsetWidth; void herFace.offsetWidth;
        yourFace.style.animation = "floatUpDown 3s ease-in-out infinite alternate";
        herFace.style.animation = "floatUpDown 4s ease-in-out infinite alternate-reverse";
    }

    /* ============================= */
    /*       FLOATING HEARTS          */
    /* ============================= */
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤️";
        heart.style.left = Math.random() * 80 + "%";
        heart.style.setProperty("--drift", Math.random());
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
    function triggerHearts(duration = 4000, interval = 150) {
        const heartInterval = setInterval(createHeart, interval);
        setTimeout(() => clearInterval(heartInterval), duration);
    }

    /* ============================= */
    /*        PLAY AGAIN BUTTON       */
    /* ============================= */
    playAgain.addEventListener("click", () => {
        step3.classList.replace("active", "hidden");
        giftBox.style.display = "block";
        giftBox.style.opacity = "1";
        giftBox.style.pointerEvents = "auto";
        giftReveal.classList.add("hidden");
        step1.classList.replace("hidden", "active");
        heartsContainer.innerHTML = "";
        
    });

    /* ============================= */
    /*        WINDOW RESIZE           */
    /* ============================= */
    window.addEventListener("resize", () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
});
