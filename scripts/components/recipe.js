
/**
 * Classe représentant une recette.
 */
export class Recipe {

	constructor (data) {

		this.id = data.id;
		this.image = data.image;
		this.name = data.name;
		this.servings = data.servings;
		this.ingredients = data.ingredients;
		this.time = data.time;
		this.description = data.description;
		this.appliance = data.appliance;
		this.ustensils = data.ustensils;

	}

	/**
     * Génère le HTML pour afficher la recette.
     */
	getRecipe() {
		let recipeHTML = `
		<article class="recipe">
                <div class="recipe__image-container">
                    <img class="recipe__picture" src="/assets/images/photos/${this.image}" alt="${this.name}">
                    <div class="recipe__time">${this.time > 0 ? this.time + " min" : "..."}</div>
                </div>
                <div class="recipe__content">
                    <h3 class="recipe__content--title">${this.name}</h3>
                    <div class="recipe__content-section">
                        <h4 class="recipe__content--subtitle">Recette</h4>
                        <p class="recipe__content--description">${this.description}</p>
                    </div>
                    <div class="recipe__content-section">
                        <h4 class="recipe__content--subtitle">Ingrédients</h4>
                        <div class="recipe__ingredients-container">`;

		this.ingredients.forEach(elem => {

			recipeHTML += `
							<div class="recipe__ingredient">
                                <p class="recipe__ingredient--title">${elem.ingredient}</p>
                                <p class="recipe__ingredient--quantity">${elem.quantity} ${elem.unit ? elem.unit : ""}</p>
                            </div>`;
			
		});

		recipeHTML += `		<div class="recipe__ingredient">
                                <p class="recipe__ingredient--title">Lait de coco</p>
                                <p class="recipe__ingredient--quantity">400ml</p>
                            </div>
                            <div class="recipe__ingredient">
                                <p class="recipe__ingredient--title">Crème de coco</p>
                                <p class="recipe__ingredient--quantity">4 cuillères</p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </article>`;

		return recipeHTML;


	}


}