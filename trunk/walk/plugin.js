(function() {
  plugin_walk = function() {
    this.Direction = 0;
    this.en_click=false;
    this.mat_click=false;
    this.ignoreWall=false;
    this.autoPilot=true;
	this.autoAttack=false; //------------- Added by Solt
    this.steptimer=null;
    this.forced=false;
    this.skip_quest=false;
    this.usedObjects=new Object();
	this.sys_msg = ''; //------------- Added by Solt
    this.init();
  }

  plugin_walk.prototype = {
    "toString": function() {
      return "�������� �� ������";
    },

    "getProperties": function() {
      return [
        { name: "\"�����������\" ������", value: this.forced }
      ];
    },

    "setProperties": function(a) {
      this.forced=a[0].value;
    },

    "setDirection": function(a) {
        if(this.Direction) {
          img=window.frames[3].document.all("i"+this.Direction);
          img.src=img.src.replace(/b\.gif$/,".gif");
        }
        this.Direction=a;
        img=top.frames[3].document.all("i"+this.Direction);
        img.src=img.src.replace(/\.gif$/,"b.gif");
        top.frames[3].document.all("td_stop").style.backgroundColor="black";
        if (this.ignoreWall || top.frames[3].document.getElementById("m"+this.Direction) && this.steptimer==null) {
          var mtime = top.frames[3].mtime*(1-(top.frames[3].progressAt/top.frames[3].progressEnd));
          if (mtime<0)
            mtime = 0;
          this.StartStepTimer(mtime);
        }
    },

    "StartStepTimer": function(sec) {
      try {
        if(this.steptimer!=null)
          clearTimeout(this.steptimer);
        this.steptimer=setTimeout(top.combats_plugins_manager.get_binded_method(this,this.do_step),1000*sec+100);
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
               if (oObjects[i].currentStyle.filter.search("src='http://img.combats.ru/i/chars/d/")>=0
                   && (oObjects[i].nextSibling==null || oObjects[i].nextSibling.className!='Life')) {
                 canStep = false;
                 break;
               }
        }

        if(this.Direction>0 && canStep) {
          top.frames[3].location=top.frames[3].location.pathname+"?rnd="+Math.random()+"&path=m"+this.Direction;
          if(this.forced)
            this.StartStepTimer(15);
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
      this.usedObjects=new Object();
      setTimeout(top.combats_plugins_manager.get_binded_method(this,this.clearUsedObjects),60*60*1000);
      this.skip_quest = false;
    },

    "onloadHandler": function() {
      try {
        var d=top.frames[3].document;
		var doc_inner=d.body.innerHTML.toString(); // ----------- Added by Solt
		var cur_time = (new Date()).toLocaleTimeString(); // ------------ Added by Solt
		var loc="http://"+d.location.hostname+d.location.pathname; // ------------ Added by Solt
		var Obj_ar=new Array();
        if(d.location.pathname.search(/^\/dungeon\d*\.pl/)!=0)
          return;
        tables = d.getElementsByTagName('TABLE');

		if( (Red_str=doc_inner.match(/red>(.*?)<BR>/)) && this.sys_msg ){ // ------- ����� �������� (�� ��� �������� � ����� ���������) ------- Added by Solt
			top.Chat.am(this.sys_msg + '<i>'+Red_str[1]+'<i>');
			this.sys_msg='';
		}

        if (tables.length<2 || tables[0].cells.length<2 
          || tables[0].cells[1].getElementsByTagName('A').length!=1 || tables[0].cells[1].getElementsByTagName('A')[0].href.search(/\?out=/)<0) 
          return;

        if (tables[0].rows(1).cells(0).innerText.search('� ��� ������� ����� ����� ��������')>=0) {
          this.skip_quest = true;
        }

        if (tables[0].rows(1).cells(0).innerText.search('�� ������� �����')>=0) {
          this.skip_quest = true;
          setTimeout(top.combats_plugins_manager.get_binded_method(
            this,
            function(){
              alert('�������� ������� � �������');
              this.skip_quest = false;
            }),0);
        }

        tables[0].rows(1).cells(0).innerHTML += '<table><tr><td><table>\
    <tr><td><td><img id="i1" src="http://img.combats.ru/i/move/navigatin_52.gif" style="cursor:pointer"><td>\
    <tr><td><img id="i7" src="http://img.combats.ru/i/move/navigatin_59.gif" style="cursor:pointer" onclick="this.setDirection(7)"><td id="td_stop" style="background-color:black;"><td><img id="i3" src="http://img.combats.ru/i/move/navigatin_62.gif" style="cursor:pointer" onclick="this.setDirection(3)">\
    <tr><td><td><img id="i5" src="http://img.combats.ru/i/move/navigatin_67.gif" style="cursor:pointer" onclick="this.setDirection(5)"><td></table>\
    <td>\
    <input type="checkbox" id="en_click"'+(this.en_click?' CHECKED':'')+'>&nbsp;������� �� ��������<br>\
    <input type="checkbox" id="mat_click" onclick="this.mat_click=this.checked"'+(this.mat_click?' CHECKED':'')+'>&nbsp;�������� �����������<br>\
    <input type="checkbox" id="ignoreWall" onclick="if(this.ignoreWall=this.checked)document.all.autoPilot.checked=this.autoPilot=false"'+(this.ignoreWall?' CHECKED':'')+'>&nbsp;������������ �����������<br>\
    <input type="checkbox" id="autoPilot" onclick="if(this.autoPilot=this.checked)document.all.ignoreWall.checked=this.ignoreWall=false"'+(this.autoPilot?' CHECKED':'')+'>&nbsp;�������������<br>\
    <input type="checkbox" id="autoAttack" onclick="this.autoAttack=this.checked"'+(this.autoAttack?' CHECKED':'')+'>&nbsp;�������������<br>\
    </table>';

//---------- �������� ������� ������ 		
		tab='<table border=0 cellspacing=8 cellpadding=0 id="Radar_table">';
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
				for(var rl in arrLayers[y][x])
					for(var o in arrLayers[y][x][rl])
						for(var i in arrLayers[y][x][rl][o]){
							var Obj=arrLayers[y][x][rl][o][i];
							var Obj_X=parseInt(rl=='r'? x:-x);
							var Obj_Y=parseFloat(y);
								if(top.frames[3].nMyDirection & 2){ //���� ����������� 3 ��� 7, ������������ ���������� �������
									tmp=Obj_X;
									Obj_X=Obj_Y;
									Obj_Y=-tmp;
								}
								if(top.frames[3].nMyDirection & 4){ //���� 5 ��� 7 ������������� �� 180��
									Obj_X=-Obj_X;
									Obj_Y=-Obj_Y;
								}
								if(R_t.rows[-Obj_Y+3].cells[Obj_X+3].style.backgroundColor!='red')
									R_t.rows[-Obj_Y+3].cells[Obj_X+3].style.backgroundColor=(o=='arrObjects' ? 'green':'red');
								if(R_t.rows[-Obj_Y+3].cells[Obj_X+3].title!="")
									R_t.rows[-Obj_Y+3].cells[Obj_X+3].title+="\n";
								R_t.rows[-Obj_Y+3].cells[Obj_X+3].title+=Obj.name;
								if((x==0 && y==1) || (y==0 && x==1)){ //------- ���� ������� ��� � �����, �������� � ������.
									Obj_ar.push(Obj);
									if( o=='arrObjects' && !(Obj.id in this.usedObjects) && this.en_click){ //-------������� �� �������
										this.usedObjects[Obj.id]=true;
										if(top.ChatSys) //------------ �������� � ���� �� ��� ������� (���� �������� ��������)
											this.sys_msg='<font class=date2>'+cur_time+'</font> �������� ������ <b>'+Obj.name+'</b>, ';
										top.frames[3].location=loc+"?useobj="+Obj.id;
										return;
									}else if(this.autoAttack && (doc_inner.search(/DIV(.{2,18})LeftFront0_0/i)<0)){//-- �������� ���� ��� �����
										if(Obj.action && Obj.action.search(/attack/)>=0){
											top.frames[3].location=loc+"?attack="+Obj.id;
											return;
										}
									}
								}
						}
		
		
        for (var i=1; i<8; i+=2)
          d.all['i'+i].onclick = top.combats_plugins_manager.get_binded_method(this,this.setDirection, i);

        d.all['td_stop'].onclick = top.combats_plugins_manager.get_binded_method(this,this.stop_it);
        d.all['en_click'].onclick = top.combats_plugins_manager.get_binded_method(this,function(){this.en_click=top.frames[3].document.all['en_click'].checked;});
        d.all['mat_click'].onclick = top.combats_plugins_manager.get_binded_method(this,function(){this.mat_click=top.frames[3].document.all['mat_click'].checked;});
        d.all['ignoreWall'].onclick = top.combats_plugins_manager.get_binded_method(this,function(){this.mat_click=top.frames[3].document.all['ignoreWall'].checked;});
        d.all['autoPilot'].onclick = top.combats_plugins_manager.get_binded_method(this,function(){this.mat_click=top.frames[3].document.all['autoPilot'].checked;});
        d.all['autoAttack'].onclick = top.combats_plugins_manager.get_binded_method(this,function(){this.autoAttack=top.frames[3].document.all['autoAttack'].checked;});
		
        if (this.Direction) {
          img=d.all("i"+this.Direction);
          img.src=img.src.replace(/\.gif$/,"b.gif");
        } else
          d.all("td_stop").style.backgroundColor="red";

		  
// ---------- try drop ----------
        for(i=0;i<d.links.length;i++) {
          link=d.links(i);
          if (link.href.search(/dungeon\d*\.pl\?get=/)>=0 && (this.mat_click || (link.children(0).src.search(/mater\d\d\d\.gif/)>=0 && !this.skip_quest))) {
            top.frames[3].location = link.href;
            return;
          }
        }
		
		getElement=d.getElementById;
        if (this.autoPilot) {
          if (this.Direction && !getElement("m"+this.Direction)) {
            if (getElement("m1")) {
              this.setDirection(1);
            } else {
              el = getElement("m"+((this.Direction+6)%8));
              er = getElement("m"+((this.Direction+2)%8));
              if (er && !el)
                setTimeout("top.frames[3].location=top.frames[3].location.pathname+'?rnd="+Math.random()+"&path=rr';",100);
              else if (el && !er)
                setTimeout("top.frames[3].location=top.frames[3].location.pathname+'?rnd="+Math.random()+"&path=rl';",100);
              return;
            }
          }
        }

        var mtime = top.frames[3].mtime*(1-(top.frames[3].progressAt/top.frames[3].progressEnd));
        if (mtime<0)
          mtime = 0;
        if(!this.forced || this.steptimer==null || mtime==0) {
          if (getElement("m"+this.Direction) && (this.Direction!=1 || !("l2op1" in d.all) || d.all["l2op1"].childNodes.length>1 )){

            this.StartStepTimer(mtime);
		  }
        }
        d.parentWindow.attachEvent("onbeforeunload",top.combats_plugins_manager.get_binded_method(this,this.onunloadHandler));
      } catch (e) {
        e.Function = 'onLoadHandler';
        combats_plugins_manager.logError(this,e);
      }
    },

    "init": function() {
      top.combats_plugins_manager.attachEvent(
        'mainframe.load',
        top.combats_plugins_manager.get_binded_method(this,this.onloadHandler));
      this.clearUsedObjects();
	  
    }
  };
    
  return new plugin_walk();
})()