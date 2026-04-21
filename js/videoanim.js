const sections = document.querySelectorAll("[data-video]");
const videos = document.querySelectorAll(".background-video");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetId = entry.target.getAttribute("data-video");

            videos.forEach(video => {
                if (video.id === targetId) {
                    video.classList.add("active");
                    video.play();
                } else {
                    video.classList.remove("active");
                }
            });
        }
    });
}, {
    threshold: 0.6
});

sections.forEach(section => observer.observe(section));

/* varmistaa autoplayn joissain selaimissa */
document.addEventListener("click", () => {
    videos.forEach(v => v.play());
});