const bookCatalog = [
	{
		id: 1,
		title: "Crime and Punishment",
		author: "Fyodor Dostoevsky",
		genre: "Novel / Psychological Fiction",
		publicationYear: 1866,
		shortDescription: "A desperate student commits murder, then grapples with intense moral and psychological turmoil.",
		description: "The novel explores themes of redemption, guilt, and the social philosophy that justifies evil deeds. It is considered a foundational work of existentialist literature.",
		imageLink: "assets/crime_punishment.jpg",
		quiz: []
	},
	{
		id: 2,
		title: "Anna Karenina",
		author: "Leo Tolstoy",
		genre: "Novel / Realism",
		publicationYear: 1877,
		shortDescription: "The tragic romance between an aristocratic woman and a cavalry officer, set against Russian high society.",
		description: "Tolstoy examines adultery, jealousy, faith, and the social hypocrisy of 19th-century Russia. Often cited as one of the greatest works of realist fiction.",
		imageLink: "assets/anna_karenina.jpg",
		quiz: []
	},
	{
		id: 3,
		title: "The Sorrows of Young Werther",
		author: "Johann Wolfgang von Goethe",
		genre: "Epistolary Novel / Romanticism",
		publicationYear: 1774,
		shortDescription: "A passionate young man's unrequited love for an engaged woman leads to self-destruction.",
		description: "A key work of the Sturm und Drang movement that profoundly influenced European Romanticism, told entirely through letters",
		imageLink: "assets/werther.webp",
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
		imageLink: "assets/metamorphosis.jpg",
		quiz: []
	}
];

const bookListContainer = document.getElementById("book-list");
const filterButtonsContainer = document.getElementById("filter-buttons");

const renderBookCatalog = (booksToRender = bookCatalog) => {
	const htmlOutput = booksToRender.map((book) => {
		return `
			<div class="book-card" data-id="${book.id}">
				<img src="${book.imageLink}" alt="${book.title}" loading="lazy">
				<h3>${book.title}</h3>
				<p>By: ${book.author}</p>
				<p>${book.shortDescription}</p>
			</div>
		`;
	}).join('');

	bookListContainer.innerHTML = htmlOutput;
}

renderBookCatalog();

const renderFilterButtons = () => {
	const allGenres = bookCatalog.map((book) => {
		return book.genre;
	})

	const mySet = new Set(allGenres);

	const uniqueGenres = [...mySet];

	uniqueGenres.unshift('All');

	const buttonsHTML = uniqueGenres.map((genre) => {
		return `
			<button data-genre="${genre}">${genre}</button>
		`
	}).join('');

	filterButtonsContainer.innerHTML = buttonsHTML;
}

renderFilterButtons();

const attachFilterListeners = () => {
	const filterButtons = filterButtonsContainer.querySelectorAll('button');

	filterButtons.forEach((button) => {
		button.addEventListener("click", (event) => {
			const selectedGenre = event.target.dataset.genre;

			filterBooks(selectedGenre);
		});
	});
};

attachFilterListeners();

const filterBooks = (genre) => {
	if (genre === 'All') {
		return renderBookCatalog();
	}

	const filteredBooks = bookCatalog.filter((book) => {
		return book.genre === genre;
	});

	renderBookCatalog(filteredBooks);
};

const attachSearchListener = () => {
	const searchInput = document.getElementById("search-input");

	searchInput.addEventListener("input", (event) => {
		handleSearch();
	});
};

const handleSearch = () => {
	const searchInput = document.getElementById("search-input");
		const searchTerm = searchInput.value;
	const standardizedTerm = searchTerm.toLowerCase();

	const filteredBooks = bookCatalog.filter((book) => {
		return book.title.toLowerCase().includes(standardizedTerm);
	});

	renderBookCatalog(filteredBooks);
};

attachSearchListener();