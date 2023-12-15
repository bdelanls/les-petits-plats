
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
		
		
		// Écouteur sur le scroll de la page
		document.addEventListener("scroll", () => {

			// Vérifie si l'utilisateur est près du bas de la page
			if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight -100)) {
		
				if (this.visibleRecipes <= this.numberRecipes) {
					this.addRecipes();
				}
			}
		});

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

}