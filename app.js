import { appState } from './state.js';
import { updateDisplay } from './logic.js';

export const bookCatalog = [
	{
		id: 1,
		title: "Crime and Punishment",
		author: "Fyodor Dostoevsky",
		genre: ["Novel", "Psychological Fiction"],
		publicationYear: 1866,
		shortDescription: "A desperate student commits murder, then grapples with intense moral and psychological turmoil.",
		description: "The novel explores themes of redemption, guilt, and the social philosophy that justifies evil deeds. It is considered a foundational work of existentialist literature.",
		quiz: [
			{
				question: "What is the name of the protagonist who commits the murder?",
				options: ["Dmitri Karamazov", "Raskolnikov", "Prince Mishkin", "Levin"],
				answer: "Raskolnikov"
			},
			{
				question: "What is the name of the pawnbroker Raskolnikov kills?",
				options: ["Sonia", "Dunya", "Alyona Ivanovna", "Lizaveta"],
				answer: "Alyona Ivanovna"
			}
		]
	},
	{
		id: 2,
		title: "Anna Karenina",
		author: "Leo Tolstoy",
		genre: ["Novel", "Realism"],
		publicationYear: 1877,
		shortDescription: "The tragic romance between an aristocratic woman and a cavalry officer, set against Russian high society.",
		description: "Tolstoy examines adultery, jealousy, faith, and the social hypocrisy of 19th-century Russia. Often cited as one of the greatest works of realist fiction.",
		quiz: [
			{
				question: "In which city does Anna Karenina's story primarily begin?",
				options: ["Moscow", "St. Petersburg", "Paris", "Orygol"],
				answer: "Moscow"
			},
			{
				question: "Who is the officer Anna falls in love with?",
				options: ["Alexei Karenin", "Count Vronsky", "Konstantin Levin", "Stiva"],
				answer: "Count Vronsky"
			}
		]
	},
	{
		id: 3,
		title: "The Sorrows of Young Werther",
		author: "Johann Wolfgang von Goethe",
		genre: ["Epistolary Novel", "Romanticism"],
		publicationYear: 1774,
		shortDescription: "A passionate young man's unrequited love for an engaged woman leads to self-destruction.",
		description: "A key work of the Sturm und Drang movement that profoundly influenced European Romanticism, told entirely through letters",
		quiz: [
		    {
		        question: "What form of writing is used to tell Werther's story?",
		        options: ["Poetry", "Diary entries", "Letters (Epistolary)", "Third-person narration"],
		        answer: "Letters (Epistolary)"
		    },
		    {
		    	question: "What is the name of the woman Werther is obsessed with?",
		    	options: ["Lotte", "Sophie", "Clara", "Elena"],
		    	answer: "Lotte"
		    }
		]
	},
	{
		id: 4,
		title: "The Metamorphosis",
		author: "Franz Kafka",
		genre: ["Novella", "Absurdism"],
		publicationYear: 1915,
		shortDescription: "A traveling salesman wakes up one morning to find himself inexplicably transformed into a massive insect",
		description: "An exploration of alienation, anxiety, and the absurdity of modern life, focusing on themes of isolation and the breakdown of communication.",
		quiz: [
		    {
		        question: "What is Gregor Samsa's profession before his transformation?",
		        options: ["Traveling salesman", "Bank clerk", "Doctor", "Teacher"],
		        answer: "Traveling salesman"
		    },
		    {
		    	question: "What is Gregor's sister's name?",
		    	options: ["Grete", "Anna", "Maria", "Martha"],
		    	answer: "Grete"
		    }
		]
	},
	{
	    id: 5,
	    title: "Notes from Underground",
	    author: "Fyodor Dostoevsky",
	    genre: ["Novel", "Psychological Fiction"],
	    shortDescription: "A bitter and profound exploration of the human psyche from the perspective of a social recluse.",
	    description: "An unnamed narrator retreats from society, offering a bitter and profound exploration of the human psyche.",
	    quiz: [
	        {
	            question: "How is the narrator of the book often referred to?",
	            options: ["The Underground Man", "The Silent Witness", "The Rebel", "The Hermit"],
	            answer: "The Underground Man"
	        },
	        {
	        	question: "How many years has the Underground Man lived in his 'underground'?",
	        	options: ["10 years", "20 years", "40 years", "5 years"],
	        	answer: "20 years"
	        }
	    ]
	},
	{
	    id: 6,
	    title: "Madame Bovary",
	    author: "Gustave Flaubert",
	    genre: ["Novel", "Realism"],
	    shortDescription: "A tragic tale of a woman's struggle against the banality of provincial life.",
	    description: "The tragic story of Emma Bovary, who seeks escape from her mundane life through romantic fantasies and excess.",
	    quiz: [
	        {
	            question: "In which country is the story set?",
	            options: ["Italy", "France", "England", "Germany"],
	            answer: "France"
	        },
	        {
	        	question: "What is Emma's husband's profession?",
	        	options: ["Lawyer", "Pharmacist", "Doctor", "Merchant"],
	        	answer: "Doctor"
	        }
	    ]
	},
	{
	    id: 7,
	    title: "Frankenstein",
	    author: "Mary Shelley",
	    genre: ["Epistolary", "Romanticism"],
	    shortDescription: "A scientist's ambitious experiment leads to the creation of a monstrous being.",
	    description: "A scientist creates a sentient creature in an unorthodox scientific experiment, leading to tragic consequences.",
	    quiz: [
	        {
	            question: "Who is the narrator at the beginning of the novel?",
	            options: ["Victor Frankenstein", "The Creature", "Robert Walton", "Elizabeth Lavenza"],
	            answer: "Robert Walton"
	        },
	        {
	        	question: "What is Victor Frankenstein's hometown?",
	        	options: ["London", "Geneva", "Ingolstadt", "Paris"],
	        	answer: "Geneva"
	        }
	    ]
	},
	{
	    id: 8,
	    title: "The Stranger",
	    author: "Albert Camus",
	    genre: ["Novella", "Absurdism"],
	    shortDescription: "An exploration of existential meaninglessness through the eyes of a detached narrator.",
	    description: "Through the story of Meursault, Camus explores the absurdity of life and the indifference of the universe.",
	    quiz: [
	        {
	            question: "What is the famous opening line of the book about?",
	            options: ["A wedding", "A murder", "His mother's death", "A lost job"],
	            answer: "His mother's death"
	        },
	        {
	        	question: "Where does Meursault kill the Arab man?",
	        	options: ["In a cafe", "On a beach", "In an apartment", "In a prison"],
	        	answer: "On a beach"
	        }
	    ]
	}
];

const bookListContainer = document.getElementById('book-list');
const filterButtonsContainer = document.getElementById('filter-buttons');
const catalogSection = document.getElementById('catalog-section');
const detailsSection = document.getElementById('details-section');
const searchInput = document.getElementById('search-input');
const quizSection = document.getElementById('quiz-section');

let currentQuestionIndex = 0;

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
	const allGenres = bookCatalog.flatMap((book) => {
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
        <p>Genre: ${book.genre.join(', ')}</p>
        <img src="assets/book-${book.id}.webp" alt="${book.title}">
        <p>${book.description}</p>
        ${quizButtonHTML}
    `;
};

const attachBookClickListener = () => {
    bookListContainer.addEventListener("click", (event) => {

        const clickedBookCard = event.target.closest('.book-card');
        if (!clickedBookCard) return;

        const bookId = clickedBookCard.dataset.id;
        
        appState.selectedBookId = +bookId;

        const selectedBook = findBookById(bookId);

        if (selectedBook) {
        	const genres = selectedBook.genre;
	        const firstGenre = genres[0];
	        appState.selectedGenre = firstGenre || 'All';

	        renderFilterButtons();
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
	currentQuestionIndex = 0;
	const bookId = appState.selectedBookId;
	appState.view = 'quiz';
	renderQuiz(bookId);
};

const renderQuiz = (bookId) => {
	const book = findBookById(bookId);

	detailsSection.classList.add('hidden');
	quizSection.classList.remove('hidden');

	quizSection.innerHTML = `
		<h2>Quiz: ${book.title}</h2>
		<div id="question-container">
			<p>${book.quiz[currentQuestionIndex].question}</p>
			${book.quiz[currentQuestionIndex].options.map(option => `
				<button class="quiz-option">${option}</button>
			`).join('')}
		</div>
		<button id="cancel-quiz">Cancel Quiz</button>
	`;
};

const attachNavigationListeners = () => {
	detailsSection.addEventListener("click", (event) => {
		if (event.target.id === 'back-button') {
			hideBookDetails();
		} else if (event.target.id === 'start-quiz-button') {
			startQuiz();
		}
	});

	quizSection.addEventListener("click", (event) => {
		if (event.target.id === 'cancel-quiz') {
			quizSection.classList.add('hidden');
			detailsSection.classList.remove('hidden');
			appState.view = 'details';
			currentQuestionIndex = 0;
		} else if (event.target.classList.contains('quiz-option')) {
			const book = bookCatalog.find(b => b.id === appState.selectedBookId);
			const isCorrect = event.target.innerText === book.quiz[currentQuestionIndex].answer;

			if (isCorrect) {
				alert("Correct!");
				appState.currentQuizScore++;
			} else {
				alert("Wrong");
			}

			currentQuestionIndex++;

			if (currentQuestionIndex < book.quiz.length) {
				renderQuiz(appState.selectedBookId);
			} else {
				alert("Quiz completed!");
				saveHighScore(book.quiz.length);
				quizSection.classList.add('hidden');
				detailsSection.classList.remove('hidden');
				appState.view = 'details';
				currentQuestionIndex = 0;
				appState.currentQuizScore = 0;
			}
		}
	});
};

const saveHighScore = (totalQuestions) => {
	const book = appState.selectedBookId;
	const score = appState.currentQuizScore;
	const currentDate = new Date().toLocaleString(undefined, {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	const bookName = findBookById(book).title;

	const result = {
		title: bookName,
		correct: score,
		total: totalQuestions,
		date: currentDate,
	};

	appState.quizHistory.push(result);

	localStorage.setItem('quizHistory', JSON.stringify(appState.quizHistory));
};

const loadHistory = () => {
	const savedData = localStorage.getItem('quizHistory');
	if (savedData) {
		appState.quizHistory = JSON.parse(savedData);
	}
};

const setupModalEvents = () => {
	const modal = document.getElementById('history-modal');
	const openBtn = document.getElementById('open-modal-btn');
	const closeBtn = document.getElementById('close-modal-btn');

	openBtn.addEventListener('click', () => {
		modal.classList.remove('hidden');
		renderHistory();
	});

	closeBtn.addEventListener('click', () => {
		modal.classList.add('hidden');
	});

	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.classList.add('hidden');
		}
	});
};

const renderHistory = () => {
	const dataContainer = document.getElementById('history-data-container');
	dataContainer.innerHTML = "";

	const reversedHistory = [...appState.quizHistory].reverse();

	if (reversedHistory.length === 0) {
		dataContainer.innerHTML = `<li>No quiz attempts found</li>`;
	} else {
		reversedHistory.forEach(item => {
			const percentage = item.total > 0 ? (item.correct / item.total) * 100 : 0;
			let scoreClass = percentage >= 50 ? 'pass' : 'fail';

			const historyItem = `
				<li class="history-item">
					<article class="history-card ${scoreClass}">
						<span class="status-dot"></span>
						<div class="card-content">
							<strong class="history-book">${item.title}</strong>
							<time class="history-date">${item.date}</time>
							<span class="history-score">${item.correct}/${item.total}</span>
						</div>
					</article>
				</li>
			`;
			dataContainer.innerHTML += historyItem;
		});
	};
};

const clearQuizHistory = () => {
	const clearBtn = document.getElementById('clear-history-btn');

	clearBtn.addEventListener('click', () => {
		const isConfirmed = window.confirm("Are you sure?");
		if (!isConfirmed) return;

		appState.quizHistory = [];
		localStorage.removeItem('quizHistory');
		renderHistory();
	});
};

document.addEventListener('DOMContentLoaded', () => {
	loadHistory();
	renderFilterButtons();
	attachFilterListeners();
	attachSearchListener();
	attachBookClickListener();
	attachNavigationListeners();
	setupModalEvents();
	clearQuizHistory();
	updateDisplay();
});