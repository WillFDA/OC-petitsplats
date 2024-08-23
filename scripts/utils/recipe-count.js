export function initRecipeCount(recipes) {
  updateRecipeCount(recipes.length, recipes.length);
}

export function updateRecipeCount(totalRecipes, filteredRecipes) {
  const recipeCountElement = document.getElementById('recipe-count');
  if (filteredRecipes === totalRecipes) {
    recipeCountElement.textContent = `${totalRecipes} recettes`;
  } else {
    recipeCountElement.textContent = `${filteredRecipes} recettes sur ${totalRecipes}`;
  }
}