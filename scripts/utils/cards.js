// cards.js
// Fonction pour générer une carte de recette
import { recipes } from '../../data/recipes.js';
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
  const selectedIngredients = Array.from(document.querySelectorAll('.selected-btns button[data-type="ingredients"] span')).map(button => button.textContent.toLowerCase());
  const selectedAppliances = Array.from(document.querySelectorAll('.selected-btns button[data-type="appliances"] span')).map(button => button.textContent.toLowerCase());
  const selectedUstensils = Array.from(document.querySelectorAll('.selected-btns button[data-type="ustensils"] span')).map(button => button.textContent.toLowerCase());
  
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let matchSearchQuery = false;
    let matchIngredients = selectedIngredients.length === 0;
    let matchAppliances = selectedAppliances.length === 0;
    let matchUstensils = selectedUstensils.length === 0;

    // Vérification du critère de recherche
    if (recipe.name.toLowerCase().includes(searchQuery) || 
        recipe.description.toLowerCase().includes(searchQuery)) {
      matchSearchQuery = true;
    } else {
      let j = 0;
      while (j < recipe.ingredients.length && !matchSearchQuery) {
        if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchQuery)) {
          matchSearchQuery = true;
        }
        j++;
      }
    }

    // Vérification des ingrédients
    if (selectedIngredients.length > 0) {
      matchIngredients = true;
      for (let k = 0; k < selectedIngredients.length; k++) {
        let ingredientFound = false;
        for (let l = 0; l < recipe.ingredients.length; l++) {
          if (recipe.ingredients[l].ingredient.toLowerCase() === selectedIngredients[k]) {
            ingredientFound = true;
            break;
          }
        }
        if (!ingredientFound) {
          matchIngredients = false;
          break;
        }
      }
    }

    // Vérification des appareils
    if (selectedAppliances.length > 0) {
      matchAppliances = false;
      for (let m = 0; m < selectedAppliances.length; m++) {
        if (recipe.appliance.toLowerCase() === selectedAppliances[m]) {
          matchAppliances = true;
          break;
        }
      }
    }

    // Vérification des ustensiles
    if (selectedUstensils.length > 0) {
      matchUstensils = true;
      for (let n = 0; n < selectedUstensils.length; n++) {
        let ustensilFound = false;
        for (let p = 0; p < recipe.ustensils.length; p++) {
          if (recipe.ustensils[p].toLowerCase() === selectedUstensils[n]) {
            ustensilFound = true;
            break;
          }
        }
        if (!ustensilFound) {
          matchUstensils = false;
          break;
        }
      }
    }

    // Si tous les critères sont satisfaits, ajouter la recette aux résultats filtrés
    if (matchSearchQuery && matchIngredients && matchAppliances && matchUstensils) {
      filteredRecipes.push(recipe);
    }
  }

  displayRecipeCards(filteredRecipes);
  updateFilteredRecipeCount(filteredRecipes);
}

// Écouteur d'événement pour la recherche
document.getElementById('big-searchbar').addEventListener('input', function (event) {
  applyFilters();
});

// Affichage initial des cartes de recettes
displayRecipeCards(recipes);