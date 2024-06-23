// Fonction pour générer une carte de recette
function generateRecipeCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('col-span-4', 'rounded-3xl', 'overflow-hidden');
  card.innerHTML = `
    <div class="w-full object-cover h-64 bg-green-400 relative">
      <div class="bg-primary text-black w-fit p-1 px-4 rounded-full absolute top-4 right-4">
        <span class="text-xs">${recipe.time}min</span>
      </div>
      <img class="w-full object-cover h-64" src="./public/images/${recipe.image}" alt="">
    </div>
    <div class="bg-white p-6 h-full">
      <h2 class="text-lg text-black line-clamp-1 font-serif my-4">${recipe.name}</h2>
      <h3 class="text-gray-500 text-xs mb-3 font-bold uppercase">Recette</h3>
      <p class="text-sm mb-4">${recipe.description}</p>
      <h3 class="text-gray-500 text-xs mb-3 font-bold uppercase">Ingrédients</h3>
      <div class="grid grid-cols-2 grid-rows-3 gap-y-4 justify-between gap-4">
        ${recipe.ingredients.map(ingredient => `
          <div class="flex flex-col col-span-1 row-span-1 gap-1">
            <span class="text-black text-sm">${ingredient.ingredient}</span>
            <span class="text-sm text-gray-500">${ingredient.quantity || ''}${ingredient.unit || ''}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  return card;
}

// Fonction pour afficher les cartes de recettes
function displayRecipeCards(recipes) {
  const cardsSection = document.getElementById('cards-section');
  cardsSection.innerHTML = '';
  recipes.forEach(recipe => {
    const card = generateRecipeCard(recipe);
    cardsSection.appendChild(card);
  });
}

// Fonction pour appliquer les filtres (version avec boucles natives)
function applyFilters() {
  const searchQuery = document.getElementById('big-searchbar').value.trim().toLowerCase();
  const selectedIngredients = Array.from(document.querySelectorAll('.selected-btns button[data-type="ingredients"] span'))
    .map(button => button.textContent.toLowerCase());
  const selectedAppliances = Array.from(document.querySelectorAll('.selected-btns button[data-type="appliances"] span'))
    .map(button => button.textContent.toLowerCase());
  const selectedUstensils = Array.from(document.querySelectorAll('.selected-btns button[data-type="ustensils"] span'))
    .map(button => button.textContent.toLowerCase());

  const filteredRecipes = recipes.filter(recipe => {
    // Vérification du terme de recherche
    const searchMatch = searchQuery === '' ||
      recipe.name.toLowerCase().includes(searchQuery) ||
      recipe.description.toLowerCase().includes(searchQuery) ||
      recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchQuery));

    // Vérification des ingrédients sélectionnés
    const ingredientMatch = selectedIngredients.length === 0 ||
      selectedIngredients.every(selectedIng => 
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(selectedIng))
      );

    // Vérification des appareils
    const applianceMatch = selectedAppliances.length === 0 ||
      selectedAppliances.some(appliance => recipe.appliance.toLowerCase().includes(appliance));

    // Vérification des ustensiles
    const ustensilMatch = selectedUstensils.length === 0 ||
      selectedUstensils.every(ustensil => 
        recipe.ustensils.some(u => u.toLowerCase().includes(ustensil))
      );

    return searchMatch && ingredientMatch && applianceMatch && ustensilMatch;
  });

  displayRecipeCards(filteredRecipes);
  updateFilteredRecipeCount(filteredRecipes);
}

// Écouteur d'événement pour la recherche
document.getElementById('big-searchbar').addEventListener('input', function (event) {
  applyFilters();
});

// Affichage initial des cartes de recettes
displayRecipeCards(recipes);