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
