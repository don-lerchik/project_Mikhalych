# Тестовое задание 

В исходных данных есть пример html-шаблона товара. 
Необходимо отобразить на странице список товаров в момент загрузки страницы. Данные для каждого товара можно получить из файла product.json.

Основные требование и функционал:
У кнопки купить должен быть атрибут «data-product-id» с уникальным «id» товара.
Для картинок использовать строковый модификатор  ‘_220x220_1’. (т.е. этот модификатор должен появиться перед расширением файла)
По клику изменяется количество товара. 
Переключение стоимость товара 

Данные для цен можно так получить из product.json. 

Например:
priceGoldAlt - цена по карте за м.кв., 
priceRetailAlt - цена стандартная за м.кв.
priceGold - цена по карте за упаковку
priceRetail - цена стандартная за упаковку

Если какие-то данные отсутствуют в product.json, можно использовать любые случайные значения. 

⦁	Нужно оценить срок.
⦁	Можно использовать любые технологии

Требования к браузерам:
⦁	MS Internet Explorer 10+,
⦁	Google Chrome 35+,
⦁	Mozilla Firefox 30+,
⦁	Opera 20+,
⦁	Safari 8+.

# Запуск
⦁	Установить все зависимости (npm install)
⦁	Собрать проект (npm run-script build)
⦁	Запустить проект (node . --server , можно так же указать на каком хосте)
