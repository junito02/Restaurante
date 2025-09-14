// Abrir modal con video
const openModal = async (mealId) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    const meal = data.meals[0];

    const modal = document.getElementById("recipe-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalVideoContainer = document.getElementById(
      "modal-video-container"
    );

    modalTitle.textContent = meal.strMeal;

    let videoId = "";
    if (meal.strYoutube && meal.strYoutube.includes("v=")) {
      videoId = meal.strYoutube.split("v=")[1];
    }
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

    modalVideoContainer.innerHTML = embedUrl
      ? `<iframe src="${embedUrl}" allowfullscreen></iframe>`
      : `<p>No hay video disponible.</p>`;

    modal.style.display = "flex";
    modal.classList.add("show");

    document.body.style.overflow = "hidden";

    const closeModal = () => {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        modalVideoContainer.innerHTML = "";
        document.body.style.overflow = "";
      }, 300);
    };

    document.querySelector(".close-btn").onclick = closeModal;
    window.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  } catch (error) {
    console.error("Error al obtener receta:", error);
  }
};
