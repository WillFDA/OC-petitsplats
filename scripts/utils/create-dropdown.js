// create-dropdown.js
import { recipes } from '../../data/recipes.js';
function createDropdowns() {
  const dropdownsContainer = document.getElementById('dropdowns');
  const dropdownTypes = [
    { type: 'ingredients', label: 'Ingrédients' },
    { type: 'appliances', label: 'Appareils' },
    { type: 'ustensils', label: 'Ustensiles' }
  ];

  dropdownTypes.forEach(dropdown => {
    const dropdownElement = createDropdownElement(dropdown);
    dropdownsContainer.appendChild(dropdownElement);
  });

  initializeDropdownFunctionality();
}

function createDropdownElement(dropdown) {
  const dropdownParent = document.createElement('div');
  dropdownParent.className = 'dropdown-parent bg-white group rounded-xl px-3 py-3 w-52 h-fit';
  dropdownParent.setAttribute('data-dropdown-type', dropdown.type);
  dropdownParent.setAttribute('data-open', 'false');

  dropdownParent.innerHTML = `
    <button class="dropdown-button flex w-full justify-between items-center gap-8 text-black font-sans">
      <span class="font-sans">${dropdown.label}</span>
      <img class="w-3 h-fit group-data-[open=true]:rotate-180" src="./caret.svg" alt="caret icon">
    </button>
    <div class="search-input relative mt-2 hidden group-data-[open=true]:block">
      <img src="./tiny_search.svg" alt="search icon" class="absolute top-1/2 -translate-y-1/2 right-3">
      <input type="text" class="border-gray-200 border-1 border py-1 px-1 rounded focus:outline-none text-gray-500 font-light">
    </div>
    <div class="selected-btns hidden group-data-[open=true]:block"></div>
    <ul class="list-items flex-col gap-2 font-light text-dark mt-3 max-h-44 overflow-y-auto hidden group-data-[open=true]:block">
    </ul>
  `;

  return dropdownParent;
}

function initializeDropdownFunctionality() {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');

  dropdownParents.forEach((dropdownParent) => {
    const dropdownButton = dropdownParent.querySelector('.dropdown-button');
    const searchInput = dropdownParent.querySelector('.search-input input');
    const selectedBtnsContainer = dropdownParent.querySelector('.selected-btns');
    const listContainer = dropdownParent.querySelector('.list-items');

    dropdownButton.addEventListener('click', () => toggleDropdown(dropdownParent));
    listContainer.addEventListener('click', (event) => handleListItemClick(event, dropdownParent));
    selectedBtnsContainer.addEventListener('click', handleDeleteButtonClick);
    searchInput.addEventListener('input', (event) => handleSearch(event, listContainer, selectedBtnsContainer));

    populateDropdownList(dropdownParent);
  });
}

function toggleDropdown(dropdownParent) {
  const isOpen = dropdownParent.getAttribute('data-open') === 'true';
  const dropdownParents = document.querySelectorAll('.dropdown-parent');

  dropdownParents.forEach((parent) => {
    parent.setAttribute('data-open', 'false');
  });

  if (!isOpen) {
    dropdownParent.setAttribute('data-open', 'true');
  }
}

function handleListItemClick(event, dropdownParent) {
  if (event.target.tagName === 'LI') {
    const listItem = event.target;
    const text = listItem.textContent;
    const dropdownType = dropdownParent.getAttribute('data-dropdown-type');
    listItem.classList.add('hidden');
    createSelectedButton(text, dropdownType, dropdownParent.querySelector('.selected-btns'));
    createBigQueryButton(text, dropdownType);
    applyFilters();
  }
}

function handleDeleteButtonClick(event) {
  if (event.target.classList.contains('delete-btn')) {
    const deleteButton = event.target;
    const selectedButton = deleteButton.parentElement;
    const text = selectedButton.querySelector('span').textContent;
    const dropdownType = selectedButton.getAttribute('data-type');
    const dropdownParent = selectedButton.closest('.dropdown-parent');
    selectedButton.remove();
    showListItem(text, dropdownParent.querySelector('.list-items'));
    removeBigQueryButton(text, dropdownType);
    applyFilters();
  }
}

function createSelectedButton(text, dropdownType, selectedBtnsContainer) {
  const selectedButton = document.createElement('button');
  selectedButton.classList.add('bg-primary', 'justify-between', 'items-center', 'my-2', 'p-3', 'font-light', 'text-black', 'w-full', 'flex');
  selectedButton.setAttribute('data-type', dropdownType);
  selectedButton.innerHTML = `
    <span>${text}</span>
    <img src="./tiny_close.svg" alt="delete icon" class="w-5 delete-btn">
  `;
  selectedBtnsContainer.appendChild(selectedButton);
}

function showListItem(text, listContainer) {
  const listItem = Array.from(listContainer.children).find(
    (item) => item.textContent.trim() === text.trim()
  );
  if (listItem) {
    listItem.classList.remove('hidden');
  }
}

function createBigQueryButton(text, dropdownType) {
  const queryBigList = document.getElementById('query-big-list');
  const bigQueryButton = document.createElement('button');
  bigQueryButton.classList.add('w-52', 'bg-primary', 'text-black', 'flex', 'items-center', 'justify-between', 'px-4', 'rounded-xl', 'h-14');
  bigQueryButton.setAttribute('data-type', dropdownType);
  bigQueryButton.innerHTML = `
    <span>${text}</span>
    <img src="/close_big.svg" alt="close icon" class="delete-big-query">
  `;
  queryBigList.appendChild(bigQueryButton);

  const deleteIcon = bigQueryButton.querySelector('.delete-big-query');
  deleteIcon.addEventListener('click', function () {
    bigQueryButton.remove();
    showListItem(text, document.querySelector(`.dropdown-parent[data-dropdown-type="${dropdownType}"] .list-items`));
    removeSelectedButton(text, dropdownType);
    applyFilters();
  });
}

function removeBigQueryButton(text, dropdownType) {
  const queryBigList = document.getElementById('query-big-list');
  const bigQueryButtons = queryBigList.querySelectorAll('button');
  bigQueryButtons.forEach((button) => {
    const buttonText = button.querySelector('span').textContent;
    if (buttonText === text && button.getAttribute('data-type') === dropdownType) {
      button.remove();
    }
  });
}

function removeSelectedButton(text, dropdownType) {
  const selectedBtnsContainer = document.querySelector(`.dropdown-parent[data-dropdown-type="${dropdownType}"] .selected-btns`);
  const selectedButtons = selectedBtnsContainer.querySelectorAll('button');
  selectedButtons.forEach((button) => {
    const buttonText = button.querySelector('span').textContent;
    if (buttonText === text) {
      button.remove();
    }
  });
}

function handleSearch(event, listContainer, selectedBtnsContainer) {
  const searchTerm = event.target.value.toLowerCase();
  const listItems = Array.from(listContainer.children);
  const selectedButtons = Array.from(selectedBtnsContainer.children);

  listItems.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    const isSelected = selectedButtons.some(
      (button) => button.querySelector('span').textContent.toLowerCase() === itemText
    );

    if (itemText.includes(searchTerm) && !isSelected) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

function populateDropdownList(dropdownParent) {
  const dropdownType = dropdownParent.getAttribute('data-dropdown-type');
  const listContainer = dropdownParent.querySelector('.list-items');
  let items = [];

  switch (dropdownType) {
    case 'ingredients':
      items = getUniqueIngredients();
      break;
    case 'appliances':
      items = getUniqueAppliances();
      break;
    case 'ustensils':
      items = getUniqueUstensils();
      break;
  }

  items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    listContainer.appendChild(listItem);
  });
}

function getUniqueIngredients() {
  const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
  return [...new Set(ingredients)];
}

function getUniqueAppliances() {
  return [...new Set(recipes.map(recipe => recipe.appliance))];
}

function getUniqueUstensils() {
  return [...new Set(recipes.flatMap(recipe => recipe.ustensils))];
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', createDropdowns);