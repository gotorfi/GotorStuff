let images = {
    code: [],
    art: [],
    models: []
};

let currentCategory = "code";
let index = 0;
let isAnimating = false;

const imgCurrent = document.getElementById("img-current");
const imgNext = document.getElementById("img-next");
const overlay = document.querySelector(".flash-overlay");

const nextSound = document.getElementById("sound-next");
const backSound = document.getElementById("sound-back");

function checkImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

async function loadImages(category) {
    let list = [];
    let i = 1;

    while (true) {
        let path = `work/${category}/${category}${i}.png`;

        if (!(await checkImage(path))) break;

        list.push(path);
        i++;
    }

    return list;
}

/* INIT */
(async () => {
    for (let cat of Object.keys(images)) {
        images[cat] = await loadImages(cat);
    }

    if (images[currentCategory].length > 0) {
        imgCurrent.src = images[currentCategory][0];
        imgCurrent.className = "gallery-img active";
    }
})();

/* NEXT */
document.querySelector(".right").onclick = () => {
    if (isAnimating || images[currentCategory].length === 0) return;
    isAnimating = true;

    nextSound.currentTime = 0;
    nextSound.play();

    overlay.classList.add("flash");

    let newIndex = (index + 1) % images[currentCategory].length;

    imgNext.className = "gallery-img";
    imgNext.src = images[currentCategory][newIndex];

    requestAnimationFrame(() => {
        imgNext.classList.add("fade-in");
    });

    imgCurrent.classList.remove("active");
    imgCurrent.classList.add("drop-out");

    setTimeout(() => {
        imgCurrent.className = "gallery-img active";
        imgCurrent.src = imgNext.src;

        imgNext.className = "gallery-img";

        index = newIndex;
        isAnimating = false;
    }, 500);

    setTimeout(() => overlay.classList.remove("flash"), 400);
};

/* BACK */
document.querySelector(".left").onclick = () => {
    if (isAnimating || images[currentCategory].length === 0) return;

    backSound.currentTime = 0;
    backSound.play();

    index = (index - 1 + images[currentCategory].length) % images[currentCategory].length;

    imgCurrent.className = "gallery-img active";
    imgCurrent.src = images[currentCategory][index];
};

/* CATEGORY SWITCH */
document.querySelectorAll(".gallery-menu button").forEach(btn => {
    btn.onclick = () => {

        if (isAnimating) return;

        document.querySelectorAll(".gallery-menu button")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentCategory = btn.dataset.category;
        index = 0;

        backSound.currentTime = 0;
        backSound.play();

        overlay.classList.add("flash");

        setTimeout(() => {
            if (images[currentCategory].length > 0) {
                imgCurrent.className = "gallery-img active";
                imgCurrent.src = images[currentCategory][0];
            }
        }, 200);

        setTimeout(() => overlay.classList.remove("flash"), 400);
    };
});