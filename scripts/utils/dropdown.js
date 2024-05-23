document.addEventListener('DOMContentLoaded', function () {
  const dropdownParents = document.querySelectorAll('.dropdown-parent');

  dropdownParents.forEach((dropdownParent) => {
    const dropdownName = dropdownParent.dataset.dropdown;
    const dropdownButton = dropdownParent.querySelector('.dropdown-button');
    const searchInput = dropdownParent.querySelector('.search-input input');
    const selectedBtnsContainer = dropdownParent.querySelector('.selected-btns');
    const listContainer = dropdownParent.querySelector('.list-items');

    dropdownButton.addEventListener('click', toggleDropdown);
    listContainer.addEventListener('click', handleListItemClick);
    selectedBtnsContainer.addEventListener('click', handleDeleteButtonClick);
    searchInput.addEventListener('input', handleSearch);

    function toggleDropdown() {
      dropdownParent.classList.toggle('open');
      searchInput.parentElement.classList.toggle('hidden');
      listContainer.classList.toggle('hidden');
    }

    function handleListItemClick(event) {
      if (event.target.tagName === 'LI') {
        const listItem = event.target;
        const text = listItem.textContent;
        listItem.classList.add('hidden');
        createSelectedButton(text);
      }
    }

    function handleDeleteButtonClick(event) {
      if (event.target.classList.contains('delete-btn')) {
        const deleteButton = event.target;
        const selectedButton = deleteButton.parentElement;
        const text = selectedButton.querySelector('span').textContent;
        selectedButton.remove();
        showListItem(text);
      }
    }

    function createSelectedButton(text) {
      const selectedButton = document.createElement('button');
      selectedButton.classList.add('bg-primary', 'justify-between', 'items-center', 'my-2', 'p-3', 'font-light', 'text-black', 'w-full', 'flex');
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