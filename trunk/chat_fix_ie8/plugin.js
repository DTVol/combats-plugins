(function() {
  return {
    toString: function() {
      return "���� ���� �� � ������ ������� � IE8";
    },
    Init: function() {
//      top.frames['activeusers'].wu = 
      top.frames['activeusers'].eval(
	external.readFile(
	  combats_plugins_manager.security_id,
	  "Combats.RU",
	  "chat_fix_ie8\\activeusers.js"
	)
      );
      return this;
    }
  }.Init();
})()