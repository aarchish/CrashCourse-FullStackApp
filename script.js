console.log("Hello World!");

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

btn.addEventListener("click", function () {
  console.log("Form Clicked");
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
    console.log("Display Fact Form");
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share A Fact";
    console.log("Hide Fact Form");
  }
});
