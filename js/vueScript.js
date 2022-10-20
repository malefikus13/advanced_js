const API_URL_VUE = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		isVisibleCart: false,
		searchLine: '',
		basketItems: [],
		goodImage: "https://via.placeholder.com/150/007fcd/ffffff/?text=Image",
		// products: [],
	},

	methods: {
		makeGETRequest(url, callback) {
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
		},

		cleanText() {
			this.searchLine = '';
		},

		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => {
					console.log(error);
				});
		},

		addProduct(item) {
			this.getJson(`${API_URL_VUE}/addToBasket.json`)
				.then(data => {
					console.log('Товар добавили');
					console.log(data);
					if (data.result === 1) {
						let find = this.basketItems.find(el => el.id_product === item.id_product);
						if (find) {
							find.quantity++;
						} else {
							let prod = Object.assign({ quantity: 1 }, item);
							this.basketItems.push(prod);
						}
					} else {
						alert('Error');
					}
				});
		},

		remove(item) {
			this.getJson(`${API_URL_VUE}/deleteFromBasket.json`)
				.then(data => {
					console.log('Товар удалили');
					console.log(data);
					if (data.result === 1) {
						if (item.quantity > 1) {
							item.quantity--;
						} else {
							this.basketItems.splice(this.basketItems.indexOf(item), 1);
						}
					}
				});
		},

		filterGoods() {
			const regexp = new RegExp(this.searchLine, 'i');
			this.filteredGoods = this.goods.filter(good =>
				regexp.test(good.product_name));


			console.log('В форму ввели: ' + this.searchLine);
			console.log('Регулярка для поиска: ' + regexp);
			console.log(`Внутри "goods" находится:`);
			console.log(this.goods);
			console.log(`Внутри "filteredGoods" находится:`);
			console.log(this.filteredGoods);
		}

	},

	mounted() {
		this.makeGETRequest(`${API_URL_VUE}/catalogData.json`, (goods) => {
			this.goods = JSON.parse(goods);
			this.filteredGoods = JSON.parse(goods);
			// console.log(this.goods);
			// console.log(this.filteredGoods);
		});
	},

	// created() {
	// 	this.getJson(`${API_URL_VUE}/catalogData.json`)
	// 		.then((data) => {
	// 			console.log(data);
	// 			this.goods = data;
	// 			console.log(data);
	// 		});
	// },

});
