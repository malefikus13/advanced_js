Vue.component('products', {
	data() {
		return {
			catalogUrl: '/catalogData.json',
			products: [],
			filtered: [],
			imgCatalog: 'https://via.placeholder.com/150/007fcd/ffffff/?text=Image',
		}
	},
	methods: {
		filter(value) {
			let regexp = new RegExp(value, 'i');
			this.filtered = this.products.filter(el => regexp.test(el.product_name));
		}
	},
	mounted() {
		this.$parent.getJson(`/api/products`)
			.then(data => {
				for (let el of data) {
					this.products.push(el);
					this.filtered.push(el);
				}
			});
	},
	template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
	props: ['product', 'img'],
	template: `
    <div class="product-item">
                <img :src="img" alt="img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} руб.</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
})