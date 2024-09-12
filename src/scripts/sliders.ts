let currentSlide: number = 0;
const slides: NodeListOf<Element> = document.querySelectorAll("#slide");
const slideButton2: HTMLElement | null = document.getElementById("slide-button2");
const slideButton3: HTMLElement | null = document.getElementById("slide-button3");

function showSlide(index: number): void {
  const slidesContainer: HTMLElement | null = document.querySelector("#slider-container");
  
  if (!slidesContainer) return;

  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}


document.getElementById("slider-button-next")?.addEventListener("click", () => {
  currentSlide++;
  showSlide(currentSlide);
  if (slideButton2) {
    slideButton2.className += " border-black/70";
  }
});

document.getElementById("slider-button-next2")?.addEventListener("click", () => {
  currentSlide++;
  showSlide(currentSlide);
  if (slideButton3) {
    slideButton3.className += " border-black/70";
  }
});
