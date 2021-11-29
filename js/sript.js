// Меню-бургер//
const iconMenu = document.querySelector('.menu__icon'); // Ищем класс .menu__icon//
//выносим константу menuBody за пределы блока, чтобы она стала видимой для кода прокрутки
const menuBody = document.querySelector('.menu__body');

// Проверяем есть ли такой класс //
if (iconMenu) {
	//Создаем событие клик по иконке//
	iconMenu.addEventListener("click", function (e) {
		//Убираем скролл сайта при открытом бургере, обращаемся к Body//
		document.body.classList.toggle('_lock');
		//Для самой иконки добавляется или убирается класс active//
		iconMenu.classList.toggle('_active'); //active нужен для анимации иконки//
		menuBody.classList.toggle('_active'); //active нужен для выезжания меню бургера//
	});
}

// Меню-бургер//

// Прокрутка при клике
//Собираем массив, которые участвуют в навигацииб т.е массив ссылок с атрибутом data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); //с помощью поиска ищем класс с определенным атрибутом
//проверка есть ли вообще, length-возвращает число массивов
if (menuLinks.length > 0) {
	//foEach выполняет функцию возврата
	menuLinks.forEach(menuLink => {
		//вешаем click и отправляемся сразу в функцию
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	//создаем эту функцию
	function onMenuLinkClick(e) {
		// надо получить объект на который кликают, для этого создаем конст и получаем целевой объект
		const menuLink = e.target;
		// Проверяем заполнен ли атрибут и существует ли объест на который ссылается атрибут
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			// получаем в конст сам объект
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			// высчитываем положение объекта с учётом высоты шапки

			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

			//закрытие меню бургер при нажатии на прокрутку к разделу
			if (iconMenu.classList.contains('_active')) {
				//при открытом меню убираем классы, которые добавляли		
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			//заставляем скролл прокрутить к нужному месту с помощью скроллту
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			// отключает работу ссылки, а просто выполняла прокрутку
			e.preventDefault();
		}
	}
}

// Прокрутка при клике