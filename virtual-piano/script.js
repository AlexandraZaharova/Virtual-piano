const piano = document.querySelector(".piano");
const pianoButton = document.querySelectorAll(".piano-key");
const btnContainer = document.querySelector(".btn-container");
const btnNoteLet = document.querySelectorAll(".btn");
const keyObj = {
    KeyR: 'R',
    KeyT: 'T',
    KeyU: 'U',
    KeyI: 'I',
    KeyO: 'O',
    KeyD: 'D',
    KeyF: 'F',
    KeyG: 'G',
    KeyH: 'H',
    KeyJ: 'J',
    KeyK: 'K',
    KeyL: 'L',
}

//воспроизведение аудио
function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

//нажатие мышкой
const startSound = (event) => {
    event.target.classList.add("piano-key-active");
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
}

const stopSound = (event) => {
    event.target.classList.remove("piano-key-active");
}

const startCorrespondOver = (event) => {
    event.target.classList.add("piano-key-active");
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    pianoButton.forEach((elem) => {
        elem.addEventListener("mouseover", startSound);
        elem.addEventListener("mouseout", stopSound);
    });
}

const stopCorrespondOver = () => {
    pianoButton.forEach((elem) => {
        elem.classList.remove("piano-key-active");
        elem.removeEventListener("mouseover", startSound);
        elem.removeEventListener("mouseout", stopSound);
    });
}

//переключение кнопок
const activeBtn = (event) => {
    if (!event.target.classList.contains("btn-active")) {
        btnNoteLet.forEach((elem) => {
            elem.classList.toggle("btn-active");
        });
    }
    if (event.target.classList.contains("btn-letters")) {
        pianoButton.forEach((elem) => {
            elem.classList.add("piano-key-letter");
        });
    } else {
        pianoButton.forEach((elem) => {
            elem.classList.remove("piano-key-letter");
        });
    }
}

//нажатие клавиатуры
const keyStartSound = (event) => {
    if (event.code in keyObj) {
        pianoButton.forEach((elem) => {
            if (elem.getAttribute("data-letter") == keyObj[event.code]) {
                console.log(elem);
                if (event.repeat === false) {
                    elem.classList.add("piano-key-active");
                    const note = elem.dataset.note;
                    const src = `assets/audio/${note}.mp3`;
                    playAudio(src);
                }
            }
        });
    }
}

const keyStopSound = (elem) => {
    pianoButton.forEach((elem) => {
        elem.classList.remove("piano-key-active");
    });
}

piano.addEventListener("mousedown", startCorrespondOver, false);
piano.addEventListener("mouseup", stopCorrespondOver);
window.addEventListener("keydown", keyStartSound, false);
window.addEventListener("keyup", keyStopSound);
btnContainer.addEventListener("click", activeBtn);