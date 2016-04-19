# Введение #

Общение в БК - неотъемлемая часть игры. Конечно, беседы можно вести и в ICQ, и в Skype, но если уж дан чат, то почему бы им не воспользоваться? Изначально чат имеет только 5 вкладок (общий чат, системные сообщения, лог боя, свой лог, настройки боя), из которых видны только первые две. Описываемый плагин позволяет создать в чате вкладку, куда будут копироваться приватные сообщения выбранного собеседника.

# Как это работает? #

Для того, чтобы плагин начал функционировать, требуется дополнительно подключить плагин [chat\_context\_menu](chat_context_menu.md), который обеспечит расширение возможностей контекстного меню, вызываемого при клике правой кнопкой мыши на ник персонажа в чате. Вот как выглядит контекстное меню при установленных необходимых плагинах:

![http://combats-plugins.googlecode.com/svn/wiki/chat_private_tab1.gif](http://combats-plugins.googlecode.com/svn/wiki/chat_private_tab1.gif)

При клике на пункт "Приват с •••" создаётся новая вкладка, в которую переносятся все приватные сообщения из общего чата от выбранного собеседника, а в дальнейшем будут переноситься все поступающие от него приватные сообщения. Если вкладка привата не активизирована, то при поступлении нового сообщения вкладка будет подсвечена:

![http://combats-plugins.googlecode.com/svn/wiki/chat_private_tab2.gif](http://combats-plugins.googlecode.com/svn/wiki/chat_private_tab2.gif)

Закрыть вкладку можно щелчком мыши на крестик в ярлыке вкладки или двойным кликом по ярлыку вкладки. Желание закрытия нужно подвердить в открывающемся диалоге:

![http://combats-plugins.googlecode.com/svn/wiki/chat_private_tab3.gif](http://combats-plugins.googlecode.com/svn/wiki/chat_private_tab3.gif)

Дополнительно плагин имеет настраиваемые параметры, позволяющие выровнять ярлыки вкладок влево и добавляющие кнопки для прокрутки ярлыков, если тех становится больше, чем умещается в ширину чата.

## Замечания ##

  * Приват во вкладке не скроллируется автоматически. Это позволяет отследить момент, когда появились ещё непрочитанные сообщения
  * В приват-вкладку добавляются только приватные сообщения. Адресные сообщения общего чата в приват-вкладку не копируются
  * При очистке чата от сообщений содержимое приват-вкладок не уничтожается. Если текст не нужен, просто закройте вкладку
  * Плагин удобен для выделения из общего чата диалогов с одним персонажем: нет необходимости удалять системки и фразы других игроков