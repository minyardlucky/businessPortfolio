  // Modal logic
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const captionText = document.getElementById("caption");

  const certImages = document.querySelectorAll(".cert-gallery img");
  certImages.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.textContent = img.alt;
    });
  });

  const closeBtn = document.querySelector(".modal .close");
  closeBtn.onclick = function () {
    modal.style.display = "none";
  }

  // Optional: close modal on outside click
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }