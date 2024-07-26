import { recipes } from '../../data/recipes.js';
import { updateRecipeCount } from './recipe-count.js';

export function generateRecipeCard(recipe) {
  const card = document.createElement('div');
  card.classList.add('col-span-4', 'rounded-3xl', 'overflow-hidden');
  card.innerHTML = `
    <div class="w-full object-cover h-64 bg-green-400 relative">
      <div class="bg-primary text-black w-fit p-1 px-4 rounded-full absolute top-4 right-4">
        <span class="text-xs">${recipe.time}min</span>
      </div>
      <img class="w-full object-cover h-64" src="/images/${recipe.image}" alt="">
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

export function displayRecipeCards(recipes) {
  const cardsSection = document.getElementById('cards-section');
  cardsSection.innerHTML = '';
  recipes.forEach(recipe => {
    const card = generateRecipeCard(recipe);
    cardsSection.appendChild(card);
  });
}

export function applyFilters() {
  const searchQuery = document.getElementById('big-searchbar').value.trim().toLowerCase();
  const selectedIngredients = Array.from(document.querySelectorAll('.selected-btns button[data-type="ingredients"] span')).map(button => button.textContent.toLowerCase());
  const selectedAppliances = Array.from(document.querySelectorAll('.selected-btns button[data-type="appliances"] span')).map(button => button.textContent.toLowerCase());
  const selectedUstensils = Array.from(document.querySelectorAll('.selected-btns button[data-type="ustensils"] span')).map(button => button.textContent.toLowerCase());

  const filteredRecipes = recipes.filter(recipe => {
    const matchSearchQuery = recipe.name.toLowerCase().includes(searchQuery) ||
      recipe.description.toLowerCase().includes(searchQuery) ||
      recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchQuery));

    const matchIngredients = selectedIngredients.length === 0 ||
      selectedIngredients.every(selectedIng => 
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === selectedIng)
      );

    const matchAppliances = selectedAppliances.length === 0 ||
      selectedAppliances.includes(recipe.appliance.toLowerCase());

    const matchUstensils = selectedUstensils.length === 0 ||
      selectedUstensils.every(selectedUst => 
        recipe.ustensils.some(ust => ust.toLowerCase() === selectedUst)
      );

    return matchSearchQuery && matchIngredients && matchAppliances && matchUstensils;
  });

  displayRecipeCards(filteredRecipes);
  updateRecipeCount(recipes.length, filteredRecipes.length);
}

export function setupSearchListener() {
  document.getElementById('big-searchbar').addEventListener('input', applyFilters);
}