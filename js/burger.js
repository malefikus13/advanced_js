class Burger {
	constructor(SizeBurger, ToppingBurger, OptionalBurger, Size, Topping, Optional_1, Optional_2) {
		this.SizeBurger = {
			"Big": {
				"price": 100,
				"cal": 40,
			},
			"Small": {
				"price": 50,
				"cal": 20,
			},
		};
		this.ToppingBurger = {
			"Cheese": {
				"price": 10,
				"cal": 20,
			},
			"Salad": {
				"price": 20,
				"cal": 5,
			},
			"Potato": {
				"price": 15,
				"cal": 10,
			},
		};
		this.OptionalBurger = {
			"Spice": {
				"price": 15,
				"cal": 0,
			},
			"Sauce": {
				"price": 20,
				"cal": 5,
			}
		}
		this.Size = '';
		this.Topping = '';
		this.Optional_1 = '';
		this.Optional_2 = '';
	}

	prompt() {
		while (true) {
			this.Size = prompt('Вам "большой", или "маленький" бургер?');
			if (this.Size == "большой") {
				this.Size = "Big";
				break
			} if (this.Size == "маленький") {
				this.Size = "Small";
				break
			};
			alert("Извините, вы ввели не существующий размер. Попробуйте еще раз.");
		}

		while (true) {
			this.Topping = prompt('Выберите одну из начинок:"сыр", "салат", или "картошка"?');
			if (this.Topping == "сыр") {
				this.Topping = "Cheese";
				break
			} if (this.Topping == "салат") {
				this.Topping = "Salad";
				break
			} if (this.Topping == "картошка") {
				this.Topping = "Potato";
				break
			};
			alert("Извините, вы ввели не существующий вариант. Выберите из представленных вариантов и попробуйте еще раз.");
		}

		while (true) {
			this.Optional_1 = prompt('Желаете дополнить заказ приправами? Ответьте "да", или "нет".');
			if (this.Optional_1 == "да") {
				this.Optional_1 = "Spice";
				break
			} if (this.Optional_1 == "нет") {
				this.Optional_1 = "";
				break
			};
			alert("Извините, вы ввели не существующий вариант. Выберите либо 'да', либо 'нет' и попробуйте еще раз.");
		}

		while (true) {
			this.Optional_2 = prompt('Желаете дополнить заказ майонезом? Ответьте "да", или "нет".');
			if (this.Optional_2 == "да") {
				this.Optional_2 = "Sauce";
				break
			} if (this.Optional_2 == "нет") {
				this.Optional_2 = "";
				break
			};
			alert("Извините, вы ввели не существующий вариант. Выберите либо 'да', либо 'нет' и попробуйте еще раз.");
		}
	}

	fetchGoods() {
		this.OderList = new Array();
		// Проверяем условия по размеру
		if (this.Size == "Big") {
			this.OderList.SizeBurger = this.SizeBurger.Big;
		} else if (this.Size == "Small") {
			this.OderList.SizeBurger = this.SizeBurger.Small;
		}
		// Проверяем условия по начинке
		if (this.Topping == "Cheese") {
			this.OderList.ToppingBurger = this.ToppingBurger.Cheese;
		} else if (this.Topping == "Salad") {
			this.OderList.ToppingBurger = this.ToppingBurger.Salad;
		} else if (this.Topping == "Potato") {
			this.OderList.ToppingBurger = this.ToppingBurger.Potato;
		}
		// Проверяем условия по допам 1
		if (this.Optional_1 == "Spice") {
			this.OderList.OptionalBurger_1 = this.OptionalBurger.Spice;
		}
		// Проверяем условия по допам 2
		if (this.Optional_2 == "Sauce") {
			this.OderList.OptionalBurger_2 = this.OptionalBurger.Sauce;
		}
	}

	call(OderList) {
		let actualArr = this.OderList;

		let convert = Object.keys(actualArr).reduce(function (Object, curr) {
			Object[curr] = actualArr[curr].cal;
			return Object;
		}, {});

		this.EndCall = 0;
		for (var key in convert) {
			this.EndCall += convert[key];
		};
		console.log('Итоговая каллорийность заказа = ' + this.EndCall);
	}

	bill(OderList) {
		let actualArr = this.OderList;

		let convert = Object.keys(actualArr).reduce(function (Object, curr) {
			Object[curr] = actualArr[curr].price;
			return Object;
		}, {});

		this.EndSum = 0;
		for (var key in convert) {
			this.EndSum += convert[key];
		};
		console.log('Итоговая сумма заказа = ' + this.EndSum);
	}

	information() {
		alert('Сумма Вашего заказа = ' + this.EndSum + ' рублей. \nКаллорийность Вашего заказа составит: ' + this.EndCall + ' калорий.');
	}
}

const order = new Burger();
order.prompt();
order.fetchGoods();
order.bill();
order.call();
order.information();