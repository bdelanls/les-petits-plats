
/** 
 *  Les petits plats 
 *  Projet 7
 *  Décembre 2023
 */


import { loadJson } from "./utils/loadJson.js";
import { SearchDropdown } from "./components/searchDropdown.js";
import { RecipeSearchManager } from "./components/recipeSearchManager.js";
import { Recipe } from "./components/recipe.js";
import { RenderRecipes } from "./components/renderRecipes.js";

// Chargement des données des recettes depuis un fichier JSON
const recipesData = await loadJson("../data/recipes.json");

// Création des menus déroulants pour les ingrédients, appareils et ustensiles
// eslint-disable no-unused-vars 
export const ingredientsDropdown = new SearchDropdown(recipesData, "ingredients");
export const appliancesDropdown = new SearchDropdown(recipesData, "appliances");
export const ustensilsDropdown = new SearchDropdown(recipesData, "ustensils");


// Stockage de toutes les recettes sous forme d'objets Recipe
const allRecipes = [];
await createRecipe(recipesData);

// Initialisation du rendu des recettes
export const renderRecipes = new RenderRecipes();

// Initialisation du gestionnaire de recherche de recettes
export const searchManager = new RecipeSearchManager(allRecipes);
searchManager.filterRecipes();





/**
 * Crée des objets Recipe pour chaque recette dans les données fournies
 * et les ajoute à la liste allRecipes.
 */
async function createRecipe(recipesData) {

	// Trie les données des recettes par ordre alphabétique de leurs noms.
	// Utilise la méthode localeCompare pour gérer les caractères accentués
	recipesData.sort((a, b) => {
		return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
	});

	// Crée une nouvelle instance de la classe Recipe pour chaque recette
	// et l'ajoute dans le tableau allRecipes.
	recipesData.forEach(recipe => {
		allRecipes.push(new Recipe(recipe));
	});
}



