
/**
 * Classe pour gérer l'affichage des recettes sur la page.
 */
export class RenderRecipes {

	constructor() {

		this.recipeslist = document.querySelector(".recipes-list");
		this.visibleRecipes = 1;
		this.numberRecipes = 0;
		this.filteredRecipes = [];
		this.recipesHTML = "";
		document.addEventListener("scroll", this.handleScroll.bind(this));

	}

	/**
     * Gère l'événement de défilement pour ajouter des recettes lors du défilement infini.
     */
	handleScroll() {
		// Vérifie si l'utilisateur est près du bas de la page
		if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight -100)) {
			if (this.visibleRecipes <= this.numberRecipes) {
				this.addRecipes();
			}
		}
	}

	/**
     * Affiche les recettes filtrées sur la page.
     */
	displayRecipes(filteredRecipes) {

		this.filteredRecipes = filteredRecipes;
		this.numberRecipes = this.filteredRecipes.length;
		
		// supprime toutes les recettes de la page
		this.recipesHTML = "<h2 class=\"visually-hidden\">Liste des Recettes</h2>";
		this.recipeslist.innerHTML = this.recipesHTML;
		this.visibleRecipes = this.recipeslist.children.length;

		// Affiche les recettes suivant un Infinite Scrolling
		this.addRecipes();

		// affiche le nombre de recettes
		this.displayNumberRecipes();

	}

	/**
     * Affiche un message lorsqu'aucune recette ne correspond à la recherche.
     */
	displayNoRecipe(searchTerm) {
		this.numberRecipes = 0;
	
		// Créer un élément h2
		const messageElement = document.createElement("h2");
		messageElement.className = "recipes-list__no-recipe";
		messageElement.textContent = `Aucune recette ne contient "${searchTerm}" vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
	
		// Effacer le contenu actuel et ajouter le nouveau message
		this.recipeslist.innerHTML = "";
		this.recipeslist.appendChild(messageElement);
	
		// Affiche le nombre de recettes
		this.displayNumberRecipes();
	}

	/**
     * Ajoute des recettes à la page pour le défilement infini.
     */
	addRecipes() {

		// Ajoute les 6 recettes suivantes
		for(let i = this.visibleRecipes; i < this.visibleRecipes + 6; ++i) {

			if (i <= this.numberRecipes) {
				this.recipesHTML +=  this.filteredRecipes[i-1].getRecipe();
			}
		}
	
		// Affiche les recettes
		this.recipeslist.innerHTML = this.recipesHTML;

		// maj du nombre de recettes visible sur la page
		this.visibleRecipes = this.recipeslist.children.length;

	}

	/**
     * Affiche le nombre de recettes trouvées.
     */
	displayNumberRecipes() {
		const searchResultCount = document.querySelector(".search-results-count");
		searchResultCount.innerHTML = `${this.numberRecipes} ${this.numberRecipes > 1 ? "recettes" : "recette"}`;
	}

}