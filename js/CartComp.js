Vue.component('cart', {
	props: ['cartItems', 'img', 'visibility'],
	template: `<div class="cart-block" v-show="visibility">
                <p v-if="!cartItems.length">Товары в корзине отсутсвуют</p>
                <cart-item class="cart-item" v-for="item of cartItems" :key="item.id_product"
                :cart-item="item" :img="img">
                </cart-item>
            </div>`
});
Vue.component('cart-item', {
	props: ['cartItem', 'img'],
	template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Кол-во: {{cartItem.quantity}}</p>
                            <p class="product-single-price">Цена за 1 шт:<br/>{{cartItem.price}} руб.</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});