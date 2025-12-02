// HEART BACKGROUND
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const hearts = [];

function Heart() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 8 + 4;
    this.speed = Math.random() * 1 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.5;
}

Heart.prototype.draw = function () {
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
};

Heart.prototype.update = function () {
    this.y -= this.speed;
    if (this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
    }
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (hearts.length < 80) hearts.push(new Heart());

    hearts.forEach((heart) => {
        heart.update();
        heart.draw();
    });

    requestAnimationFrame(animate);
}
animate();


// STEP LOGIC
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

document.getElementById("giftBox").onclick = () => {
    document.getElementById("giftReveal").classList.remove("hidden");
    document.getElementById("giftBox").style.opacity = "0.3";
    document.getElementById("giftBox").style.pointerEvents = "none";
};

document.getElementById("toStep2").onclick = () => {
    step1.classList.remove("active");
    step1.classList.add("hidden");

    step2.classList.remove("hidden");
    step2.classList.add("active");
};

document.getElementById("toStep3").onclick = () => {
    step2.classList.remove("active");
    step2.classList.add("hidden");

    step3.classList.remove("hidden");
    step3.classList.add("active");
};
