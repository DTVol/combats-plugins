(function() {
	return {
	  autotime: 0,
	  kickTimer: null,
	  minTime: 5,
	  timeAttack: 0,
	  MethodPriority: [],
	  BusyCount: 0,
	  diagnostics: false,

	  toString: function() {
		return "�������������� ����-���� (�������)"; 
	  },

	  getProperties: function() {
	  	var Methods = [];
		for(i=1;i<=20;i++){ // ���������� �������
			var t=external.m2_readIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"Method"+i,"");
			if (t) {
				Methods.push(t);
			}
		}

		return [
			{ name:"�������", value: this.active },
			{ name:"����� ��������� (���)", value: this.autotime },
			{ name:"����� ���������� (���)", value: this.minTime },
			{ name:"����� ������������ ��� ��������� (���)", value: this.totalRefreshTime },
			{ name: '������������ ������', value: this.useWeapon },
			{ name:"�������", value:Methods.join('\n'), type: 'textarea' },
			{ name: '�����������', value: this.diagnostics }
		];
	  },
	
	  setProperties: function(a) {
		this.active=a[0].value;
		this.autotime=parseFloat(a[1].value);
		this.minTime=parseFloat(a[2].value);
		this.totalRefreshTime=parseFloat(a[3].value);
		this.useWeapon=a[4].value;

		external.m2_writeIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"autotime",""+this.autotime);
		external.m2_writeIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"refresh",""+this.minTime);
		external.m2_writeIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"totalRefreshTime",""+this.totalRefreshTime);
		external.m2_writeIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"useWeapon",""+this.useWeapon);

		var Methods = a[5].value.split(/[\n\r]+/);
		for(var i=0;i<20;i++) {
			if (!Methods[i])
				Methods[i] = '';
			external.m2_writeIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"Method"+(i+1),Methods[i]);
		}
		this.diagnostics=a[6].value;

		this.LoadMethods();
		this.checkActive();
	  },
	  
	  checkActive: function() {
		if (this.active) {
			this.onloadHandler();
		}
	  },
	
	  clearKickTimer: function() {
		if (this.kickTimer==null)
			return;
		clearTimeout(this.kickTimer);
		this.kickTimer = null;
	  },
	
	  setKickTimer: function(kick_time) {
		if (this.kickTimer!=null)
			clearTimeout(this.kickTimer);
		this.kickTimer = setTimeout( top.combats_plugins_manager.get_binded_method(this,this.autoKick), kick_time);
	  },

	  addChat: function(msg) {
	  	combats_plugins_manager.add_sys(msg);
	  },

	  readIni: function(param, def) {
		return external.m2_readIni(
			top.combats_plugins_manager.security_id,
			"Combats.RU",
			"antitimeout\\antitimeout.ini",
			top.getCookie('battle'),
			param,
			def);
	  },

	  Fix: function(){
	    try {
	      var sURL = top.Battle.oQuery.sURL;
	      top.Battle.SetScript(sURL);
	      top.Battle.nRequests = 0;
	      top.Battle.oBattle.Send( null, true );
	    } catch(e) {
	      this.addChat('������ ������������� ��������');
	    }
	  },

	  getEnemyCount: function() {
		var groups = {};
		var myGroup = '';
		var oBattle = top.Battle.oBattle;
		var warriors = oBattle.oGroupsLayer.innerHTML.match(/<SPAN\s+class=['"]?UserBattleGroup(\d+)['"]?[^>]*?>(.*?)<\/SPAN>/g);
		for(var k=0; k<warriors.length; k++) {
			warriors[k] = warriors[k].match(/<SPAN\s+class=['"]?UserBattleGroup(\d+)['"]?[^>]*?>(.*?)<\/SPAN>/);
			if (warriors[k]) {
				groups[warriors[k][1]] = (groups[warriors[k][1]] || 0) + 1;
				if (warriors[k][2]==oBattle.sMyLogin) {
					myGroup = warriors[k][1];
				}
			}
		}
		var enemies = 0;
		for(var k in groups) {
			enemies += (k==myGroup)?0:groups[k];
		}
		return enemies;
	  },
	  
	  createMethodEff: function(eff) {
       		var oMethodEff = {};

       		var arrMethodEff=eff.split(/\s*\|\s*/);
       		for(var k in arrMethodEff) {
       			var match = arrMethodEff[k].match(/^([^\:]*?)(?:\:(.*?)\:(.*)|)$/);
       			if (!match)
       				continue;
       			oMethodEff[match[1]] = {};
       			if (match[2]) {
       				var s = this.readIni(match[2]);
       				if (s)
       					oMethodEff[match[1]].regExp = new RegExp(s);
       			}
       			if (match[3]) {
       				var s = this.readIni(match[3]);
       				if (s) {
       					var func;
       					oMethodEff[match[1]].func = eval('func='+s);
       				}
       			}
       		}
       		return oMethodEff;
	  },

	  checkEff: function(fighter, oMethodEff) {
       		var effNegative = false;
       		var effPositive = false;
       		for(k in oMethodEff) {
       			if (k.charAt(0)=='-') {
       				effNegative = true;
       				break;
       			}
       		}
       		for(k in fighter.arrEffects){
       			var effect = fighter.arrEffects[k];
       			if (oMethodEff[effect.sID]) { // ������ ������ ������
       				if (oMethodEff[effect.sID].regExp) { // ���. ��������
       					var match = effect.sTitle.match(oMethodEff[effect.sID].regExp);
       					if (match) {
       						effPositive = oMethodEff[effect.sID].func(match);
       					}
       				} else
       					effPositive = true;
       			} else if (oMethodEff['-'+effect.sID]) { // ������ �������� ������
       				effNegative = false;
       			}
       			//this.addChat(k+'-'+effect.sID+'-'+CheckEffect);
       		}
       		return effNegative || effPositive;
	  },

	  autoKick: function() {
	  	if (!this.active)
	  		return;
		try {
			if( (typeof(top.Battle.oBattle )!="object") && !top.Battle.bInBattle) //------- � ���� �� ���???
				return;
			var oBattle=top.Battle.oBattle;

			// ���������� ������ ���������� �������
			if (!this.stopButton) {
				this.stopButton = oBattle.arrButtons['commit'].document.createElement('BUTTON');
				this.stopButton.innerHTML = 'STOP';
				this.stopButton.style.background = '#D00000';
				this.stopButton.style.color = '#FFFF80';
				this.stopButton.onclick = combats_plugins_manager.get_binded_method(this,
					function(){ this.active = false; } );
			}
			if (this.stopButton.parentNode!=oBattle.arrButtons['commit'].parentNode) {
				oBattle.arrButtons['commit'].parentNode.insertBefore(
					this.stopButton,
					oBattle.arrButtons['commit']);
			}
			this.timeAttack+=this.minTime;

			//this.addChat('Checking..................'+this.timeAttack);
			if(oBattle.bGameOver){ //---------------- ���� �����
				this.addChat('Game over');
				top.Battle.End(oBattle.sLocation);
				return;
			}
			if( oBattle.nRequests ) { //------------------- ���� ������, ��������� � ���� minTime ���
				this.BusyCount+=this.minTime;
				//this.addChat('Busy '+this.BusyCount+'sec.');
				this.Fix(); //Reload (??)
				if(this.totalRefreshTime && this.BusyCount>this.totalRefreshTime){
					//this.addChat('Reloading all');
					top.location=top.location;
					this.BusyCount=0;
				}
				this.setKickTimer(this.minTime*1000);
				return;
			}
			this.BusyCount=0;
			
			this.me=null;
			this.enemy=null;
			for(k in oBattle.arrUsers) {
				if(oBattle.arrUsers[k].sName==oBattle.sMyLogin){
					this.me=oBattle.arrUsers[k];
					break;
				}
			}
			this.enemy = oBattle.arrUsers[oBattle.sEnemy];
			var diag_str = combats_plugins_manager.serialize(this.me)+combats_plugins_manager.serialize(this.enemy);
			//------ ������
			for(i=0;i<this.MethodPriority.length;i++){
				id=this.MethodPriority[i].id;
				
				if (typeof(top.Battle.oBattle.arrMethods[id])!='object' || !top.Battle.oBattle.arrMethods[id].oMethod.bEnable) {
					diag_str += ', skip: '+id;
					continue;
				}

				Res=this.MethodPriority[i].Res;
				//this.addChat(i+'-'+id);
				CheckRes=true;
				for(j in Res){
					if(j=='enemy' && this.enemy){                                //-------------��������� �����
						CheckEnemy=false;
						//this.addChat(j+'-'+Res[j]);
						en=Res[j].split(/\s*\|\s*/);
						//this.addChat(en);
						for(k in en){
							//this.addChat(k+'-'+en[k]);
							en_a=en[k].match(/([�-� ]*)(\[\s*(\d+)\s*\])?/);
							enName=en_a[1].replace(/(.*?)\s+/, "$1");
							enLevel=en_a[3] ? en_a[3] : 0;
							//this.addChat("Name '"+enName+"', Level '"+enLevel+"', ");
							
							if(enName && enLevel)
								CheckEnemy=(this.enemy.sName.indexOf(enName)>=0 && this.enemy.nLevel==enLevel) ? true:CheckEnemy;
							else if(enName)
								CheckEnemy=(this.enemy.sName.indexOf(enName)>=0) ? true:CheckEnemy;
							else
								CheckEnemy=(this.enemy.nLevel==enLevel) ? true:CheckEnemy;

							//this.addChat("name+level find :"+CheckEnemy);
						}
						CheckRes = CheckEnemy ? CheckRes:false;
					}else if(j=='my_effect'){                             //-----------------------��������� ����� ��������
						//this.addChat(Res[j]);

						if (!this.oMethodMyEff)
							this.oMethodMyEff = [];
						var oMethodEff = this.oMethodMyEff[i]
						if (!oMethodEff) {
							this.oMethodMyEff[i] = oMethodEff = 
								this.createMethodEff(Res[j]);
						}

						CheckRes = CheckRes && this.checkEff(this.me, oMethodEff);
					}else if(j=='enemy_effect' && this.enemy){                             //-----------------------��������� ����� ��������
						//this.addChat(Res[j]);

						if (!this.oMethodEnemyEff)
							this.oMethodEnemyEff = [];
						var oMethodEff = this.oMethodEnemyEff[i]
						if (!oMethodEff) {
							this.oMethodEnemyEff[i] = oMethodEff = 
								this.createMethodEff(Res[j]);
						}

						CheckRes = CheckRes && this.checkEff(this.enemy, oMethodEff);
					}else if(j=='enemy_boss' && this.enemy){            //-----------------------��������� ����� ��������
						CheckRes = CheckRes && (this.enemy.nMaxHP=='100');
					}else if(j=='enemy_hp' && this.enemy){              //-----------------------��������� ������ ������ HP
						var Less=(Res[j].indexOf('<')>=0);
						var More=(Res[j].indexOf('>')>=0);
						var Mode_percent=(Res[j].indexOf('%')>=0);
						var lvl = parseFloat(Res[j].replace(/^.*?(\d+).*?$/,'$1'));
						if (!isNaN(lvl)) {
							CheckRes = CheckRes && (
								!Mode_percent && (Less && this.enemy.nHP<=lvl || More && this.enemy.nHP>=lvl)
								||
								Mode_percent && (Less && this.enemy.nHP/this.enemy.nMaxHP*100<=lvl || More && this.enemy.nHP/this.enemy.nMaxHP*100>=lvl)
							);
						}
					}else if(j=='my_hp'){              //-----------------------��������� ������ ������ HP
						var Less=(Res[j].indexOf('<')>=0);
						var More=(Res[j].indexOf('>')>=0);
						var Mode_percent=(Res[j].indexOf('%')>=0);
						var lvl = parseFloat(Res[j].replace(/^.*?(\d+).*?$/,'$1'));
						if (!isNaN(lvl)) {
							CheckRes = CheckRes && (
								!Mode_percent && (Less && this.me.nHP<=lvl || More && this.me.nHP>=lvl)
								||
								Mode_percent && (Less && this.me.nHP/this.me.nMaxHP*100<=lvl || More && this.me.nHP/this.me.nMaxHP*100>=lvl)
							);
						}
					}else if(j=='my_mana'){              //-----------------------��������� ������ ������ HP
						var Less=(Res[j].indexOf('<')>=0);
						var More=(Res[j].indexOf('>')>=0);
						var Mode_percent=(Res[j].indexOf('%')>=0);
						var lvl = parseFloat(Res[j].replace(/^.*?(\d+).*?$/,'$1'));
						if (!isNaN(lvl)) {
							CheckRes = CheckRes && (
								!Mode_percent && (Less && this.me.nMagic<=lvl || More && this.me.nMagic>=lvl)
								||
								Mode_percent && (Less && this.me.nMagic/this.me.nMaxMagic*100<=lvl || More && this.me.nMagic/this.me.nMaxMagic*100>=lvl)
							);
						}
					}else if(j=='enemy_cnt'){              //-----------------------��������� ������ ������ HP
						var Less=(Res[j].indexOf('<')>=0);
						var More=(Res[j].indexOf('>')>=0);
						var cnt = parseFloat(Res[j].replace(/^.*?(\d+).*?$/,'$1'));
						if (!isNaN(cnt)) {
							var enemies = this.getEnemyCount();
							CheckRes = CheckRes && (Less && enemies<cnt || More && enemies>cnt);
						}
					}else{                             //-----------------------��������� ������ ��� ������
						currRes=parseInt(oBattle.arrRes[j].innerHTML);
						//this.addChat(j+'-'+Res[j]+'?'+currRes);
						CheckRes=( (currRes>=parseInt(Res[j])) ? CheckRes : false);
					}
				}
				
				if(CheckRes){
					this.addChat('<b>'+oBattle.arrMethods[id].oMethod.sText+'</b> '+(this.diagnostics?diag_str:''));
					var oButton = top.Battle.oBattle.arrMethods[id];
					oButton.click();
					if (oButton.oMethod.bSelectTarget) {
						if (oButton.oMethod.sTarget=='friend')
							top.Window.oPrompt.oValue.value = top.Battle.oBattle.sMyLogin;
						else
							top.Window.oPrompt.oValue.value = top.Battle.oBattle.sEnemyLogin;
						top.Window.oPrompt.oOk.Apply();
					} else if (!oButton.oMethod.bFreeCast) {
						top.Window.oConfirm.oOk.Apply();
					}

					this.setKickTimer(this.minTime*1000);
					return;
				} else {
					diag_str += ', not match: '+id;
				}
				
			}
			
			//this.addChat("T="+this.timeAttack);
			if(this.timeAttack>=this.autotime && (this.useWeapon || oBattle.sEnemyLogin==oBattle.sMyLogin)){ //------------ ������� ���� ���� ����
				this.addChat('<b>Attack</b>'+(this.diagnostics?diag_str:''));
				oBattle.Attack();
				this.timeAttack=0;
			} else {
				this.addChat('too early to kick');
			}
//			if(this.autotime)
			this.setKickTimer(this.minTime*1000);
			oBattle.Refresh();
			//top.Battle.oBattle.Attack();
		}catch(e){
			e.Function = 'autoKick';
			e.diag = diag_str;
        		combats_plugins_manager.logError(this,e);
		}
	  },
	
	  onloadHandler: function() {
		if (!this.active)
			return;
		try {
			if (top.frames[3].location.href.search(/^http\:\/\/\w+\.combats\.(?:com|ru)\/battle\d*\.pl/)!=0)
				return;
			if(typeof(top.Battle.oBattle.Class)=='object'){
				if(!(top.Battle.oBattle.Class.Settings() & 1)) top.Battle.oBattle.Class.Settings(1); // ----------���������� ���
				if(!(top.Battle.oBattle.Class.Settings() & 8)) top.Battle.oBattle.Class.Settings(8); // ---------�� ���������� �����
			}			
			//this.addChat('reload');
			if (this.autotime>0)
				this.setKickTimer(this.minTime*1000);
			else
				this.kickTimer = null;
			
			top.frames[3].attachEvent( "onbeforeunload", top.combats_plugins_manager.get_binded_method(this,this.clearKickTimer));
		}catch(e){
			e.Function = 'onLoadHandler';
        	combats_plugins_manager.logError(this,e);
		}
	  },

	  LoadMethods: function() {
	  	this.oMethodMyEff = null;
	  	this.oMethodEnemyEff = null;
	  	this.MethodPriority = [];
		for(i=1;i<=20;i++){ // ���������� �������
			t=external.m2_readIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"Method"+i,"");
			if(a=t.match(/(\S+)\s*([^;]*).*/)){ // ----- �������� ����� �� ����������
				var Method=new Object();
				Method['id']= a[1];
				if(a[2]){
					b=a[2].split(/\s*,\s*/); // ---------- ��������� ���������
					Method['Res']={};
					for(j in b){
						c=b[j].split(/\s*:\s*/); // ----------- �������� �������� ��������� �� ��������
						Method['Res'][c[0]]=c.slice(1).join(':');
					}
				}
				if(Method['id'])
					this.MethodPriority.push(Method);
			}
		}
	  },

	  init: function() {
		
		this.active = false; //----------- ������ �������
		var t = this.readIni("autotime","90");
		this.autotime = parseFloat(t); //----------- ����� � �������� �� ���������������� �����
		var t = this.readIni("refresh","10");
		this.minTime = parseFloat(t); // --------- ����������� ����� � �������� ��� ����������
		var t = this.readIni("totalRefreshTime","45");
		this.totalRefreshTime = parseFloat(t) || 0; // --------- ����� � �������� ��� ������� ���������� ���� ��� ���������
		this.useWeapon = this.readIni("useWeapon","true")!='false';

		this.LoadMethods();

		top.combats_plugins_manager.attachEvent('mainframe.load',
			top.combats_plugins_manager.get_binded_method(this,this.onloadHandler));
		this.onloadHandler();
		return this;
	  }
	}.init();
})()
