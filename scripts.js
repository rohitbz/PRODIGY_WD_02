let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 1;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = null;
    updatedTime = null;
    difference = null;
    running = false;
    timeDisplay.textContent = "00:00:00.000";
    laps.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter++}: ${timeDisplay.textContent}`;
        laps.appendChild(lapTime);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    const milliseconds = Math.floor((difference % 1000));

    timeDisplay.textContent =
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") : "") + milliseconds;
}
