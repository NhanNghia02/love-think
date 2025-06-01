const colors = [
    "#eec996", "#8fb7d3", "#b7d4c6", "#c3bedd", "#f1d5e4", "#cae1d3", "#f3c89d",
    "#d0b0c3", "#819d53", "#c99294", "#cec884", "#ff8e70", "#e0a111", "#fffdf6",
    "#cbd7ac", "#e8c6c0", "#dc9898", "#ecc8ba"
];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ww = window.innerWidth;
let wh = window.innerHeight;

let hearts = [];

function init() {
    canvas.width = ww;
    canvas.height = wh;
    for (let i = 0; i < 100; i++) {
        hearts.push(new Heart());
    }
    requestAnimationFrame(render);
}

function Heart() {
    this.x = Math.random() * ww;
    this.y = Math.random() * wh;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.vel = {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
    };
    this.targetScale = Math.random() * 0.15 + 0.02;
    this.scale = this.targetScale * Math.random();
}

Heart.prototype.update = function () {
    this.x += this.vel.x;
    this.y += this.vel.y;

    this.scale += (this.targetScale - this.scale) * 0.01;

    this.width = 473.8;
    this.height = 408.6;

    if (this.x - this.width > ww || this.x + this.width < 0) {
        this.scale = 0;
        this.x = Math.random() * ww;
    }
    if (this.y - this.height > wh || this.y + this.height < 0) {
        this.scale = 0;
        this.y = Math.random() * wh;
    }
};

const texts = [
    "Nhân Nghĩa Yêu Tuyết Anh",
    "Tuyết Anh, anh yêu em",
    "Mỗi ngày anh nghĩ về em",
    "Mong được bên em mãi mãi",
    "Anh yêu em nhiều lắm",
    "Em là lý do anh mỉm cười mỗi sáng",
    "Trái tim anh chỉ thuộc về em",
    "Được yêu em là hạnh phúc lớn nhất",
    "Anh muốn cùng em đi hết cuộc đời",
    "Tình yêu anh dành cho em là thật lòng",
    "Em là tất cả với anh, không thể thiếu"
];

let currentTextIndex = 0;

setInterval(() => {
    currentTextIndex = (currentTextIndex + 1) % texts.length;
}, 3000);

Heart.prototype.draw = function (i) {
    ctx.globalAlpha = this.opacity;
    ctx.font = `${100 * this.scale}px "Verdana"`;
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillText(
        texts[currentTextIndex],
        this.x - this.width * 0.5,
        this.y - this.height * 0.5,
        this.width,
        this.height
    );
};

function render() {
    ctx.clearRect(0, 0, ww, wh);
    for (let i = 0; i < 100; i++) {
        hearts[i].update(i);
        hearts[i].draw(i);
    }
    requestAnimationFrame(render);
}

init();

window.addEventListener("resize", function () {
    ww = window.innerWidth;
    wh = window.innerHeight;
});
