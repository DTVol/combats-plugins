(function() {
	plugin_antitimeout = function() {
		this.autotime = 0;
		this.kickTimer = null;
		this.minTime = 5;
		this.timeAttack = 0;
		this.MethodPriority = new Array();
		this.BusyCount = 0;
		this.init();
		this.onloadHandler();
	}

	plugin_antitimeout.prototype.toString = function() {
		return "�������������� ����-���� (�������)"; 
	}

	plugin_antitimeout.prototype.getProperties = function() {
		return [{ name:"����� ��������� (���)", value: this.autotime },
				{ name:"����� ���������� (���)", value: this.minTime }];
	}
	
	plugin_antitimeout.prototype.setProperties = function(a) {
		this.autotime=a[0].value;
		this.minTime=a[1].value;
		external.m2_writeIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"autotime",this.autotime);
		external.m2_writeIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"refresh",this.minTime);
	}
	
	plugin_antitimeout.prototype.clearKickTimer = function() {
		if (this.kickTimer==null)
			return;
		clearTimeout(this.kickTimer);
		this.kickTimer = null;
	}
	
	plugin_antitimeout.prototype.setKickTimer = function(kick_time) {
		if (this.kickTimer!=null)
			clearTimeout(this.kickTimer);
		this.kickTimer = setTimeout( top.combats_plugins_manager.get_binded_method(this,this.autoKick), kick_time);
	}

	plugin_antitimeout.prototype.autoKick = function() {
		try {
			if( (typeof(top.Battle.oBattle )!="object") && !top.Battle.bInBattle) //------- � ���� �� ���???
				return;
			oBattle=top.Battle.oBattle;
			this.timeAttack+=this.minTime;

			//top.Chat.am('<b>----------------Kick try</b>');
			if(top.Battle.oBattle.bGameOver){ //---------------- ���� �����
				//top.Chat.am('Game over');
				top.Battle.End(top.Battle.oBattle.sLocation);
				return;
			}
			if( top.Battle.oBattle.nRequests ) { //------------------- ���� ������, ��������� � ���� minTime ���
				this.BusyCount+=this.minTime;
				//top.Chat.am('Busy '+this.BusyCount+'sec.');
				top.Battle.oBattle.Send( null, true ); //Reload (??)
				if(this.BusyCount>40){
					//top.Chat.am('Reloading all');
					top.location=top.location;
					this.BusyCount=0;
				}
				this.setKickTimer(this.minTime*1000);
				return;
			}
			this.BusyCount=0;
			
			//------ ������
			for(i=0;i<this.MethodPriority.length;i++){
				id=this.MethodPriority[i].id;
				Res=this.MethodPriority[i].Res;
				
				CheckRes=true;
				for(j in Res){
					if(j=='enemy'){                                //-------------��������� �����
						CheckRes=false;
						en=Res[j].split(/\s*\|\s*/);
						for(k in en){
							en_a=en[k].match(/([�-� ]*)(\[\s*(\d+)\s*\])?/);
							enName=en_a[1].replace(/(.*?)\s+/, "$1");
							enLevel=en_a[3] ? en_a[3] : 0;
							
							if(enName && enLevel)
								CheckRes=(oBattle.arrUsers[oBattle.sEnemy].sName.indexOf(enName)>=0 && oBattle.arrUsers[oBattle.sEnemy].nLevel==enLevel) ? true:CheckRes;
							else if(enName)
								CheckRes=(oBattle.arrUsers[oBattle.sEnemy].sName.indexOf(enName)>=0) ? true:CheckRes;
							else
								CheckRes=(oBattle.arrUsers[oBattle.sEnemy].nLevel==enLevel) ? true:CheckRes;

						}
						
					}else{                             //-----------------------��������� ������ ��� ������
						currRes=parseInt(oBattle.arrRes[j].innerHTML);
						CheckRes=( (currRes>=parseInt(Res[j])) ? CheckRes : false);
					}
				}
				
				if(CheckRes && typeof(top.Battle.oBattle.arrMethods[id])=='object' && top.Battle.oBattle.arrMethods[id].oMethod.bEnable){
					oBattle.ApplyMethod(top.Battle.oBattle.arrMethods[id].oMethod);
					this.setKickTimer(this.minTime*1000);
					return;
				}
				
			}
			
			if(this.timeAttack>=this.autotime){ //------------ ������� ���� ���� ����
				//top.Chat.am('<b>Attack</b>');
				oBattle.Attack();
				this.timeAttack=0;
			}
			if(this.autotime)
				this.setKickTimer(this.minTime*1000);
			//top.Battle.oBattle.Attack();
		}catch(e){
			e.Function = 'autoKick';
        	combats_plugins_manager.logError(this,e);
		}
	}
	
	plugin_antitimeout.prototype.onloadHandler = function() {
		try {
			if (top.frames[3].location.href.search(/^http\:\/\/\w+\.combats\.ru\/battle\d*\.pl/)!=0)
				return;
			if(typeof(top.Battle.oBattle.Class)=='object'){
				if(!(top.Battle.oBattle.Class.Settings() & 1)) top.Battle.oBattle.Class.Settings(1); // ----------���������� ���
				if(!(top.Battle.oBattle.Class.Settings() & 8)) top.Battle.oBattle.Class.Settings(8); // ---------�� ���������� �����
			}			

			if (this.autotime>0)
				this.setKickTimer(this.minTime*1000);
			else
				this.kickTimer = null;
			top.frames[3].attachEvent( "onbeforeunload", top.combats_plugins_manager.get_binded_method(this,this.clearKickTimer));
  
		}catch(e){
			e.Function = 'onLoadHandler';
        	combats_plugins_manager.logError(this,e);
		}
	}
	
	plugin_antitimeout.prototype.init = function() {
		
		
		var t = external.m2_readIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"autotime","90");
		this.autotime = parseInt(t); //----------- ����� � �������� �� ���������������� �����
		var t = external.m2_readIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"refresh","10");
		this.minTime = parseInt(t); // --------- ����������� ����� � �������� ��� ����������
		
		
		for(i=1;i<=20;i++){ // ���������� �������
			t=external.m2_readIni(top.combats_plugins_manager.security_id,"Combats.RU","antitimeout\\antitimeout.ini",top.getCookie('battle'),"Method"+i,"");
			
			if(a=t.match(/(\S+?)\s+(.*)\s*;.*/)){ // ----- �������� ����� �� ����������
				var Method=new Object();
				Method['id']= a[1];
				if(a[2]){
					b=a[2].split(/\s*,\s*/); // ---------- ��������� ���������
					Method['Res']={};
					for(j in b){
						c=b[j].split(/\s*:\s*/); // �----------- ������� �������� ��������� �� ��������
						Method['Res'][c[0]]=c[1];
					}
				}
				this.MethodPriority.push(Method);
			}
		}
		
		

		top.combats_plugins_manager.attachEvent('mainframe.load',top.combats_plugins_manager.get_binded_method(this,this.onloadHandler));
	}
	
	return new plugin_antitimeout();
})()
