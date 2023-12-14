import { ingredientsDropdown, appliancesDropdown, ustensilsDropdown } from "../app.js";


export class RecipeSearchManager {

	constructor (recipesData) {
		
		this.recipesData = recipesData;
		this.currentSearchTerm = "";
		this.selectedTags = {ingredients: [], appliances: [], ustensils: []};
		this.filteredRecipes = [...recipesData];

	}

	// Met à jour currentSearchTerm et filtre recipesData 
	// en fonction du terme de recherche et des tags sélectionnés.
	searchRecipes(searchTerm) {

	}

	// Ajoute un tag à selectedTags et met à jour la recherche.
	addTag(category, tag) {
		this.selectedTags[category].push(tag);
		this.updateFilteredRecipes();
	}

	// Supprime un tag de selectedTags et met à jour la recherche
	removeTag(category, tag) {
		let indexItem = this.selectedTags[category].indexOf(tag);
		this.selectedTags[category].splice(indexItem, 1);
		this.updateFilteredRecipes();
	}

	/**
	 * Met à jour la liste des recettes filtrées en fonction des critères de recherche actuels et des tags sélectionnés.
	 * Cette méthode filtre d'abord les recettes en fonction des critères de recherche et des tags,
	 * puis les trie par ordre alphabétique du titre.
	 */
	updateFilteredRecipes() {
		// Filtrer les recettes en fonction du terme de recherche et des tags
		let results = this.recipesData.filter(recipe => {
		// Appliquer les critères de filtrage (à définir)
			return this.matchesSearchTag(recipe);
		});

		// Trier les résultats
		if (results > 1) {
			results.sort((a, b) => a.title.localeCompare(b.title));
		}

		// Mettre à jour les recettes filtrées
		this.filteredRecipes = results;

		// Mettre à jour les menus de recherche
		ingredientsDropdown.getUpdateItems(this.filteredRecipes);
		appliancesDropdown.getUpdateItems(this.filteredRecipes);
		ustensilsDropdown.getUpdateItems(this.filteredRecipes);
		
		// affiche le nombre de recettes
		const searchResultCount = document.querySelector(".search-results-count");
		let numberOfRecipes = this.filteredRecipes.length;
		searchResultCount.innerHTML = `${numberOfRecipes} ${numberOfRecipes > 1 ? "recettes" : "recette"}`;

		// affiche les recettes
		const recipeslist = document.querySelector(".recipes-list");
		recipeslist.innerHTML ="";

		console.log("début");
		let recipesHTML = "";

		this.filteredRecipes.forEach( recipe => {
			//console.log(recipe);
			//recipeslist.innerHTML += recipe.getRecipe();

			recipesHTML +=  recipe.getRecipe();
		});

		recipeslist.innerHTML = recipesHTML;
		console.log("fin");
		

	}

	/**
	 * Vérifie si une recette donnée correspond aux tags sélectionnés.
	 */
	matchesSearchTag(recipe) {
		// Vérifier si les tags d'ingrédients correspondent
		if (this.selectedTags.ingredients && this.selectedTags.ingredients.length > 0) {
			
			const checkIngredients = this.selectedTags.ingredients.every(tag => 
				recipe.ingredients.some(ingredientObj => 
					ingredientObj.ingredient.toLowerCase() === tag.toLowerCase()
				)
			);
			if (!checkIngredients) return false;

		}
	
		// Vérifier si le tag d'appareil correspond
		if (this.selectedTags.appliances && this.selectedTags.appliances.length > 0) {
			
			const checkAppliances = this.selectedTags.appliances.every(tag => 
				recipe.appliance.toLowerCase() === tag.toLowerCase()
			);
			if (!checkAppliances) return false;
		}
	
		// Vérifier si les tags d'ustensiles correspondent
		if (this.selectedTags.ustensils && this.selectedTags.ustensils.length > 0) {
			
			const checkUstensils = this.selectedTags.ustensils.every(tag => 
				recipe.ustensils.some(ustensil => 
					ustensil.toLowerCase() === tag.toLowerCase()
				)
			);
			if (!checkUstensils) return false;
		}
	
		// Si aucun des critères n'est rempli
		return true;
	}

	// Retourne filteredRecipes
	getFilteredRecipes() {

		return this.filteredRecipes;

	}

	// Réinitialise la recherche et les tags sélectionnés.
	clearSearch() {

	}

}