document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.section1, .section2, .section3, .section4, .hero h1, .hero h2, .game-carousel, .fadeleft, .faderight');
    hiddenElements.forEach((el) => observer.observe(el));
});


function showVideo(button) {
    const card = button.closest(".showcase-card");

    const img = card.querySelector("img.showcase-media");
    const video = card.querySelector("video.showcase-media");

    if (!video) return;

    img.classList.remove("active-media");
    video.classList.add("active-media");

    video.play();
}

function showImage(button) {
    const card = button.closest(".showcase-card");

    const img = card.querySelector("img.showcase-media");
    const video = card.querySelector("video.showcase-media");

    img.classList.add("active-media");

    if (video) {
        video.classList.remove("active-media");
        video.pause();
    }
}
