/** 
 *  Les petits plats 
 *  Projet 7
 *  Décembre 2023
*/

import { recipes } from "/data/recipes.js";
import { SearchDropdown } from "./components/searchDropdown.js";

export let tagList = {
	ingredients: [],
	appliances: [],
	ustensils: []
};

const ingredientsList = getUniqueSortedItems(recipes, "ingredients");
const ingredientsDropdown = new SearchDropdown(ingredientsList, "ingredients");
ingredientsDropdown.displaySearchDropdown();

const appliancesList = getUniqueSortedItems(recipes, "appliances");
const appliancesDropdown = new SearchDropdown(appliancesList, "appliances");
appliancesDropdown.displaySearchDropdown();

const ustensilsList = getUniqueSortedItems(recipes, "ustensils");
const ustensilsDropdown = new SearchDropdown(ustensilsList, "ustensils");
ustensilsDropdown.displaySearchDropdown();







/**
 * Récupère et retourne un tableau trié d'éléments uniques 
 * (ingrédients, appareils ou ustensiles) à partir d'un tableau de recettes.
 */
function getUniqueSortedItems(recipes, key) {
	const itemsSet = new Set();

	recipes.forEach(recipe => {
		if (key === "ingredients") {
			recipe.ingredients.forEach(item => itemsSet.add(item.ingredient.toLowerCase()));
		} else if (key === "appliances") {
			itemsSet.add(recipe.appliance.toLowerCase());
		} else if (key === "ustensils") {
			recipe.ustensils.forEach(item => itemsSet.add(item.toLowerCase()));
		}
	});

	return Array.from(itemsSet).sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
}
  






