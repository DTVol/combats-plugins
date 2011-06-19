(function(){
  return {
    savedValues: {
    	startime2:300,
    	timeout:1,
    	levellogin1:3,
    	nlogin:1,
    	travma:false,
    	mut_clever:true,
    	mut_hidden:true,
    	cmt:''
    },

    toString: function() {
      return '���������� ���������� ������ � �����';
    },

    getProperties: function() {
      return [
        { name: "������ ��� �����", value: {
            length:5,
            '0':'5 �����',
            '1':'10 �����',
            '2':'15 �����',
            '3':'20 �����',
            '4':'30 �����',
            selected:{'300':0,'600':1,'900':2,'1200':3,'1800':4}[this.savedValues.startime2]
          }
        },
        { name: "����-���", value: {
            length:5,
            '0':'1 ������',
            '1':'2 ������',
            '2':'3 ������',
            '3':'4 ������',
            '4':'5 �����',
            selected:{'1':0,'2':1,'3':2,'4':3,'5':4}[this.savedValues.timeout]
          }
        },
        { name: "������ ������", value: {
            length:3,
            '0':'�����',
            '1':'������ ����� ������',
            '2':'��� ������� +/- 1',
            selected:{'0':0,'3':1,'6':2}[this.savedValues.levellogin1]
          }
        },
        { name: "���������� ������", value: {
            length:3,
            '0':'��� �����������',
            '1':'20 ������',
            '2':'40 ������',
            selected:this.savedValues.nlogin
          }
        },
        { name: "��� ��� ������ (��������)", value: this.savedValues.travma },
        { name: "����������� ����", value: this.savedValues.mut_clever },
        { name: "��������� ���", value: this.savedValues.mut_hidden },
        { name: "����������� � ���", value: this.savedValues.cmt }
      ];
    },
    setProperties: function(a) {
      try {
        this.savedValues.startime2 = [300,600,900,1200,1800][a[0].value.selected] || 300;
        this.savedValues.timeout = [1,2,3,4,5][a[1].value.selected] || 1;
        this.savedValues.levellogin1 = [0,3,6][a[2].value.selected] || 0;
        this.savedValues.nlogin = a[3].value.selected || 0;
        this.savedValues.travma = a[4].value;
        this.savedValues.mut_clever = a[5].value;
        this.savedValues.mut_hidden = a[6].value;
        this.savedValues.cmt = a[7].value;
        this.saveConfig();
      } catch (e) {
        alert('������ ��������� ��������: "'+e.message+'"');
      }
    },
	saveConfig: function() {
        this.config.saveIni('startime2', this.savedValues.startime2.toString());
        this.config.saveIni('timeout', this.savedValues.timeout.toString());
        this.config.saveIni('levellogin1', this.savedValues.levellogin1.toString());
        this.config.saveIni('nlogin', this.savedValues.nlogin.toString());
        this.config.saveIni('travma', this.savedValues.travma?'true':'false');
        this.config.saveIni('mut_clever', this.savedValues.mut_clever?'true':'false');
        this.config.saveIni('mut_hidden', this.savedValues.mut_hidden?'true':'false');
        this.config.saveIni('cmt', encodeURIComponent(this.savedValues.cmt));
	},
    
    onload_handler: function(event_obj) {
      if (event_obj.window.location.pathname!='/zayavka.pl')
        return;
      if (event_obj.window.document.body.innerHTML.match(/<TD class=s><A href="zayavka.pl\?level=haos/i)) {
        var form = event_obj.window.document.forms['F1'];
        var inputs = this.inputs = form.elements;
        for(var i in this.savedValues) {
        	if (inputs[i]) {
        		if (inputs[i].type=='checkbox')
        			inputs[i].checked = this.savedValues[i];
        		else
					inputs[i].value = this.savedValues[i];
	    	}
        }
        $('input[name=open]',form)
        	.css({display:'block',float:'right',clear:'both',background:'#fcc',color:'#400'});
        $(form).submit(this.onsubmit_handler);
      }
    },

    onsubmit_handler: function() {
        for(var i in this.savedValues) {
        	if (this.inputs[i])
        		if (this.inputs[i].type=='checkbox')
		        	this.savedValues[i] = this.inputs[i].checked;
		        else
		        	this.savedValues[i] = this.inputs[i].value;
        }
        this.saveConfig();
    },

    Init: function() {
      this.config = combats_plugins_manager.createConfigurationElement('chaot_saveclaim');
      
      this.savedValues.startime2 = this.config.loadIni('startime2', '300');
      this.savedValues.timeout = this.config.loadIni('timeout', '1');
      this.savedValues.levellogin1 = this.config.loadIni('levellogin1', '3');
      this.savedValues.nlogin = this.config.loadIni('nlogin', '1');
      this.savedValues.travma = this.config.loadIni('travma', 'false') == 'true';
      this.savedValues.mut_clever = this.config.loadIni('mut_clever', 'true') == 'true';
      this.savedValues.mut_hidden = this.config.loadIni('mut_hidden', 'true') == 'true';
      this.savedValues.cmt = decodeURIComponent(this.config.loadIni('cmt', ''));
      
      top.combats_plugins_manager.attachEvent('mainframe.load',
        top.combats_plugins_manager.get_binded_method(this, this.onload_handler));
      this.onsubmit_handler = top.combats_plugins_manager.get_binded_method(this, this.onsubmit_handler)
      return this;
    }
  }.Init();
})()