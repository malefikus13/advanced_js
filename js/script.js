// Запятая в старом варианте выводилась в следствии работы "innerHTML". Дело в том, что итогом работы вот этих строк:

// const renderGoodsList = (list) => {
// let goodsList = list.map(item => renderGoodsItem(item.title, item.price));

// является объект, следующего вида:

//  ['<div class="goods-item"><h3>Shirt</h3><p>150</p></div>', 
//   '<div class="goods-item"><h3>Socks</h3><p>50</p></div>', 
//   '<div class="goods-item"><h3>Jacket</h3><p>350</p></div>', 
//   '<div class="goods-item"><h3>Shoes</h3><p>250</p></div>']

// и как мы можем увидеть, в конце каждой строчки, стоит запятая. "innerHTML" же, в свою очередь просто "выпуливал" в тело html документа, каждую строчку, как есть - целиком. Следовательно мы могли как раз наблюдать каждую из них в теле итоговой отрисовки. Если быть более точным, то как мы видим в примере объекта, имеется как раз три запятые, что и наблюдаются в теле самого документа.

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

			{ title: 'Jacket', price: 350 },
			{ title: 'Shoes', price: 250 },
			{ title: 'Jacket', price: 350 },
			{ title: 'Shoes', price: 250 },
			{ title: 'Jacket', price: 350 },
			{ title: 'Shoes', price: 250 },
		];
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

const list = new GoodsList();
list.fetchGoods();
list.render();