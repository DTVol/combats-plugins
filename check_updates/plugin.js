(function(){
  return {
    checkScriptURL: 'http://combats-plugins.googlecode.com/svn/trunk/check_updates/',
    period: 2,
    toString: function() { // �������� �������
      return "�������� ����������";
    },
    getProperties: function() { // ������ ��������������� ����������
      var choices = {
        'length': 5,
        '0': '���������',
        '1': '��� ������ �����',
        '2': '������ ����',
        '3': '������ ������',
        '4': '������ �����',
        'selected': this.period
      }
      return [
        {name:"������ ��������", value:choices},
        {name:"��������� ������", value:this.checkUpdates}
      ];
    },
    setProperties: function(a) { // ���������� ��������� ��������
      this.period = parseInt(a[0].value.selected);
      this.config.saveIni('period', this.period.toString());
    },
    checkUpdates: function() {
      this.lastCheck = new Date().toUTCString();
      this.config.saveIni('lastCheck', this.lastCheck);
      document.body.insertBefore(document.createElement('<script type="text/javascript" src="'+this.checkScriptURL+'check.js">'));
    },
    Init: function() {
      this.config = combats_plugins_manager.createConfigurationElement('check_updates');
      this.period = parseInt(this.config.loadIni('period', '2')) || 2;
      this.lastCheck = this.config.loadIni('lastCheck', '');
      switch (this.period) {
      case 1:
        this.checkUpdates();
        break;
      case 2:
        if (!this.lastCheck || (new Date().valueOf() - new Date().valueOf(this.lastCheck) > 24*60*60*1000)) {
          this.checkUpdates();
        }
        break;
      case 3:
        if (!this.lastCheck || (new Date().valueOf() - new Date().valueOf(this.lastCheck) > 7*24*60*60*1000)) {
          this.checkUpdates();
        }
        break;
      case 4:
        if (!this.lastCheck || (new Date().valueOf() - new Date().valueOf(this.lastCheck) > 30*24*60*60*1000)) {
          this.checkUpdates();
        }
        break;
      }
      return this;
    }
  }.Init();
})()