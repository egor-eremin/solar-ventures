function removeTransition(moon) {
	const moonElement = document.querySelector(moon);
	const animationElementRight = moonElement.querySelector(
		".circle-animate__circle-mask-1"
	);
	const animationElementLeft = moonElement.querySelector(
		".circle-animate__circle-svg-2"
	);

	animationElementRight.style.transition = "none";
	animationElementLeft.style.transition = "none";
	setTimeout(() => {
		animationElementRight.style.removeProperty("transition");
		animationElementLeft.style.removeProperty("transition");
	}, 300);
}

function showsSlideNumber(numberWrapper) {
	const numberElement = document.querySelector(numberWrapper);
	const curSlide = this.slides[this.activeIndex];
	const curNumber = String(
		Number(curSlide.dataset.swiperSlideIndex) + 1
	).padStart(2, "0");

	numberElement.textContent = curNumber;
}

function updateMoon(moonElement, direction) {
	const curSlide = this.slides[this.activeIndex];
	const prevProgress =
		direction === "toPrev"
			? Math.round(
					((Number(curSlide.dataset.swiperSlideIndex) + 2) /
						this.slides.length) *
						100
			  )
			: Math.round(
					(Number(curSlide.dataset.swiperSlideIndex) /
						this.slides.length) *
						100
			  );
	const progress = Math.round(
		((Number(curSlide.dataset.swiperSlideIndex) + 1) / this.slides.length) *
			100
	);
	const moon = document.querySelector(moonElement);
	const rightElement = moon.querySelector(".circle-animate__circle-mask-1");
	const leftElement = moon.querySelector(".circle-animate__circle-svg-2");
	let phaseRight = 10;
	let phaseLeft = 0;

	// 10 - это радиус элипса.
	if (progress <= 50) {
		phaseRight = 10 - (10 * progress) / 50;

		if (prevProgress > 50) {
			setTimeout(() => {
				rightElement.style.rx = phaseRight + "px";
			}, 300);
			leftElement.style.rx = "0px";
		} else {
			rightElement.style.rx = phaseRight + "px";
			leftElement.style.rx = "0px";
		}
	} else {
		phaseLeft = (10 * progress) / 50 - 10;

		if (prevProgress <= 50) {
			rightElement.style.rx = "0px";
			setTimeout(() => {
				leftElement.style.rx = phaseLeft + "px";
			}, 200);
		} else {
			rightElement.style.rx = "0px";
			leftElement.style.rx = phaseLeft + "px";
		}
	}
}

function calcVH() {
	const vH = Math.max(
		document.documentElement.clientHeight,
		window.innerHeight || 0
	);
	const thisElement = document.querySelector(".js-mobile-menu");
	if (thisElement) {
		thisElement.style.height = `${vH}px`;
	}
}

function media(mediaQueryString, action) {
	const handleMatchMedia = (mediaQuery) => {
		if (mediaQuery.matches) {
			if (action && typeof action === "function") {
				action();
			}
		}
	};

	const mql = window.matchMedia(mediaQueryString);
	handleMatchMedia(mql);
	mql.addListener(handleMatchMedia);
}

function initMobileMenu() {
	const burger = document.querySelector(".js-burger-init");
	const mainNavParentBlock = document.querySelector(".main-nav");
	const menuListWrapper = document.querySelector(".js-mobile-menu");
	const pageElement = document.querySelector(".page");

	burger.addEventListener("click", () => {
		burger.classList.toggle("active");
		mainNavParentBlock.classList.toggle("open-menu");
		menuListWrapper.classList.toggle("open");
		pageElement.classList.toggle("page_overflow-hidden");
	});

	media("all and (max-width: 1200px)", () => {
		calcVH();
		window.addEventListener("onorientationchange", calcVH, true);
		window.addEventListener("resize", calcVH, true);
	});

	media("all and (min-width: 1201px)", () => {
		menuListWrapper.removeAttribute("style");
		window.removeEventListener("onorientationchange", calcVH, true);
		window.removeEventListener("resize", calcVH, true);
		burger.classList.remove("active");
		mainNavParentBlock.classList.remove("open-menu");
		menuListWrapper.classList.remove("open");
		pageElement.classList.remove("page_overflow-hidden");
	});
}

function fixedMenu() {
	const headerElement = document.querySelector(".page-header__head");
	let prevScrollPos = window.pageYOffset;
	const scrollThreshold = 0;

	window.onscroll = function () {
		const currentScrollPos = window.pageYOffset;

		if (currentScrollPos > scrollThreshold) {
			headerElement.classList.add("fixed");

			if (prevScrollPos > currentScrollPos) {
				headerElement.classList.remove("page-header__head_hide");
			} else {
				headerElement.classList.add("page-header__head_hide");
			}
		} else {
			headerElement.classList.remove("fixed");
			headerElement.classList.remove("page-header__head_hide");
		}

		prevScrollPos = currentScrollPos;
	};
}

function openCallbackPopup() {
	if ($(".js-open-consultation-popup").length) {
		$(".js-open-consultation-popup").magnificPopup({
			fixedContentPos: true,
			showCloseBtn: false,
			closeOnBgClick: false,
			removalDelay: 300,
			mainClass: "mfp-fade",
			items: {
				src: ".js-callback-popup",
				type: "inline",
			},
			callbacks: {
				open: function () {
					$(".js-close-popup").on("click", function () {
						$.magnificPopup.close();
					});
				},
				beforeClose: function () {
					media("all and (max-width: 1200px)", function () {
						const burger =
							document.querySelector(".js-menu-burger");
						const menu = document.querySelector(
							".page-header__wrapper-nav"
						);
						const header =
							document.querySelector(".page-header__head");
						const pageHTML = document.querySelector(".page");
						const headerElement =
							document.querySelector(".page-header");
						const firstLevelLinks = document.querySelectorAll(
							".js-menu-link_first-level"
						);
						const menuWrappers = document.querySelectorAll(
							".main-nav__submenu-wrapper"
						);
						const menuFirstLevel =
							document.querySelector(".main-nav");
						const searchInput = document.querySelector(
							".js-search-form-mobile .page-header__search-input"
						);

						burger.classList.remove("active");
						menu.classList.add("page-header__wrapper-nav_hidden");
						header.classList.remove("mobile-menu-open");
						header.classList.remove("menu-open");
						pageHTML.classList.remove("page_overflow-hidden");
						headerElement.removeAttribute("style");
						headerElement.classList.remove("mobile-menu-open");
						window.removeEventListener(
							"onorientationchange",
							calcVH,
							true
						);
						window.removeEventListener("resize", calcVH, true);
						searchInput.classList.remove("error");

						for (let firstLevelLink of firstLevelLinks) {
							firstLevelLink.classList.remove("active");
						}

						for (let menuWrapper of menuWrappers) {
							menuWrapper.removeAttribute("style");
						}

						menuFirstLevel.classList.remove("submenu-open");
					});
				},
			},
		});
	}
}

function addClassForInput() {
	const inputs = document.querySelectorAll(".form__input");

	function checkValue(element) {
		if (element.value !== "") {
			element.classList.add("form__input_not-empty");
		} else {
			element.classList.remove("form__input_not-empty");
		}
	}

	for (let element of inputs) {
		checkValue(element);

		element.addEventListener("change", () => {
			checkValue(element);
		});
	}
}

function addedMaskPhone() {
	$(".js-phone-input").mask("+7 (000) 000-00-00");
}

function validationForm() {
	const form = $(".js-form-callback");
	form.validate({
		rules: {
			user_phone: {
				minlength: 18,
			},
			presentation: {
				filesize: 1024 * 1024 * 5,
				fileType: true,
			},
		},
		messages: {
			user_phone: {
				minlength: "Введите корректный номер телефона",
			},
			user_mail: {
				email: "Введите корректный email",
			},
		},

		submitHandler: (form) => {
			let formCallback = document.forms.callback;
			let formData = new FormData(formCallback);
			let xhr = new XMLHttpRequest();

			xhr.open("POST", "/file.php");

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						let result = JSON.parse(xhr.response);
						if (result.result !== "error") {
							$(form)
								.find(".form__input")
								.val("")
								.removeClass("valid")
								.removeClass("form__input_not-empty");
							$(form).find(".form__file-text").text("");

							setTimeout(() => {
								$.magnificPopup.open({
									fixedContentPos: true,
									closeOnBgClick: true,
									showCloseBtn: false,
									items: {
										src: ".js-success-popup",
										type: "inline",
									},
									callbacks: {
										open() {
											$(".js-success-close-btn").on(
												"click",
												() => {
													$.magnificPopup.close();
												}
											);
										},
									},
								});
							}, 300);
						} else if (result.code === "email") {
							console.log("ошибка отправки");
							alert("Произошла ошибка при отправке данных");
						} else if (result.code === "file") {
							console.log("ошибка при отправке файла");
							alert("Произошла ошибка при отправке файла");
						}
					} else {
						alert("Произошла ошибка при отправке данных");
					}
				}
			};

			xhr.send(formData);
		},
	});

	$.extend($.validator.messages, {
		required: "Это поле обязательно для заполнения",
		email: "Введите корректный email",
	});
}

function animationToBlock() {
	const scrollButtons = document.querySelectorAll(".js-go-to-form");

	scrollButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const targetId = button.getAttribute("data-target");
			const targetBlock = document.getElementById(targetId);

			targetBlock.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	});
}

function initMobileConsultationBtn() {
	const btn = document.querySelector(".js-consultation-btn");
	const burger = document.querySelector(".js-burger-init");
	const mainNavParentBlock = document.querySelector(".main-nav");
	const menuListWrapper = document.querySelector(".js-mobile-menu");
	const pageElement = document.querySelector(".page");

	btn.addEventListener("click", () => {
		burger.classList.remove("active");
		mainNavParentBlock.classList.remove("open-menu");
		menuListWrapper.classList.remove("open");
		pageElement.classList.remove("page_overflow-hidden");
	});
}

function clearClassesForMobileMenu() {
	const menuLinks = document.querySelectorAll(".main-nav__link");
	const burger = document.querySelector(".js-burger-init");
	const mainNavParentBlock = document.querySelector(".main-nav");
	const menuListWrapper = document.querySelector(".js-mobile-menu");
	const pageElement = document.querySelector(".page");

	for (let menuLink of menuLinks) {
		menuLink.addEventListener("click", () => {
			if (menuListWrapper.classList.contains("open")) {
				burger.classList.remove("active");
				mainNavParentBlock.classList.remove("open-menu");
				menuListWrapper.classList.remove("open");
				pageElement.classList.remove("page_overflow-hidden");
			}
		});
	}
}

function initExpertsSlider() {
	if (document.querySelector(".js-experts-slider")) {
		const sliderWrapper = document.querySelector(
			".experts__slider-wrapper"
		);
		const fakeSliderWrapper = document.querySelector(
			".experts__slider-fake-wrapper"
		);
		const fakeElement = document.createElement("div");
		const sliderItems = sliderWrapper.querySelectorAll(
			".experts__slider-item"
		);

		if (sliderItems.length / 5 < 2) {
			sliderItems.forEach((element) => {
				const cloneElement = element.cloneNode(true);
				sliderWrapper.appendChild(cloneElement);
			});

			sliderItems.forEach((element) => {
				const cloneElement = element.cloneNode(true);
				sliderWrapper.appendChild(cloneElement);
			});
		}

		fakeElement.classList.add("experts__slider-item-fake");
		fakeElement.classList.add("swiper-slide");

		sliderItems.forEach(() => {
			const cloneElement = fakeElement.cloneNode(true);
			fakeSliderWrapper.appendChild(cloneElement);
		});

		const expertsSwiper = new Swiper(".js-experts-slider", {
			initialSlide: 2,
			slidesPerView: 5,
			touchRatio: 0.5,
			loop: true,
			slidesPerGroup: 1,
			// slideToClickedSlide: true,
			navigation: {
				prevEl: ".js-experts__prev",
				nextEl: ".js-experts__next",
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
		});

		const expertsSwiperFake = new Swiper(".js-experts-fake-slider", {
			// initialSlide: 1,
			slidesPerView: 1,
			touchRatio: 0.5,
			loop: true,
			slidesPerGroup: 1,
			// slideToClickedSlide: false,
			navigation: {
				prevEl: ".js-experts__prev",
				nextEl: ".js-experts__next",
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			on: {
				init() {
					showsSlideNumber.call(this, ".js-experts-number");
					updateMoon.call(this, ".js-experts-moon");
				},
				slideChange() {
					showsSlideNumber.call(this, ".js-experts-number");
				},
			},
		});

		expertsSwiperFake.on("slideNextTransitionStart", function () {
			const direction = "toNext";
			const curSlide = expertsSwiperFake.realIndex + 1;

			updateMoon.call(this, ".js-experts-moon", direction);
			if (curSlide === 1) {
				removeTransition(".js-experts-moon");
			}
		});

		expertsSwiperFake.on("slidePrevTransitionStart", function () {
			const direction = "toPrev";
			const curSlide = expertsSwiperFake.realIndex + 1;
			const allSlides = expertsSwiperFake.slides.length;

			if (curSlide === allSlides) {
				removeTransition(".js-experts-moon");
			}
			updateMoon.call(this, ".js-experts-moon", direction);
		});

		expertsSwiper.on("slideNextTransitionStart", function () {
			expertsSwiperFake.slideNext();
		});

		expertsSwiper.on("slidePrevTransitionStart", function () {
			expertsSwiperFake.slidePrev();
		});
	}
}

function handleFileInputChange() {
	const fileInputsWrappers = document.querySelectorAll(
		".js-custom-type-file"
	);

	fileInputsWrappers.forEach((fileInputWrapper) => {
		const fileInput = fileInputWrapper.querySelector(".form__input_file");

		fileInput.addEventListener("change", () => {
			const file = event.target.files[0];
			const inputTextElement =
				fileInputWrapper.querySelector(".form__file-text");

			inputTextElement.textContent = file.name;
			// inputTextElement.classList.remove('added-file__text_placeholder');
			fileInput.classList.remove("error");
			const error = fileInputWrapper?.querySelector("label.error");

			if (error) {
				error.remove();
			}
		});
	});
}

function initCurrentYear() {
	let currentYear = new Date().getFullYear();

	document.querySelector(".js-current-year").textContent = currentYear;
}

function initProductsAdvantagesSlider() {
	if (document.querySelector(".js-advantages-slider-init") !== null) {
		let swiperProductsAdvantages;
		const productsAdvantagesWrapper = document.querySelector(
			".products-advantages__list"
		);
		const productsAdvantagesItems =
			productsAdvantagesWrapper.querySelectorAll(
				".products-advantages__item"
			);

		if (productsAdvantagesItems.length / 3 < 2) {
			productsAdvantagesItems.forEach((element) => {
				const cloneElement = element.cloneNode(true);
				productsAdvantagesWrapper.appendChild(cloneElement);
			});
		}

		function initSwiper() {
			if (!swiperProductsAdvantages) {
				swiperProductsAdvantages = new Swiper(
					".js-advantages-slider-init",
					{
						// loop: productsAdvantagesItems.length / 3 >= 2 ? true : false,
						loop: true,
						speed: 1500,
						slidesPerView: 3,
						spaceBetween: 24,
						navigation: {
							prevEl: ".js-products-advantages__prev",
							nextEl: ".js-products-advantages__next",
						},
						keyboard: {
							enabled: true,
							onlyInViewport: true,
						},
						breakpoints: {
							120: {
								slidesPerView: "auto",
							},
							1201: {
								slidesPerView: 3,
								spaceBetween: 24,
							},
						},
					}
				);
			}
		}

		// function destroySwiper() {
		// 	if (swiperProductsAdvantages) {
		// 		swiperProductsAdvantages.destroy();
		// 		swiperProductsAdvantages = undefined;
		// 	}
		// }

		// function checkScreenSize() {
		// 	if (window.innerWidth <= 1200) {
		// 		destroySwiper();
		// 	} else {
		// 		initSwiper();
		// 	}
		// }

		// checkScreenSize();

		// window.addEventListener('resize', checkScreenSize);

		initSwiper();
	}
}

function initTabs() {
	if (document.querySelector(".tabs-block")) {
		const tabsWrapper = document.querySelector(".tabs-block");
		const tabsBtn = tabsWrapper.querySelectorAll(
			".tabs-block__list-btn-link"
		);
		const sectionTabs = tabsWrapper.querySelectorAll(
			".info-block__wrapper"
		);

		tabsBtn.forEach((element) => {
			element.addEventListener("click", (e) => {
				e.preventDefault();

				if (!element.classList.contains("active")) {
					const curHref = element.dataset.href;
					const curSection = tabsWrapper.querySelector(`#${curHref}`);

					for (let tabBtn of tabsBtn) {
						tabBtn.classList.remove("active");
					}

					element.classList.add("active");

					sectionTabs.forEach((section) => {
						section.classList.add("hidden");
					});

					curSection.classList.remove("hidden");
				}
			});
		});
	}
}

function openBioExpert() {
	const buttons = document.querySelectorAll(".js-experts-button");
	const sliderBlock = document.querySelector(".experts__slider-block");
	const pagination = document.querySelector(".experts__pagination");

	if (!buttons.length || !sliderBlock || !pagination) return;

	buttons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const targetId = btn.getAttribute("data-target");
			const targetNode = document.querySelector(`#${targetId}`);
			const clientHeight = targetNode.clientHeight;

			if (!targetNode) return;

			targetNode.classList.add("active");
			sliderBlock.style.height = `${clientHeight}px`;
			pagination.style.display = "none";
		});
	});

	const itemsBio = document.querySelectorAll(".experts__bio-item");

	if (!itemsBio.length) return;

	itemsBio.forEach((item) => {
		const buttonBio = item.querySelector(".js-experts-bio-button");

		if (!buttonBio) return;

		buttonBio.addEventListener("click", () => {
			itemsBio.forEach((itemBio) => {
				itemBio.classList.remove("active");
			});

			sliderBlock.removeAttribute("style");
			pagination.style.display = "flex";
		});
	});
}

function initPartnersSlider() {
	if (document.querySelector(".partners") !== null) {
		let swiperPartners;
		const sliderPartnersWrapper = document.querySelectorAll(".partners");

		sliderPartnersWrapper.forEach((wrapper) => {
			const partnersSliderItem = wrapper.querySelectorAll(
				".partners__slider-item"
			);
			const pagination = wrapper.querySelector(".partners__pagination");
			const titleH1 = wrapper.querySelector(
				".section__title-h1_short-margin"
			);

			if (partnersSliderItem.length > 4) {
				pagination.classList.remove("hidden");

				if (partnersSliderItem.length / 4 < 2) {
					partnersSliderItem.forEach((element, item) => {
						const cloneElement = element.cloneNode(true);
						const cloneElementWrapper = wrapper.querySelector(
							".partners__slider-wrapper"
						);

						cloneElementWrapper.appendChild(cloneElement);
					});
				}

				function initPartnersSwiper() {
					if (!swiperPartners) {
						swiperPartners = new Swiper(
							".js-partners-slider-init",
							{
								loop: true,
								speed: 1500,
								slidesPerView: 4,
								spaceBetween: 25,
								navigation: {
									prevEl: ".js-partners__prev",
									nextEl: ".js-partners__next",
								},
								keyboard: {
									enabled: true,
									onlyInViewport: true,
								},
								breakpoints: {
									120: {
										slidesPerView: "auto",
										spaceBetween: 24,
									},
									550: {
										slidesPerView: 2,
										spaceBetween: 16,
									},
									769: {
										slidesPerView: 3,
										spaceBetween: 24,
									},
									1201: {
										slidesPerView: 4,
										spaceBetween: 24,
									},
								},
							}
						);
					}
				}

				initPartnersSwiper();
			} else {
				if (titleH1 !== null) {
					titleH1.classList.remove("section__title-h1_short-margin");
				}
			}
		});
	}
}

function initHoverCaseItem() {
	const caseItems = document.querySelectorAll(".case__item");
	const caseList = document.querySelector(".case__list");
	const firstCaseItem = caseItems[0];
	const lastCaseItem = caseItems[caseItems.length - 1];

	for (let caseItem of caseItems) {
		caseItem.addEventListener("mouseenter", () => {
			for (let elementCaseItem of caseItems) {
				if (caseItem !== elementCaseItem) {
					elementCaseItem.classList.add("case__item_no-hover");

					if (caseItem === lastCaseItem) {
						firstCaseItem.classList.add(
							"case__item_no-hover_first"
						);
						caseList.classList.add("resize-left");
					} else {
						caseList.classList.add("resize-right");
					}
				} else {
					elementCaseItem.classList.add("case__item_hover");
				}
			}
		});

		caseItem.addEventListener("mouseleave", () => {
			for (let elementCaseItem of caseItems) {
				elementCaseItem.classList.remove(
					"case__item_no-hover",
					"case__item_hover",
					"case__item_no-hover_first"
				);
				caseList.classList.remove("resize-left");
				caseList.classList.remove("resize-right");
			}
		});
	}
}

function initHideShowCaseText() {
	const hideShowBtns = document.querySelectorAll(".case__hide-text");

	if (hideShowBtns.length !== 0) {
		const wrapperTextSolution = document.querySelectorAll(
			".case__text-solution"
		);
		const textWrapper = document.querySelectorAll(".case__text-wrapper");

		if (!textWrapper) {
			return;
		}

		hideShowBtns.forEach((hideShowBtn, item) => {
			hideShowBtn.addEventListener("click", () => {
				if (
					!hideShowBtn.classList.contains("show") &&
					!textWrapper[item].classList.contains(
						"case__text-wrapper_burgundy"
					)
				) {
					hideShowBtn.classList.add("show");
					if (wrapperTextSolution.length) {
						wrapperTextSolution[item].classList.add("show");
					}
					textWrapper[item].classList.add(
						"text-show",
						"case__text-wrapper_burgundy"
					);
				} else {
					hideShowBtn.classList.remove("show");
					if (wrapperTextSolution.length) {
						wrapperTextSolution[item].classList.remove("show");
					}
					textWrapper[item].classList.remove(
						"text-show",
						"case__text-wrapper_burgundy"
					);
				}
			});
		});
	}
}

function cardsAnimation() {
	let screenWidth = window.screen.width;
	$(window).resize(function () {
		screenWidth = window.screen.width;
	});

	document.addEventListener("scroll", function () {
		const profileSection = document.querySelector(".profile");
		const container = document.querySelector(".scroll-container");
		const cards = document.querySelectorAll(".profile__item");

		if (profileSection !== null && container !== null && cards !== null) {
			const containerTop = profileSection.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;

			// Высота каждой карточки

			let cardHeight = 180;
			if (
				container.classList.contains("recomendations__scroll-container")
			) {
				if (screenWidth < 1200) {
					cardHeight = 230;
				} else {
					cardHeight = 180;
				}
			}
			if (screenWidth < 769) {
				cards[0].style.transform = `translateY(0.1px)`;
				cards[1].style.transform = `translateY(0.1px)`;
				cards[2].style.transform = `translateY(0.1px)`;
			}
			if (screenWidth >= 769) {
				const profileTop = profileSection.getBoundingClientRect().top;
				if (profileTop > 0) {
					cards[0].style.transform = `translateY(0px)`;
					cards[1].style.transform = `translateY(0px)`;
					cards[2].style.transform = `translateY(0px)`;
				}
				if (profileTop <= 0) {
					const scrollProgress = Math.abs(containerTop);
					// Движение первой карточки - на 1000 пикселей
					if (scrollProgress <= 3 * cardHeight) {
						cards[0].style.transform = `translateY(-${scrollProgress}px)`;
					}

					if (scrollProgress > cardHeight) {
						cards[1].style.transform = `translateY(-${
							scrollProgress - cardHeight
						}px)`;
					}

					if (scrollProgress > 2 * cardHeight) {
						cards[2].style.transform = `translateY(-${
							scrollProgress - 2 * cardHeight
						}px)`;
					}
				}
			}
		}
	});
}

function caseSlider() {
	var init = false;
	let swiper;

	function detectDevice() {
		let screenWidth = window.screen.width;

		// Проверяем наличие элемента слайдера на странице
		if (document.querySelector(".case__slider")) {
			if (screenWidth > 768) {
				if (!init) {
					init = true;
					initSlider();
				}
			} else {
				if (init) {
					swiper.destroy();
					init = false;
				}
			}
		} else {
			// Если элемент отсутствует, инициализация не выполняется
			if (init) {
				swiper.destroy();
				init = false;
			}
		}
	}

	function initSlider() {
		swiper = new Swiper(".case__slider", {
			observer: true,
			navigation: {
				nextEl: ".swiper-button-next1",
				prevEl: ".swiper-button-prev1",
			},
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			slidesPerView: 1,
			autoHeight: true,
			loop: true,
		});

		swiper.update();
	}

	detectDevice();

	$(window).resize(function () {
		detectDevice();
	});
}

document.addEventListener("DOMContentLoaded", () => {
	addedMaskPhone();
	validationForm();
	addClassForInput();
	openCallbackPopup();
	fixedMenu();
	initMobileMenu();
	animationToBlock();
	initMobileConsultationBtn();
	initExpertsSlider();
	// submitProductForm('.js-form-dag', '.js-dag-success-wrapper', '.js-dag-title');
	handleFileInputChange();
	clearClassesForMobileMenu();
	initCurrentYear();
	initProductsAdvantagesSlider();
	initTabs();
	openBioExpert();
	initPartnersSlider();
	//initHoverCaseItem();
	//initHideShowCaseText();
	cardsAnimation();
	caseSlider();
});

$.validator.addMethod(
	"filesize",
	function (value, element, param) {
		let allSize = 0;

		$.each(element.files, function () {
			if (typeof this.size !== "undefined") {
				allSize += this.size;
			}
		});

		return this.optional(element) || allSize <= param;
	},
	"Размер файла не должен превышать 5 мегабайт"
);

$.validator.addMethod(
	"fileType",
	function (value, element) {
		let allowedExtensions = ["pdf", "pptx", "docx", "doc"];
		let fileName = element.files[0].name;
		let fileExtension = fileName.split(".").pop().toLowerCase();

		return (
			this.optional(element) ||
			$.inArray(fileExtension, allowedExtensions) !== -1
		);
	},
	"Файл не допустимого типа. Разрешены: pdf, pptx, docx, doc"
);
