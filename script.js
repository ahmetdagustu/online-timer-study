let countdown;
let timerDisplay = document.getElementById('timer');
let playButton = document.getElementById('playButton');
let audioElements = [
    document.getElementById('audio1'),
    document.getElementById('audio2'),
    document.getElementById('audio3')
];
let volumeControls = document.querySelectorAll('.volumeControl');

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function startTimer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        const percentComplete = ((seconds - secondsLeft) / seconds) * 100;

        setProgress(percentComplete);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;
    timerDisplay.textContent = display;
}

playButton.addEventListener('click', () => {
    let isPlaying = !audioElements[0].paused;

    if (!isPlaying) {
        audioElements[0].volume = 0.5;

        audioElements.forEach((audio, index) => {
            if (index !== 0) {
                audio.volume = 0;
            }
        });

        audioElements.forEach(audio => {
            audio.play();
        });

        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioElements.forEach(audio => {
            audio.pause();
        });
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

volumeControls.forEach((control, index) => {
    control.addEventListener('input', (e) => {
        let audio = document.getElementById(control.parentElement.dataset.audio);
        audio.volume = e.target.value;
    });
});
