<script language="javascript">

city = /http:\/\/(.*?)city\.combats\.ru/.exec(document.location);
if (city) {
  hostname=city[1];
}      

//���������, �����)
AutoAttack=0;  //������������� �� �����, ������ ����(1) ���� ������ ����������� �������� �� ����� ����, ������� �������� ����� ����
AutoStep=0;    //�������� �� ����� ������. ����� ������ ��������� �� ����� �����, ��� ����������� �������� �� ����� (���������, ������� � �.�.)
pet=0;         //��������� �����. ���� �������� ����������, ������
rules=1;       //��������� �������. ������ ������ ��� ��������� ������ ������� ��� ������ ���������
fixed=1;       //������������� ���� ������ ������


//������������ ������. ���� ����� �� �����, ������ �������� ��� ��������, ����� ��� �� ���� ������ ��������� ������ ������
//��������� �� ��������

block_activeshield = 'block_activeshield';
block_fullshield = 'block_fullshield';

counter_ward = '���������';
counter_bladedance = '���������';
counter_deathwalk  = 'counter_deathwalk';

hp_enrage = 'hp_enrage'
hp_defence = 'hp_defence'
hp_circleshield = '���������';
hp_cleance = 'hp_cleance';

multi_hiddenpower = 'multi_hiddenpower';
multi_skiparmor = '���������';
multi_hitshock = '���������';
multi_hiddendodge = 'multi_hiddendodge';

hit_empower = 'hit_empower';
hit_willpower = 'hit_willpower';

spirit_block25 = 'spirit_block25';

krit_wildluck = 'krit_wildluck';
krit_blindluck = 'krit_blindluck';
krit_bloodlust = 'krit_bloodlust';

parry_secondlife = 'parry_secondlife';
parry_prediction = 'parry_prediction';

//����� ������ ����. ����� ��������� ������ �� ���� ����� �� ��������, �� �����������   
var BKBOTFLbottomframe = document.frames('bottom');

//������ ��������� ����������� - ������������� ��������� �� ��������, ���� �������� ���� ��������� �� ������
var RError = /������ �� ���������|��������� ����� ��� ����|����� �������� ��� ��� ����|��� ������������� ����� ����|��� ������� ���/i;

//������ ����������, ������� ��� ����� ����� �� �����
var R4click = /��������� ����|��������� ����|������ � ���� �����|������� ������|������ � ���� �����|������|�������|������ ������|�����������1|������|�������|�����/i;

//����� ������ � ������ ����, ����� �� ��������, ��������� ������
function WriteStr(str) {
  BKBOTFLbottomframe.window.document.F1.text.value = str;
}
  
//����� ���������� ������ ����� ������ ������ �� ��������� ������ �� ��� ������  
function get_main(){
  r = /^main/i
  for (i = 0; i < document.frames.length; i++) {
    ra = r.exec(document.frames[i].name);
    if (ra!=null) {
      tmp=document.frames[i].name;
      return document.frames(tmp);
    }
  }
}

//���������� ���-�� ��������� ������
function BonusValue(str)
{   
  l = document.getElementsByTagName("SPAN").length;  
  for (i=0; i<l; i++) {    
    ts = document.getElementsByTagName("SPAN")[i];
    if (ts.innerHTML.indexOf('/' + str + '.gif') >= 0) {
      res = /<SPAN>(\d+)<\/SPAN>/.exec(ts.innerHTML);
      if (res) {        
        return res[1];
      }  
    }  
  }  
  return 0;
}

//���������, ����������� �� ������� �����
function TrickOn(inobj, str)
{
  l = inobj.getElementsByTagName("button").length;  
  for (i=0; i<l; i++) {
    if (inobj.getElementsByTagName("button")[i].className == 'UserSlotEffect') {      
      ts = inobj.getElementsByTagName("button")[i];
      if (ts.innerHTML.indexOf(str + '.gif') >= 0) {
        return 1;
      }
    }
  }
  return 0;
}

//������� �� �����. ��� ���� ������ ��� ������� �������� � ��������� ��, ��������
function GetHP(inobj)
{
  res = /top\.setHP\((\d+),(\d+),(\d+)\)/.exec(inobj.body.innerHTML);  
  if (res) {
    return res[1];
  } else {
    return '';
  }      
  //top.setHP(1537,1567,275)
}

//������������ �����
function GoToLink(sublink)
{   
  //alert (inobj.body.innerHTML);
  var l = document.getElementsByTagName("button").length;  
  for (i=0; i<l; i++) {
    var ts = document.getElementsByTagName("button")[i];
    if (ts.className == 'UserBattleMethod') {            
      if (ts.innerHTML.indexOf(sublink + '.gif') >= 0) {
        ts.click();
        return 1;
      }
    }
  }
  return 0;
}

//����� ������ ������
function BKBOTFindButton(inobj, ftype, fvalue, fname)
{

  l = inobj.document.getElementsByTagName("button").length;  
 if (inobj != null)
 {
  for (i = 0; i < inobj.length; i++)
  {
   var isValue = false;
   var isType = false;
   var isName = false;

   if (fname != null && inobj[i].name == fname)
   {
    isName = true;
   }

   if (fvalue != null && inobj[i].value == fvalue)
   {
    isValue = true;
   }

   if (ftype != null && inobj[i].type == ftype)
   {
    isType = true;
   }

   if ( ((fname != null && isName) || fname == null) && ((fvalue != null && isValue) || fvalue == null) && ((ftype != null && isType) || ftype == null))
   {
    return inobj[i];
   }
  }
 }
 return false;
}

//������� ����� �� ������ ����. �����������, ���� ��� ������ ���������� ���� ����� ������ ����� � ��� ��� �������� ���������� ��������� ����
function ReadStr() {
  return BKBOTFLbottomframe.window.document.F1.text.value;
}


//�_����_������_������_������ ��/���?))
function RadioPanel (inobj) {  
  l = document.getElementsByTagName("button").length;  
  for (i=0; i<l; i++) {
    if (document.getElementsByTagName("button")[i].className == 'UnitBattleAttackDisable') {
      return 1;
    }
  }
  return 0;
}

//����������� ��� �����
function RadioPanelSetA (inobj, n) {
  l = document.getElementsByTagName("button").length;  
  idx = 0; 
  for (i=0; i<l; i++) {
    if (document.getElementsByTagName("button")[i].className == 'UnitBattleAttackDisable' || document.getElementsByTagName("button")[i].className == 'UnitBattleAttack') {
      idx++;
      if (document.getElementsByTagName("button")[i].className == 'UnitBattleAttackDisable') {
        if (idx == n) {
          document.getElementsByTagName("button")[i].click();
          break;
        }
      }  
    }
  }
}

//����������� ��� �����
function RadioPanelSetD (inobj, n) {
  l = document.getElementsByTagName("button").length;  
  idx = 0; 
  for (i=0; i<l; i++) {
    if (document.getElementsByTagName("button")[i].className == 'UnitBattleDefendDisable' || document.getElementsByTagName("button")[i].className == 'UnitBattleDefend') {
      idx++;
      if (document.getElementsByTagName("button")[i].className == 'UnitBattleDefendDisable') {
        if (idx == n) {
          document.getElementsByTagName("button")[i].click();
          break;
        }  
      }
    }
  }
}

//����� �� ����� �� ������ ������
function RadioPanelButton (inobj, cname) {
  l = document.getElementsByTagName("button").length;  
  for (i=0; i<l; i++) {
    if (document.getElementsByTagName("button")[i].className == cname) {
      return document.getElementsByTagName("button")[i];
    }
  }
}

if (BKBOTlastact == null)
{
 var BKBOTivl = null;
 var BKBOTlastact = 0;

    //���� ����. ���������� � �����. ������ ������ - ���� ���� ����� �������� � �������� ���������� ������� ���������. ���� ��������� ���������� - ��������� �����-�� ��������
 function BKBOTcheckBit()
 {    
  BKBOTlastact++;
  var BKBOTmainframe = get_main();        
  if (BKBOTmainframe.document.readyState == 'complete' && BKBOTmainframe.document.body != null && BKBOTmainframe.document.body.readyState == 'complete' && BKBOTlastact >= 1)
  {
      var BKBOThtml = new String(BKBOTmainframe.document.body.innerHTML);
                                      
   if (RadioPanel(BKBOTmainframe) && BKBOThtml == '')
            //��� �� � ��� � ����� �� ������ �����)
   {
                
    var BKBOTattackbtn = RadioPanelButton(BKBOTmainframe, 'UserBattleCommit');                
                
    if (BKBOTattackbtn)
    {
                    //������ - ���� ���
                    if (RadioPanel(BKBOTmainframe)) {
        var BKBOTdefend = Math.floor(Math.random()*5);
                       if (fixed) {
                         BKBOTdefend = 4;
                       }
        RadioPanelSetD(BKBOTmainframe, BKBOTdefend);
                    }
                    
                    //���� ������ � ������ ���������� ����� ������� ������ ����
                    //� ����� ���� ������������� 2 ����� �� 2� � 5� ����� 
                    RadioPanelSetA(BKBOTmainframe, 2);
                    RadioPanelSetA(BKBOTmainframe, 5);

                    //� ���� ���� ��� ����� � 2 �����, ���������������� ���� ����)
                    /*RadioPanelSetA(BKBOTmainframe, 1);
                    RadioPanelSetA(BKBOTmainframe, 8);
                    RadioPanelSetA(BKBOTmainframe, 15);*/
                    
   

                    //���� ����� ������ ��� �������. ���� ������ ������� ������ ������������ ����� ���� - ������ ��� ����) 
                    //������ � �������� ������
     if (!(TrickOn(BKBOTmainframe.document, block_activeshield) || TrickOn(BKBOTmainframe.document, block_fullshield))) {
       if (GoToLink(block_fullshield)) {
        BKBOTlastact = 0;
       } else
       if (GoToLink(block_activeshield)) {
        BKBOTlastact = 0;
       }
     }                                                                                 
                  
                    //���� ������ �� �������� - ����� ������������
                    if (!(TrickOn(BKBOTmainframe.document, block_fullshield))) {
                        if (GoToLink(counter_ward)) {
                  BKBOTlastact = 0;
                        }
                    }

                    //���� ������� 8 ������ - ����� ������
                    if (BKBOTlastact > 0 && (BonusValue('hp') >= 8)) {
                        if (GoToLink(hp_enrage)) {
                          BKBOTlastact = 0;
                        }
                    }

                    //���� ������� 8 ������ - ����� ���������
                    if (BKBOTlastact > 0 && (BonusValue('hp') >= 5)) {
                        if (GoToLink(hp_defence)) {
                          BKBOTlastact = 0;
                        }
                    }
                    
                    //�������� ������. ��� �����������.
                    if (BKBOTlastact > 0 ) {
                        if (GoToLink(hp_circleshield)) {
                          BKBOTlastact = 0;
                        }
                    }
                    
                    
                    //���� 9+ ������� - ����� ����� ������
     if (BKBOTlastact > 0 && (BonusValue(2) >= 9)) {
                        if (GoToLink(counter_bladedance)){
                           BKBOTlastact = 0;
                        } 
                    }

                    //���� �������� ��������� ����� ��� ������� ������ - ����� ������� ���� (�����)
                    if (BKBOTlastact > 0 && (TrickOn(BKBOTmainframe.document, counter_deathwalk)||TrickOn(BKBOTmainframe.document, hit_empower))) {
                      if (GoToLink(multi_hiddenpower)) {
                        BKBOTlastact = 0;
                      }
                    }
                    
                    //���� ������� 6 ������ � �� �������� ������� ������ - ����� ��������� �����
                  if (!rules && BKBOTlastact > 0 && (BonusValue(0) >= 6) && !TrickOn(BKBOTmainframe.document, counter_deathwalk)) {
                        if (GoToLink(hit_empower)){
                           BKBOTlastact = 0;
                        } 
                    }

                   //���� ���������� 23 ������ - ������� ������, �� ��������� �� ����� ���
                   if (BKBOTlastact > 0) {
                      if (BonusValue(2) >= 23) {
                        if (GoToLink(counter_deathwalk)) {
                          BKBOTlastact = 0;
                        }  
                      }
                    }

                   //���� ���������� 8 ������ - ��������� �����. ��� ������ � ��� ,����� ��������������� ���� ��� �����, �� ��� �����������
                   if (BKBOTlastact > 0) {
                      if (BonusValue(0) >= 8) {
                        if (GoToLink(hit_empower)) {
                          BKBOTlastact = 0;
                        }  
                      }
                    }

                    //������ ���� - �������� ��� (�� �������� ������). ��������� �����
                    if (BKBOTlastact > 0 && (GetHP(BKBOTmainframe.document) != 'red')) {
                      if (GoToLink(multi_skiparmor)) {
                        BKBOTlastact = 0;
                      }
                    }

                    //���� � ������, ���� ������� ��. 
                    if (BKBOTlastact > 0 && (GetHP(BKBOTmainframe.document) == 'red')) {
                      if (GoToLink(hit_willpower)) {
                        BKBOTlastact = 0;
                      }
                    }


                    //��������� �������� ���� ������� ����
                    if (BKBOTlastact > 0 && pet) {
                      if (GoToLink('pet_unleash')) {
                        BKBOTlastact = 0;
                      }
                    }            

                    //���� ������� ����� - ��������� ������
                    if (BKBOTlastact > 0 && (TrickOn(BKBOTmainframe.document, 'wis_dark_souleat') || 
                                             TrickOn(BKBOTmainframe.document, 'wis_water_poison08')
                                            )) {
                      if (GoToLink(hp_cleance)) {
                        BKBOTlastact = 0;
                      }
                    }
   
                    //���� ����� - �����:
                    //��� �� ������, ���� �������� ������, �� ����� ��� �����
                    if (BKBOTlastact > 0  &&                     
                        !GoToLink(multi_hiddendodge) &&                   
                        !GoToLink(spirit_block25) &&                     //���������� ������
                        !GoToLink(krit_wildluck) &&                      //����� �����
                        !GoToLink(krit_blindluck) &&                     //������ �����
                        !GoToLink(krit_bloodlust) &&                     //����� �����
                        !GoToLink(multi_hitshock) &&                    //�����
                        !GoToLink(parry_secondlife) &&                   //������������ + ��
                        !(rules && GoToLink(counter_deathwalk)) &&       //������� ������ ���� rules<>0
                        !(rules && GoToLink(hit_empower)) &&       
                        !GoToLink(hit_willpower) &&                      //���� � ������
                        !GoToLink(parry_prediction)) {                   //����� ��� ��
      BKBOTattackbtn.click();
                        //alert(BKBOTattackbtn.visible);
              }
                    BKBOTlastact = 0;
    }
   }

   else if (BKBOThtml.indexOf('������� ���� ����������...') >= 0)
   {
                //����������� ���� ���� �����. 
    var BKBOTrefreshbtn = RadioPanelButton(BKBOTmainframe, 'UserBattleRefresh');
                
    if (BKBOTrefreshbtn)
    {
     if (BKBOTlastact >= 3)
     {
      BKBOTrefreshbtn.click();
      BKBOTlastact = 0;
     }
    }
   }
   else if (BKBOThtml.indexOf('�� ������������ � �� ������ ������������� ������� ��������...') >= 0)
            //� ��� ��� ����� �� ����� �������. ���� ��� � ���, �� �� ��������, �����������
   {
    var BKBOTrefreshbtn = RadioPanelButton(BKBOTmainframe, 'UserBattleRefresh');
    if (BKBOTrefreshbtn)
    {
     if (BKBOTlastact >= 3)
     {
      BKBOTrefreshbtn.click();
      BKBOTlastact = 0;
     }
    }
   }
            
   else if (BKBOThtml.indexOf('��� ��� ��� �������. ������� ���� �������� � ������ ������...') >= 0)
            //��� ������, ����������)
   {
    if (BKBOTlastact >= 20)
    {
     var BKBOTrefreshbtn = RadioPanelButton(BKBOTmainframe, 'UserBattleRefresh');
                    //BKBOTFindButton(BKBOTmainframe.document.forms['f1'].elements, 'submit', '��������', 'battle');
     if (BKBOTrefreshbtn) { BKBOTrefreshbtn.click(); }
     BKBOTlastact = 0;
    }
   }
            
   else if (BKBOThtml.indexOf('��� ��������.') >= 0)
            //������� �� ���
   {
    if (BKBOTlastact >= 20)
    {
     var BKBOTrefreshbtn = RadioPanelButton(BKBOTmainframe, 'UserBattleEnd');                
     if (BKBOTrefreshbtn) { BKBOTrefreshbtn.click(); }
     BKBOTlastact = 150;
    }
   }
            
   else if (BKBOThtml.indexOf('The server is temporarily busy. Try again later') >= 0)
            //���. �������� ������, ��������� �����������, ����� �������� ���)
   {
    if (BKBOTlastact >= 10)
    {
     get_main().document.location = "http://" + hostname + "city.combats.ru/battle.pl";
     BKBOTlastact = 0;
    }
   }

   else if (BKBOThtml.indexOf('Internal Server Error') >= 0)
            //����������
   {
    if (BKBOTlastact >= 5)
    {
     get_main().document.location = "http://" + hostname + "city.combats.ru/battle.pl";
     BKBOTlastact = 0;
    }
   }
      else if (!RError.test(BKBOTmainframe.document.body.innerText) && GoToLink('dungeon.pl?get=')) 
   {
    //����� �� ����� ����� (��������� ��� � ������ �����)   
            }

      else if (BKBOTmainframe.document.all.lv2o != null && !RError.test(BKBOTmainframe.document.body.innerText))
            //����� ������� ����� ����� ��������. �� ������� � ������� ��������
   {
                var obj1 = BKBOTmainframe.document.all.lv2o;
    if (BKBOTlastact >= 10 && R4click.test(obj1.alt))
    {
                    obj_id = /dungeon_obj\(\'(\d+)\'\)/.exec(obj1.onclick)[1];
     BKBOTmainframe.document.location = "http://" + hostname + "city.combats.ru/dungeon.pl?useobj=" + obj_id + '&r=' + Math.random();
     BKBOTlastact = BKBOTlastact - 50;
    }
   }

      if (/attack=1&use=�������','.*?'/.test(BKBOTmainframe.document.body.innerHTML))
            //��������, �����, �� �� ������
   {
                if (BKBOTlastact >= 10 && AutoAttack) {

                    if (monster_id = /attack=1&use=�������','(.*?)'/.exec(BKBOTmainframe.document.body.innerHTML))
                    {                       
                       if (GetHP(BKBOTmainframe.document) != 'red') {
        BKBOTmainframe.document.location = "http://" + hostname + "city.combats.ru/dungeon.pl?attack=" + monster_id[1];
                       }                           
        BKBOTlastact = 0;
                    }
    }
   }

            //���� ���� ���� ����������� �� ��������. ���� ����������� �� ����� �����, ���� ����������� ������ ����������
            //m�m�m�m�...m�, ��� � - ����� ������ �� ��������� �������� (1-8). �� ���������� ������ ������������� ��� ������� 
            //����� ��������, ������ ���� � ������� ��� ��� �����. ����� ������� ���������� �������, ��� ����� ��������������� �������� ��� ����������, "���������", �����) �������
            if (AutoStep && BKBOTmainframe.document.all.m1 != null && BKBOTlastact >= 120 && ReadStr().indexOf('������') == 0) {
               BKBOTmainframe.document.location = BKBOTmainframe.document.all.m1.href;
               BKBOTlastact = 0;
            }

            if (BKBOTmainframe.document.all.m8 != null && BKBOTlastact >= 120 && ReadStr().indexOf('+') == 0) {
               cmd = ReadStr()
               step = ''; 
               if (cmd.length > 1) {
                 step = cmd.substring(1, 3);
                 if (step.substring(0, 1) == 'm') {
                   BKBOTmainframe.document.location = BKBOTmainframe.document.all(step).href;
                 }
                 BKBOTFLbottomframe.window.document.F1.text.value = '+' + cmd.substring(3);
               }
               if (step == 'm8' || step == 'm2') {
                 BKBOTlastact = 160;
               } else {
                 BKBOTlastact = 0;
               }  
            }

      if (AutoStep && BKBOTmainframe.document.all.m8 != null && ( (BKBOTlastact >= 120) || ( ReadStr().indexOf('�������') == 0 && BKBOTlastact > 0 ) ) ) {
              if (BKBOTFLbottomframe.window.document.F1.text.value == '�������') {
                 if (BKBOTmainframe.document.all.m1 != null) {
     BKBOTmainframe.document.location = BKBOTmainframe.document.all.m1.href;
                    BKBOTFLbottomframe.window.document.F1.text.value = '';
     } else {
                    BKBOTmainframe.document.location = BKBOTmainframe.document.all.m8.href;
                    BKBOTFLbottomframe.window.document.F1.text.value = '�������';
                 }
              }
        else if (BKBOTmainframe.document.all.m7 != null) {
       BKBOTmainframe.document.location = BKBOTmainframe.document.all.m8.href;
                BKBOTFLbottomframe.window.document.F1.text.value = '�������';
              }
        else if (BKBOTmainframe.document.all.m1 != null) {
       BKBOTmainframe.document.location = BKBOTmainframe.document.all.m1.href;
                BKBOTFLbottomframe.window.document.F1.text.value = '';
              }
        else {
       BKBOTmainframe.document.location = BKBOTmainframe.document.all.m2.href;
                BKBOTFLbottomframe.window.document.F1.text.value = '������� �������';
              }
              BKBOTlastact = 0;
   }
  }
 }
 BKBOTivl = setInterval("BKBOTcheckBit()", 500);
 alert('���� ��� ������� �������!');

}
else
{
 clearInterval(BKBOTivl);
 alert('��������! �� ��������� ����-���!');
 BKBOTlastact = null;
}

</script>
