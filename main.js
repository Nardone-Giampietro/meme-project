import {Modal} from "./src/modal.js";
import * as Camera from "./src/camera.js";

const CANVAS_TEXT_DEFAULT_WIDTH = 480;
const CANVAS_TEXT_DEFAULT_HEIGHT = 480;

const html = document.querySelector("html");
const downloadButton = document.querySelector("#download-button");
const toggle = document.getElementById("toggle");
const article = document.getElementById("options");
const upText = document.getElementById("up-text");
const downText = document.getElementById("down-text");
const canvasMerge = document.getElementById("merge");
const canvasImage = document.getElementById("canvas-image");
const canvasText = document.getElementById("canvas-text");
const darkMode = document.querySelector("#dark-mode");
const words = document.getElementById("words");

toggle.addEventListener("change", toggleTheme);

const toggleModal = new Modal("Settings", article, darkMode);
const wordsModal = new Modal("Update Text", article, words);

toggleModal.render();
wordsModal.render();

wordsModal.addSubmitEvent(wordsSubmitFunction);

setCanvasesSizes(CANVAS_TEXT_DEFAULT_WIDTH, CANVAS_TEXT_DEFAULT_HEIGHT);

Camera.videoPermission()
    .then(videoStream => {
        return Camera.streamVideo(videoStream)
    })
    .then(videoData => {
        const previewVideoModal = new Modal("Take Photo", article, videoData.video);
        setCanvasesSizes(videoData.videoWidth, videoData.videoHeight);
        previewVideoModal.render();
        previewVideoModal.addSubmitEvent(() => {
            Camera.drawVideo(videoData.video, canvasImage)
        });
    })
    .catch(error => {
        console.log(error)
    });

downloadButton.addEventListener("click", downloadButtonFunction);



function downloadButtonFunction (event){
    event.preventDefault();
    const anchorEl = document.createElement("a");
    const ctx = canvasMerge.getContext("2d");
    ctx.drawImage(canvasImage, 0, 0);
    ctx.drawImage(canvasText, 0, 0);
    const imageUrl = canvasMerge.toDataURL("image/png");
    anchorEl.href = imageUrl;
    anchorEl.download = "meme-me";
    anchorEl.click();
    anchorEl.remove();
}

function toggleTheme () {
    const theme = html.getAttribute("data-theme");
    const newTheme = theme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
}

function wordsSubmitFunction () {
    const uText = upText.value.toString().toUpperCase();
    const dText = downText.value.toString().toUpperCase();
    Camera.drawText(uText, dText, canvasText);
}

function setCanvasesSizes (width, height){
    canvasText.width = width;
    canvasText.height = height;
    canvasImage.width = width;
    canvasImage.height = height;
    canvasMerge.width = width;
    canvasMerge.height = height;
}




