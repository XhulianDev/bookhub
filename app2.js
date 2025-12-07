const bookCatalog = [
	{
		id: 1,
		title: 'Crime and Punishment',
		author: 'Fydor Dostoevsky',
		genre: 'Novel / Psychological Fiction',
		publicationYear: 1866,
		shortDescription: 'A desperate student commits murder, then grapples with intense moral and psychological turmoil.',
		description: 'The novel explores themes of redemption, guilt, and the social philosophy that justifies evil deeds. It is considered a foundational work of existentialist literature.',
		imageLink: 'assets/crime_punishment.jpg',
		quiz: []
	},
	{
		id: 2,
		title: 'Anna Karenina',
		author: 'Leo Tolstoy',
		genre: 'Novel Realism',
		publicationYear: 1877,
		shortDescription: "The tragic romance between an aristocratic woman and a cavalry officer, set against Russian high society.",
		description: "Tolstoy examines adultery, jealousy, faith, and the social hypocrisy of 19th-century Russia. Often cited as one of the greatest works of realist fiction.",
		imageLink: "assets/anna_karenina.jpg",
		quiz: []
	},
	{
		id: 3,
		title: 'The Sorrows of Young Werther',
		author: 'Johann Wolfgang von Goethe',
		genre: "Epistolary Novel / Romanticism",
		publicationYear: 1774,
		shortDescription: "A passionate young man's unrequited love for an engaged woman leads to self-destruction.",
		description: "A key work of the Sturm und Drang movement that profoundly influenced European Romanticism, told entirely through letters",
		imageLink: "assets/werther.webp",
		quiz: []
	},
	{
		id: 4,
		title: 'The Metamorphosis',
		author: 'Franz Kafka',
		genre: "Novella / Absurdism",
		publicationYear: 1915,
		shortDescription: "A traveling salesman wakes up one morning to find himself inexplicably transformed into a massive insect",
		description: "An exploration of alienation, anxiety, and the absurdity of modern life, focusing on themes of isolation and the breakdown of communication.",
		imageLink: "assets/metamorphosis.jpg",
		quiz: []
	}
];

const bookList = document.getElementById('book-list');
const filterButtonsContainer = document.getElementById('filter-buttons');
const detailsSection = document.getElementById('details-section');
const searchInput = document.getElementById('search-input');

const renderBookCatalog = (bookCatalog) => {
	const htmlOutput = bookCatalog.map((book) => {
		return `
			<div data-id="${book.id}" class="book-card">
				<img src="${book.imageLink}" />
				<h2>${book.title}</h2>
				<p>${book.author}</p>
				<p>${book.publicationYear}</p>
				<p>${book.shortDescription}</p>
			</div>
		`
	}).join('');

	bookList.innerHTML = htmlOutput;
};

renderBookCatalog(bookCatalog);

const renderFilterButtons = () => {
	const allGenres = bookCatalog.map((book) => {
		return book.genre;
	});

	const uniqueGenres = new Set(allGenres);

	const genres = [...uniqueGenres];
	genres.unshift('All');

	const buttonsHTML = genres.map((genre) => {
		return `
			<button data-genre="${genre}">${genre}</button>
		`
	}).join('');

	filterButtonsContainer.innerHTML = buttonsHTML;
};

renderFilterButtons();

const attachFilterListeners = () => {
	filterButtonsContainer.addEventListener("click", (event) => {
		const selectedGenre = event.target.dataset.genre;

		filterBooks(selectedGenre);
	});
};

const filterBooks = (genre) => {
	if (genre === 'All') {
		return renderBookCatalog(bookCatalog);
	};

	const filteredBooks = bookCatalog.filter((book) => {
		return book.genre === genre;
	})

	renderBookCatalog(filteredBooks);
}

attachFilterListeners();

const attachBookCardListener = () => {
	bookList.addEventListener("click", (event) => {
		const clickedCard = event.target.closest('.book-card');

		if (!clickedCard) {
			return;
		}

		const bookId = Number(clickedCard.dataset.id);

		displayBookDetails(bookId);
	});
};

const displayBookDetails = (bookId) => {
	const foundBook = bookCatalog.find((book) => {
		return book.id === bookId;
	});

	bookList.classList.add('hidden');

	detailsSection.classList.remove('hidden');

	detailsSection.innerHTML = `<h2>${foundBook.title}</h2><p>${foundBook.shortDescription}</p><button onclick="closeDetails()">Kthehu</button>`;
};

attachBookCardListener();

const closeDetails = () => {
	detailsSection.classList.add('hidden');

	bookList.classList.remove('hidden');
};

const attachSearchListener = () => {
	searchInput.addEventListener("input", (event) => {
		const query = event.target.value;
		searchBooks(query);
	});
};

const searchBooks = (query) => {
	if (query === '') {
		return renderBookCatalog(bookCatalog);
	}

	const lowerCaseQuery = query.toLowerCase();

	const foundBooks = bookCatalog.filter((book) => {
		const titleMatch = book.title.toLowerCase().includes(lowerCaseQuery);
		const authorMatch = book.author.toLowerCase().includes(lowerCaseQuery);

		return titleMatch || authorMatch;
	});

	renderBookCatalog(foundBooks);
};

attachSearchListener();