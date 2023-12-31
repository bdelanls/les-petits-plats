import { searchManager } from "../app.js";

/**
 * Classe pour gérer la création et la suppression des tags de recherche.
 */
export class TagManager {

	constructor (name, category) {

		this.name = name;
		this.category = category;
		this.createTag();
		
	}

	/**
     * Crée un élément de tag et l'ajoute au DOM.
     */
	createTag() {

		const labelsearchContainer = document.querySelector(".labelsearch-container");

		const tagDiv = document.createElement("div");
		tagDiv.className = "labelsearch";
		tagDiv.setAttribute("data-tag-name", `${this.category}-${this.name}`);
		tagDiv.innerHTML = `
            <h3 class="labelsearch__title">${this.name}</h3>
            <button class="labelsearch__close-button">
                <svg class="labelsearch__close-icon">
                    <use xlink:href="/assets/images/icons.svg#xmark"></use>
                </svg>
            </button>`;

		labelsearchContainer.appendChild(tagDiv);

		const closeButton = tagDiv.querySelector(".labelsearch__close-button");
		closeButton.addEventListener("click", () => {
			this.deleteTag();
		});

	}

	/**
     * Met à jour le menu déroulant pour refléter l'état actuel des tags sélectionnés.
     */
	updateDropdown() {
		const listItems = document.querySelectorAll(`#${this.category}-dropdown .search-dropdown__item`);

		// Parcourir ces éléments
		listItems.forEach(item => {
		// Vérifier si le texte de l'élément correspond à nameTag
			if (item.textContent === this.name) {
				// Retirer la classe "active"
				item.classList.remove("active");
			}
		});

	}

	
	/**
     * Supprime le tag du DOM et met à jour la liste des tags sélectionnés.
     */
	deleteTag() {
		const tagElement = document.querySelector(`.labelsearch[data-tag-name="${this.category}-${this.name}"]`);
		if (tagElement) {
			tagElement.classList.add("remove");
			
			// Supprimer le tag du DOM
			setTimeout(() => {
				tagElement.remove();
			}, 300);

			// Supprimer le tag de selectedTags
			const index = searchManager.selectedTags[this.category].indexOf(this.name);
			if (index > -1) {
				searchManager.selectedTags[this.category].splice(index, 1);
			}

			this.updateDropdown();

			searchManager.filterRecipes();
		}

	}

}