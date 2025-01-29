document.addEventListener("DOMContentLoaded", () => {
  const bannerSection = document.querySelector(".banner-section");
  const images = [
    "img/banner/1.jpg",
    "img/banner/2.jpg",
    "img/banner/3.jpg",
    "img/banner/4.jpg",
    "img/banner/5.jpg",
    "img/banner/6.jpg",
  ];
  let currentIndex = 0;

  if (images.length > 1) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      bannerSection.style.backgroundImage = `url('${images[currentIndex]}')`;
    }, 7000);
  } else {
    bannerSection.style.backgroundImage = `url('${images[0]}')`;
  }
});
