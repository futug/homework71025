
// Создай модуль cart.js с классом Cart, который:
//     • хранит массив объектов { product, quantity };
//     • имеет методы:
//         ◦ add(product, quantity) — добавляет в корзину (увеличивает количество, если товар уже есть);
//         ◦ remove(productId) — удаляет товар;
//         ◦ getTotal() — возвращает общую стоимость;
//         ◦ clear() — очищает корзину;
//         ◦ print() — выводит в консоль список товаров и общую сумму в человекочитаемом виде.

class Cart {
  constructor() {
    this.cart = [];
    this.isDiscount = false;
  }
  add(product, quantity) {
    const existingProduct = this.cart.find(item => item.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
  }
  remove(productId) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
  clear() {
    this.cart = [];
    this.isDiscount = false;
  }

  print() {
    console.log("Корзина:");
    this.cart.forEach(item => {
      console.log(`${item.product.name} - ${item.quantity} шт. - ${item.product.price * item.quantity} руб.`);
    });
    console.log(`Общая сумма: ${this.getTotal()} руб.`);
  }

  applyDiscount() {
    this.cart.forEach(item => {
      item.product.price = (item.product.price * 0.9).toFixed(2);
      this.isDiscount = !this.isDiscount;
    });
  }
}

export default Cart;