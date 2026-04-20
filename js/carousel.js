const data = [
  { title: "RUINED.", img: "imgs/RUINED.png", info: "RUINED. is a horror game created by GotorFI and produced by GotorFI's company, ShrooMush Studios. RUINED. was released in 2026 on the Roblox platform." },
  { title: "BaldJumper", img: "imgs/baldjumper.png", info: "Bald Jumper is a platformer game created by GotorFI using Python and Pygame, where the goal is to complete levels. The game was made as an exercise, which is why it is not available." }
];

let index = 0;

function updateCarousel() {
  const titleElem = document.getElementById('carousel-title');
  const imgElem = document.getElementById('carousel-img');
  const infoElem = document.getElementById('carousel-info');
  const dots = document.querySelectorAll('.dot');

  titleElem.innerText = data[index].title;
  imgElem.src = data[index].img;
  infoElem.innerText = data[index].info;
  imgElem.src = data[index].img;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function changeSlide(n) {
  index = (index + n + data.length) % data.length;
  updateCarousel();
}

function currentSlide(n) {
  index = n;
  updateCarousel();
}
