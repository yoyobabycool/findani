const gameArea = document.getElementById('gameArea');
const aahhSound = document.getElementById('aahhSound');
const videoContainer = document.getElementById('videoContainer');
const youtubeVideo = document.getElementById('youtubeVideo');

let aniX = Math.floor(Math.random() * gameArea.clientWidth);
let aniY = Math.floor(Math.random() * gameArea.clientHeight);

function handleInteraction(event) {
    // Prevent default behavior for touch events
    event.preventDefault();
    
    // Determine the coordinates for mouse or touch
    let clientX, clientY;
    if (event.type === 'click' || event.type === 'mousedown') {
        clientX = event.clientX;
        clientY = event.clientY;
    } else if (event.type === 'touchstart') {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    }

    const distance = getDistance(clientX, clientY, aniX, aniY);
    adjustVolume(distance);
	console.log(clientX, clientY, aniX, aniY)
    aahhSound.play();

    if (distance < 50) {
        revealani();
    }
}
gameArea.addEventListener('click', handleInteraction);
gameArea.addEventListener('touchstart', handleInteraction);

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function adjustVolume(distance) {
    const volume = Math.max(1 - distance / 500, 0);
    aahhSound.volume = volume;
}

function revealani() {
    const ani = document.createElement('div');
    ani.id = 'ani';
    ani.style.left = `0px`;
    ani.style.top = `0px`;
    ani.style.position = 'absolute';
    ani.style.display = 'block';
    gameArea.appendChild(ani);
    aahhSound.pause();

    // Show and play the YouTube video
    videoContainer.style.display = 'block';
    playYouTubeVideo();
}

function playYouTubeVideo() {
    youtubeVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}
