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
