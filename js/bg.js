const bgVideo = document.querySelector(".background-vid");

let current = 0;
let target = 0;

bgVideo.addEventListener("loadeddata", () => {
    bgVideo.playbackRate = 0.8;
});

function animate() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (maxScroll > 0) {
        target = (window.scrollY / maxScroll) * 100;
    } else {
        target = 0;
    }

    current += (target - current) * 0.05;

    /* MUUTOS TÄSSÄ: Kun ollaan pohjalla (current = 100), videota siirretään -50% ylöspäin. */
    const moveY = (current / 100) * -50;

    bgVideo.style.transform = `translateY(${moveY}%)`;

    requestAnimationFrame(animate);
}


animate();
