(function() {
  function plugin_chat_filter() {
    this.Init();
    var clear = function(match,eventObj) {
//      alert('clear: '+match[0]);
      eventObj.mess = '';
    }
    var mark = function(match,eventObj) {
//      alert('mark: '+match[0]);
      eventObj.mess = 
        eventObj.mess.substr(0,match.index)+
        '<font style="background:yellow">'+
        match[0]+
        '</font>'+
        eventObj.mess.substr(match.lastIndex);
      var volume=top.frames['bottom'].soundvol;
      top.frames['bottom'].window.document.Sound.SetVariable("Volume", (volume*50));
      top.frames['bottom'].window.document.Sound.SetVariable("Sndplay",1);
    }
    this.addFilter(
      { filter:/<font class=sysdate>\d+\:\d+<\/font>\s*(?:��� ������������\:  <SPAN>.*?<\/SPAN>|\[<SPAN>.*?<\/SPAN>\] ������������ ���|\[<SPAN>.*?<\/SPAN>\] ��������(?:��|���) )/i,
        handler:clear
      }
    );
    this.addFilter(
      { filter:/((?:���.{2,4}|��[��]��(?:[��]�|�)|[^>\s]*���.{2,6}|(?:��|���)(�[���]�(?:[��]�|��))|���)\s+(?:���[��]\S+|����|���|���|(����\S+)?\s*(?:��\S+|������\S+|�����\S+|���\S+|����\S*)))/i,
        handler:mark
      }
    );
  }

  plugin_chat_filter.prototype = {
    filters: {},
    toString: function() {
      return "������ ���������";
    },
    Init: function() {
      combats_plugins_manager.attachEvent(
        'onmessage',
        combats_plugins_manager.get_binded_method(this,this.processMessage));
    },
    addFilter: function(filter) {
      var s;
      do {
        s = 'a'+Math.random();
      } while(s in this.filters);
      this.filters[s] = filter;
      return s;
    },
    removeFilter: function(s) {
      if (s in this.filters)
        delete this.filters[s];
    },
    processMessage: function(eventObj) {
      if (eventObj.mess=='')
        return;
      var match;
      for(var i in this.filters) {
        match = eventObj.mess.match(this.filters[i].filter);
        if (match)
          this.filters[i].handler(match,eventObj);
      }
    }
  };

  return new plugin_chat_filter();
})()