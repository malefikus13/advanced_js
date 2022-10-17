const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
	return new Promise(function (resolve, reject) {
		var xhr;
		if (window.XMLHttpRequest) {
			// Chrome, Mozilla, Opera, Safari
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			// Internet Explorer
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				callback(xhr.responseText);
			}
		};

		xhr.open("GET", url, true);
		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve(xhr.response);
			} else {
				reject({
					status: xhr.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function () {
			reject({
				status: xhr.status,
				statusText: xhr.statusText
			});
		};
		xhr.send();
	});
}

class GoodsItem {
	constructor(product_name, price) {
		this.product_name = product_name;
		this.price = price;
	}

	render() {
		return `
		<div class="goods-item">
		<div class="card">
			<div class="card__img"><img src="https://via.placeholder.com/150/007fcd/ffffff/?text=Image" alt=""></div>
			<div class="card__title"><h3>${this.product_name}</h3></div>
			<div class="card__price"><p>${this.price}</p></div>
			<div class="card__button"><button>Добавить</button></div>
		</div>
	</div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}

	fetchGoods() {
		return new Promise((resolve, reject) => {
			const getGoods = makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
				this.goods = JSON.parse(goods);
			});

			if (getGoods) {
				resolve(getGoods);
			} else {
				reject(new Error("Что-то пошло не так"));
			}
		})
			.then(
				// render
				(data) => {
					let listHtml = "";
					this.goods.forEach((data) => {
						const goodItem = new GoodsItem(data.product_name, data.price);
						listHtml += goodItem.render();
					});
					document.querySelector(".goods-list").innerHTML = listHtml;
				},
				(error) => {
					// Если не сработало, то выводим ошибку
					console.log(error);
				}
			)
			.then((data) => {
				// определяет суммарную стоимость всех товаров
				let result = this.goods
					.map(item => item.price)
					.reduce((prev, curr) => prev + curr, 0);
				console.log('Сумма = ' + result);
			})
	}
}


///////////////////////////////////////////////////////////
// Не совсем понятно, что реализовывать, если по факту нету самого объекта и места для размещения объекта. Пишу обстрактно. Предполагая, что ряд момент якобы у нас имеется. Не уверен, что в такой реализации оно будет работать, но предполагаю. Конечно, когда по факту получу необходимые инструменты и задачи по выводу всего это добра, то возможно реализация будет отличаться, или корректироваться. В любом случае, с учетом абстрактности задачи, прошу не судить строго :)
///////////////////////////////////////////////////////////


// класс для работы с товарами в корзине
class BasketItem {
	constructor(product_name, price) {
		this.product_name = product_name;
		this.price = price;
	}
	render() {
		return `
		<div class="goods-item">
		<div class="card">
			<div class="card__img"><img src="https://via.placeholder.com/150/007fcd/ffffff/?text=Image" alt=""></div>
			<div class="card__title"><h3>${this.product_name}</h3></div>
			<div class="card__price"><p>${this.price}</p></div>
			<div class="card__button"><button>Добавить</button></div>
		</div>
	</div>`;
	}
}
// класс для работы с корзиной товаров
class Basket {
	constructor() {
		this.basket = [];
		this.getBasket()
			.then((data) => {
				this.Goods = data;
				this.renderBasket();
			});
		this.deleteBasket();
		this.addToBasket();
	}

	renderBasket() {
		const basketWrapp = document.querySelector(this.container);
		const basketSum = document.querySelector('.sum');
		const basketQuant = document.querySelector('.quantity');
		for (let item of this.basketGoods.contents) {
			const basketCard = new BasketItem(item);
			this.allBasketProducts.push(basketCard);
			basketWrapp.insertAdjacentHTML('beforeend', basketCard.render());
		}
		basketSum.insertAdjacentHTML('beforeend', `Общая стоимость: ${this.basketGoods.amount} \u20bd `);
		basketQuant.insertAdjacentHTML('beforeend', ` Количество товаров: ${this.basketGoods.countGoods} шт.`);
	}

	getBasket() {
		return fetch(`${API_URL}/Basket.json`) // Как пример расположения массива товаров.
			.then((response) => response.json())
			.catch((err) => console.log(err));
	}

	deleteFromBasket() {
		fetch(`${API_URL}/Delete.json`) // Как пример расположения массива товаров что надо удалить.
			.then((response) => { return response.json(); })
			.then((data) => {
				if (data.result == 1) {
					const clearBtn = document.querySelectorAll('.clearBasket'); // предположительная кнопка очистки корзины.
					clearBtn.forEach(item => {
						item.addEventListener('click', () => {
							item.removeChild(item);
						});
					});
				} else {
					return;
				}
			})
			.catch((err) => console.log(err));
	}

	addBasket() {
		fetch(`${API_URL}/addToBasket.json`)// Как пример расположения массива товаров что надо добавить.
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.result == 1) {
					const buy = document.querySelectorAll('.buy');
					buy.forEach(item => {
						item.addEventListener('click', () => {
							const Goods = document.querySelector('.goodsBasket'); // предполагаемая корзина\поле для отображения добавленных товаров
							Goods.append(item.parentNode);
							item.classList.toggle('buy');
							item.classList.add('buy__del');
							item.innerHTML = 'Удалить из корзины';
						});
					});
				} else {
					return;
				}
			})
			.catch((err) => console.log(err));
	}
}
///////////////////////////////////////////////////////////

const list = new GoodsList();
list.fetchGoods();