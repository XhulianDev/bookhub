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
		quiz: [
		    {
		        question: "What form of writing is used to tell Werther's story?",
		        options: ["Poetry", "Diary entries", "Letters (Epistolary)", "Third-person narration"],
		        answer: "Letters (Epistolary)"
		    }
		]
	},
	{
		id: 4,
		title: "The Metamorphosis",
		author: "Franz Kafka",
		genre: "Novella / Absurdism",
		publicationYear: 1915,
		shortDescription: "A traveling salesman wakes up one morning to find himself inexplicably transformed into a massive insect",
		description: "An exploration of alienation, anxiety, and the absurdity of modern life, focusing on themes of isolation and the breakdown of communication.",
		quiz: [
		    {
		        question: "What is Gregor Samsa's profession before his transformation?",
		        options: ["Traveling salesman", "Bank clerk", "Doctor", "Teacher"],
		        answer: "Traveling salesman"
		    }
		]
	},
	{
	    id: 5,
	    title: "Notes from Underground",
	    author: "Fyodor Dostoevsky",
	    genre: "Novel / Psychological Fiction",
	    shortDescription: "A bitter and profound exploration of the human psyche from the perspective of a social recluse.",
	    description: "An unnamed narrator retreats from society, offering a bitter and profound exploration of the human psyche.",
	    quiz: [
	        {
	            question: "How is the narrator of the book often referred to?",
	            options: ["The Underground Man", "The Silent Witness", "The Rebel", "The Hermit"],
	            answer: "The Underground Man"
	        }
	    ]
	},
	{
	    id: 6,
	    title: "Madame Bovary",
	    author: "Gustave Flaubert",
	    genre: "Novel / Realism",
	    shortDescription: "A tragic tale of a woman's struggle against the banality of provincial life.",
	    description: "The tragic story of Emma Bovary, who seeks escape from her mundane life through romantic fantasies and excess.",
	    quiz: [
	        {
	            question: "In which country is the story set?",
	            options: ["Italy", "France", "England", "Germany"],
	            answer: "France"
	        }
	    ]
	},
	{
	    id: 7,
	    title: "Frankenstein",
	    author: "Mary Shelley",
	    genre: "Epistolary Novel / Romanticism",
	    shortDescription: "A scientist's ambitious experiment leads to the creation of a monstrous being.",
	    description: "A scientist creates a sentient creature in an unorthodox scientific experiment, leading to tragic consequences.",
	    quiz: [
	        {
	            question: "Who is the narrator at the beginning of the novel?",
	            options: ["Victor Frankenstein", "The Creature", "Robert Walton", "Elizabeth Lavenza"],
	            answer: "Robert Walton"
	        }
	    ]
	},
	{
	    id: 8,
	    title: "The Stranger",
	    author: "Albert Camus",
	    genre: "Novella / Absurdism",
	    shortDescription: "An exploration of existential meaninglessness through the eyes of a detached narrator.",
	    description: "Through the story of Meursault, Camus explores the absurdity of life and the indifference of the universe.",
	    quiz: [
	        {
	            question: "What is the famous opening line of the book about?",
	            options: ["A wedding", "A murder", "His mother's death", "A lost job"],
	            answer: "His mother's death"
	        }
	    ]
	}
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

        switchToGenre();
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
        <img src="assets/book-${book.id}.webp" alt="${book.title}">
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

        const genre = selectedBook.genre;

        appState.selectedGenre = genre;

        renderFilterButtons();
        
        if (selectedBook) {
        	appState.view = 'details';
            renderBookDetails(selectedBook);
        };
    });
};

const showCatalog = () => {
	catalogSection.classList.remove('hidden');
	detailsSection.classList.add('hidden');
};

const switchToGenre = () => {
	showCatalog();
	renderFilterButtons();
	updateDisplay();
};

const hideBookDetails = () => {
	appState.selectedGenre = 'All';
	showCatalog();
	renderFilterButtons();
	updateDisplay();
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