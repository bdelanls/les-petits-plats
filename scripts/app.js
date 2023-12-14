
/** 
 *  Les petits plats 
 *  Projet 7
 *  Décembre 2023
*/

import { recipes as recipesData } from "/data/recipes.js";
import { SearchDropdown } from "./components/searchDropdown.js";
import { RecipeSearchManager } from "./components/recipeSearchManager.js";
import { Recipe } from "./components/recipe.js";

/* eslint-disable no-unused-vars */
export const ingredientsDropdown = new SearchDropdown(recipesData, "ingredients");
export const appliancesDropdown = new SearchDropdown(recipesData, "appliances");
export const ustensilsDropdown = new SearchDropdown(recipesData, "ustensils");

export let tagList = {
	ingredients: [],
	appliances: [],
	ustensils: []
};

recipesData.sort((a, b) => {
	return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
});

const allRecipes = [];

await createRecipe(recipesData);

// initialisation de la recherche
//export const searchManager = new RecipeSearchManager(recipesData);
export const searchManager = new RecipeSearchManager(allRecipes);


async function createRecipe(recipesData) {

	recipesData.forEach(recipe => {

		allRecipes.push(new Recipe(recipe));
		
	});
}


async function initApp() {

	//console.log(allRecipes);
	

}


// Démarrage de l'application
initApp();

