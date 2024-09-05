const products = {
	data: [
		{
			id: 0,
			productName: 'Chicken Burger',
			category: 'Food',
			image: './src/assets/images/gastro/gasto-item-chicken-buger.jpg',
			price: 10.0,
			discount: false,
		},
		{
			id: 1,
			productName: 'Chicken Wings',
			category: 'Food',
			image: './src/assets/images/gastro/gasto-item-chicken-wings.jpg',
			price: 9.0,
			discount: false,
		},
		{
			id: 2,
			productName: 'French Fries',
			category: 'Food',
			image: './src/assets/images/gastro/gasto-item-french-fries.jpg',
			price: 12.0,
			discount: false,
		},
		{
			id: 3,
			productName: 'Beer',
			category: 'Drinks',
			image: './src/assets/images/gastro/gasto-item-beer.jpg',
			price: 2.2,
			discount: false,
		},
		{
			id: 4,
			productName: 'Milkshake',
			category: 'Drinks',
			image: './src/assets/images/gastro/gasto-item-milkshake.jpg',
			price: 1.8,
			discount: true,
		},
		{
			id: 5,
			productName: 'Fried Chicken',
			category: 'Food',
			image: './src/assets/images/gastro/gasto-item-fried-chicken.jpg',
			price: 8.0,
			discount: false,
		},
	],
};

const menuProducts = document.getElementById('menuProducts');
let cart = [];
let total = 0;
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelectorAll('.quantity');

for (let i of products.data) {
	const discountSection = i.discount
		? `
      <p class="discount-offer">20% OFF</p>
      <h4 class="new-price">$ ${(i.price * 0.8).toFixed(2)}</h4>
    `
		: '';

	const cardHTML = `
    <div class="card ${i.category.toLowerCase()} hide" data-id="${i.id}">
      <div class="card__image-container">
        <img loading="lazy"src="${i.image}" alt="${i.productName}" />
      </div>
      <div class="container">
        <h3 class="product-name">${i.productName.toUpperCase()}</h3>
        <div class="cart__container">
          <h4 class="${i.discount ? 'discount' : ''}">$ ${i.price.toFixed(
		2
	)}</h4>
          ${discountSection}
          <button class="btn cart-content">ADD</button>
        </div>
      </div>
    </div>
  `;
	menuProducts.innerHTML += cardHTML;
}

menuProducts.addEventListener('click', (event) => {
	let positionClick = event.target;
	if (positionClick.classList.contains('cart-content')) {
		let cardElement = positionClick.closest('.card');
		let id_product = cardElement.dataset.id;
		addToCart(id_product);
	}
});

const addToCart = (product_id) => {
	let positionThisProductInCart = cart.findIndex(
		(value) => value.product_id == product_id
	);

	let product = products.data.find((item) => item.id == product_id);
	let finalPrice = product.discount ? product.price * 0.8 : product.price;
	let productPriceWithIVA = finalPrice * 1.21;

	if (cart.length <= 0) {
		cart = [
			{
				product_id: product_id,
				quantity: 1,
			},
		];
		total += productPriceWithIVA;
	} else if (positionThisProductInCart < 0) {
		cart.push({
			product_id: product_id,
			quantity: 1,
		});
		total += productPriceWithIVA;
	} else {
		cart[positionThisProductInCart].quantity += 1;
		total += productPriceWithIVA;
	}

	addCartToHTML();
};

const updateQuantity = (product_id, amount) => {
	let positionThisProductInCart = cart.findIndex(
		(value) => value.product_id == product_id
	);

	if (positionThisProductInCart >= 0) {
		let product = products.data.find((item) => item.id == product_id);

		let finalPrice = product.discount ? product.price * 0.8 : product.price;
		let productPriceWithIVA = finalPrice * 1.21;

		if (amount > 0) {
			total += productPriceWithIVA;
		} else if (amount < 0) {
			total -= productPriceWithIVA;
		}

		cart[positionThisProductInCart].quantity += amount;

		if (cart[positionThisProductInCart].quantity <= 0) {
			cart.splice(positionThisProductInCart, 1);
		}

		addCartToHTML();
	}
};

const addCartToHTML = () => {
	listCartHTML.innerHTML = '';
	let totalQuantity = 0;

	if (cart.length > 0) {
		cart.forEach((item) => {
			totalQuantity += item.quantity;

			let newItem = document.createElement('div');
			newItem.classList.add('item');
			newItem.dataset.id = item.product_id;

			let positionProduct = products.data.findIndex(
				(value) => value.id == item.product_id
			);

			let info = products.data[positionProduct];

			listCartHTML.appendChild(newItem);
			newItem.innerHTML = `
				<div class="image">
					<img loading="lazy"src="${info.image}" alt="${info.productName}">
				</div>
				<div class="name">
					${info.productName}
				</div>
				<div class="totalPrice">$${(info.price * item.quantity).toFixed(2)}</div>
				<div class="quantity">
					<span class="minus" data-id="${item.product_id}">-</span>
					<span class="item-quantity">${item.quantity}</span>
					<span class="plus" data-id="${item.product_id}">+</span>
				</div>
			`;
		});
	} else {
		listCartHTML.innerHTML = `
			<div class="empty-cart-message">
				<p>Empty Cart</p>
			</div>
		`;
		total = 0;
	}

	iconCartSpan.forEach((span) => {
		span.innerText = totalQuantity;
	});
	document.querySelector('.total-value').innerText = `Total: $${Math.max(
		total,
		0
	).toFixed(2)}`;

	document.querySelectorAll('.minus').forEach((button) => {
		button.addEventListener('click', (event) => {
			let productId = event.target.dataset.id;
			updateQuantity(productId, -1);
		});
	});

	document.querySelectorAll('.plus').forEach((button) => {
		button.addEventListener('click', (event) => {
			let productId = event.target.dataset.id;
			updateQuantity(productId, 1);
		});
	});
};

export function filterProduct(value) {
	let buttons = document.querySelectorAll('.menu__button');
	buttons.forEach((button) => {
		if (value.toUpperCase() === button.innerText.toUpperCase()) {
			button.classList.add('active');
		} else {
			button.classList.remove('active');
		}
	});

	let elements = document.querySelectorAll('.card');
	elements.forEach((element) => {
		if (value === 'all') {
			element.classList.remove('hide');
		} else {
			if (element.classList.contains(value.toLowerCase())) {
				element.classList.remove('hide');
			} else {
				element.classList.add('hide');
			}
		}
	});
}

window.onload = () => {
	filterProduct('all');
};
