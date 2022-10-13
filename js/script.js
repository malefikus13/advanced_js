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

// класс для работы с корзиной товаров
class Basket {
	constructor() {

	}
	// добавить товар в корзину
	addElem() { }
	// удалить товар из корзины
	deleteElem() { }
	// получить список товаров корзины
	getElemList() { }

}

const list = new GoodsList();
list.fetchGoods();