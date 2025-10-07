// // Этап 4. Основной модуль (index.js)
// //     1. Импортируй fetchProducts и submitOrder.

// //     2. Загрузить список товаров и вывести в консоль “витрину”.

// //     3. Создать корзину, добавить туда несколько товаров (через методы класса Cart).

// //     4. Посчитать общую сумму и оформить заказ с помощью submitOrder.
// //         ◦ Используй async/await и try/catch.

// //         ◦ Выведи сообщение об успехе или ошибке.


import { fetchProducts, submitOrder } from "./api.js";
import Cart from "./cart.js";

const cart = new Cart();

const app = document.getElementById("app");
const discountBtn = document.createElement("button");
discountBtn.textContent = "Применить скидку";
discountBtn.onclick = () => {
  cart.applyDiscount();
  if (cart.isDiscount) {
    discountBtn.disabled = true;
  }
  renderCartPopup();
  
};
const cartBtn = document.createElement("button");
cartBtn.textContent = "Корзина";
if (cart.cart.length === 0) {
  cartBtn.disabled = true;
} 
app.appendChild(cartBtn);



const cartPopup = document.createElement("div");
cartPopup.className = "cart-popup";
cartPopup.style.cssText = `
  position: fixed; top: 50%; left: 50%;
  min-width: 500px; transform: translate(-50%, -50%);
  background:#f0f0f0; padding:20px; border:1px solid #000; border-radius:8px;
  z-index: 9999; display: none;
`;
app.appendChild(cartPopup);

const btnClose = document.createElement("button");
btnClose.textContent = "×";
btnClose.style.cssText = "position:absolute;top:10px;right:10px;cursor:pointer";
btnClose.onclick = () => (cartPopup.style.display = "none");
cartPopup.appendChild(btnClose);

const btnSubmit = document.createElement("button");
btnSubmit.textContent = "Оформить заказ";
btnSubmit.style.cssText = "position:absolute;bottom:10px;right:10px;cursor:pointer";
cartPopup.appendChild(btnSubmit);

const cartBody = document.createElement("div");
cartBody.style.cssText = "max-height: 50vh; overflow:auto; padding-right: 12px; margin-top: 8px;";
cartPopup.appendChild(cartBody);

function renderCartPopup() {
  cartPopup.appendChild(discountBtn);
  cartBody.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = "Корзина";
  cartBody.appendChild(title);

  if (cart.cart.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Корзина пуста";
    cartBody.appendChild(empty);
  } else {

    cart.cart.forEach(({ product, quantity }) => {
      const row = document.createElement("div");
      row.style.cssText = "display:flex; justify-content:space-between; gap:8px; padding:6px 0; border-bottom:1px dashed #ccc;";
      row.innerHTML = `
        <span>${product.name}</span>
        <span>× ${quantity}</span>
        <strong>${product.price * quantity} ₽</strong>
      `;
      cartBody.appendChild(row);
    });


    const total = document.createElement("p");
    total.style.cssText = "margin-top:10px; font-weight:700;";
    total.textContent = `Итого: ${cart.getTotal()} ₽`;
    cartBody.appendChild(total);
  }
}

btnSubmit.onclick = async () => {
  if (cart.cart.length === 0) {
    alert("Корзина пуста");
    return;
  }

  btnSubmit.disabled = true;
  const prevText = btnSubmit.textContent;
  btnSubmit.textContent = "Отправка...";

  try {
    const order = {
      items: cart.cart.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
      })),
      total: cart.getTotal(),
    };

    const msg = await submitOrder(order);
    alert(msg);
    cart.clear();
    renderCartPopup();
    cartPopup.style.display = "none";
    if (cart.cart.length === 0) {
      cartBtn.disabled = true;
      cartBtn.textContent = cart.cart.length ? `Корзина (${cart.cart.length})` : "Корзина";
    }
  } catch (e) {
    console.error(e);
    alert(e?.message || "Ошибка сети");
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = prevText;
  }
};

cartBtn.addEventListener("click", () => {
  renderCartPopup();
  cartPopup.style.display = "block";
});

function printCards(list) {
  list?.forEach((product) => {
    const { id, name, price } = product;

    const card = document.createElement("div");
    card.className = "card";
    card.style.cssText = "border:1px solid #ddd; border-radius:8px; padding:10px; margin:8px 0; max-width:480px;";

    const info = document.createElement("p");
    info.textContent = `${id}. ${name} — ${price} ₽`;
    card.appendChild(info);

    const addBtn = document.createElement("button");
    addBtn.textContent = "Добавить в корзину";
    addBtn.onclick = () => {
      cart.add(product, 1);
      cartBtn.disabled = false;
      cartBtn.textContent = cart.cart.length ? `Корзина (${cart.cart.length})` : "Корзина";
      if (cartPopup.style.display === "block") {
        renderCartPopup();
      }
    };
    card.appendChild(addBtn);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Убрать из корзины";
    removeBtn.style.marginLeft = "8px";
    removeBtn.onclick = () => {
      cart.remove(id);
      if (cart.cart.length === 0) {
        cartBtn.disabled = true;
      }
      cartBtn.textContent = cart.cart.length ? `Корзина (${cart.cart.length})` : "Корзина";
    };
    card.appendChild(removeBtn);

    app.appendChild(card);
  });
}

async function main() {
  try {
    const products = await fetchProducts();
    console.table(products.map(p => ({ id: p.id, name: p.name, price: p.price, stock: p.stock })));
    printCards(products);
  } catch (error) {
    console.error(error);
  } 
}
main();
