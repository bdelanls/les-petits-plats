import { TagManager } from "./tagManager.js";
import { searchManager } from "../app.js";


export class SearchDropdown {

	constructor (data, name) {
		this.name = name;
		this.title = this.getTitle();
		this.data = this.getSortedItems(data);

		this.open = false;
		this.inputValue = "";
		this.visibleData = [...data];
		this.getSearchDropdown();
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

	getUpdateItems(updateData, inputValue = this.inputValue) {
		this.visibleData = updateData;
		updateData = this.getSortedItems(updateData);
		const listItems = document.querySelectorAll(`#${this.name}-dropdown li`);

		listItems.forEach(item => {
			if (updateData.map(u => u.toLowerCase()).includes(item.textContent.toLowerCase())) {
				item.removeAttribute("style");
			} else {
				item.setAttribute("style", "display: none");
			}

			if (inputValue && !item.textContent.toLowerCase().includes(inputValue.toLowerCase())) {
				item.setAttribute("style", "display: none");
			}
		});
	}

	

	getSortedItems(data) {
		const itemsSet = new Set();
		data.forEach(recipe => {
			if (this.name === "ingredients") {
				recipe.ingredients.forEach(item => itemsSet.add(item.ingredient.toLowerCase()));
			} else if (this.name === "appliances") {
				itemsSet.add(recipe.appliance.toLowerCase());
			} else if (this.name === "ustensils") {
				recipe.ustensils.forEach(item => itemsSet.add(item.toLowerCase()));
			}
		});
	
		return Array.from(itemsSet).sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
	}


	getSearchDropdown() {
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
		input.maxLength = "20";

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

		// écouteur sur le input
		input.addEventListener("keyup", event => {

			

			// on vérifie l'entrée
			if (validateInput(input.value)) {

				input.removeAttribute("style");
				this.inputValue = input.value;

				let numOfChars = input.value.length;
				numOfChars >=1 ? resetButton.setAttribute("style", "display: block") : resetButton.removeAttribute("style");
				
				if (input.value.length >= 3) {
					//
					this.getUpdateItems(this.visibleData, input.value);
				} else if (event.key === "Backspace" && input.value.length === 2) {
					this.getUpdateItems(this.visibleData, "");
				} 
			
			} else {
				input.setAttribute("style", "color: red");
			}

		});

		// écouteur sur le bouton reset
		resetButton.addEventListener("click", () => {
			input.value = "";
			this.inputValue = "";
			this.getUpdateItems(this.visibleData, "");
		});

		function validateInput(input) {
			const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
			return regex.test(input);
		}


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

				if ( searchManager.selectedTags[this.name].includes(tagName)) {
					searchManager.removeTag(this.name, tagName);
					listItem.classList.remove("active");

					// Supprimer le tag du DOM
					document.querySelector(`.labelsearch[data-tag-name="${this.name}-${tagName}"]`)?.remove();

				} else {
					searchManager.addTag(this.name, tagName);
					listItem.classList.add("active");

					new TagManager(tagName, this.name);
				}

				console.log(searchManager.selectedTags);
			
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