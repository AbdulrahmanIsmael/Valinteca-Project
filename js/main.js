// Define DOM
const btn = document.querySelector(".start-btn");

// Functions
loadRegisterPage();

function loadRegisterPage() {
  btn.addEventListener("click", () => {
    window.location = "../register.html";
  });
}
