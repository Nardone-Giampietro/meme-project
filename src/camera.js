export async function videoPermission() {
    const avStream = await navigator.mediaDevices.getUserMedia({video: true});
    return avStream;
}

export async function streamVideo(stream) {
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();
    return {
        video: video,
        videoHeight: video.videoHeight,
        videoWidth: video.videoWidth,
    };
}

export function drawVideo(video, canvas) {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
}

export function drawText(uText, dText, canvas) {
    const ctx = canvas.getContext('2d');
    const x = canvas.width / 2;
    const y = canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px Impact";

    ctx.textAlign = "center";
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = 4;
    ctx.strokeText(uText, x,50);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText(uText, x,50);

    ctx.textAlign = "center";
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = 4;
    ctx.strokeText(dText, x,y - 5);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText(dText, x,y - 5);
}