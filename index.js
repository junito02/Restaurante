// Scroll suave al dar clic en el navbar
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

// Mostrar loading
const showLoading = () => {
  const container = document.querySelector(".menu-cards-container");
  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Cargando platillos...</p>
    </div>
  `;
};

// Obtener platillos iniciales (ejemplo con letra "c")
const fetchApi = async (letter = "c") => {
  showLoading();

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = await response.json();

    if (data.meals) {
      const limitedMeals = data.meals.slice(0, 8);
      displayPlatillos(limitedMeals);
    } else {
      document.querySelector(".menu-cards-container").innerHTML = `
        <p class="error">No se encontraron platillos con esa letra.</p>
      `;
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    document.querySelector(".menu-cards-container").innerHTML = `
      <p class="error">Error al cargar los platillos. Intenta de nuevo.</p>
    `;
  }
};

// Buscar platillos por nombre
const searchMeals = async (query) => {
  showLoading();

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();

    if (data.meals) {
      displayPlatillos(data.meals);
    } else {
      document.querySelector(".menu-cards-container").innerHTML = `
        <p class="error">No se encontraron resultados para "${query}".</p>
      `;
    }
  } catch (error) {
    console.error("Error en búsqueda:", error);
  }
};

// Mostrar platillos en la página
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

  // 👇 Al mostrar resultados, hacer scroll a la sección del menú
  document.querySelector("#Menu").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

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

// 👉 Conectar el buscador
document.addEventListener("DOMContentLoaded", () => {
  // Cargar platillos por defecto
  fetchApi();

  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  // Buscar al dar clic en el botón
  searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (value) searchMeals(value);
  });

  // Buscar al presionar Enter
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = searchInput.value.trim();
      if (value) searchMeals(value);
    }
  });
});
