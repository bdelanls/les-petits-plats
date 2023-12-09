import { tagList } from "../app.js";
import { LabelSearchTags } from "./labelSearchTags.js";


export class SearchDropdown {

	constructor (data, name) {
		this.data = data;
		this.name = name;
		this.title = this.getTitle();

		this.open = false;
	}

	getTitle() {
		switch (this.name) {
		case "ingredients":
			return "Ingrédients";
		case "appliances":
			return "Appareils";
		case "ustensils":
			return "Ustensiles";
		}
	}

	displaySearchDropdown() {

		const searchDropdowns = document.querySelector(".search-dropdowns");

		// Crée le conteneur du menu déroulant
		const dropdownDiv = document.createElement("div");
		dropdownDiv.className = "search-dropdown";
		dropdownDiv.id = this.name + "-dropdown";

		// Écouteur d'événements pour détecter les clics en dehors du menu déroulant
		document.addEventListener("click", (event) => {
		// Vérifie si le clic est en dehors du menu déroulant
			if (this.open && !dropdownDiv.contains(event.target) && event.target !== searchButton) {
				dropdownDiv.classList.remove("active");
				this.open = false;
			}
		});


		// Crée le bouton
		const searchButton = document.createElement("button");
		searchButton.className = "search-dropdown__button";
		searchButton.textContent = this.title;

		// Ajoute l'écouteur d'événements au bouton
		searchButton.addEventListener("click", () => {
			this.open = !this.open;
			dropdownDiv.classList.toggle("active");
		});
		


		// Ajouter le bouton au conteneur
		dropdownDiv.appendChild(searchButton);

		// Créer et ajouter le reste du HTML
		const inputContainer = document.createElement("div");
		inputContainer.className = "search-dropdown__input-container";

		const menuDiv = document.createElement("div");
		menuDiv.className = "search-dropdown__menu";

		const input = document.createElement("input");
		input.className = "search-dropdown__input";
		input.type = "text";

		const resetButton = document.createElement("button");
		resetButton.className = "search-dropdown__reset-button";
		resetButton.type = "reset";
		resetButton.innerHTML = `
		<svg class="search-dropdown__input-icon">
			<use xlink:href="/assets/images/icons.svg#xmark"></use>
		</svg>`;

		const searchButtonIcon = document.createElement("button");
		searchButtonIcon.className = "search-dropdown__search-button";
		searchButtonIcon.type = "submit";
		searchButtonIcon.innerHTML = `
		<svg class="search-dropdown__input-icon">
			<use xlink:href="/assets/images/icons.svg#magnifying-glass"></use>
		</svg>`;

		menuDiv.appendChild(input);
		menuDiv.appendChild(resetButton);
		menuDiv.appendChild(searchButtonIcon);

		const listUl = document.createElement("ul");
		listUl.className = "search-dropdown__list";

		this.data.forEach(elem => {
			const listItem = document.createElement("li");
			listItem.className = "search-dropdown__item";
			listItem.textContent = elem.charAt(0).toUpperCase() + elem.slice(1);

			// Ajoute un écouteur d'événements click à chaque élément listItem
			listItem.addEventListener("click", () => {

				const tagName = listItem.textContent;

				if ( tagList[this.name].includes(tagName)) {
					let indexItem = tagList[this.name].indexOf(tagName);
					tagList[this.name].splice(indexItem, 1);
					listItem.classList.remove("active");

					// Supprimer le tag du DOM
					document.querySelector(`.labelsearch[data-tag-name="${this.name}-${tagName}"]`)?.remove();

				} else {
					tagList[this.name].push(tagName);
					listItem.classList.add("active");

					new LabelSearchTags(tagName, this.name);
				}

				console.log(tagList);
			
			});
			
			listUl.appendChild(listItem);
		});
		

		inputContainer.appendChild(menuDiv);
		inputContainer.appendChild(listUl);

		dropdownDiv.appendChild(inputContainer);

		// Ajouter le conteneur au DOM
		searchDropdowns.appendChild(dropdownDiv);

		

		
	}



}