(function(){
  return {
    NO_ELIX: 1,
    DRINK_OK: 2,
    DRINK_UNKNOWN: 3,
    toString: function() {
      return "��������� ��������";
    },
    getProperties: function() {
      return [
        { name: "�������", value: this.active },
        { name: "���� ����� �� ���������������", value: this.autoDrink },
        { name: "������ � �����������", value: this.dungeonOnly },
        { name: "����������� ���������� % HP", value: this.autoDrinkLevel }
      ];
    },
    elix: {
      'str': [
        'pot_base_1000_str',
        'pot_base_200_bot3',
        'pot_base_50_str',
        'pot_base_50_str2'
      ],
      'dex': [
        'pot_base_1000_dex',
        'pot_base_200_bot2',
        'pot_base_50_dex',
        'pot_base_50_dex2'
      ],
      'inst': [
        'pot_base_1000_inst',
        'pot_base_200_bot1',
        'pot_base_50_inst',
        'pot_base_50_inst2'
      ],
      'intel': [
        'pot_base_200_bot4',
        'pot_base_50_intel',
        'pot_base_50_intel2'
      ],
      'def': [
        'pot_base_200_alldmg2_p1k',
        'pot_base_200_alldmg2',
        'pot_base_200_alldmg3',
        'pot_base_50_damageproof',
        'pot_base_50_drobproof'
      ],
      'defmag': [
        'pot_base_200_allmag2_p1k',
        'pot_base_200_allmag2',
        'pot_base_200_allmag3',
        'pot_base_100_allmag1',
        'pot_base_50_magicproof',
        'pot_base_150_airproof',
        'pot_base_150_earthproof',
        'pot_base_150_fireproof',
        'pot_base_150_waterproof',
        'pot_base_50_airproof',
        'pot_base_50_earthproof',
        'pot_base_50_fireproof',
        'pot_base_50_waterproof'
      ],
      'reg': [
        'pot_base_50_regeneration',
        'pot_base_50_gghpregen'
      ],
      'regmana': [
        'pot_base_50_mana_regen',
        'pot_base_50_ggmanaregen'
      ]
    },
    effects: {
      'icon_pot_base_100_allmag1' : 'defmag',
      'icon_pot_base_1000_dex' : 'dex',
      'icon_pot_base_1000_inst' : 'inst',
      'icon_pot_base_1000_str' : 'str',
      'icon_pot_base_150_airproof' : 'defmag',
      'icon_pot_base_150_earthproof' : 'defmag',
      'icon_pot_base_150_fireproof' : 'defmag',
      'icon_pot_base_150_waterproof' : 'defmag',
      'icon_pot_base_200_alldmg2' : 'def',
      'icon_pot_base_200_alldmg2_p1k' : 'def',
      'icon_pot_base_200_alldmg3' : 'def',
      'icon_pot_base_200_allmag2' : 'defmag',
      'icon_pot_base_200_allmag2_p1k' : 'defmag',
      'icon_pot_base_200_allmag3' : 'defmag',
      'icon_pot_base_200_bot1' : 'inst',
      'icon_pot_base_200_bot2' : 'dex',
      'icon_pot_base_200_bot3' : 'str',
      'icon_pot_base_200_bot4' : 'intel',
      'icon_pot_base_50_airproof' : 'defmag',
      'icon_pot_base_50_damageproof' : 'def',
      'icon_pot_base_50_dex' : 'dex',
      'icon_pot_base_50_dex2' : 'dex',
      'icon_pot_base_50_drobproof' : 'def',
      'icon_pot_base_50_earthproof' : 'defmag',
      'icon_pot_base_50_fireproof' : 'defmag',
      'icon_pot_base_50_gghpregen' : 'reg',
      'icon_pot_base_50_ggmanaregen' : 'regmana',
      'icon_pot_base_50_inst' : 'inst',
      'icon_pot_base_50_inst2' : 'inst',
      'icon_pot_base_50_intel' : 'intel',
      'icon_pot_base_50_intel2' : 'intel',
      'icon_pot_base_50_magicproof' : 'defmag',
      'icon_pot_base_50_mana_regen' : 'regmana',
      'icon_pot_base_50_regeneration' : 'reg',
      'icon_pot_base_50_str' : 'str',
      'icon_pot_base_50_str2' : 'str',
      'icon_pot_base_50_waterproof' : 'defmag'
    },
    setProperties: function(a) {
      this.active = a[0].value;
      this.autoDrink = a[1].value;
      this.dungeonOnly = a[2].value;
      this.autoDrinkLevel = parseFloat(a[3].value) || 95;

      this.configurator.saveIni('autoDrink',this.autoDrink.toString());
      this.configurator.saveIni('dungeonOnly',this.dungeonOnly.toString());
      this.configurator.saveIni('autoDrinkLevel',this.autoDrinkLevel.toString());

      this.checkActive();
    },
    checkActive: function() {
      if (this.active) {
        if (!this.loadHandler) {
          this.loadHandler = combats_plugins_manager.get_binded_method(this, this.mainframeLoad);
          this.checkEffectsHandler = combats_plugins_manager.get_binded_method(this, this.timerFunction);
        }
        combats_plugins_manager.attachEvent('mainframe.load',this.loadHandler);
        this.checkEffectsTimer = setTimeout(this.checkEffectsHandler, 2*60*1000);
      } else if (this.loadHandler) {
        combats_plugins_manager.detachEvent('mainframe.load',this.loadHandler);
        clearTimeout(this.checkEffectsTimer);
      }
    },
    startDrinkElix: function(potions, attempt) {
      if (!potions[attempt]) {
        return this.NO_ELIX;
      }
      var objName = potions[attempt];

//      this.AJAX.open('GET', '/main.pl?use='+objName+'&n=-1&'+Math.random(), false);
//      this.AJAX.send('');
//      var s = this.AJAX.responseText;
      var s = '<FONT COLOR=red><B>������ �� ������ � ����� �������</B></FONT>';
      match = s.match(/<FONT COLOR=red>(.*?)<\/FONT>/i);
      if (match && match[1] == '<B>������ �� ������ � ����� �������</B>') {
        combats_plugins_manager.add_chat(match[1]);
        return this.startDrinkElix(potions, attempt);
      } else if (match) {
        combats_plugins_manager.add_chat(match[1]);
        return this.DRINK_OK;
      }
      combats_plugins_manager.add_chat('���� '+objName+'. ��������� ����������');
      return this.DRINK_UNKNOWN;
    },
    timerFunction: function() {
/*
      combats_plugins_manager.add_chat('��������� �������');
      var nextIteration = 30; // ��������� ������ ����� 30 ������, ���� ���-�� ����� �� ���
      try {
        this.AJAX.open('GET', '/main.pl?edit=3&'+Math.random(), false);
        this.AJAX.send('');
        var s = this.AJAX.responseText;
        var images = s.match(/<IMG\s+[^>]*src="http\:\/\/img\.combats\.com\/i\/misc\/icons\/(ele_addict_|icon_pot_).*?\.gif"[^>]*onmouseover='fastshow\(".*?"[^>]*>/g);
        for(var i=0; i<images.length; i++) {
          var match = images[i].match(/<IMG\s+[^>]*src="http\:\/\/img\.combats\.com\/i\/misc\/icons\/((?:ele_addict_|icon_pot_).*?)\.gif"[^>]*onmouseover='fastshow\(".*?��������\:\s*(?:(\d+)\s*���\.\s*)?(?:(\d+)\s*���\.).*?"[^>]*>/);
          if (match) {
            var time = (parseFloat(match[2]) || 0)*60 + (parseFloat(match[3]) || 0);
            if (match[1].match(/^icon_pot_/) && time<this.criticalTime) { // ������
              if (match[1] in this.effects) {
                var effect = this.effects[match[1]];
                var result = this.startDrinkElix(this.elix[effect], 0);
                combats_plugins_manager.add_chat('���������: '+result);
                switch (result) {
                case this.NO_ELIX: // � ��� ��� ������� �����, ���������
                  break;
                case this.DRINK_UNKNOWN: // ��������� �� ���������, ����� ��������� ����� ��������� �����
                  nextIteration = 15;
                  break;
                case this.DRINK_OK: // ���� �����
                  break;
                }
              }
            }
          }
        }
        nextIteration = 2*60; // ��������� ������ ����� 2 ������
      } finally {
        if (this.active) {
          combats_plugins_manager.add_chat('����. �������� ����� '+nextIteration+' ���');
          this.checkEffectsTimer = setTimeout(this.checkEffectsHandler, nextIteration*1000);
        } else {
          this.checkEffectsTimer = null;
        }
      }
/**/
    },
    checkHP: function(s) {
      var match = s.match(/top\.setHP\((.*?),(.*?),.*?\)/);
      if (match) {
        this.currentHP = parseFloat(match[1]);
        this.maxHP = parseFloat(match[2]);
        return true;
      }
      this.currentHP = 0;
      this.maxHP = 0;
      return false;
    },
    drinkElix: function(iteration, disableElix) {
      var time = (new Date().valueOf() - this.drinkTime.valueOf());
      iteration = iteration || 0;
      disableElix = disableElix || {};
      var objName;
      if (time>5000 && iteration<2 && this.currentHP/this.maxHP*100<this.autoDrinkLevel) {
        if (this.maxHP-this.currentHP>500 && !disableElix['pot_cureHP250_20'])
          objName = 'pot_cureHP250_20';
        else if (!disableElix['pot_cureHP100_20'])
          objName = 'pot_cureHP100_20';
        if (!objName)
          return;
        this.drinkTime = new Date();
        this.AJAX.open('GET', '/main.pl?use='+objName+'&n=-1&'+Math.random(), false);
        this.AJAX.send('');
        var s = this.AJAX.responseText;
        match = s.match(/<FONT COLOR=red>(.*?)<\/FONT>/i);
        if (match && match[1] == '<B>������ �� ������ � ����� �������</B>') {
          disableElix[objName] = true;
          this.drinkElix(iteration, disableElix);
        }
        else
        {
          if (match) {
            combats_plugins_manager.add_chat(match[1]);
          }
/*
          if (this.checkHP(s))
            this.drinkElix(iteration+1);
*/
        }
      }
    },
    checkHPviaAJAX: function() {
      this.AJAX.open('GET', '/main.pl?edit=5&filter=&'+Math.random(), false);
      this.AJAX.send('');
      if (this.checkHP(this.AJAX.responseText))
        this.drinkElix();
    },
    mainframeLoad: function() {
      if ((!this.dungeonOnly || top.frames[3].location.pathname.match(/\/dungeon\d*\.pl/)) 
          && this.checkHP(top.frames[3].document.documentElement.innerHTML))
      {
        this.drinkElix();
      }
/*
      else {
        this.checkHPviaAJAX();
      }
*/
    },
    Init: function() {
      this.drinkTime = new Date();
      this.AJAX = combats_plugins_manager.getHTTPRequest();
      this.configurator = combats_plugins_manager.createConfigurationElement('drink_elix');
      this.setProperties([
        { value: false },
        { value: this.configurator.loadIni('autoDrink','false')=='true' },
        { value: this.configurator.loadIni('dungeonOnly','true')!='false' },
        { value: this.configurator.loadIni('autoDrinkLevel','95') }
      ]);

      top.combats_plugins_manager.plugins_list['top_tray'].addButton({
        'button': {
          'style': {
            'position': 'relative',
            'width': "28px",
            'height': "20px",
            'background': "#505050",
            'border': "2px outset",
            'overflow': "hidden"
            },
          'onclick': combats_plugins_manager.get_binded_method(this, this.checkHPviaAJAX)
          },
        'img': {
          'style': {
            'position': 'absolute',
            'left': '1px',
            'top': '-1px',
            'width': "25px",
            'height': "21px",
            'filter': "Glow(color=#DDDDDD,Strength=3,Enabled=0)"
            },
          'onmouseout': function() {
              this.filters.Glow.Enabled=0;
            },
          'onmouseover': function() {
              this.filters.Glow.Enabled=1;
            },
          'src': "file:///"+combats_plugins_manager.base_folder+"drink_elix/icon.gif",
          'alt': "������ ��������"
          }
        });
      return this;
    }
  }.Init();
})()