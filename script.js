let countdown;
let timerDisplay = document.getElementById('timer');
let playButton = document.getElementById('playButton');
let audioElements = [
    document.getElementById('audio1'),
    document.getElementById('audio2'),
    document.getElementById('audio3')
];
let volumeControls = document.querySelectorAll('.volume-slider');

// Çemberlerin çizgi uzunlukları hesaplama
const circle = document.querySelector('.circular-progress');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// Çember çizgi ayarlarını başlat
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

// Çemberin dolma oranını ayarlama fonksiyonu
function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

// Zamanlayıcıyı başlatma fonksiyonu
function startTimer(seconds) {
    clearInterval(countdown); // Önceki zamanlayıcıyı sıfırla
    const now = Date.now();
    const then = now + seconds * 1000; // Gelecek zaman hesaplama
    displayTimeLeft(seconds); // Kalan zamanı göster

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000); // Kalan saniyeyi hesapla
        const percentComplete = ((seconds - secondsLeft) / seconds) * 100; // Tamamlanma yüzdesini hesapla
        setProgress(percentComplete); // Çemberin dolma yüzdesini ayarla

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft); // Zamanı güncelle
    }, 1000);
}

// Kalan süreyi ekrana yazdıran fonksiyon
function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60); // Dakikaları hesapla
    const remainderSeconds = seconds % 60; // Geriye kalan saniyeyi hesapla
    const display = `${String(minutes).padStart(2, '0')}:${String(remainderSeconds).padStart(2, '0')}`;
    timerDisplay.textContent = display; // Ekrana yazdır
}

// Oynatma düğmesi için olay dinleyici
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

// Ses kontrolleri için olay dinleyici
volumeControls.forEach((control, index) => {
    control.addEventListener('input', (e) => {
        let audio = document.getElementById(control.parentElement.dataset.audio);
        audio.volume = e.target.value;
    });
});
