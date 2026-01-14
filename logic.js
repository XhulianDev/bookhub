import { appState } from './state.js';
import { bookCatalog } from './data.js'
import { renderBookCatalog } from './app.js';

export const updateDisplay = () => {
	const selectedGenre = appState.selectedGenre;

	const searchTerm = appState.searchTerm;

	const filteredBooks = bookCatalog.filter((book) => {
		const isSearchMatch = !searchTerm || (
			book.title.toLowerCase().includes(searchTerm) ||
			book.author.toLowerCase().includes(searchTerm)
		);

		const isGenreMatch = selectedGenre === 'All' || (
			book.genre.includes(selectedGenre)
		);
	
		return isSearchMatch && isGenreMatch;
	});

	renderBookCatalog(filteredBooks);
};