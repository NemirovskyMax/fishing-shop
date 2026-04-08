document.addEventListener("DOMContentLoaded", function () {
	const searchInput = document.getElementById("searchInput");
	const searchBtn = document.getElementById("searchBtn");
	const notFound = document.getElementById("notFoundMessage");
	const cards = document.querySelectorAll(".catalog-card");
	const categoryButtons = document.querySelectorAll(".category-btn, .category-btnall");
	const showMorebtn = document.getElementById("showMorebtn");
	const scrollUpBtn = document.getElementById("scrollUpBtn");

	let visibleLimit = 6;
	let currentCategory = "all";

	// Основная функция фильтрации
	function applyFilters() {
		const query = searchInput.value.toLowerCase().trim();
		let foundAny = false;
		let visibleInDOM = 0;

		cards.forEach(card => {
			const name = card.dataset.name.toLowerCase();
			const matchesQuery = (query === "" || name.includes(query));
			const matchesCategory = (currentCategory === "all" || name === currentCategory);

			if (matchesQuery && matchesCategory) {
				card.dataset.hidden = "false";
				foundAny = true;

				if (visibleInDOM < visibleLimit) {
					// Если карточка была скрыта, подготавливаем её к анимации
					if (card.style.display !== "flex") {
						card.style.display = "flex";
						// Убираем класс, чтобы сбросить состояние перед анимацией
						card.classList.remove("show-anim");

						// Запускаем анимацию в следующем кадре отрисовки
						requestAnimationFrame(() => {
							card.classList.add("show-anim");
						});
					} else {
						// Если она уже была видна, просто убеждаемся, что класс на месте
						card.classList.add("show-anim");
					}
					visibleInDOM++;
				} else {
					card.style.display = "none";
					card.classList.remove("show-anim");
				}
			} else {
				card.dataset.hidden = "true";
				card.style.display = "none";
				card.classList.remove("show-anim");
			}
		});

		const totalMatches = Array.from(cards).filter(c => c.dataset.hidden === "false").length;

		if (showMorebtn) {
			showMorebtn.style.display = (totalMatches > visibleLimit) ? "block" : "none";
		}

		if (notFound) {
			notFound.style.display = foundAny ? "none" : "block";
		}
	}

	// Поиск по кнопке
	searchBtn.addEventListener("click", () => {
		visibleLimit = 6;
		applyFilters();

		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	// Поиск по Enter
	searchInput.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			visibleLimit = 6;
			applyFilters();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	});

	// Категории
	categoryButtons.forEach(button => {
		button.addEventListener("click", () => {
			categoryButtons.forEach(btn => btn.classList.remove("active"));
			button.classList.add("active");

			currentCategory = button.dataset.category || "all";
			visibleLimit = 6;
			applyFilters();

			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	});

	// Показать еще
	showMorebtn.addEventListener("click", () => {
		visibleLimit += 6;
		applyFilters();
	});

	// Кнопка Вверх
	window.addEventListener("scroll", () => {
		if (window.scrollY > 800) {
			scrollUpBtn.classList.add("show");
		} else {
			scrollUpBtn.classList.remove("show");
		}
	});

	scrollUpBtn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	applyFilters();

	console.log("js Работает");

});