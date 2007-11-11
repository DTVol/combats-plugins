(function() {
  var plugin_znaharka = function() {
    combats_plugins_manager.getMainFrame().frameElement.attachEvent(
      "mainframe.load",
      combats_plugins_manager.get_binded_method(this,this.onloadHandler)
    );
  };

  plugin_znaharka.prototype = {
    timer: null,
    allowMoneyUsage: false,
    destStr: 3,
    destDex: 3,
    destInt: 3,
    destVit: 7,
    destIntl: 15,
    destWis: 0,
    
    toString: function() {
      return "����������������� ������������� � ������� �������";
    },
    
    getProperties: function() {
      return [
        { name:"��������� ����", value: this.destStr },
        { name:"��������� ��������", value: this.destDex },
        { name:"��������� ��������", value: this.destInt },
        { name:"��������� ������������", value: this.destVit },
        { name:"��������� ���������", value: this.destIntl },
        { name:"��������� ��������", value: this.destWis },
        { name:"������������ ������� ���������", value: this.allowMoneyUsage },
        { name:"������ ���������", value: this.Start }
      ];
    },

    onUnload: function() {
      top.clearTimeout(this.timer);
      this.timer = null;
    },

    refresh: function() {
      top.clearTimeout(this.timer);
      this.timer = null;
    },

    Start: function(a) {
      this.destStr = parseInt(a[0].value);
      this.destDex = parseInt(a[1].value);
      this.destInt = parseInt(a[2].value);
      this.destVit = parseInt(a[3].value);
      this.destIntl = parseInt(a[4].value);
      this.destWis = parseInt(a[5].value);
      this.allowMoneyUsage = a[6].value;
      this.HealRoomEnter();
    },

    getItemIndex: function(select, text) {
      for(var i=0; i<select.options.length; i++)
        if (select.options[i].innerText.substr(0,text.length)==text)
          return i;
      return -1;
    },

    setSelectedIndex: function(select, text) {
      var i = this.getItemIndex(select,text);
      if (i<0)
        return false;
      select.selectedIndex = i;
      return true;
    },
    
    HealRoomEnter: function() {
//debugger;
      var d=combats_plugins_manager.getMainFrame().document;
      if (d.location.pathname!='/heal.pl') {
        alert('������ �����, �������� ��������� � ������� �������!');
        return;
      }
      var fieldsets = combats_plugins_manager.getMainFrame().document.getElementsByTagName('fieldset');
      for(var i=0; i<fieldsets.length; i++) {
        var fieldset = fieldsets[i];
        if (fieldset.firstChild.nodeName=='LEGEND' && fieldset.firstChild.innerText==' ��������� ') {
          // ����� �����
          var matches = fieldset.innerHTML.match(/����\: (\d+)<BR>��������\: (\d+)<BR>��������\: (\d+)<BR>������������\: (\d+)<BR>(?:���������\: (\d+)<BR>)(?:��������\: (\d+)<BR>)?/);
          if (!matches)
            break;
          var from_set=false;
          if (parseInt(matches[1])>this.destStr)
            from_set=this.setSelectedIndex(fieldset.all['from'],'����');
          else if (parseInt(matches[2])>this.destDex)
            from_set=this.setSelectedIndex(fieldset.all['from'],'��������');
          else if (parseInt(matches[3])>this.destInt)
            from_set=this.setSelectedIndex(fieldset.all['from'],'��������');
          else if (parseInt(matches[4])>this.destVit)
            from_set=this.setSelectedIndex(fieldset.all['from'],'������������');
          else if (matches[5] && parseInt(matches[5])>this.destIntl)
            from_set=this.setSelectedIndex(fieldset.all['from'],'���������');
          else if (matches[6] && parseInt(matches[6])>this.destWis)
            from_set=this.setSelectedIndex(fieldset.all['from'],'��������');

          if (!from_set)
            return alert('������ ��� ������ ��� ���������');

          var to_set=false;
          if (parseInt(matches[1])<this.destStr)
            to_set=this.setSelectedIndex(fieldset.all['to'],'����');
          else if (parseInt(matches[2])<this.destDex)
            to_set=this.setSelectedIndex(fieldset.all['to'],'��������');
          else if (parseInt(matches[3])<this.destInt)
            to_set=this.setSelectedIndex(fieldset.all['to'],'��������');
          else if (parseInt(matches[4])<this.destVit)
            to_set=this.setSelectedIndex(fieldset.all['to'],'������������');
          else if (matches[5] && parseInt(matches[5])<this.destIntl)
            to_set=this.setSelectedIndex(fieldset.all['to'],'���������');
          else if (matches[6] && parseInt(matches[6])<this.destWis)
            to_set=this.setSelectedIndex(fieldset.all['to'],'��������');

          if (!to_set)
            return alert('������ ��� ������ ��� ���������');

          matches = fieldset.innerHTML.match(/� ��������� ������� ������, �� ����� �������, ������������ � ���������� �������� ��� (?:(\d+) ���|(\d+) ���)\./);
          if (matches) {
            this.timer = setTimeout('combats_plugins_manager.getMainFrame().location="/main.pl?path=o6"',1000*(matches[1]?parseInt(matches[1])*60+5:matches[2]?parseInt(matches[2])+5:60));
            return;
          }
          
          fieldset.all['movestat'].onclick=function(){};
          if (fieldset.all['to'].options[fieldset.all['to'].selectedIndex].innerText.search(/ ���������$/)>=0 || this.allowMoneyUsage)
            fieldset.all['movestat'].click();
          else
            alert('��� ��������� ��������� ������');
          return;
        }
      }
      alert('���-�� �� ������ �� ������� �������...');
    },

    HealRoomUse: function() {
    },

    onloadHandler: function() {
      try {
        var d=combats_plugins_manager.getMainFrame().document;
        if (d.location.pathname=='/heal.pl')
          this.HealRoomEnter();
        else
          this.timer = setTimeout('combats_plugins_manager.getMainFrame().location="/main.pl?path=o6"',10000);
      } catch (e) {
        combats_plugins_manager.logError(this,e);
      }
    }
  };
  return new plugin_znaharka();
})()