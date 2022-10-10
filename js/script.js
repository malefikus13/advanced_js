class GoodsItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}

	render() {
		return `
		<div class="goods-item">
		<div class="card">
			<div class="card__img"><img src="https://via.placeholder.com/150/007fcd/ffffff/?text=Image" alt=""></div>
			<div class="card__title"><h3>${this.title}</h3></div>
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
		this.goods = [
			{ title: 'Shirt', price: 150 },
			{ title: 'Socks', price: 50 },
			{ title: 'Jacket', price: 350 },
			{ title: 'Shoes', price: 250 },
		];
	}
	//метод bill определяет суммарную стоимость всех товаров
	bill(goods) {
		let result = this.goods
			.map(item => item.price)
			.reduce((prev, curr) => prev + curr, 0);
		console.log('Сумма = ' + result);
	}

	render() {
		let listHtml = "";
		this.goods.forEach((good) => {
			const goodItem = new GoodsItem(good.title, good.price);
			listHtml += goodItem.render();
		});
		document.querySelector(".goods-list").innerHTML = listHtml;
	}
}

// класс для работы с корзиной товаров
class Basket {
	constructor() {

	}
	// удалить элемент
	deleteElem() { }
	// увеличить кол-во товара
	quantityUp() { }
	// уменьшить кол-во товара
	quantityDown() { }

}

const list = new GoodsList();
list.fetchGoods();
list.bill();
list.render();