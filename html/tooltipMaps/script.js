const dropdown = document.getElementById("dropdown");

dropdown.addEventListener("change", function () {
  const selectedValue = dropdown.value;
  const selectedPasture = document.getElementById(selectedValue);

  const pastures = document.querySelectorAll(".pasture");

  pastures.forEach(function (pasture) {
    pasture.classList.remove("active");
  });

  selectedPasture.classList.add("active");

  selectedPasture.scrollIntoView({ behavior: "smooth" });
});
