import { appState } from './state.js';
import { updateDisplay } from './logic.js';

export const bookCatalog = [
	{
		id: 1,
		title: "Crime and Punishment",
		author: "Fyodor Dostoevsky",
		genre: "Novel / Psychological Fiction",
		publicationYear: 1866,
		shortDescription: "A desperate student commits murder, then grapples with intense moral and psychological turmoil.",
		description: "The novel explores themes of redemption, guilt, and the social philosophy that justifies evil deeds. It is considered a foundational work of existentialist literature.",
		quiz: [
			{
				question: "What is the name of the protagonist who commits the murder?",
				options: ["Dmitri Karamazov", "Raskolnikov", "Prince Mishkin", "Levin"],
				answer: "Raskolnikov"
			}
		]
	},
	{
		id: 2,
		title: "Anna Karenina",
		author: "Leo Tolstoy",
		genre: "Novel / Realism",
		publicationYear: 1877,
		shortDescription: "The tragic romance between an aristocratic woman and a cavalry officer, set against Russian high society.",
		description: "Tolstoy examines adultery, jealousy, faith, and the social hypocrisy of 19th-century Russia. Often cited as one of the greatest works of realist fiction.",
		quiz: [
			{
				question: "In which city does Anna Karenina's story primarily begin?",
				options: ["Moscow", "St. Petersburg", "Paris", "Orygol"],
				answer: "Moscow"
			}
		]
	},
	{
		id: 3,
		title: "The Sorrows of Young Werther",
		author: "Johann Wolfgang von Goethe",
		genre: "Epistolary Novel / Romanticism",
		publicationYear: 1774,
		shortDescription: "A passionate young man's unrequited love for an engaged woman leads to self-destruction.",
		description: "A key work of the Sturm und Drang movement that profoundly influenced European Romanticism, told entirely through letters",
		quiz: []
	},
	{
		id: 4,
		title: "The Metamorphosis",
		author: "Franz Kafka",
		genre: "Novella / Absurdism",
		publicationYear: 1915,
		shortDescription: "A traveling salesman wakes up one morning to find himself inexplicably transformed into a massive insect",
		description: "An exploration of alienation, anxiety, and the absurdity of modern life, focusing on themes of isolation and the breakdown of communication.",
		quiz: []
	},
];

const bookListContainer = document.getElementById('book-list');
const filterButtonsContainer = document.getElementById('filter-buttons');
const catalogSection = document.getElementById('catalog-section');
const detailsSection = document.getElementById('details-section');
const searchInput = document.getElementById('search-input');

export const renderBookCatalog = (bookToRender = bookCatalog) => {
	if (bookToRender.length === 0) {
			bookListContainer.innerHTML = '<h3 class="no-results">Book not found</h3>';
			return;
		}
		
		const htmlOutput = bookToRender.map((book) => {
			return `
				<div class="book-card" data-id="${book.id}">
					<img src="assets/book-${book.id}.webp" alt="${book.title}" loading="lazy">
					<h3>${book.title}</h3>
					<p>By: ${book.author}</p>
					<p>${book.shortDescription}</p>
				</div>
			`;
	}).join('');

	bookListContainer.innerHTML = htmlOutput;
};

const renderFilterButtons = () => {
	const allGenres = bookCatalog.map((book) => {
		return book.genre;
	});

	const mySet = new Set(allGenres);

	const uniqueGenres = [...mySet];

	uniqueGenres.unshift('All');

	const buttonsHTML = uniqueGenres.map((genre) => {

		const activeClass = genre === appState.selectedGenre ? ' active' : '';

		return `
			<button class="genre-button${activeClass}" data-genre="${genre}">${genre}</button>
		`;
	}).join('');

	filterButtonsContainer.innerHTML = buttonsHTML;
};

const attachFilterListeners = () => {
    filterButtonsContainer.addEventListener("click", (event) => {
        const selectedGenre = event.target.dataset.genre;
        if (!selectedGenre) return;

        const allButtons = document.querySelectorAll('.genre-button');
        allButtons.forEach(btn => btn.classList.remove('active'));

        event.target.classList.add('active');

        appState.selectedGenre = selectedGenre;

        appState.searchTerm = "";

        searchInput.value = "";

        updateDisplay();
    });
};

const attachSearchListener = () => {
	searchInput.addEventListener("input", (event) => {
		appState.searchTerm = searchInput.value.toLowerCase();

		updateDisplay();
	});
};

const findBookById = (bookId) => {
    return bookCatalog.find(book => book.id === +bookId);
};

const renderBookDetails = (book) => {
	catalogSection.classList.add('hidden');
	detailsSection.classList.remove('hidden');

	const detailContainer = document.getElementById('book-details-container');

	const quizButtonHTML = book.quiz.length > 0 ? '<button id="start-quiz-button">Start Quiz</button>' : '';

    detailContainer.innerHTML = `
        <button id="back-button">Back</button>
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <img src="assets/book-${book.id}.webp" alt="${book.title}" style="max-width: 200px;">
        <p>${book.description}</p>
        ${quizButtonHTML}
    `;

    document.getElementById('back-button').addEventListener('click', hideBookDetails);

    if (book.quiz.length > 0) {
    	document.getElementById('start-quiz-button').addEventListener('click', startQuiz);
    };
};

const attachBookClickListener = () => {
    bookListContainer.addEventListener("click", (event) => {

        const clickedBookCard = event.target.closest('.book-card');
        if (!clickedBookCard) return;

        const bookId = clickedBookCard.dataset.id;
        
        appState.selectedBookId = +bookId;

        const selectedBook = findBookById(bookId);
        
        if (selectedBook) {
        	appState.view = 'details';
            renderBookDetails(selectedBook);
        };
    });
};

const hideBookDetails = () => {
	catalogSection.classList.remove('hidden');
	detailsSection.classList.add('hidden');
};

const startQuiz = () => {
	const bookId = appState.selectedBookId;
	appState.view = 'quiz';
	renderQuiz(bookId);
};

const renderQuiz = (bookId) => {
	const book = findBookById(bookId);
	const quizSection = document.getElementById('quiz-section');

	detailsSection.classList.add('hidden');
	quizSection.classList.remove('hidden');

	quizSection.innerHTML = `
		<h2>Quiz: ${book.title}</h2>
		<div id="question-container">
			<p>${book.quiz[0].question}</p>
			${book.quiz[0].options.map(option => `
				<button class="quiz-option">${option}</button>
			`).join('')}
		</div>
		<button id="cancel-quiz">Cancel Quiz</button>
	`;

	document.getElementById('cancel-quiz').addEventListener('click', () => {
		quizSection.classList.add('hidden');
		detailsSection.classList.remove('hidden');
		appState.view = 'details';
	});
};

document.addEventListener('DOMContentLoaded', () => {
	renderFilterButtons();
	attachFilterListeners();
	attachSearchListener();
	attachBookClickListener();
	updateDisplay();
});