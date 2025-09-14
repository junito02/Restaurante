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
