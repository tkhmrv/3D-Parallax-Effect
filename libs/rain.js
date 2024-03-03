// Получаем элемент Canvas и его контекст рисования
let canvas = document.getElementsByClassName('rain')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

// Функция для генерации случайных чисел в заданном диапазоне
function randomNum(max, min) {
	return Math.floor(Math.random() * max) + min;
}

// Конструктор для капель дождя
class RainDrops {
	constructor(x, y, endy, velocity, opacity) {
		this.x = x;
		this.y = y;
		this.endy = endy;
		this.velocity = velocity;
		this.opacity = opacity;

		// Метод для отрисовки капли
		this.draw = function () {
			c.beginPath();
			c.moveTo(this.x, this.y);
			c.lineTo(this.x, this.y - this.endy);
			c.lineWidth = randomNum(2, 1);
			c.strokeStyle = "rgba(255, 255, 255, " + this.opacity + ")";
			c.stroke();
		};

		// Метод для обновления позиции капли
		this.update = function () {
			let rainEnd = window.innerHeight + 100;
			if (this.y >= rainEnd) {
				this.y = this.endy - 100;
			} else {
				this.y = this.y + this.velocity;
			}
			this.draw();
		};
	}
}

// Массив для хранения капель дождя
let rainArray = [];

// Создаем капли дождя со случайными параметрами и добавляем их в массив
for (let i = 0; i < 140; i++) {
	let rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
	let rainYLocation = Math.random() * -500;
	let randomRainHeight = randomNum(10, 2);
	let randomSpeed = randomNum(20, .2);
	let randomOpacity = Math.random() * .55;
	rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
}

// Функция анимации дождя
function animateRain() {
	requestAnimationFrame(animateRain);
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);
	for (let i = 0; i < rainArray.length; i++) {
		rainArray[i].update();
	}
}

// Запускаем анимацию
animateRain();
