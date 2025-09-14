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
