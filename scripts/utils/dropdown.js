const dropdowns = document.querySelectorAll(".dropdown-js");
const deleteBtns = document.querySelectorAll(".delete-btn");

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    const dropdownContainer = e.currentTarget.parentElement;
    console.log();
    dropdownContainer.dataset.opened === "true" ? dropdownContainer.dataset.opened = "false" : dropdownContainer.dataset.opened = "true";
  }
)});

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    const deleteBtnContainer = e.currentTarget.parentElement;
    deleteBtnContainer.remove();
  }
)});