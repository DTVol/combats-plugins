(function (){
  return {
    messages: {
      'checking': '������������ ����������? ������ �� ���������, ��� �� ����...', // ���� ��������� �� ����, �������������
      'busy': '��������, �� ������ � ���� �������. ���������� ����� ������...',   // �� ��� ������ ����-�� ���������, ���������� ������� ���������
      'inprogress': '� ��� ���� ����� ���������. ������ ����������������� ��������� ����� ��������� ������', // �� ��� ������ ����� ���������, ����� ������ ��� ���
      'waiting': '��������, ����� ��������� �� ����������� �����.',               // 5 ����� �������� �� ����
      'blacklisted': '� �� ������� ���, ��� �����-�� ������� ��� ����� ��� ������ ������� :dont:', // �� - �� � � ������ ��
      'noresult': '�� �����-�� �������� ��������� ����� ����������� :chtoza:',    // ����� ������, �������� ���������, �� ���-�� ����� �� ���
      'error': '�� �����-�� �������� � �� ���� ������ ��������� :chtoza:',        // �������� ������� ���������, �� ������ �� �����
      'lost': '�� �� ����� �� ��������� ���������? � �� � ���������... :sorry:',  // �������� ������� �������
      'lowlevel': '���-�� ���� ��� ��� �� �������� :nono:',             // ������ �� �����
      'wrongalign': '� �� ���� ���������� ���������� ���������� :nono:', // ����� �� ����� ������� � ��������
      'chaos': '� �� �������� ������ � ���������� :nono:',               // ����������� � ���������� ���� ������
      'trading': '� ������ � ���������. ���������� - �������, ��������'  // ������ �����������, ��� ��������� - ���������
    },
    enableLog: true,
    DateStr: '',
    minLevel: 9, // ����������� ����� ��� �����������
    Active: false, // true ��� ��������� ��� ��������, false ��� ������� ���������
    exchangeDetected: false,
    'debugger': false,
    lastCast: new Date(1900,0,1),
    aligns: ['-1','1','3'],
    Healing: null,
    sender: null,
    cancelTimer: 0,
    lastOnlineRefreshed: 0,
    oppositeAlign: 1,
    allowNoTarget: false,
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
        { name:"׸���� ������", value:(this.load('BlackList','')||'').replace(/[;,\n\r]+/g,'\n'), type: 'textarea' },
        { name:"����������� �� �������� ��������", value:!this.fullSysMessage },
        { name:"����� ������", value:this.enableLog }
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
      this.save('BlackList',a[3].value.split(/[\n\r;,]+/).sort(function(a,b){return a.toLocaleUpperCase()>b.toLocaleUpperCase()?1:-1;}).join(';'));
      this.fullSysMessage = !a[4].value;
      this.save('fullSysMessage',this.fullSysMessage.toString());
      this.enableLog = a[5].value;
      this.save('enableLog',this.enableLog.toString());
      this.loadBlackList();

      this.save('message.checking',   this.messages['checking']);
      this.save('message.busy',       this.messages['busy']);
      this.save('message.inprogress', this.messages['inprogress']);
      this.save('message.waiting',    this.messages['waiting']);
      this.save('message.blacklisted',this.messages['blacklisted']);
      this.save('message.noresult',   this.messages['noresult']);
      this.save('message.error',      this.messages['error']);
      this.save('message.lost',       this.messages['lost']);
      this.save('message.lowlevel',   this.messages['lowlevel']);
      this.save('message.wrongalign', this.messages['wrongalign']);
      this.save('message.chaos',      this.messages['chaos']);
      this.save('message.trading',    this.messages['trading']);
    },
    addLog: function(msg) {
      if (!this.enableLog)
        return;
      var d = new Date();
      var s = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
      var log = msg+'\n';
      if (s != this.DateStr) {
        this.DateStr = s;
      } else {
        log = (external.readFile(combats_plugins_manager.security_id,"Combats.RU",'simple_doc/'+this.DateStr+'.log') || '');
        while (log && !log.slice(-1).charCodeAt(0)) {
          log = log.slice(0,-1);
        }
        log += msg + '\n';
      }
//      combats_plugins_manager.add_chat(this.DateStr+': '+msg);
      external.writeFile(combats_plugins_manager.security_id,'Combats.RU','simple_doc/'+this.DateStr+'.log',log);
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
        blacklist = blacklist.split(/;|,/);
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
        this.onuserinfo_handler = null;
        this.addLog('������ �������� ['+eventObj.name+'], �������: '+eventObj.level+', ����������: '+eventObj.align);
//        this.sendAutoResponse('private ['+this.Healing.partner+'] ����� (���������)');
        if (this.Healing.patient==this.Healing.partner) {
          if (parseInt(eventObj.level)<this.minLevel && eventObj.klan=='') {
            this.sendAutoResponse('private ['+this.Healing.partner+'] '+this.messages['lowlevel']+' (���������)');
            this.Healing = null;
            this.addLog('>>> ��������: ������� ���');
            return;
          }
        }
        if (eventObj.align.substr(0,1)==this.aligns[this.oppositeAlign]) {
          this.sendAutoResponse('private ['+this.Healing.partner+'] '+this.messages['wrongalign']+' (���������)');
          this.Healing = null;
          this.addLog('>>> ��������: ������������ ����������');
          return;
        }
        if (eventObj.align=='2') {
          this.sendAutoResponse('private ['+this.Healing.partner+'] '+this.messages['chaos']+' (���������)');
          this.Healing = null;
          this.addLog('>>> ��������: ������� �������');
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
          this.sendAutoResponse('private ['+this.Healing.partner+'] '+this.messages['trading']+' (���������)');
          this.exchangeDetected = true;
          this.addLog('>>> � ����������');
        }
        var centerElements = combats_plugins_manager.getMainFrame().document.getElementsByTagName('center');
        if (centerElements.length==0 || centerElements[0].innerText=='�������� ���������/�������� ������� ������') {
          setTimeout(function(){combats_plugins_manager.getMainFrame().location='/main.pl';}, 0);
        }
        setTimeout(combats_plugins_manager.get_binded_method(this,this.heal,[step]), 5000);
        return;
      }
      if (!step) {
        if (!this.onuserinfo_handler)
          this.onuserinfo_handler = combats_plugins_manager.get_binded_method(this,this.onuserinfo);
        combats_plugins_manager.attachEvent('onuserinfo',this.onuserinfo_handler);
        this.userinfoTimer = setTimeout(
          combats_plugins_manager.get_binded_method(
            this,
            function() {
              if (this.onuserinfo_handler) {
                combats_plugins_manager.detachEvent('onuserinfo',this.onuserinfo_handler);
                this.onuserinfo_handler = null;
                this.sendAutoResponse('private ['+this.Healing.partner+'] �� ������ ��������� '+this.Healing.patient+' � ������� :chtoza: (���������)');
                this.Healing = null;
              }
              this.addLog('!!! �������� ['+this.Healing.patient+'] �� ������ � �������');
            }
          ),
          7000);
        this.refreshChat();
      } else switch (step) {
        case 1:
          combats_plugins_manager.detachEvent('mainframe.load',this.mainframeload_handler);
          if (combats_plugins_manager.getMainFrame().location.pathname=='/exchange.pl') {
            combats_plugins_manager.getMainFrame().location = '/exchange.pl?setcancel=1&tmp='+Math.random();
            this.sendAutoResponse('private ['+this.Healing.partner+'] '+this.messages['lost']+' (���������)');
            this.Healing = null;
            this.addLog('!!! ���� �����: ��������');
            return;
          }
          var doc = combats_plugins_manager.getMainFrame().document;
          var result = false;
          for (var i=0; i<doc.images.length; i++) {
            var obj = doc.images[i];
            if (obj.src.match(/http\:\/\/img\.combats\.(?:com|ru)\/i\/items\/cure_g1\.gif/)) {
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
            this.sendAutoResponse('private ['+this.Healing.partner+'] '+this.messages['error']+' (���������)');
            this.Healing = null;
            this.addLog('!!! �� ������ ������ ���� ���������');
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
            this.addLog(castResult);
            this.sendAutoResponse('private ['+s+'] '+castResult+' (���������)');
            
            if (castResult.match(/(?:".*?" ������� �� �����|�� �������������� � ���� ��������� ��� ".*?")/)) {
              this.lastCast = new Date();
              this.lastTarget = this.Healing.patient;
              if (this.addPersToVIP(this.Healing.patient)) {
                this.sendAutoResponse('private ['+this.Healing.patient+'] �� � ���� ��� �������� '+this.vip_customers[this.Healing.patient]+' ���. ������� ����� ���� :wink: (���������)');
              }
            }
          } else {
            this.addLog('>>> �� ��������� ��������� ����������');
            this.sendAutoResponse('private ['+s+'] '+this.messages['noresult']+' (���������)');
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
      this.addLog(s);
      if (this.blacklist[match[1]]) {
        this.sendAutoResponse('private ['+match[1]+','+match[3]+'] '+this.messages['blacklisted']+' (���������)');
        this.addLog('>>> ��������: �������� ['+match[1]+'] � ��');
        return;
      }
      if (this.blacklist[match[3]]) {
        this.sendAutoResponse('private ['+match[1]+','+match[3]+'] '+this.messages['blacklisted']+' (���������)');
        this.addLog('>>> ��������: �������� ['+match[3]+'] � ��');
        return;
      }
      var timeSpan = Math.floor(((new Date()).getTime()-this.lastCast.getTime())/1000);
      if (timeSpan<5*60) {
        if (this.lastTarget==match[3]) {
          this.sendAutoResponse('private ['+match[1]+'] �� ����� ��������� ���� ��������� ���� '+timeSpan+' ������ ����� (���������)');
        } else {
          this.sendAutoResponse('private ['+match[1]+'] '+this.messages['waiting']+' ���������� ����� '+(5*60-timeSpan)+' ������... (���������)');
        }
        this.addLog('��������: �� ���������� ����� '+(5*60-timeSpan)+' ������');
        return;
      }
      if (this.Healing) {
        if (match[3]==this.Healing.patient)
          this.sendAutoResponse('private ['+match[1]+'] '+this.messages['inprogress']+' (���������)');
        else
          this.sendAutoResponse('private ['+match[1]+'] '+this.messages['busy']+' (���������)');
        this.addLog('��������: ��� � ������� �� �������');
      } else {
        this.Healing = {
          partner: match[1],
          patient: match[3]
        };
        if (this.Healing.partner==this.Healing.patient) {
          s += ' :dont: ��������! �����������!';
          this.sendAutoResponse('private ['+this.Healing.partner+'] '+this.messages['checking']+' (���������)');
          this.addLog('>>> �����������');
        }
        this.exchangeDetected = false;
        this.heal();
      }
      combats_plugins_manager.add_chat(s);
    },
    Init: function() {
      this.loadVIP();
      this.loadBlackList();
      top.combats_plugins_manager.attachEvent('onmessage',
        top.combats_plugins_manager.get_binded_method(this,this.onmessage));
      this.oppositeAlign = this.load('oppositeAlign','0');
      this.fullSysMessage = this.load('fullSysMessage','true').toLowerCase()=='true';
      this.enableLog = this.load('enableLog','true').toLowerCase()=='true';

      this.messages['checking']    = this.load('message.checking',   this.messages['checking']);
      this.messages['busy']        = this.load('message.busy',       this.messages['busy']);
      this.messages['inprogress']  = this.load('message.inprogress', this.messages['inprogress']);
      this.messages['waiting']     = this.load('message.waiting',    this.messages['waiting']);
      this.messages['blacklisted'] = this.load('message.blacklisted',this.messages['blacklisted']);
      this.messages['noresult']    = this.load('message.noresult',   this.messages['noresult']);
      this.messages['error']       = this.load('message.error',      this.messages['error']);
      this.messages['lost']        = this.load('message.lost',       this.messages['lost']);
      this.messages['lowlevel']    = this.load('message.lowlevel',   this.messages['lowlevel']);
      this.messages['wrongalign']  = this.load('message.wrongalign', this.messages['wrongalign']);
      this.messages['chaos']       = this.load('message.chaos',      this.messages['chaos']);
      this.messages['trading']     = this.load('message.trading',    this.messages['trading']);

      var d = new Date();
      this.DateStr = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate();
      return this;
    }
  }.Init();
})()