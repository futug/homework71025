export const products = [
  { id: 1, name: "Смартфон X", price: 40000, category: "phones", stock: 5 },
  { id: 2, name: "Ноутбук Pro", price: 90000, category: "laptops", stock: 3 },
  { id: 3, name: "Наушники Air", price: 15000, category: "audio", stock: 10 }
];
// Задачи:
//     1. Написать функцию findProductByName(name) — поиск по подстроке, без учёта регистра.

//     2. Написать функцию getProductsByCategory(category) — фильтрация товаров.

//     3. Функцию getTotalStock() — возвращает общее количество всех единиц товара.

//     4. Функцию addProduct(newProduct) — добавляет товар (проверяет, что id уникален).
// Если id уже есть — выбросить ошибку (try/catch должен быть продемонстрирован при вызове).

export function findProductByName(name) {
  return products.filter((product) => product.name.trim().toLowerCase().includes(name.toLowerCase()));
}

export function getProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

export function getTotalStock() {
  return products.reduce((total, product) => total + product.stock, 0);
}

export function addProduct(newProduct) {
  if (products.some((product) => product.id === newProduct.id)) {
    throw new Error("Product with this id already exists");
  }
  products.push({
    ...newProduct });
}


