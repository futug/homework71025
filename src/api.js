// Этап 3. Асинхронная имитация API
// Создай модуль api.js, который экспортирует асинхронную функцию fetchProducts():
// export async function fetchProducts() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(products), 1000);
//   });
// }
// И функцию submitOrder(order) — имитация POST-запроса с вероятностью ошибки:
// export async function submitOrder(order) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       Math.random() > 0.2 ? resolve("Заказ оформлен!") : reject("Ошибка сети");
//     }, 700);
//   });
// }

import { products } from "./store.js";

export async function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
}

export async function submitOrder(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve("Заказ оформлен!") : reject("Ошибка сети");
    }, 700);
  });
}