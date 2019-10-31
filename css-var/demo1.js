const root = document.documentElement;

document.querySelector(".light").addEventListener("click", function() {
  root.style.setProperty("--text-color", "#000");
  root.style.setProperty("--bg-color", "#fff");
});

document.querySelector(".dark").addEventListener("click", function() {
  root.style.setProperty("--text-color", "#fff");
  root.style.setProperty("--bg-color", "#000");
});
