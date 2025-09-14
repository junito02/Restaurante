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
