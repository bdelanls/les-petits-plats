
/**
 * Charge des données JSON à partir d'un fichier spécifié.
 * 
 */
export async function loadJson(dataFile) {
	try {
		const response = await fetch(dataFile);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Impossible de charger les données :", error);
	}
}