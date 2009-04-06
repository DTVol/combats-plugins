(function(){
  return {
    toString: function() {
      return '����������� �����';
    },
    getProperties: function() {
      return [
        { name: '������ ����������� �����', value: {
            length: 6,
            0: '��������',
            1: '�� ������',
            2: '�� �����',
            3: '�� ������',
            4: '�� �����',
            5: '�� ���',
            selected: this.block
          }
        },
        { name: '������ ����������� ������', value: {
            length: 5,
            0: '��������',
            1: '���� �� ���� ����� ������ ���� � ���� �����',
            2: '����������� ��� ����� ������ ���� � ���� �����',
            3: '���������� ��� ����� ������ ���� � ���� �����',
            4: '������������ ������� ����� �������',
            selected: this.attack
          } 
        },
        { name: '���������� ����', value: {
            length: 2,
            0: '��������� ���������� ����',
            1: '���������� ���� �����������',
            selected: this.match
          }
        },
        { name: '������ ������� �������', value: this.setHotKey }
      ];
    },
    setProperties: function(a) {
      this.block = parseFloat(a[0].value.selected) || 0;
      this.attack = parseFloat(a[1].value.selected) || 0;
      this.match = parseFloat(a[2].value.selected) || 0;

      this.configurator.saveIni('block', this.block.toString());
      this.configurator.saveIni('attack', this.attack.toString());
      this.configurator.saveIni('match', this.match.toString());
      this.configurator.saveIni('hotKey', this.hotKey.toString());
    },
    setHotKey: function() {
      var hot_keys = combats_plugins_manager.plugins_list['hot_keys'];
      if (!hot_keys)
        return alert('� ���������, �� ������ ������ hot_keys.\n���������� ������ ������� �������.');
      hot_keys.showAssignDialog(combats_plugins_manager.get_binded_method(
        this,
        function(result) {
          if (result) {
            if (this.hotKey)
              hot_keys.removeKeyHandler(this.hotKey);
            this.hotKey = result;
            hot_keys.setKeyHandler(this.hotKey, combats_plugins_manager.get_binded_method(
              this,
              this.doAttack
            ));
          }
        })
      );
    },
    doAttack: function() {
      if (!top.Battle.bInBattle || !top.Battle.oBattle)
        return;
      var block = (this.block==0)?Math.floor(Math.random()*5):this.block;
      top.Battle.oBattle.SetDefend(block, 0);
      var defCount = top.Battle.oBattle.oAttack.rows[ 1 ].cells[ 2 ].lastChild.innerText.split(/(,| � )/).length;
      var usedBlock = {};
      for(var i=0; i<defCount; i++)
        usedBlock[(block+i)%5] = false;

      switch (this.attack) {
        case 0: { // ��������� �����
          for(var i=0; i<top.Battle.oBattle.arrAttack.length; i++) {
            while(true) {
              var attack = Math.floor(Math.random()*5);
              if (this.match==0 || !usedBlock[attack])
                break;
            }
            usedBlock[attack] = true;
            top.Battle.oBattle.SetAttack(attack, i);
          }
          break;
        }
        case 1: { // ���� �� ���� ����� � ���� �����
          while(true) {
            var attack = Math.floor(Math.random()*5);
            if (attack in usedBlock)
              break;
          }
          usedBlock[attack] = true;
          top.Battle.oBattle.SetAttack(attack, 0);

          for(var i=1; i<top.Battle.oBattle.arrAttack.length; i++) {
            while(true) {
              var attack = Math.floor(Math.random()*5);
              if (this.match==0 || !usedBlock[attack])
                break;
            }
            usedBlock[attack] = true;
            top.Battle.oBattle.SetAttack(attack, i);
          }
          break;
        }
        case 2: {
          for(var i=0; i<top.Battle.oBattle.arrAttack.length; i++) {
            while(true) {
              var attack = Math.floor(Math.random()*5);
              if (!(attack in usedBlock))
                continue;
              if (this.match==0 || !usedBlock[attack] || defCount<=0)
                break;
            }
            usedBlock[attack] = true;
            top.Battle.oBattle.SetAttack(attack, i);
          }
          break;
        }
        case 3: {
          for(var i=0; i<top.Battle.oBattle.arrAttack.length; i++) {
            while(true) {
              var attack = Math.floor(Math.random()*5);
              if (!(attack in usedBlock) && defCount>0)
                continue;
              if (this.match==0 || !usedBlock[attack])
                break;
            }
            usedBlock[attack] = true;
            top.Battle.oBattle.SetAttack(attack, i);
          }
          break;
        }
        case 4: {
          attack = block;
          usedBlock[attack] = true;
          top.Battle.oBattle.SetAttack(attack, 0);

          for(var i=1; i<top.Battle.oBattle.arrAttack.length; i++) {
            var attack = [block,(block+2)%5,(block+3)%5][i%3];
            top.Battle.oBattle.SetAttack(attack, i);
          }
          break;
        }
      }

      var attackCount = top.Battle.oBattle.arrAttack.length;
      var attack = (this.attack==0)?Math.floor(Math.random()*5):this.block;
//      top.Battle.oBattle.Attack();
    },
    Init: function() {
      this.configurator = combats_plugins_manager.createConfigurationElement('battle_attack');
      this.block = parseFloat(this.configurator.loadIni('block', '0'));
      this.attack = parseFloat(this.configurator.loadIni('attack', '0'));
      this.match = parseFloat(this.configurator.loadIni('match', '0'));
      this.hotKey = this.configurator.loadIni('hotKey', '');
      if (this.hotKey) {
        var hot_keys = combats_plugins_manager.plugins_list['hot_keys'];
        if (hot_keys)
          hot_keys.setKeyHandler(this.hotKey, combats_plugins_manager.get_binded_method(
            this,
            this.doAttack
          ));
        else
          throw new Error('�� �������� ����������� ��� ������ ������: <b>hot_keys</b>');
      }

      return this;
    }
  }.Init();
})()