(function() {
  return {
    "toString": function() {
      return "�������� �� ������";
    },

    usedObjectsCleanup: 3, // ���������� ����� �� ��������� ������� ������ �������� ��������
    mapFileName: '',
    Map: null,
    excludedItems: {},
    alwaysItems: {},

    "bots": {
      '1/1040a_dr8472409823': {
        priority: 3, 
        style: { backgroundColor: '#EF00EF' }
      },
      '1/1040_vk8345642089': { 
        priority: 3, 
        style: { backgroundColor: '#EF00EF' }, 
// 9:57,34(�3),39,69
        ids: {
          57: {
            priority: 5, 
            title: '[11]',
            style: { backgroundColor: '#800080' } 
          },
          12: {
            priority: 5, 
            title: '[11]',
            style: { backgroundColor: '#800080' } 
          },
          28: {
            priority: 5, 
            title: '[11]',
            style: { backgroundColor: '#800080' } 
          },

          72: {
            priority: 4, 
            title: '[10]',
            style: { backgroundColor: '#A000A0' } 
          },
          42: {
            priority: 4, 
            title: '[10]',
            style: { backgroundColor: '#A000A0' } 
          },
          26: {
            priority: 4, 
            title: '[10]',
            style: { backgroundColor: '#A000A0' } 
          },
          67: {
            priority: 4, 
            title: '[10]',
            style: { backgroundColor: '#A000A0' } 
          },
          
          33: {
            priority: 4, 
            title: ' (�����)',
            style: { backgroundColor: '#A000A0' } 
          },
          53: {
            priority: 4, 
            title: '[10]',
            style: { backgroundColor: '#A000A0' } 
          },
          76: {
            priority: 4, 
            title: '[10]',
            style: { backgroundColor: '#A000A0' } 
          },
          56: {
            title: '[8]',
            style: { backgroundColor: '#FF10FF' } 
          }
        }
      },
      '0/1041_rk0170592363': { 
        style: { backgroundColor: '#A04000' } 
      },
      '0/1019': {
        priority: 3, 
        style: { backgroundColor: '#EF00EF' }
      },
      '0/1050_pq6472859128': {
        priority: 3, 
        style: { backgroundColor: '#EF00EF' }
      },
      '1/1052_id8363592750': {
        priority: 3, 
        style: { backgroundColor: '#EF00EF' }
      },
      '0/1043_ro9557495117': {
      }
    },
    "load": function(key,def_val){
	  return external.m2_readIni(combats_plugins_manager.security_id,"Combats.RU","walk\\walk.ini",top.getCookie('battle'),key,def_val);
    },
    "save": function(key,val){
      external.m2_writeIni(combats_plugins_manager.security_id,"Combats.RU","walk\\walk.ini",top.getCookie('battle'),key,val);
    },
    "getProperties": function() {
      var items = [];
      items[0] = [];
      for(var i in this.excludedItems) {
        items[0].push(i);
      }
      items[1] = [];
      for(var i in this.alwaysItems) {
        items[1].push(i);
      }
      return [
		{ name: "\"�����������\" ������", value: this.forced },
                { name: "������������ �����������", value: this.ignoreWall },
		{ name: "���������� �������� �� ������", value: this.showUnits },
		{ name: "���������� ������� �� ������", value: this.showObjects },
		{ name: "�������� �����, ���� ������� �� ����������", value: this.autoHideMap },
		{ name: "������� HP ��� �������������", value: this.minHP},
		{ name: "������� ���� ��� �������������", value: this.minMana},
		{ name: "�������������� ����� �������� ����", value: this.forcedStepTime},
		{ name: "������ ����������� �� ����������� ��������", value: this.excludedObjects, type:"textarea"},
		{ name: "������ ��������, �� ������� ����� ������� <b>������</b>", value: items[1].join("\n"), type:"textarea"},
		{ name: "��������, ������� �� ����� ���������", value: items[0].join("\n"), type:"textarea"},
		{ name: "������", value: this.log.join("\n"), type:"textarea"}
      ];
    },

    "setProperties": function(a) {
	this.forced=a[0].value;
	this.ignoreWall=a[1].value;
	this.showUnits=a[2].value;
	this.showObjects=a[3].value;
	this.autoHideMap=a[4].value;
	this.minHP=parseFloat(a[5].value) || 95;
	this.minMana=parseFloat(a[6].value) || 95;
	this.forcedStepTime = parseFloat(a[7].value) || 0;
	this.excludedObjects=a[8].value;
        this.alwaysItems = {};
        var items = a[9].value.split(/\s*[\n\r;]+\s*/);
	for(var i=0; i<items.length; i++)
          this.alwaysItems[items[i]] = true;
        this.excludedItems = {};
        items = a[10].value.split(/\s*[\n\r;]+\s*/);
	for(var i=0; i<items.length; i++)
          this.excludedItems[items[i]] = true;

	this.save('forced',this.forced?"yes":"no");
	this.save('ignoreWall',this.ignoreWall?"yes":"no");
	this.save('showUnits',this.showUnits?"yes":"no");
	this.save('showObjects',this.showObjects?"yes":"no");
	this.save('autoHideMap',this.autoHideMap?"yes":"no");
	this.save('minHP',this.minHP.toString());
	this.save('minMana',this.minMana.toString());
	this.save('forcedStepTime',this.forcedStepTime.toString());
	this.save('exclude',this.excludedObjects.replace(/\s*[\n\r]+\s*/g,";"));
	this.save('alwaysItems',a[9].value.replace(/\s*[\n\r]+\s*/g,";"));
	this.save('excludedItems',a[10].value.replace(/\s*[\n\r]+\s*/g,";"));
    },

    "clearLog": function() {
      this.log = [];
    },

    "addLog": function(s) {
      this.log.push(s);
    },

    "setDirection": function(a) {
        if(this.Direction) {
          img=window.frames[3].document.all("i"+this.Direction);
          img.src=img.src.replace(/b\.gif$/,".gif");
        }
        this.Direction=a;
        img=top.frames[3].document.all("i"+this.Direction);
        img.src=img.src.replace(/b?\.gif$/,"b.gif");
        top.frames[3].document.all("td_stop").style.backgroundColor="black";
        if (this.ignoreWall || top.frames[3].document.getElementById("m"+this.Direction) && this.steptimer==null) {
          var mtime = top.frames[3].mtime*(1-(top.frames[3].progressAt/top.frames[3].progressEnd));
          if (mtime<0)
            mtime = 0;
          this.StartStepTimer(this.do_step, mtime);
        }
		this.setCurrentSettings();
    },

    "StartStepTimer": function(do_step, sec) {
      try {
        if(this.steptimer!=null)
          clearTimeout(this.steptimer);
        this.steptimer=setTimeout(top.combats_plugins_manager.get_binded_method(this,do_step),1000*sec+100);
      } catch(e) {
        e.Function = 'StartStepTimer';
        combats_plugins_manager.logError(this,e);
      }
    },
      
    "stop_it": function() {
        if(this.Direction) {
          img=window.frames[3].document.all("i"+this.Direction);
          img.src=img.src.replace(/b\.gif$/,".gif");
        }
        this.Direction=0;
        window.frames[3].document.all("td_stop").style.backgroundColor="red";
        if(this.steptimer!=null){
          clearTimeout(this.steptimer);
          this.steptimer=null;
        }
		this.setCurrentSettings();
    },
      
    "do_step": function() {
      try {
        clearTimeout(this.steptimer);
        this.steptimer=null;

        var canStep = true;

        if (this.Direction==1) {
          var oLayer;
          var oObjects;
          if ((oLayer = top.frames[3].document.getElementById('1_0l')))
            oObjects = oLayer.getElementsByTagName('button');
            for (var i=0; i<oObjects.length; i++)
               if (oObjects[i].currentStyle.filter.search(/src=.?http\:\/\/img\.combats\.(?:com|ru)\/i\/chars\/d\//)>=0
                   && (oObjects[i].nextSibling==null || oObjects[i].nextSibling.className!='Life')) {
                 canStep = false;
                 break;
               }
        }

        if(this.Direction>0 && canStep) {
          top.frames[3].location=top.frames[3].location.pathname+"?rnd="+Math.random()+"&path=m"+this.Direction;
          if(this.forced)
            this.StartStepTimer(this.do_step, 15);
        }
      } catch(e) {
        e.Function = 'do_step';
        combats_plugins_manager.logError(this,e);
      }
    },
      
    "onunloadHandler": function(){
      try {
        if (this.forced)
          return;
        clearTimeout(this.steptimer);
        this.steptimer=null;
      } catch(e) {
        e.Function = 'onunloadHandler';
        combats_plugins_manager.logError(this,e);
      }
    },

    "clearUsedObjects": function() {
      this.usedObjects={};
      setTimeout(top.combats_plugins_manager.get_binded_method(this,this.clearUsedObjects),this.usedObjectsCleanup*60*1000);
      this.skip_quest = false;
    },

    "setCurrentSettings": function() {
        this.en_click=top.frames[3].document.all['en_click'].checked;
	this.mat_click=top.frames[3].document.all['mat_click'].checked;
//        this.ignoreWall=top.frames[3].document.all['ignoreWall'].checked;
        this.autoPilot=top.frames[3].document.all['autoPilot'].checked;
        this.autoAttack=top.frames[3].document.all['autoAttack'].checked;
        this.showMap=top.frames[3].document.all['showMap'].checked;
		
        t=this.Direction;
	t=this.en_click ? (t | 8):(t & 247);
	t=this.mat_click ? (t | 16):(t & 239);
	t=this.ignoreWall ? (t | 32):(t & 223);
	t=this.autoPilot ? (t | 64):(t & 191);
	t=this.autoAttack ? (t | 128):(t & 127);
		
	//alert(t.toString(2));
	document.cookie = "walkSettings=" + t + ";";
    },

    "onloadHandler": function() {
      try {
        var d=top.frames[3].document;
        if(d.location.pathname.search(/^\/dungeon\d*\.pl/)!=0) {
          if (this.autoHideMap)
            this.doHideMap();
          return;
        }
		var doc_inner=d.body.innerHTML.toString(); // ----------- Added by Solt
		var cur_time = (new Date()).toLocaleTimeString(); // ------------ Added by Solt
		var loc="http://"+d.location.hostname+d.location.pathname; // ------------ Added by Solt
        tables = d.getElementsByTagName('TABLE');
	    if(!top.ChatSys && ('DungMap' in d.all)) top.bottom.sw_sys(); //--------------- �������� ��������
		
		if( (Red_str=doc_inner.match(/red>(.*?)<BR>/)) && this.sys_msg ){ // ------- ����� �������� (�� ��� �������� � ����� ���������) ------- Added by Solt
			top.Chat.am(this.sys_msg + '<i>'+Red_str[1]+'<i>');
			this.sys_msg='';
		}

        if (tables.length<2 || tables[0].cells.length<2 
          || tables[0].cells[1].getElementsByTagName('A').length!=1 
		  || tables[0].cells[1].getElementsByTagName('A')[0].href.search(/\?out=/)<0) {
          return;
		}

	var redText = tables[0].rows(1).cells(0).innerText;
        if (redText.search('� ��� ������� ����� ����� ��������')>=0) {
          this.skip_quest = true;
	  this.skip_mat_click = true;
          setTimeout(top.combats_plugins_manager.get_binded_method(
            this,
            function(){
	      this.skip_mat_click = false;
            }),0);
        } else
        if (redText.search('�� ������� �����')>=0) {
          this.skip_quest = true;
	  this.skip_mat_click = true;
          setTimeout(top.combats_plugins_manager.get_binded_method(
            this,
            function(){
              alert('�������� ������� � �������');
	      this.skip_mat_click = false;
              this.skip_quest = false;
            }),0);
        } else
        if (redText.search('���� �� 5 ����� ��� �� ��������, �� ����� ����� �����...')>=0) {
	  this.skip_mat_click = true;
          setTimeout(top.combats_plugins_manager.get_binded_method(
            this,
            function(){
	      this.skip_mat_click = false;
            }),0);
        } else
        if (redText=='� ��� ��� ��� ���� ������������ ��������') {
          this.Direction=0;
        }
		  
// ---------- try drop ----------
        for(i=0;i<d.links.length;i++) {
          link=d.links(i);
          if (link.href.search(/dungeon\d*\.pl\?get=/)>=0) {
            var img = link.children[0];
            var match;
            if (this.mat_click && !this.skip_mat_click 
                || (!this.skip_mat_click && img.src.search(/mater\d\d\d\.gif/)>=0 && !this.skip_quest)
                || (!this.skip_mat_click && (match = img.alt.match(/'(.*?)'/)) && (match[1] in this.alwaysItems)))
            {
              if (!(img.alt.replace(/^.*?'(.*)'.*?$/,'$1') in this.excludedItems)) {
                top.frames[3].location = link.href;
                return;
              }
            }
          }
        }
//---------- �������� ������� ������ 		
	var tab='<table border=0 cellspacing=8 cellpadding=0 id="Radar_table" style="table-layout: fixed">';
	for (var i=0; i<7; i++){
		tab+='<tr>';
		for (var j=0; j<7; j++)
			tab+='<td style="width: 7px; height: 7px;"></td>';
		tab+='</tr>';
	}
	tab+='</table>';
	t= d.createElement('<DIV id="Radar" style="position: absolute; width: 120px; height: 120px; filter: Alpha(Opacity=40);"></DIV>');
	l_m=d.all.DungMap.getElementsByTagName('button')[d.all.DungMap.getElementsByTagName('button').length-1];
	l_m.parentNode.insertBefore(t,l_m.nextSibling);
	d.all.Radar.innerHTML=tab;
	R_div=d.getElementById('Radar');
	R_t=d.getElementById('Radar_table');
	R_div.style.left=5;
	R_div.style.top=8;
		
//---------- ��������� �������� (������������, �������������, ���������� ������)
	arrLayers=top.frames[3].arrLayers; //----- ���������� � ������ ��������+������
	for(var y in arrLayers)
	  for(var x in arrLayers[y])
	    for(var rl in arrLayers[y][x]) {
	      var Obj_X=parseInt(rl=='r'? x:-x);
	      var Obj_Y=parseFloat(y);
	      var tmp;
	      if(top.frames[3].nMyDirection & 2){ //���� ����������� 3 ��� 7, ������������ ���������� �������
		tmp=Obj_X;
		Obj_X=Obj_Y;
		Obj_Y=-tmp;
	      }
	      if(top.frames[3].nMyDirection & 4){ //���� 5 ��� 7, ���������� ������������� �� 180��
		Obj_X=-Obj_X;
		Obj_Y=-Obj_Y;
	      }
	      var cell = R_t.rows[-Obj_Y+3].cells[Obj_X+3];
	      var cell_priority = -1;
	      for(var o in arrLayers[y][x][rl])
		for(var i in arrLayers[y][x][rl][o]) {
		  var Obj=arrLayers[y][x][rl][o][i];
/*
		  ssss = '';
		  for(var jo in Obj) {
		    ssss += '('+jo+':'+Obj[jo]+'),';
		  }
*/
		  var Obj_priority = 0;
		  var style = {};
		  var title = '';
		  if (Obj.image in this.bots) {
		    var match = Obj.id.match(/-(\d+)$/);
		    if (('ids' in this.bots[Obj.image]) && match && (match[1] in this.bots[Obj.image].ids)) {
		      Obj_priority = this.bots[Obj.image].ids[match[1]].priority || this.bots[Obj.image].priority || 2;
		      style = this.bots[Obj.image].ids[match[1]].style || this.bots[Obj.image].style || { backgroundColor: 'red' };
		      title = this.bots[Obj.image].ids[match[1]].title || '';
		    } else {
		      Obj_priority = this.bots[Obj.image].priority || 2;
		      style = this.bots[Obj.image].style || { backgroundColor: 'red' };
		      title = this.bots[Obj.image].title || '';
		    }
		  } else {
		    if (o=='arrObjects' || Obj.HP) {
		      Obj_priority = 0;
		      style = { backgroundColor: 'green' };
		    } else {
		      Obj_priority = 1;
		      style = { backgroundColor: 'red' };
		    }
		  }
		  if(cell_priority < Obj_priority) {
		    cell_priority = Obj_priority;
		    for(var j in style)
		      cell.style[j] = style[j];
		  }
		  if(cell.title!="")
		    cell.title+="\n";
		  cell.title+=Obj.name + title;

		  if((x==0 && y==1) || (y==0 && x==1)) { //---------------- ���� ������� ��� � �����, �������.
		    if( o=='arrObjects' && !(Obj.id in this.usedObjects) && (this.alwaysItems[Obj.name] || this.en_click && this.excludedObjects.indexOf(Obj.name)==-1)) { //-------������� �� �������
		      this.usedObjects[Obj.id]=true;
		      if(top.ChatSys) //------------ �������� � ���� �� ��� ������� (���� �������� ��������)
			this.sys_msg='<font class=date2>'+cur_time+'</font> �������� ������ <b>'+Obj.name+'</b>, ';
		      top.frames[3].location=loc+"?useobj="+Obj.id;
		      return;
		    } else if(this.autoAttack && (doc_inner.search(/DIV(.{2,18})LeftFront0_0/i)<0)) {//-- �������� ���� ��� �����
		      if(Obj.action && Obj.action.search(/attack/)>=0) {
			if( (100*top.tkHP/top.maxHP)>this.minHP) {
			  top.frames[3].location=loc+"?attack="+Obj.id;
			  return;
			} else {
			  var timeout_HP = 180000*(top.maxHP*this.minHP/100-top.tkHP)/(top.speed*top.maxHP)*1000;
			  var timeout_Mana = ((top.maxMana||0)>100)?180000*(top.maxMana*this.minMana/100-top.tkMana)/(top.mspeed*top.maxMana)*1000:0;
			  var timeout = Math.max(timeout_HP, timeout_Mana);
			  //setTimeout("top.frames[3].location.reload()",180000*(top.maxHP-top.tkHP)/(top.speed*top.maxHP)*1000);//�������� ����� ����� 100% HP
			  setTimeout("top.frames[3].location=top.frames[3].location.href",180000*(top.maxHP*this.minHP/100-top.tkHP)/(top.speed*top.maxHP)*1000+10000);//�������� ����� ����� minHP HP
			}
		      }
		    }
		  }
		}
	    }
	

	tables[0].rows(1).cells(0).innerHTML += '<table><tr><td><table>\
<tr><td><td><img id="i1" src="http://img.combats.com/i/move/navigatin_52.gif" style="cursor:pointer"><td>\
<tr><td><img id="i7" src="http://img.combats.com/i/move/navigatin_59.gif" style="cursor:pointer" onclick="this.setDirection(7)"><td id="td_stop" style="background-color:black;"><td><img id="i3" src="http://img.combats.com/i/move/navigatin_62.gif" style="cursor:pointer" onclick="this.setDirection(3)">\
<tr><td><td><img id="i5" src="http://img.combats.com/i/move/navigatin_67.gif" style="cursor:pointer" onclick="this.setDirection(5)"><td></table>\
<td>\
<input type="checkbox" id="en_click"'+(this.en_click?' CHECKED':'')+'>&nbsp;������� �� ��������<br>\
<input type="checkbox" id="mat_click" onclick="this.mat_click=this.checked"'+(this.mat_click?' CHECKED':'')+'>&nbsp;�������� �����������<br>\
<input type="checkbox" id="autoPilot" onclick="if(this.autoPilot=this.checked);/*document.all.ignoreWall.checked=this.ignoreWall=false*/"'+(this.autoPilot?' CHECKED':'')+'>&nbsp;�������������<br>\
<input type="checkbox" id="autoAttack" onclick="this.autoAttack=this.checked;"'+(this.autoAttack?' CHECKED':'')+'>&nbsp;�������������<br>\
<input type="checkbox" id="showMap" onclick="this.showMap=this.checked;"'+(this.showMap?' CHECKED':'') /*+' DISABLED=1'*/ +'>&nbsp;�������� �����<br>\
</table>';

	maxT=1800/top.speed*100;
	T=Math.floor(maxT/top.maxHP*100);
		
	//alert(dT+' '+T);
	d.getElementsByTagName('table')[2].rows[0].cells[0].innerHTML+="(100HP/"+T+"���.)"
	//top.Chat.am(t);
/*
//---------���������� ����� ���������
	if(arrMap=top.frames[3].arrMap){
		map_i=parseInt(0); 
		for(y=0;y<8;y++){
			for(x=0;x<8;x++){
				map_i*=2;
				map_i+=(arrMap[y][x] ? 1:0);
			}
		}
		//top.Chat.am(map_i.toString(10));
		if(this.Coordinates[map_i])
			d.getElementsByTagName('table')[4].rows[0].cells[0].innerHTML+="<br>"+"x:"+this.Coordinates[map_i].x+" y:"+this.Coordinates[map_i].y;
	}
*/			
		
        for (var i=1; i<8; i+=2)
          d.all['i'+i].onclick = top.combats_plugins_manager.get_binded_method(this,this.setDirection, i);

        d.all['td_stop'].onclick = top.combats_plugins_manager.get_binded_method(this,this.stop_it);
        d.all['en_click'].onclick = top.combats_plugins_manager.get_binded_method(this,this.setCurrentSettings);
        d.all['mat_click'].onclick = top.combats_plugins_manager.get_binded_method(this,this.setCurrentSettings);
        d.all['autoPilot'].onclick = top.combats_plugins_manager.get_binded_method(this,this.setCurrentSettings);
        d.all['autoAttack'].onclick = top.combats_plugins_manager.get_binded_method(this,this.setCurrentSettings);
        d.all['showMap'].onclick = top.combats_plugins_manager.get_binded_method(this,this.doShowMap);
		
        if (this.Direction) {
          img=d.all("i"+this.Direction);
          img.src=img.src.replace(/\.gif$/,"b.gif");
        } else
          d.all("td_stop").style.backgroundColor="red";

        this.doShowMap();

        combats_plugins_manager.fireEvent('dungeon_walk.step',null);
        if (this.destination)
          this.makeStep();
        else if (this.autoPilot) {
          if (this.Direction && !d.getElementById("m"+this.Direction)) {
            if (d.getElementById("m1")) {
              this.setDirection(1);
            } else {
              el = d.getElementById("m"+((this.Direction+6)%8));
              er = d.getElementById("m"+((this.Direction+2)%8));
              if (er && !el)
                setTimeout("top.frames[3].location=top.frames[3].location.pathname+'?rnd="+Math.random()+"&path=rr';",100);
              else if (el && !er)
                setTimeout("top.frames[3].location=top.frames[3].location.pathname+'?rnd="+Math.random()+"&path=rl';",100);
              return;
            }
          }
          var mtime = top.frames[3].mtime*(1-(top.frames[3].progressAt/top.frames[3].progressEnd));
          if (mtime<0)
            mtime = 0;
          if (this.forcedStepTime && mtime>this.forcedStepTime)
            mtime = this.forcedStepTime;
          if(!this.forced || this.steptimer==null || mtime==0) {
            if (d.getElementById("m"+this.Direction) && (this.Direction!=1 || !("l2op1" in d.all) || d.all["l2op1"].childNodes.length>1 )){
              this.StartStepTimer(this.do_step, mtime);
	    }
          }
        }

        d.parentWindow.attachEvent("onbeforeunload",top.combats_plugins_manager.get_binded_method(this,this.onunloadHandler));
      } catch (e) {
        e.Function = 'onLoadHandler';
        combats_plugins_manager.logError(this,e);
      }
    },

    getMapPosition: function(Map, arrMap) {
      // this.addLog('getMapPosition');
      function search_map_row(start_row) {
        start_row = start_row || 0;
        var found = false;
        var s = arrMap[0].join(',');
        for(var j=start_row; j<Map.length-arrMap.length+1; j++) {
          var ss = Map[j].join(',');
          if (ss.indexOf(s)>=0) {
            found = true;
            for(var i=1; i<arrMap.length; i++) {
              var sss = arrMap[i].join(',');
              ss = Map[j+i].join(',');
              if (ss.indexOf(sss)<0) {
                found = false;
                break;
              }
            }
            if (found) {
              return j;
            }
          }
        }
        if (!found)
          return -1;
      }

      var map_x;
      var map_y = search_map_row();

      while (map_y>=0) {
        for (var jj=0; jj<Map[0].length-arrMap[0].length+1; jj++) {
          var found = true;
          for(var i=0; found && i<arrMap.length; i++) {
            for(var j=0; j<arrMap[0].length; j++) {
              if (Map[map_y+i][jj+j]!=arrMap[i][j]) {
                found = false;
                break;
              }
            }
          }
          if (found) {
            map_x = jj;
            break;
          }
        }
        if (found) {
          // this.addLog(''+(map_x+4)+', '+(map_y+4));
          return {x:map_x+4, y:map_y+4};
        }
        map_y = search_map_row(map_y+1);
      }
      // this.addLog('?, ?');
      return null;
    },

    "getCurrentFloor": function() {
      // this.addLog('getCurrentFloor');
      try {
        var match = top.frames[3].document.getElementsByTagName('table')[0].cells[1].innerHTML.match(/(����\s+\d+(?:\S*?)|^.+(?=\s*-.+?$))/,'$1');
        return match ? match[1].replace(/^\s*(.*?)\s*$/,'$1') : '';
      } catch(e) {
      }
    },

    "updateMap": function(enforce) {
      this.dungeonName = top.frames['activeusers'].document.getElementById('room').innerText.replace(/\s+\(\d+\)$/,'')
      var mapFileName = 'walk\\'+this.dungeonName+'.js';
      if (enforce || this.mapFileName!=mapFileName) {
        // this.addLog('loading map file');
        var s = external.readFile(
          top.combats_plugins_manager.security_id,
          "Combats.RU",
          mapFileName) || '';
        if (s) {
          this.Map = eval('(function(){ return '+s+' })()');
          this.mapFileName = mapFileName;
        } else {
          this.Map = null;
        }
      }
    },

    "doShowMap": function() {
      // this.addLog('doShowMap');
      if (this.mapTargetMenu)
        this.mapTargetMenu.style.display = 'none';
      var b = top.frames[3].document.getElementById('showMap');
      if (!b || b.checked) {
        this.setCurrentSettings();
        if (!this.mapPanel) {
          // this.addLog('creating panel');
          this.mapPanel = combats_plugins_manager.createWindow('�����', 480, 360, combats_plugins_manager.get_binded_method(this,this.doHideMap,true));
          var div = top.document.createElement('<div style="width:100%; height:100%; overflow: scroll;">');
          this.div = top.document.createElement('<div style="position: relative">');
          div.insertBefore( this.div, null );
          oPanel.oWindow.Insert( div );
        }

        var floor = this.getCurrentFloor();
        var Map = this.Map ? this.Map[floor] : null;
        if (!Map) {
          this.updateMap(true);
          Map = this.Map ? this.Map[floor] : null;
        }
        while (this.div.firstChild)
          this.div.removeChild(this.div.firstChild);
        if (Map) {
          // this.addLog('floor found');
          this.div.style.width = ''+((Map[0].length-8)*15)+'px';
          this.div.style.height = ''+((Map.length-8)*15)+'px';
          var selectMapTarget = combats_plugins_manager.get_binded_method(this,this.selectMapTarget);
          for(var i=4; i<Map.length-4; i++)
            for(var j=4; j<Map[i].length-4; j++) {
              if (Map[i][j]) {
                var cell = top.document.createElement('<div style="position: absolute; width:17px; height:17px; background: url(http://img.combats.com/i/sprites/map/'+Map[i][j]+'.gif) no-repeat center center; left:'+(j*15-60)+'px; top:'+(i*15-60)+'px">');
                this.div.insertBefore(cell, null);
                cell.onclick = selectMapTarget;
                cell.mapX = j;
                cell.mapY = i;
              }
            }
          var arrMap = top.frames[3].arrMap;
          for (var i in arrMap)
            for (var j in arrMap[i])
              if (arrMap[i][j].constructor == top.frames[3].Array)
                arrMap[i][j] = arrMap[i][j][0];
          this.position = this.getMapPosition(Map, arrMap);
          if (this.position) {
            var cell = top.document.createElement('<div style="position: absolute; width:7px; height:7px; background: url(http://img.combats.com/i/move/p1/d0.gif) no-repeat center center; left:'+(this.position.x*15-55)+'px; top:'+(this.position.y*15-59)+'px" title="������� ��������������">');
            this.div.insertBefore(cell, null);
          }
          if (this.destination) {
            // this.addLog('destination: '+this.destination.x+','+this.destination.y);
            this.displayDestinationPointer(this.destination);
          }
        } else {
          this.div.innerHTML = '<i>��� ������ �� "'+this.dungeonName+'", "'+floor+'"</i>';
	}
        
        this.mapPanel.oWindow.Show();
      } else {
        this.doHideMap(true);
      }
    },

    "doHideMap": function(permanent) {
      // this.addLog('doHideMap');
      if (this.mapPanel)
        this.mapPanel.oWindow.Hide();
      if (permanent) {
        var input = top.frames[3].document.all['showMap'];
        if (input) {
          input.checked = false;
          this.setCurrentSettings();
        }
      }
      if (this.mapTargetMenu)
        this.mapTargetMenu.style.display = 'none';
    },

    "displayDestinationPointer": function(position) {
      // this.addLog('displayDestinationPointer');
      if (!this.pointer)
        this.pointer = top.document.createElement('<div style="position: absolute; width:9px; height:13px; background: url(file:///'+combats_plugins_manager.base_folder+'/walk/arrow.gif) no-repeat; line-height: 1px">');
      this.pointer.style.left = ''+(position.x*15-56)+'px';
      this.pointer.style.top = ''+(position.y*15-55)+'px';
      this.pointer.style.display = '';
      this.div.insertBefore(this.pointer, null);
    },

    "selectMapTarget": function(e) {
      // this.addLog('selectMapTarget');
      e = e || window.event;
      this.selectedPosition = {x:e.srcElement.mapX, y:e.srcElement.mapY, floor:this.getCurrentFloor()};
      var x = e.srcElement.offsetLeft+5;
      var y = e.srcElement.offsetTop+5;
      this.displayDestinationPointer(this.selectedPosition);

      if (!this.mapTargetMenu)
        this.mapTargetMenu = top.document.createElement('<div style="position: absolute; background: #FFF0FF; margin: 5px 5px; cursor:pointer;">');
      this.mapTargetMenu.style.left = ''+(e.clientX+10)+'px'; 
      this.mapTargetMenu.style.top = ''+(e.clientY+10)+'px'; 

      while (this.mapTargetMenu.firstChild)
        this.mapTargetMenu.removeChild(this.mapTargetMenu.firstChild);
      var item = top.document.createElement('div');
      item.innerText = '������ ����';
      item.onclick = combats_plugins_manager.get_binded_method(this,function(){
        this.mapTargetMenu.style.display = 'none';
        this.runToPont(this.selectedPosition);
      });
      this.mapTargetMenu.insertBefore(item, null);
      top.document.body.insertBefore(this.mapTargetMenu, null);
      this.mapTargetMenu.style.display = '';
    },
    
    "runToPont": function(position) {
      // this.addLog('runToPont');
      this.oneStepMode = false;
      this.Direction=0;
      this.destination = position;
      this.makeStep();
    },

    "createPath": function() {
      // this.addLog('createPath');
      var floor = this.getCurrentFloor();
      var _map = this.Map ? this.Map[floor] : null;
      if (_map) {
        // this.addLog('floor found');
        var Map = [];
        var wave = [];
        for(var i in _map) {
          Map[i] = [];
          wave[i] = [];
          for(var j in _map[i]) {
            Map[i][j] = _map[i][j]
            wave[i][j] = 0;
          }
        }
        var completeObj = {};
        var currLen = 1;
        wave[this.destination.y][this.destination.x] = currLen;
        try {
          waveIsOk = true;
          while(waveIsOk) {
            waveIsOk = false;
            for(var ii in Map) {
              i = parseInt(ii)
              for(var jj in Map[i]) {
                j = parseInt(jj)
                if (!wave[i][j] && Map[i][j]) {
                  if (Map[i][j].indexOf('1')<0 && wave[i-1][j]==currLen)
                    wave[i][j]=currLen+1;
                  if (Map[i][j].indexOf('3')<0 && wave[i][j+1]==currLen)
                    wave[i][j]=currLen+1;
                  if (Map[i][j].indexOf('5')<0 && wave[i+1][j]==currLen)
                    wave[i][j]=currLen+1;
                  if (Map[i][j].indexOf('7')<0 && wave[i][j-1]==currLen)
                    wave[i][j]=currLen+1;

                  if (wave[i][j]==currLen+1) {
                    waveIsOk = true;
                    if (i==this.position.y && j==this.position.x) {
                      throw completeObj;
                    }
                  }
                }
              }
            }
            currLen++;
          }
          return null;
        } catch (e) {
          if (e == completeObj) {
            // this.addLog('path found');
            var x = this.position.x;
            var y = this.position.y;
	    var cell = Map[y][x];
            if (cell.indexOf('1')<0 && wave[y-1][x]==currLen) {
              return {x:x,y:y-1,d:1};
            } else if (cell.indexOf('3')<0 && wave[y][x+1]==currLen) {
              return {x:x+1,y:y,d:3};
            } else if (cell.indexOf('5')<0 && wave[y+1][x]==currLen) {
              return {x:x,y:y+1,d:5};
            } else if (cell.indexOf('7')<0 && wave[y][x-1]==currLen) {
              return {x:x-1,y:y,d:7};
            }
          }
        }
      }
    },
    
    "checkDirection": function(d) {
      // this.addLog('check direction');
      var match = top.frames[3].document.body.innerHTML.match(/>������� �� (�����|��|�����|������)<\//i);
      if (match) {
        // this.addLog('direction found');
        var direction = {'�����':1,'������':3,'��':5,'�����':7}[match[1]];
        if (direction==d)
          return true;
        if (direction==1 && d==3 || direction==3 && d==5 || direction==5 && d==7 || direction==7 && d==1) {
          // turn right;
          setTimeout("top.frames[3].location=top.frames[3].location.pathname+'?rnd="+Math.random()+"&path=rr';",100);
          return false;
        }
        // turn left;
        setTimeout("top.frames[3].location=top.frames[3].location.pathname+'?rnd="+Math.random()+"&path=rl';",100);
        return false;
      }
    },

    "checkEnemy": function() {
      if (!top.frames[3].arrLayers[1] || !top.frames[3].arrLayers[1][0])
        return true;
      var units = top.frames[3].arrLayers[1][0].l.arrUnits;
      for(var i in units) {
        // ���� ���� ���� �� ���� ���������, ��� 10 ������ � ���������
        if (!units[i].maxHP) {
          // this.addLog('enemy');
          combats_plugins_manager.fireEvent('dungeon_walk.enemy', {units:units});
          this.StartStepTimer(function(){
            top.frames[3].location=top.frames[3].location.pathname+'?rnd='+Math.random();
          }, 10);
          return false;
        }
      }
      return true;
    },

    "startOneStepForward": function(startPosition, finishPosition) {
      this.oneStepMode = true;
      this.prevPosition = { x:startPosition.x, y:startPosition.y };
      this.nextPosition = { x:finishPosition.x, y:finishPosition.y };
      this.doStep();
    },

    "doStep": function() {
      // this.addLog('doStep');
      var mtime = top.frames[3].mtime*(1-(top.frames[3].progressAt/top.frames[3].progressEnd));
      if (this.forcedStepTime && mtime>this.forcedStepTime)
        mtime = this.forcedStepTime;
      if (this.checkEnemy()) {
        this.StartStepTimer(function(){
          try {
            this.checkEnemy();
          } catch(e) {
          }
          // this.addLog('step forward');
          top.frames[3].location=top.frames[3].location.pathname+'?rnd='+Math.random()+'&path=m1';
        },mtime+0.1);
      }
    },
    
    "makeStep": function() {
      // this.addLog('makeStep');
      var floor = this.getCurrentFloor();
      var Map = this.Map ? this.Map[floor] : null;
      if (Map) {
        var arrMap = top.frames[3].arrMap;
        for (var i in arrMap)
          for (var j in arrMap[i])
            if (arrMap[i][j].constructor == top.frames[3].Array)
              arrMap[i][j] = arrMap[i][j][0];
        this.position = this.getMapPosition(Map, arrMap);
        if (this.position) 
        {
          if (floor==this.destination.floor && this.position.x==this.destination.x && this.position.y==this.destination.y) {
            if (this.oneStepMode || !this.destination.d || this.checkDirection(this.destination.d)) {
              this.oneStepMode = false;
              this.nextPosition = null;
              this.prevPosition = null;
              this.destination = null;
              combats_plugins_manager.fireEvent('dungeon_walk.finish', {position:this.position});
            }
          } else if (floor==this.destination.floor
            && ((!this.prevPosition || (this.position.x==this.prevPosition.x && this.position.y==this.prevPosition.y))
                || (!this.nextPosition || (this.position.x==this.nextPosition.x && this.position.y==this.nextPosition.y)))) 
          {
            // ��� �� ������, ���� ��� ��� �����������
            // ��� ��� ������, ������ ������
            if (this.oneStepMode) {
              this.doStep();
            } else {
              var path = this.createPath();
              if (path) {
                if (this.checkDirection(path.d)) {
                  this.prevPosition = { x:this.position.x, y:this.position.y };
                  this.nextPosition = { x:path.x, y:path.y };
                  this.doStep();
                }
              } else {
                // this.addLog('cannot create path');
                this.nextPosition = null;
                this.prevPosition = null;
                this.destination = null;
                combats_plugins_manager.fireEvent('dungeon_walk.finish', { position:this.position });
              }
            }
          } else {
            this.nextPosition = null;
            this.prevPosition = null;
            this.destination = null;
            combats_plugins_manager.fireEvent('dungeon_walk.finish', { position:this.position });
          }
        } else {
          // this.addLog('position is unknown');
          this.nextPosition = null;
          this.prevPosition = null;
          this.destination = null;
          combats_plugins_manager.fireEvent('dungeon_walk.finish', {position:this.position});
        }
      }
    },

    "Init": function() {
	this.Direction = 0;
	this.en_click=false;
	this.mat_click=false;
	this.ignoreWall=false;
	this.autoPilot=true;
	this.autoAttack=false;
	this.showMap=false;
	this.steptimer=null;
	this.forced=false;
	this.showUnits=true;
	this.showObjects=true;
	this.minHP = 95;
	this.minMana = 95;
	this.excludedObjects='';
	this.skip_quest=false;
	this.usedObjects=new Object();
	this.sys_msg = '';

	this.clearLog();

	top.combats_plugins_manager.attachEvent(
          'mainframe.load',
	  top.combats_plugins_manager.get_binded_method(this,this.onloadHandler));
	this.clearUsedObjects();
/*
	this.Coordinates=new Array();
	if(t = external.readFile(top.combats_plugins_manager.security_id,"Combats.RU","walk\\coordinates.ini")){ //�������� �������� ���������
	  	s=t.split(/[\x0A\x0D]+/);
	  	for(i in s){
	  		top.Chat.am("3");
	  		t=s[i].split(" ");
	  		this.Coordinates[t[0]]={x:t[1],y:t[2]};
	  	}
	}
*/
	this.forced=(this.load('forced','no')=='yes');
	this.ignoreWall=(this.load('ignoreWall','no')=='yes');
	this.showUnits=(this.load('showUnits','yes')=='yes');
	this.showObjects=(this.load('showObjects','yes')=='yes');
	this.autoHideMap = (this.load('autoHideMap','yes')=='yes');
	this.minHP=parseInt(this.load('minHP','95'));
	this.minMana=parseInt(this.load('minMana','95'));
	this.excludedObjects=this.load('exclude','').replace(/;/g, "\n");
	var items=this.load('alwaysItems','������� ���������;���������� ���������;�������� ���������').split(/;/);
	this.alwaysItems = {};
	for(var i=0; i<items.length; i++)
          this.alwaysItems[items[i]] = true;
	items=this.load('excludedItems','').split(/;/);
	this.excludedItems = {};
	for(var i=0; i<items.length; i++)
          this.excludedItems[items[i]] = true;
	this.forcedStepTime = parseFloat(this.load('forcedStepTime','0'));
	if( /walkSettings=(\d+)/.test( document.cookie ) ){
		t = parseFloat( document.cookie.match( /walkSettings=(\d+)/ )[ 1 ] );
		
	  	this.en_click=((t & 8)>0);
	  	this.mat_click=((t & 16)>0);
		this.ignoreWall=((t & 32)>0);
		this.autoPilot=((t & 64)>0);
		this.autoAttack=((t & 128)>0);
		
		this.Direction=(t & 7);
	}
	return this;
    }
  }.Init();
})()
