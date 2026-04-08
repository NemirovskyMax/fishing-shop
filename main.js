document.addEventListener("DOMContentLoaded", function () {

	//! Кнопки на главной
	const catalogBtn = document.getElementById("catalogBtn");
	const moreBtn = document.getElementById("moreBtn");

	if (catalogBtn) {
		catalogBtn.addEventListener("click", () => {
			window.location.href = "catalog.html";
		});
	}

	if (moreBtn) {
		moreBtn.addEventListener("click", () => {
			const featureSection = document.getElementById("feature");
			if (featureSection) {
				featureSection.scrollIntoView({ behavior: "smooth" });
			}
		});
	}
	console.log("JS работает");
});

