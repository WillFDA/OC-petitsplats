const dropdowns = document.querySelectorAll(".dropdown-js");
const selectedBtnsContainer = document.querySelector(".selected-btns");
const listContainer = document.querySelector(".list-js");

let liBtns = [];
let deleteBtns = [];

function updateDeleteBtns() {
  deleteBtns = Array.from(document.querySelectorAll(".delete-btn"));
}

function updateLiBtns() {
  liBtns = Array.from(document.querySelectorAll(".list-js li"));
}

function addDeleteButtonListener(deleteBtn) {
  deleteBtn.addEventListener("click", (e) => {
    const text = e.currentTarget.parentElement.textContent;
    const deleteBtnContainer = e.currentTarget.parentElement;
    deleteBtnContainer.remove();
    updateDeleteBtns();

    const newLi = document.createElement("li");
    newLi.textContent = text;
    listContainer.appendChild(newLi);
    updateLiBtns();
    liBtns.forEach(addLiButtonListener);
  });
}

function addLiButtonListener(li) {
  li.addEventListener("click", (e) => {
    const text = e.currentTarget.textContent;
    const newButton = document.createElement("button");
    newButton.classList.add(
      "bg-primary",
      "justify-between",
      "items-center",
      "my-2",
      "p-3",
      "font-light",
      "text-black",
      "w-full",
      "hidden",
      "group-data-[opened='true']/select:flex"
    );
    const span = document.createElement("span");
    span.textContent = text;
    const img = document.createElement("img");
    img.src = "./tiny_close.svg";
    img.alt = "delete icon";
    img.classList.add("w-5", "delete-btn");
    newButton.appendChild(span);
    newButton.appendChild(img);
    selectedBtnsContainer.appendChild(newButton);
    e.currentTarget.remove();
    updateDeleteBtns();
    updateLiBtns();
    
    deleteBtns.forEach(addDeleteButtonListener);
  });
}

updateDeleteBtns();
updateLiBtns();

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    const dropdownContainer = e.currentTarget.parentElement;
    dropdownContainer.dataset.opened === "true"
    ? (dropdownContainer.dataset.opened = "false")
    : (dropdownContainer.dataset.opened = "true");
  });
});

deleteBtns.forEach(addDeleteButtonListener);
liBtns.forEach(addLiButtonListener);
