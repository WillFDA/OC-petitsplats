import "./style.css";

import { recipes } from './data/recipes.js';
import { createDropdowns } from './scripts/utils/create-dropdown.js';
import { initRecipeCount } from './scripts/utils/recipe-count.js';
import { displayRecipeCards, setupSearchListener } from './scripts/utils/cards.js';

document.addEventListener('DOMContentLoaded', () => {
  createDropdowns();
  initRecipeCount(recipes);
  displayRecipeCards(recipes);
  setupSearchListener();
});