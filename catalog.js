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

	// Функция для очистки фона скелетона (Новая!)
	function clearSkeletons() {
		cards.forEach(card => {
			const img = card.querySelector('img');
			// Если картинка загружена, убираем фон сразу
			if (img.complete) {
				img.style.background = 'none';
			} else {
				// Если еще грузится, ждем события load
				img.addEventListener('load', () => {
					img.style.background = 'none';
				});
			}
		});
	}

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
					if (card.style.display !== "flex") {
						card.style.display = "flex";
						card.classList.remove("show-anim");
						requestAnimationFrame(() => {
							card.classList.add("show-anim");
						});
					} else {
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

		// Вызываем очистку скелетонов после того, как карточки отобразились
		clearSkeletons();
	}

	document.addEventListener('click', function (event) {
		// Проверяем, что нажали именно на кнопку "купить"
		if (event.target && event.target.classList.contains('buy-btn')) {

			// Находим карточку этого товара
			const card = event.target.closest('.catalog-card');

			// Берем название товара из заголовка h3
			const itemName = card.querySelector('h3').innerText;

			// Номер дедушки (укажи нужный без плюса)
			const phoneNumber = "37377951450";

			// Сообщение
			const message = `Здравствуйте! Подскажите, есть ли в наличии: "${itemName}"?`;

			// Ссылка
			const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

			// Открываем
			window.open(whatsappUrl, '_blank');
		}
	});

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

	// Запускаем первую фильтрацию
	applyFilters();

	console.log("js Работает со скелетонами");
});