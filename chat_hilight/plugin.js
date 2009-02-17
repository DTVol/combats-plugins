(function(){
  plugin_hilight = function(){
    this.setProperties([
      { value: this.load('clearRegexp','') },
      { value: this.load('markRegexp','') }
    ]);
  }

  plugin_hilight.prototype = {
    clearRegexp: /^$/, // /<font class=sysdate>\d+\:\d+<\/font>\s*(?:��� ������������\:  <SPAN>.*?<\/SPAN>|\[<SPAN>.*?<\/SPAN>\] ������������ ���|\[<SPAN>.*?<\/SPAN>\] ��������(?:��|���) )/i,
    markRegexp: /^$/, // /((?:���.{2,4}|��[��]��(?:[��]�|�)|[^>\s]*���.{2,6}|(?:��|���)(�[���]�(?:[��]�|��))|���)\s+(?:���[��]\S+|����|���|���|(����\S+)?\s*(?:��\S+|������\S+|�����\S+|���\S+|����\S*)))/i,
    clearFilterId: '',
    markFilterId: '',
    toString: function() {
      return "��������� � �������� ���������";
    },
    getProperties: function() {
      return [
        { name: "RexExp ��������", value: this.clearRegexp.source, style:"width:100%"  },
        { name: "RexExp ���������", value: this.markRegexp.source, style:"width:100%" }
      ];
    },
    setProperties: function(a) {
      try {
        this.clearRegexp = this.clearRegexp.compile(a[0].value,'i');
        this.markRegexp = this.markRegexp.compile(a[1].value,'i');
        this.loadFilters();
        this.save('clearRegexp',a[0].value);
        this.save('markRegexp',a[1].value);
      } catch (e) {
        alert('������ ��������� ��������: "'+e.message+'"');
      }
    },
    load: function(key,def_val){
      return external.m2_readIni(combats_plugins_manager.security_id,"Combats.RU","chat_hilight\\settings.ini",top.getCookie('battle'),key,def_val);
    },
    save: function(key,val){
      external.m2_writeIni(combats_plugins_manager.security_id,"Combats.RU","chat_hilight\\settings.ini",top.getCookie('battle'),key,val);
    },
    loadFilters: function() {
      var filterPlugin = combats_plugins_manager.plugins_list['chat_filter'];
      if (!filterPlugin) {
        throw new Error('��� ��������� ������ ����� ������ chat_filter');
      }
      if (this.clearFilterId!='')
        filterPlugin.removeFilter(this.clearFilterId);
      this.clearFilterId = filterPlugin.addFilter(
        { filter:this.clearRegexp,
          handler:this.clear
        }
      );
      if (this.markFilterId!='')
        filterPlugin.removeFilter(this.markFilterId);
      this.markFilterId = filterPlugin.addFilter(
        { filter:this.markRegexp,
          handler:this.mark
        }
      );
    },
    clear: function(match,eventObj) {
      eventObj.mess = '';
    },
    mark: function(match,eventObj) {
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
  }
  return new plugin_hilight();
})()