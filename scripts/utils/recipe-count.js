// recipe-count.js

// Fonction pour mettre à jour le nombre de recettes
function updateRecipeCount(totalRecipes, filteredRecipes) {
  const recipeCountElement = document.getElementById('recipe-count');
  if (filteredRecipes === totalRecipes) {
    recipeCountElement.textContent = `${totalRecipes} recettes`;
  } else {
    recipeCountElement.textContent = `${filteredRecipes} recettes sur ${totalRecipes}`;
  }
}

// Fonction pour initialiser le nombre total de recettes
function initRecipeCount() {
  const totalRecipes = recipes.length;
  updateRecipeCount(totalRecipes, totalRecipes);
}

// Fonction pour mettre à jour le nombre de recettes filtrées
function updateFilteredRecipeCount(filteredRecipes) {
  const totalRecipes = recipes.length;
  updateRecipeCount(totalRecipes, filteredRecipes.length);
}

// Initialisation du nombre total de recettes au chargement de la page
document.addEventListener('DOMContentLoaded', initRecipeCount);