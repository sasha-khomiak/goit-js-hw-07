// ПРИМІТКА ЩОДО ПЕРШОЇ СВІТЛИНИ! ЛІНК НЕКОРЕКТНИЙ. АЛЕ КОД ПРАЦЮЄ!!!

// імпортуємо масив обʼєктів з даними картинок
import { galleryItems } from "./gallery-items.js";

// консолимо масив обʼєктів з даними картинок
// перевірка чи отримали дані з іншого файлу
console.log(galleryItems);

//-------------РОЗМІТКА-------------//

// створюємо обʼєкт галереї куди вставлятимемо фотки
const gallery = document.querySelector(".gallery");

// Викликаємо функцію створення галереї
createGalleryItems();

// Функція створення галереї
function createGalleryItems() {
  //створюємо порожній масив в якому зберігатимемо зібрані теги лінк-картинка
  const items = [];

  // функція перебору вхідних даних і формування розмітки
  galleryItems.forEach((elment) => {
    // деструктуризація отриманих даних
    const { preview, original, description } = elment;

    // створюємо айтем div.gallery__item
    const item = document.createElement("div");
    item.classList.add("gallery__item");

    // створюємо лінк і прописуємо в нього оригінальне зображення і class
    const itemLink = document.createElement("a");
    itemLink.href = original;
    itemLink.classList.add("gallery__link");

    // стоврюємо зображення і визначаємо атрибути src, alt, data-source і class
    const image = document.createElement("img");
    image.src = preview;
    image.alt = description;
    image.classList.add("gallery__image");
    image.setAttribute("data-source", original);

    // створене зобаження поміщаємо в створений лінк (останній елемент)
    itemLink.append(image);

    //створені лінк-фотка поміщаємо в div
    item.append(itemLink);

    //створенbий div пушимо в масив items
    items.push(item);
  });

  // вставляємо розмічені елементи галереї в тег галереї (використовуємо рест)
  gallery.append(...items);
}

//-------------ОБРОБНИКИ ПОДІЙ-------------//

// чіпляємо слухача події на клік із функцією отримання посилання
gallery.addEventListener("click", showImage);

// функція отримання  посилання на велике фото і його показування
function showImage(event) {
  //якщо натиснули не на картинку, то нічого не робимо і виходимо
  if (event.target.nodeName !== "IMG") {
    return;
  }

  // якщо таки натиснули на картинку, скасовуємо стандартну реакцію браузера
  event.preventDefault();

  // Дізнаємося посилання на велике оригінальне зображення
  // const fullSizeImageLink = event.target.parentNode.href;
  // або ось так
  const fullSizeImageLink = event.target.dataset.source;

  // показуємо наше встпливне модальне вікно з фоткою
  const instance = basicLightbox.create(` <img src="${fullSizeImageLink}">`);

  // показуємо картинку
  instance.show();

  // додаємо слухача на натискання кнопки Escape і прибирання картинки
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  });
}
