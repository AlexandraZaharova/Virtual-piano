const piano = document.querySelector(".piano");
const pianoButton = document.querySelectorAll(".piano-key");
const btnContainer = document.querySelector(".btn-container");
const btnNoteLet = document.querySelectorAll(".btn");

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

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

const stopCorrespondOver = (event) => {
    pianoButton.forEach((elem) => {
        elem.classList.remove("piano-key-active");
        elem.removeEventListener("mouseover", startSound);
        elem.removeEventListener("mouseout", stopSound);
    });
}

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

piano.addEventListener("mousedown", startCorrespondOver, false);
piano.addEventListener("mouseup", stopCorrespondOver);
btnContainer.addEventListener("click", activeBtn);