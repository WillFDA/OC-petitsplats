document.addEventListener('DOMContentLoaded', function () {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');
  const queryBigList = document.getElementById('query-big-list');

  dropdownParents.forEach((dropdownParent) => {
    const dropdownButton = dropdownParent.querySelector('.dropdown-button');
    const searchInput = dropdownParent.querySelector('.search-input input');
    const selectedBtnsContainer = dropdownParent.querySelector('.selected-btns');
    const listContainer = dropdownParent.querySelector('.list-items');

    dropdownButton.addEventListener('click', toggleDropdown);
    listContainer.addEventListener('click', handleListItemClick);
    selectedBtnsContainer.addEventListener('click', handleDeleteButtonClick);
    searchInput.addEventListener('input', handleSearch);

    function toggleDropdown() {
      const isOpen = dropdownParent.getAttribute('data-open') === 'true';

      dropdownParents.forEach((parent) => {
        parent.setAttribute('data-open', 'false');
      });

      if (!isOpen) {
        dropdownParent.setAttribute('data-open', 'true');
      }
    }

    function handleListItemClick(event) {
      if (event.target.tagName === 'LI') {
        const listItem = event.target;
        const text = listItem.textContent;
        const dropdownType = dropdownParent.getAttribute('data-dropdown-type');
        listItem.classList.add('hidden');
        createSelectedButton(text, dropdownType);
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
        selectedButton.remove();
        showListItem(text);
        removeBigQueryButton(text, dropdownType);
        applyFilters();
      }
    }

    function createSelectedButton(text, dropdownType) {
      const selectedButton = document.createElement('button');
      selectedButton.classList.add('bg-primary', 'justify-between', 'items-center', 'my-2', 'p-3', 'font-light', 'text-black', 'w-full', 'flex');
      selectedButton.setAttribute('data-type', dropdownType);
      selectedButton.innerHTML = `
        <span>${text}</span>
        <img src="./tiny_close.svg" alt="delete icon" class="w-5 delete-btn">
      `;
      selectedBtnsContainer.appendChild(selectedButton);
    }

    function showListItem(text) {
      const listItem = Array.from(listContainer.children).find(
        (item) => item.textContent.trim() === text.trim()
      );
      if (listItem) {
        listItem.classList.remove('hidden');
      }
    }

    function createBigQueryButton(text, dropdownType) {
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
        showListItem(text);
        removeSelectedButton(text);
        applyFilters(); // Appel de applyFilters après la suppression d'un bouton de requête
      });
    }

    function removeBigQueryButton(text) {
      const bigQueryButtons = queryBigList.querySelectorAll('button');
      bigQueryButtons.forEach((button) => {
        const buttonText = button.querySelector('span').textContent;
        if (buttonText === text) {
          button.remove();
        }
      });
    }

    function removeSelectedButton(text) {
      const selectedButtons = selectedBtnsContainer.querySelectorAll('button');
      selectedButtons.forEach((button) => {
        const buttonText = button.querySelector('span').textContent;
        if (buttonText === text) {
          button.remove();
        }
      });
    }

    function handleSearch(event) {
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
  });
});