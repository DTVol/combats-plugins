# Введение #

Любой город БК содержит множество локаций, однако, не в любом городе можно легко найти путь к нужной. С плагином "Перемещение в заданную локацию" уже стало необязательным держать в голове карту города.

# Использование #

Загруженный плагин добавляет в панель быстрого доступа кнопку, нажатие на которую приводит к появлению выпадающего меню со списком любимых локаций текущего города и пунктом, позволяющим отобразить список всех локаций:

![http://combats-plugins.googlecode.com/svn/wiki/run_to_location1.gif](http://combats-plugins.googlecode.com/svn/wiki/run_to_location1.gif)

После клика на любую из избранных локаций начинается подсветка переходов для движения по кратчайшему маршруту. Если среди избранных нужной локации нет, можно отобразить полный список и выбрать из него:

![http://combats-plugins.googlecode.com/svn/wiki/run_to_location2.gif](http://combats-plugins.googlecode.com/svn/wiki/run_to_location2.gif)

Избранные локации могут быть добавлены в панели настроек. Каждое название локации должно располагаться на своей строке. Название локаций должно совпадать с оригинальным с точностью до буквы: никакие сокращения или изменения регистра недопустимы:

![http://combats-plugins.googlecode.com/svn/wiki/run_to_location3.gif](http://combats-plugins.googlecode.com/svn/wiki/run_to_location3.gif)

Благодаря встроенной функции создания переходов не обязательно дожидаться выхода обновления при изменении. Порядок обновления переходов:
  * убедиться, что в списке персонажей отображается правильное название локации (обновление названия проходит с задержкой до 15 секунд)
  * убедиться, что не открыт инвентарь или прочие вспомогательные страницы: должны быть видны переходы текущей локации
  * нажать кнопку "Запомнить переходы локации"
  * после того, как завершены обновления переходов всех нуждающихся в обновлении локаций, нажатием кнопки "Экспорт переходов в файл" создаётся файл с именем вида "pathes\_XXXXX.js.new", который позже можно переименовать, удалив ".new" из имени. Перед переименованием рекомендуется создать резервную копию текущего файла переходов

# Замечания #

  * Плагин не выполняет переходы самостоятельно. Он только подсказывает направление
  * У каждого города - свои избранные локации. Придётся настраивать их во всех городах
  * Обновлять переходы нужно с предельной аккуратностью, если обновляется более одной локации
  * Плагин автоматически не просыпается в общежитии и не проходит через Бугага в Emeraldscity
  * "Кратчайший маршрут" с точки зрения плагина - это маршрут с минимальным количеством переходов, а не с минимальным временем прохождения