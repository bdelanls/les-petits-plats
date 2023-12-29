import { ingredientsDropdown, appliancesDropdown, ustensilsDropdown, renderRecipes } from "../app.js";

/**
 * Classe pour gérer la recherche de recettes.
 */
export class RecipeSearchManager {

	constructor (recipesData) {
		
		this.recipesData = recipesData;
		this.currentSearchTerm = "";
		this.selectedTags = {ingredients: [], appliances: [], ustensils: []};
		this.filteredRecipes = [...recipesData];
		this.initSearchInput();
		this.searchTerm = "";

	}

	/**
     * Initialise l'écouteur d'événements pour la barre de recherche.
     */
	initSearchInput() {
		const searchInput = document.getElementById("search-input");
		const resetButton = document.querySelector(".header__search__reset-button");

		searchInput.addEventListener("keyup", event => {

			this.searchTerm = searchInput.value;

			let numOfChars = this.searchTerm.length;
			numOfChars >=1 ? resetButton.setAttribute("style", "display: block") : resetButton.removeAttribute("style");

			if (this.searchTerm.length >= 3) {
				//
				this.filterRecipes();

			} else if (event.key === "Backspace" && this.searchTerm.length <= 2) {
				this.searchTerm = "";
				this.filterRecipes();
			}

		});

		// écouteur sur le bouton reset
		resetButton.addEventListener("click", () => {
			this.searchTerm =  searchInput.value = "";
			resetButton.removeAttribute("style");
			this.filterRecipes();
		});


	}

	/**
     * Recherche des recettes en fonction du terme de recherche saisi.
	 * Algorithme 2 - programmation fonctionnelle
     */
	searchByInput() {
		let termLower = this.searchTerm.toLowerCase();
	
		return this.filteredRecipes.filter(recipe => {
			// Vérifier dans le titre ou la description
			if (recipe.name.toLowerCase().includes(termLower) || recipe.description.toLowerCase().includes(termLower)) {
				return true;
			}
	
			// Vérifier dans les ingrédients
			return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(termLower));
		});
	}

	

	/**
     * Recherche des recettes en fonction des tags sélectionnés.
     */
	searchByTags() {
		let results = this.recipesData.filter(recipe => {
			// Appliquer les critères de filtrage
			return this.matchesSearchTag(recipe);
		});
		return results;
	}

	// Ajoute un tag à selectedTags et met à jour la recherche.
	addTag(category, tag) {
		this.selectedTags[category].push(tag);
		this.filterRecipes();
	}

	// Supprime un tag de selectedTags et met à jour la recherche
	removeTag(category, tag) {
		let indexItem = this.selectedTags[category].indexOf(tag);
		this.selectedTags[category].splice(indexItem, 1);
		this.filterRecipes();
	}

	/**
     * Met à jour la liste des recettes filtrées en fonction des critères de recherche 
	 * actuels et des tags sélectionnés.
     */
	filterRecipes() {
		
		// Filtrer les recettes en fonction du terme de recherche et des tags
		if (this.selectedTags.ingredients || this.selectedTags.appliances || this.selectedTags.ustensils) {
			this.filteredRecipes = this.searchByTags();
		}

		// Filtrer en fonction de la recherche principale
		if (this.searchTerm) {
			this.filteredRecipes = this.searchByInput();
		}

		// Mettre à jour les menus de recherche
		this.updateDropdown();

		// affiche les recettes
		this.filteredRecipes.length ? renderRecipes.displayRecipes(this.filteredRecipes) : renderRecipes.displayNoRecipe(this.searchTerm);
		
	}

	/**
	 * Vérifie si une recette donnée correspond aux tags sélectionnés.
	 */
	matchesSearchTag(recipe) {
		// Vérifier si les tags d'ingrédients correspondent
		if (this.selectedTags.ingredients && this.selectedTags.ingredients.length > 0) {
			
			const checkIngredients = this.selectedTags.ingredients.every(tag => 
				recipe.ingredients.some(ingredientObj => 
					ingredientObj.ingredient.toLowerCase().includes(tag.toLowerCase())
				)
			);
			if (!checkIngredients) return false;

		}
	
		// Vérifier si le tag d'appareil correspond
		if (this.selectedTags.appliances && this.selectedTags.appliances.length > 0) {
			
			const checkAppliances = this.selectedTags.appliances.every(tag => 
				recipe.appliance.toLowerCase().includes(tag.toLowerCase())
			);
			if (!checkAppliances) return false;
		}
	
		// Vérifier si les tags d'ustensiles correspondent
		if (this.selectedTags.ustensils && this.selectedTags.ustensils.length > 0) {
			
			const checkUstensils = this.selectedTags.ustensils.every(tag => 
				recipe.ustensils.some(ustensil => 
					ustensil.toLowerCase().includes(tag.toLowerCase())
				)
			);
			if (!checkUstensils) return false;
		}
	
		// Si aucun des critères n'est rempli
		return true;
	}


	/**
     * Met à jour les menus déroulants en fonction des recettes filtrées.
     */
	updateDropdown() {
		ingredientsDropdown.getUpdateItems(this.filteredRecipes);
		appliancesDropdown.getUpdateItems(this.filteredRecipes);
		ustensilsDropdown.getUpdateItems(this.filteredRecipes);
	}

	
}