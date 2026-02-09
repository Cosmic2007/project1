/*********************************
 AUTHENTICATION : REGISTER
*********************************/
function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const msg = document.getElementById("regMsg");

    if (username === "" || password === "") {
        msg.style.color = "red";
        msg.innerText = "All fields are required";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.username === username);
    if (exists) {
        msg.style.color = "red";
        msg.innerText = "User already exists";
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";
    msg.innerText = "Registration successful. Please login.";
}

/*********************************
 AUTHENTICATION : LOGIN
*********************************/
function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    const error = document.getElementById("error");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
        user => user.username === u && user.password === p
    );

    if (validUser) {
        localStorage.setItem("loggedInUser", u);
        window.location.href = "index.html";
    } else {
        error.innerText = "Invalid username or password";
    }
}

/*********************************
 LOGIN PROTECTION
*********************************/
if (
    window.location.pathname.includes("index.html") &&
    !localStorage.getItem("loggedInUser")
) {
    window.location.href = "login.html";
}

/*********************************
 BOOK DATA
*********************************/
const books = [
    {
        id: 1,
        title: "Object Oriented Programming",
        author: "Dr. James Anderson",
        description: "Core OOP concepts with Java examples.",
        category: "programming",
        categoryLabel: "Programming",
        pages: 456,
        rating: 4.8,
        icon: "fab fa-java",
        color: "#f8981d",
        page: "book-details/oop.html"
    },
    {
        id: 2,
        title: "Data Structures & Algorithms",
        author: "Prof. Sarah Mitchell",
        description: "Data structures and algorithms using C++.",
        category: "programming",
        categoryLabel: "Programming",
        pages: 512,
        rating: 4.9,
        icon: "fas fa-code",
        color: "#00599c",
        page: "book-details/dsa.html"
    },
    {
        id: 3,
        title: "Entrepreneurship And Innovation",
        author: "Dr. R.K. Jain",
        description: "Startup fundamentals and innovation models.",
        category: "startup",
        categoryLabel: "Entrepreneurship",
        pages: 384,
        rating: 4.5,
        icon: "fas fa-lightbulb",
        color: "#9b59b6",
        page: "book-details/entrepreneurship.html"
    },
    {
        id: 4,
        title: "Probability And Statistics",
        author: "Prof. Kenneth Rosen",
        description: "Probability theory and statistical methods.",
        category: "mathematics",
        categoryLabel: "Mathematics",
        pages: 448,
        rating: 4.7,
        icon: "fas fa-infinity",
        color: "#3498db",
        page: "book-details/probability.html"
    },
    {
        id: 5,
        title: "Introduction To Artificial Intelligence",
        author: "Leonard Lobel",
        description: "AI fundamentals and applications.",
        category: "programming",
        categoryLabel: "AI",
        pages: 672,
        rating: 4.8,
        icon: "fas fa-microchip",
        color: "#e74c3c",
        page: "book-details/ai.html"
    },
    {
        id: 6,
        title: "Cloud Computing",
        author: "Dr. Raghu Ramakrishnan",
        description: "Cloud services and architectures.",
        category: "database",
        categoryLabel: "Cloud",
        pages: 528,
        rating: 4.6,
        icon: "fas fa-cloud",
        color: "#27ae60",
        page: "book-details/cloud.html"
    }
];

/*********************************
 DOM ELEMENTS
*********************************/
const booksGrid = document.getElementById("booksGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

/*********************************
 INITIALIZE DASHBOARD
*********************************/
document.addEventListener("DOMContentLoaded", () => {
    if (booksGrid) {
        renderBooks(books);
        updateStats();
        setupEvents();
    }
});

/*********************************
 RENDER BOOK CARDS
*********************************/
function renderBooks(bookList) {
    booksGrid.innerHTML = "";

    bookList.forEach(book => {
        const card = document.createElement("div");
        card.className = `book-card category-${book.category}`;

        card.innerHTML = `
            <div class="book-cover" style="background:${book.color}">
                <i class="${book.icon}"></i>
            </div>

            <div class="book-info">
                <span class="category-badge">${book.categoryLabel}</span>
                <h3>${book.title}</h3>
                <p class="author">By ${book.author}</p>
                <p class="description">${book.description}</p>

                <div class="book-meta">
                    <span><i class="fas fa-book"></i> ${book.pages} pages</span>
                    <span><i class="fas fa-star"></i> ${book.rating}</span>
                </div>
            </div>

            <div class="book-actions">
                <a href="${book.page}" class="btn btn-view">
                    <i class="fas fa-eye"></i> View Details
                </a>
            </div>
        `;

        booksGrid.appendChild(card);
    });
}

 SEARCH & FILTER
function setupEvents() {
    if (searchInput) {
        searchInput.addEventListener("input", e => {
            const term = e.target.value.toLowerCase();
            renderBooks(
                books.filter(book =>
                    book.title.toLowerCase().includes(term) ||
                    book.author.toLowerCase().includes(term)
                )
            );
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const cat = btn.dataset.category;
            renderBooks(
                cat === "all"
                    ? books
                    : books.filter(b => b.category === cat)
            );
        });
    });
}
 STATS
function updateStats() {
    const totalBooks = document.getElementById("totalBooks");
    if (totalBooks) totalBooks.innerText = books.length;
}
