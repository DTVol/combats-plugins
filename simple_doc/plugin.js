(function (){
  var plugin_simple_doc = function() {
    this.loadVIP();
    this.loadBlackList();
    top.combats_plugins_manager.attachEvent('onmessage',
      top.combats_plugins_manager.get_binded_method(this,this.onmessage));
    this.oppositeAlign = this.load('oppositeAlign','0');
    this.fullSysMessage = this.load('fullSysMessage','true').toLowerCase()=='true';
  };

  plugin_simple_doc.prototype = {
    exchangeDetected: false,
    'debugger': false,
    lastCast: new Date(1900,0,1),
    Active: false,
    aligns: ['-1','1','3'],
    Healing: null,
    sender: null,
    cancelTimer: 0,
    lastOnlineRefreshed: 0,
    oppositeAlign: 1,
    allowNoTarget: false,
    minLevel: 9,
    fullSysMessage: true,
    toString: function() {
      return "������� ������";
    },
    getProperties: function() {
      return [
        { name:"�������", value:this.Active },
        { name:"���������� � �������:", 
          value: {
            'length': 3,
            0: '������ ����', 
            1: '�������', 
            2: '�����', 
            'selected': this.oppositeAlign
          } 
        },
        { name:"�������� ����������� �����", value:this.allowNoTarget },
        { name:"׸���� ������", value:this.load('BlackList','')||'' },
        { name:"����������� �� �������� ��������", value:!this.fullSysMessage }
      ];
    },
    load: function(key,def_val){
      return external.m2_readIni(combats_plugins_manager.security_id,"Combats.RU","simple_doc\\settings.ini",top.getCookie('battle'),key,def_val);
    },
    save: function(key,val){
      external.m2_writeIni(combats_plugins_manager.security_id,"Combats.RU","simple_doc\\settings.ini",top.getCookie('battle'),key,val);
    },
    setProperties: function(a) {
      this.Active = a[0].value;
      this.oppositeAlign=a[1].value.selected;
      this.allowNoTarget=a[2].value;
      this.save('oppositeAlign',this.oppositeAlign);
      this.save('BlackList',a[3].value);
      this.fullSysMessage = !a[4].value;
      this.save('fullSysMessage',this.fullSysMessage);
      this.loadBlackList();
    },
    addBlackList: function(a) {
      this.addPersToBlackList(a[3].value);
    },
    addVIP: function(a) {
      this.addPersToVIP(a[5].value);
    },
    loadBlackList: function() {
      var blacklist = this.load('BlackList','');
      this.blacklist = {};
      if (blacklist!='') {
        blacklist = blacklist.split(';');
        for(var i=0; i<blacklist.length; i++) {
          this.blacklist[blacklist[i]] = true;
        }
      }
    },
    saveBlackList: function() {
      var blacklist = [];
      for (var name in this.blacklist) {
        blacklist.push(name);
      }
      blacklist = blacklist.join(';');
      this.save('BlackList',blacklist);
    },
    addPersToBlackList: function(a) {
      this.blacklist[a] = true;
      this.saveBlackList();
    },
    loadVIP: function() {
      var vip_customers = this.load('VIP','');
      this.vip_customers = {};
      if (vip_customers!='') {
        vip_customers = vip_customers.split(';');
        for(var i=0; i<vip_customers.length; i++) {
          var customer = vip_customers[i].split(',');
          if (customer.length>1)
            this.vip_customers[customer[0]] = parseInt(customer[1]);
        }
      }
    },
    saveVIP: function() {
      var vip_customers = [];
      for (var name in this.vip_customers) {
        vip_customers.push(name+','+this.vip_customers[name]);
      }
      vip_customers = vip_customers.join(';');
      this.save('VIP',vip_customers);
    },
    addPersToVIP: function(patient) {
      var first = !(patient in this.vip_customers);
      if (first) {
        this.vip_customers[this.Healing.patient] = 1;
      } else {
        this.vip_customers[this.Healing.patient]++;
      }
      this.saveVIP();
      return !first;
    },
    refreshChat: function() {
      if (!this.sender)
        this.sender = combats_plugins_manager.plugins_list['chat_sender'];
      if (this.sender)
        this.sender.refreshChat();
    },
    sendAutoResponse: function(message) {
      if (!this.sender)
        this.sender = combats_plugins_manager.plugins_list['chat_sender'];
      if (this.sender)
        this.sender.send(message);
    },
    onuserinfo: function(eventObj) {
      if (eventObj.name==this.Healing.patient) {
        clearTimeout(this.userinfoTimer);
        combats_plugins_manager.detachEvent('onuserinfo',this.onuserinfo_handler);
//        this.sendAutoResponse('private ['+this.Healing.partner+'] ����� (���������)');
        if (this.Healing.patient==this.Healing.partner) {
          if (parseInt(eventObj.level)<this.minLevel && eventObj.klan=='') {
            this.sendAutoResponse('private ['+this.Healing.partner+'] ���-�� ���� ��� ��� �� �������� :nono: (���������)');
            this.Healing = null;
            return;
          }
        }
        if (eventObj.align.substr(0,1)==this.aligns[this.oppositeAlign]) {
          this.sendAutoResponse('private ['+this.Healing.partner+'] � �� ���� ���������� ���������� ���������� :nono: (���������)');
          this.Healing = null;
          return;
        }
        if (eventObj.align=='2') {
          this.sendAutoResponse('private ['+this.Healing.partner+'] � �� �������� ������ � ���������� :nono: (���������)');
          this.Healing = null;
          return;
        }
        this.mainframeload_handler = combats_plugins_manager.get_binded_method(this,this.heal,1);
        combats_plugins_manager.attachEvent('mainframe.load',this.mainframeload_handler);
        combats_plugins_manager.getMainFrame().location = '/main.pl?edit=5&filter=���� ���������&'+Math.random();
      }
    },
    heal: function(step) {
      if (combats_plugins_manager.getMainFrame().location.pathname=='/exchange.pl') {
        if (!this.exchangeDetected) {
          this.sendAutoResponse('private ['+this.Healing.partner+'] � ������ � ���������. ���������� - �������, �������� (���������)');
          this.exchangeDetected = true;
        }
        var centerElements = combats_plugins_manager.getMainFrame().document.getElementsByTagName('center');
        if (centerElements.length==0 || centerElements[0].innerText=='�������� ���������/�������� ������� ������') {
          setTimeout(function(){combats_plugins_manager.getMainFrame().location='/main.pl';}, 0);
        }
        setTimeout(combats_plugins_manager.get_binded_method(this,this.heal), 5000);
        return;
      }
      if (!step) {
        this.onuserinfo_handler = combats_plugins_manager.get_binded_method(this,this.onuserinfo);
        combats_plugins_manager.attachEvent('onuserinfo',this.onuserinfo_handler);
        this.userinfoTimer = setTimeout(
          combats_plugins_manager.get_binded_method(
            this,
            function() {
              if (this.onuserinfo_handler) {
                combats_plugins_manager.detachEvent('onuserinfo',this.onuserinfo_handler);
                this.sendAutoResponse('private ['+this.Healing.partner+'] �� ������ ��������� '+this.Healing.patient+' � ������� :chtoza: (���������)');
                this.Healing = null;
              }
            }
          ),
          7000);
        this.refreshChat();
      } else switch (step) {
        case 1:
          combats_plugins_manager.detachEvent('mainframe.load',this.mainframeload_handler);
          if (combats_plugins_manager.getMainFrame().location.pathname=='/exchange.pl') {
            combats_plugins_manager.getMainFrame().location = '/exchange.pl?setcancel=1&tmp='+Math.random();
            this.sendAutoResponse('private ['+this.Healing.partner+'] �� �� ����� �� ��������� ���������? � �� � ���������... :sorry: (���������)');
            this.Healing = null;
            return;
          }
          var doc = combats_plugins_manager.getMainFrame().document;
          var result = false;
          for (var i=0; i<doc.images.length; i++) {
            var obj = doc.images[i];
            if (obj.src=='http://img.combats.ru/i/items/cure_g1.gif') {
if (this['debugger']) debugger;
              do {
                obj = obj.nextSibling;
              } while(obj && obj.tagName!='A')
              if (obj && (match=decodeURI(obj.href).match(/^javascript\:(magicklogin\('���� ���������', .*\))$/))) {
                doc.parentWindow.eval(match[1]);
                doc.forms['slform'].elements['param'].value = this.Healing.patient;

                this.mainframeload_handler = combats_plugins_manager.get_binded_method(this,this.heal,2);
                combats_plugins_manager.attachEvent('mainframe.load',this.mainframeload_handler);
                
                doc.forms['slform'].submit();
                result = true;
                break;
              }
            }
          }
          if (!result) {
            this.sendAutoResponse('private ['+this.Healing.partner+'] �� �����-�� �������� � �� ���� ������ ��������� :chtoza: (���������)');
            this.Healing = null;
          }
          break;
        case 2:
          combats_plugins_manager.detachEvent('mainframe.load',this.mainframeload_handler);
          var doc = combats_plugins_manager.getMainFrame().document;
          var castResult = doc.getElementsByTagName('TABLE')[0].cells[1].firstChild;
          var s = this.Healing.partner;
          if (this.Healing.partner!=this.Healing.patient)
            s += ', '+this.Healing.patient;
          if (castResult.nodeName=='FONT' && castResult.currentStyle.color=='red')
            castResult = castResult.innerText;
          else
            castResult = '';
          if (castResult!='') {
            this.sendAutoResponse('private ['+s+'] '+castResult+' (���������)');
            
            if (castResult.match(/(?:".*?" ������� �� �����|�� �������������� � ���� ��������� ��� ".*?")/)) {
              this.lastCast = new Date();
              this.lastTarget = this.Healing.patient;
              if (this.addPersToVIP(this.Healing.patient)) {
                this.sendAutoResponse('private ['+this.Healing.patient+'] �� � ���� ��� �������� '+this.vip_customers[this.Healing.patient]+' ���. ������� ����� ���� :wink: (���������)');
              }
            }
          } else {
            this.sendAutoResponse('private ['+s+'] �� �����-�� �������� ��������� ����� ����������� :chtoza: (���������)');
          }

          this.Healing = null;
          break;
        }
    },
    onmessage: function(eventObj) {
      if (!this.Active)
        return;
      var mess = eventObj.mess.replace(/<.*?>/g,''); // .replace(/<(\S+).*?>(.*?)<\/\1>/,'$2');
      var match;
      if (this.fullSysMessage)
        match = mess.match(/[\d\:]+\s+\[(.*?)\]\s+(?:(?:private|to)\s+\[\s*(.*?)\s*\])?\s*�� ������� ���� ��������� ��� &quot;(.*?)&quot; \(��������� (������|�������|�������) �����\), � ��������� ������� ���� 5 �����, ����� ��������� ����������\s*/);
      else
        match = mess.match(/[\d\:]+\s+\[(.*?)\]\s+(?:(?:private|to)\s+\[\s*(.*?)\s*\])?\s*.*?��������� ��� &quot;(.*?)&quot; \(��������� (������|�������|�������) �����\s*/);
      if (!match) {
        if (this.fullSysMessage)
          match = mess.match(/[\d\:]+\s+\[(.*?)\]\s+(?:(?:private|to)\s+\[\s*(.*?)\s*\])?\s*�� �������������� � ���� ��������� ��� &quot;(.*?)&quot;\s*/);
        else
          match = mess.match(/[\d\:]+\s+\[(.*?)\]\s+(?:(?:private|to)\s+\[\s*(.*?)\s*\])?\s*.*?��������� ��� &quot;(.*?)&quot;\s*/);
        if (match)
          match[4] = '������������ ����';
      }
      if (!match)
        return;

      
      if (this.blacklist[match[1]] || this.blacklist[match[3]]) {
        this.sendAutoResponse('private ['+match[1]+','+match[3]+'] � �� ������� ���, ��� �����-�� ������� ��� ����� ��� ������ ������� :dont: (���������)');
        return;
      }
      if (this['debugger']) {
        debugger;
      }
      var healers = [];
      if (match[2]!='') {
        healers = match[2].split(/\s*,\s*/);
      }
      var isMine = false;
      for(var i=0; !isMine && i<healers.length; i++) {
        isMine = (healers[i]==top.mylogin);
      }

      if (!(this.allowNoTarget && healers.length==0) && !isMine)
        return;

      var s = '['+match[1]+'] ���������� �������� ��������� ['+match[3]+'] �� '+match[4]+' �����.';
      var timeSpan = Math.floor(((new Date()).getTime()-this.lastCast.getTime())/1000);
      if (timeSpan<5*60) {
        if (this.lastTarget==match[3]) {
          this.sendAutoResponse('private ['+match[1]+'] �� ����� ��������� ���� ��������� ���� '+timeSpan+' ������ ����� (���������)');
        } else {
          this.sendAutoResponse('private ['+match[1]+'] ��������, ����� ��������� �� ����������� �����. ���������� ����� '+(5*60-timeSpan)+' ������... (���������)');
        }
        return;
      }
      if (this.Healing) {
        if (match[3]==this.Healing.patient)
          this.sendAutoResponse('private ['+match[1]+'] � ��� ���� ����� ���������. ������ ����������������� ��������� ����� ��������� ������ (���������)');
        else
          this.sendAutoResponse('private ['+match[1]+'] ��������, �� ������ � ���� �������. ���������� ����� ������... (���������)');
      } else {
        this.Healing = {
          partner: match[1],
          patient: match[3]
        };
        if (this.Healing.partner==this.Healing.patient) {
          s += ' :dont: ��������! �����������!';
          this.sendAutoResponse('private ['+this.Healing.partner+'] ������������ ����������? ������ �� ���������, ��� �� ����... (���������)');
        }
        this.exchangeDetected = false;
        this.heal();
      }
      combats_plugins_manager.add_chat(s);
    }
  };
  return new plugin_simple_doc();
})()