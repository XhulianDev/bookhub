import { bookCatalog } from './data.js';
import { appState } from './state.js';
import { updateDisplay } from './logic.js';

const bookListContainer = document.getElementById('book-list');
const filterButtonsContainer = document.getElementById('filter-buttons');
const catalogSection = document.getElementById('catalog-section');
const detailsSection = document.getElementById('details-section');
const searchInput = document.getElementById('search-input');
const quizSection = document.getElementById('quiz-section');

let currentQuestionIndex = 0;
let savedScrollPosition = 0;

export const renderBookCatalog = (bookToRender = bookCatalog) => {
	if (bookToRender.length === 0) {
		bookListContainer.innerHTML = '<h3 class="no-results">Book not found</h3>';
		return;
	}
		
	const htmlOutput = bookToRender.map((book) => {
		return `
		    <div class="book-card" data-id="${book.id}">
		        <img src="assets/book-${book.id}.webp" alt="${book.title}" loading="lazy">
		        <div class="book-info">
		            <h3>${book.title}</h3>
		            <p class="author">By: ${book.author}</p>
		            <p class="description">${book.shortDescription}</p>
		        </div>
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
	savedScrollPosition = window.scrollY;
	window.scrollTo(0, 0);

	catalogSection.classList.add('hidden');
	detailsSection.classList.remove('hidden');

	const detailContainer = document.getElementById('book-details-container');

	const quizButtonHTML = book.quiz.length > 0 ? '<button id="start-quiz-btn">Start Quiz</button>' : '';

    detailContainer.innerHTML = `
        <button id="back-button">Back to Catalog</button>
        <div class="details-wrapper">
        	<div class="details-sidebar">
    			<img src="assets/book-${book.id}.webp" alt="${book.title}">
    			<div class="meta-info">
			        <h3>${book.title}</h3>
    				<div class="meta-item">
    					<span class="label">Author</span>
    					<span class="value">${book.author}</span>
    				</div>
    				<div class="meta-item">
    					<span class="label">Genre</span>
    					<span class="value">${book.genre.join(', ')}</span>
    				</div>
			        ${quizButtonHTML}
        		</div>
    		</div>

    		<div class="details-content">
    			<h4>Summary</h4>
		        <p>${book.description}</p>
    		</div>
    	</div>
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
	quizSection.classList.add('hidden');
};

const switchToGenre = () => {
	showCatalog();
	renderFilterButtons();
	updateDisplay();
};

const hideBookDetails = () => {
	showCatalog();
	renderFilterButtons();
	updateDisplay();
	window.scrollTo(0, savedScrollPosition);
};

const startQuiz = () => {
	currentQuestionIndex = 0;
	appState.currentQuizScore = 0;
	const bookId = appState.selectedBookId;
	appState.view = 'quiz';
	renderQuiz(bookId);
};

const renderQuiz = (bookId) => {
	const book = findBookById(bookId);

	detailsSection.classList.add('hidden');
	quizSection.classList.remove('hidden');

	quizSection.style.pointerEvents = 'auto';

	quizSection.innerHTML = `
		<div class="quiz-container">
			<div class="quiz-header">
				<h3>Quiz: ${book.title}</h3>
				<span class="question-count">Question ${currentQuestionIndex + 1} of ${book.quiz.length}</span>
			</div>

		<div id="question-card">
			<p class="question-text">${book.quiz[currentQuestionIndex].question}</p>
			<div class="options-grid">
				${book.quiz[currentQuestionIndex].options.map(option => `
					<button class="quiz-option">${option}</button>
				`).join('')}
			</div>
		</div>

		<div class="quiz-footer">
			<button id="cancel-quiz">Cancel Quiz</button>
		</div>
	`;
};

const attachNavigationListeners = () => {
	detailsSection.addEventListener("click", (event) => {
		if (event.target.id === 'back-button') {
			hideBookDetails();
		} else if (event.target.id === 'start-quiz-btn') {
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
			const clickedOption = event.target;
			const book = bookCatalog.find(b => b.id === appState.selectedBookId);
			const isCorrect = event.target.innerText === book.quiz[currentQuestionIndex].answer;

			quizSection.style.pointerEvents = 'none';

			if (isCorrect) {
				clickedOption.classList.add('correct');
				appState.currentQuizScore++;
			} else {
				clickedOption.classList.add('wrong');
			}

			setTimeout(() => {
				currentQuestionIndex++

				if (currentQuestionIndex < book.quiz.length) {
					renderQuiz(appState.selectedBookId);
				} else {
					showQuizResults();
					saveHighScore(appState.currentQuizScore, book.quiz.length);
					quizSection.style.pointerEvents = 'auto';
				}
			}, 1000);
		}
	});
};

const showQuizResults = () => {
	const id = appState.selectedBookId;
	const book = findBookById(id);

	quizSection.innerHTML = `
		<div class="quiz-results-card">
			<h3>Quiz Completed!</h3>
			<div class="score-display">
				<span class="score-number">${appState.currentQuizScore}</span>
				<span class="score-total">/ ${book.quiz.length}</span>
			</div>
			<p class="results-message">${appState.currentQuizScore === book.quiz.length ? "Perfect Score! You're a Master" : "Well done! Keep reading!"}</p>
			<button id="finish-quiz-btn" class="primary-btn">Back to Book</button>
		</div>
	`;

	const closeBtn = document.getElementById('finish-quiz-btn');

	closeBtn.addEventListener("click", () => {
		quizSection.classList.add('hidden');
		detailsSection.classList.remove('hidden');
		appState.view = 'details';
	});
};

const saveHighScore = (score, total) => {
	const book = appState.selectedBookId;

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
		id: Date.now(),
		title: bookName,
		correct: score,
		total: total,
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
	const clearBtn = document.getElementById('clear-history-btn');
	if (!dataContainer) return;

	dataContainer.innerHTML = "";
	const reversedHistory = [...appState.quizHistory].reverse();

	if (reversedHistory.length === 0) {
		dataContainer.innerHTML = `<li>No quiz attempts found</li>`;
		if (clearBtn) clearBtn.style.display = "none";
		return;
	}

	if (clearBtn) clearBtn.style.display = "block";

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
				<button class="rmv-button" data-id="${item.id}">Remove</button>
				</article>
			</li>
		`;
		dataContainer.innerHTML += historyItem;
	});
};

const handleDeleteHistoryItem = (event) => {
	if (event.target.classList.contains('rmv-button')) {
		const clickedId = event.target.dataset.id;
		appState.quizHistory = appState.quizHistory.filter(item => item.id !== Number(clickedId));
		localStorage.setItem('quizHistory', JSON.stringify(appState.quizHistory));
		renderHistory();
	}
};

const attachHistoryListeners = () => {
	const dataContainer = document.getElementById('history-data-container');
	if (dataContainer) {
		dataContainer.addEventListener("click", handleDeleteHistoryItem);
	}
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
	attachHistoryListeners();
	updateDisplay();
});