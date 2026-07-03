const galleries = {
  casa: ["galeria/foto-casa-01.jpg", "galeria/foto-casa-02.jpg", "galeria/foto-casa-03.jpg", "galeria/foto-casa-04.jpg", "galeria/foto-casa-05.jpg", "galeria/foto-casa-06.jpg", "galeria/foto-casa-07.jpg", "galeria/foto-casa-08.jpg", "galeria/foto-casa-09.jpg", "galeria/foto-casa-10.jpg", "galeria/foto-casa-11.jpg", "galeria/foto-casa-12.jpg", "galeria/foto-casa-13.jpg", "galeria/foto-casa-14.jpg", "galeria/foto-casa-15.jpg", "galeria/foto-casa-16.jpg", "galeria/foto-casa-17.jpg", "galeria/foto-casa-18.jpg", "galeria/foto-casa-19.jpg", "galeria/foto-casa-20.jpg", "galeria/foto-casa-21.jpg", "galeria/foto-casa-22.jpg", "galeria/foto-casa-23.jpg", "galeria/foto-casa-24.jpg", "galeria/foto-casa-25.jpg", "galeria/foto-casa-26.jpg", "galeria/foto-casa-27.jpg", "galeria/foto-casa-28.jpg", "galeria/foto-casa-29.jpg", "galeria/foto-casa-30.jpg", "galeria/foto-casa-31.jpg", "galeria/foto-casa-32.jpg", "galeria/foto-casa-33.jpg", "galeria/foto-casa-34.jpg", "galeria/foto-casa-35.jpg", "galeria/foto-casa-36.jpg", "galeria/foto-casa-37.jpg", "galeria/foto-casa-38.jpg", "galeria/foto-casa-39.jpg", "galeria/foto-casa-40.jpg", "galeria/foto-casa-41.jpg", "galeria/foto-casa-42.jpg", "galeria/foto-casa-43.jpg", "galeria/foto-casa-44.jpg", "galeria/foto-casa-45.jpg", "galeria/foto-casa-46.jpg", "galeria/foto-casa-47.jpg", "galeria/foto-casa-48.jpg"],
  clube: ["assets/clube/clube-01.jpg", "assets/clube/clube-02.jpg", "assets/clube/clube-03.jpg", "assets/clube/clube-04.jpg", "assets/clube/clube-05.jpg", "assets/clube/clube-06.jpg", "assets/clube/clube-07.jpg", "assets/clube/clube-08.jpg", "assets/clube/clube-09.jpg", "assets/clube/clube-10.jpg", "assets/clube/clube-11.jpg", "assets/clube/clube-12.jpg", "assets/clube/clube-13.jpg", "assets/clube/clube-14.jpg"]
};

let currentGallery = "casa";
let currentIndex = 0;

const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
}
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCount = document.getElementById("lightbox-count");

document.querySelectorAll(".photo-card").forEach(button => {
  button.addEventListener("click", () => openLightbox(button.dataset.gallery, Number(button.dataset.index)));
});

function openLightbox(gallery, index) {
  currentGallery = gallery;
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

function moveLightbox(direction) {
  const items = galleries[currentGallery];
  currentIndex = (currentIndex + direction + items.length) % items.length;
  renderLightbox();
}

function renderLightbox() {
  const items = galleries[currentGallery];
  lightboxImg.src = items[currentIndex];
  lightboxCount.textContent = `${currentIndex + 1} / ${items.length}`;
}

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
document.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") moveLightbox(1);
  if (event.key === "ArrowLeft") moveLightbox(-1);
});
