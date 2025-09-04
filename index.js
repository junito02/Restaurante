document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const fetchApi = async () => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=c"
    );
    const data = await response.json();

    const limitedMeals = data.meals.slice(0, 8);
    displayPlatillos(limitedMeals);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
};

const displayPlatillos = (meals) => {
  const container = document.querySelector(".menu-cards-container");
  container.innerHTML = "";

  meals.forEach((meal) => {
    const platillo = document.createElement("div");
    platillo.className = "platillo";
    platillo.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p class="description">${meal.strMeal}</p>
      <button class="view-recipe-btn">Ver Receta</button>
    `;

    platillo.querySelector(".view-recipe-btn").addEventListener("click", () => {
      openModal(meal.idMeal);
    });

    container.appendChild(platillo);
  });
};

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

    const videoId = meal.strYoutube.split("v=")[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    modalVideoContainer.innerHTML = `<iframe src="${embedUrl}" allowfullscreen></iframe>`;

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
      t;
    };

    document.querySelector(".close-btn").onclick = closeModal;
    window.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  } catch (error) {
    console.error("Error al obtener receta:", error);
  }
};

document.addEventListener("DOMContentLoaded", fetchApi);
