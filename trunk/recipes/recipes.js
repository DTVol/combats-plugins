<html><head><title>�������� ����������</title></head><body>
<table width=100% height=100%>
<tr><td>���������� ��������: <select id="show_type" onchange="show_type=this.value;save_cfg();ShowComponents()"><option value='0'>(���)</option><option value='1'>�����������</option><option value='2'>����</option></select>
<td><select id="locations" onchange="save_cfg();ShowRecipes()"></select></tr>
<tr height=50%><td rowspan=2><iframe id="components" width="100%" height="100%"></iframe>
<td><iframe id="recipes" width="100%" height="100%"></iframe></tr>
<tr height=50%><td><iframe id="accepted" width="100%" height="100%"></iframe></table>
<script language="JavaScript"><!--
var components = [
  {id:'mater1', count:0, used:0, name:'����� ��������� �����', is_material:true},
  {id:'mater2', count:0, used:0, name:'������', is_material:true},
  {id:'mater3', count:0, used:0, name:'�������', is_material:true},
  {id:'mater4', count:0, used:0, name:'�������� �������', is_material:true},
  {id:'mater5', count:0, used:0, name:'������', is_material:true},
  {id:'mater6', count:0, used:0, name:'�������� ������', is_material:true},
  {id:'mater7', count:0, used:0, name:'������ ��������� ����', is_material:true},
  {id:'mater8', count:0, used:0, name:'����������', is_material:true},
  {id:'mater9', count:0, used:0, name:'������ �������� ������', is_material:true},
  {id:'mater10', count:0, used:0, name:'���� �������� ������', is_material:true},
  {id:'mater11', count:0, used:0, name:'���� ������ �����', is_material:true},
  {id:'mater12', count:0, used:0, name:'�����', is_material:true},
  {id:'mater13', count:0, used:0, name:'�������� ������ �������', is_material:true},
  {id:'mater14', count:0, used:0, name:'������� �����', is_material:true},
  {id:'mater15', count:0, used:0, name:'������� �������', is_material:true},
  {id:'mater16', count:0, used:0, name:'��������� ������', is_material:true},
  {id:'mater17', count:0, used:0, name:'���� �������� ������', is_material:true},
  {id:'mater18', count:0, used:0, name:'������������ ������', is_material:true},
  {id:'mater19', count:0, used:0, name:'�������� ������', is_material:true},
  {id:'mater20', count:0, used:0, name:'�������� ������� �����', is_material:true},
  {id:'mater21', count:0, used:0, name:'�������� �������', is_material:true},
  {id:'mater22', count:0, used:0, name:'�������� �������', is_material:true},
  {id:'mater23', count:0, used:0, name:'�������', is_material:true},
  {id:'mater24', count:0, used:0, name:'���������', is_material:true},
  {id:'mater25', count:0, used:0, name:'�������� ������ �������', is_material:true},
  {id:'mater26', count:0, used:0, name:'�������� ������������', is_material:true},
  {id:'mater27', count:0, used:0, name:'������ ���������� ������', is_material:true},
  {id:'mater28', count:0, used:0, name:'�������� �����', is_material:true},
  {id:'mater29', count:0, used:0, name:'�������� �����', is_material:true},
  {id:'mater30', count:0, used:0, name:'����� ���', is_material:true},
  {id:'mater31', count:0, used:0, name:'�������� ���������� �����', is_material:true}
];

var locations = [
  '��� ��������� ����� �������������',
  '������ � ��������� � ���������',
  '���������� � ���',
  '������ ������������ ��� � ���',
  '����������� � ������',
  '���������� � ������'
];

oOptions = document.all['locations'].options;
oOptions.length = 0;
for(var i in locations) {
  var oOption = document.createElement("OPTION");
  oOptions.add(oOption);
  oOption.innerText = locations[i];
  oOption.value = ""+i;
}

var recipes = [
  {name:'sp_tacpts_HIT1', descr:'������� ��� [1]', comp:['mater7',3], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_HIT2', descr:'������� ��� [2]', comp:['mater18',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_HIT3', descr:'������� ��� [3]', comp:['mater30',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_HIT4', descr:'������� ��� [4]', comp:['mater22',1], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_HIT5', descr:'������� ��� [5]', comp:['mater22',1,'mater23',1], location:3, possible:0, accepted:0},

  {name:'sp_tacpts_KRT1', descr:'������� ����� [1]', comp:['mater9',3], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_KRT2', descr:'������� ����� [2]', comp:['mater16',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_KRT3', descr:'������� ����� [3]', comp:['mater27',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_KRT4', descr:'������� ����� [4]', comp:['mater31',1], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_KRT5', descr:'������� ����� [5]', comp:['mater31',1,'mater23',1], location:3, possible:0, accepted:0},

  {name:'sp_tacpts_CNTR1', descr:'������� ������ [1]', comp:['mater10',3], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_CNTR2', descr:'������� ������ [2]', comp:['mater17',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_CNTR3', descr:'������� ������ [3]', comp:['mater28',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_CNTR4', descr:'������� ������ [4]', comp:['mater20',1], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_CNTR5', descr:'������� ������ [5]', comp:['mater20',1,'mater23',1], location:3, possible:0, accepted:0},

  {name:'sp_tacpts_BLK1', descr:'������� ������ [1]', comp:['mater11',3], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_BLK2', descr:'������� ������ [2]', comp:['mater19',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_BLK3', descr:'������� ������ [3]', comp:['mater29',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_BLK4', descr:'������� ������ [4]', comp:['mater21',1], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_BLK5', descr:'������� ������ [5]', comp:['mater21',1,'mater23',1], location:3, possible:0, accepted:0},

  {name:'sp_tacpts_PRY1', descr:'������� ��������� [1]', comp:['mater8',3], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_PRY2', descr:'������� ��������� [2]', comp:['mater15',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_PRY3', descr:'������� ��������� [3]', comp:['mater26',2], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_PRY4', descr:'������� ��������� [4]', comp:['mater24',1], location:3, possible:0, accepted:0},
  {name:'sp_tacpts_PRY5', descr:'������� ��������� [5]', comp:['mater24',1,'mater23',1], location:3, possible:0, accepted:0},

  
//��� ����� ������ ����� � ��� ������ ����: �����, ��������� ������, ���� �������� ������, ������������ ������, �������� �����, �������� �����.  
//��� ����� ������� ����� � ��� ������ ����: �������� �������, ������� ����� (3 ��.), �������� ������ �������, ������ ���������� ������, ����� ���, �������� ���������� �����, ���������.
//��� ����� ������ "��������� ��������� �����" � ��� ������ ����: �������� ������ �������, �������� ������������.
//��� ����� ������ "��������� ���������� �����" � ��� ������ ����: �����, ������� �������, ���� �������� ������, ������������ ������, ����� ���.
//��� ����� ������ "��������� ����������� ����" � ��� ������ ����: ���� �������� ������, ��������� ������, ������������ ������, �������� ������, ������ ���������� ������.
//��� ����� ������ "��������� ���������� ����" � ��� ������ ����: ���� ������ �����, ������� �����, ���� �������� ������, ������������ ������, �������� �����.
//��� ����� ������ "��������� ������� ���������" � ��� ������ ����: �������� ������������, �������� �����, ���������.
//��� ����� ������ "��������� ����������" � ��� ������ ����: �������� ������������, �������� �����, ���������.
//��� ����� ������ "���������� ������: ����������� ���� [1]" � ��� ������ ����: �������� ������ �������, ������� �����, ������� �������.
//��� ����� ������ "���������� ������: ����������� ���� [2]" � ��� ������ ����: ������ "���������� ������: ����������� ���� [1]", ������� ��� �������, ������ ��� �������, ���������� ��� �������.

  
  {name:'spell_ug_undam4c', descr:'��������� ��������� �����', comp:['mater25', 1, 'mater26', 1], location:1, possible:0, accepted:0},
  {name:'spell_ug_undam1c', descr:'��������� ���������� ����', comp:['mater11', 1, 'mater14', 1, 'mater17', 1, 'mater18', 1, 'mater29', 1], location:1, possible:0, accepted:0}, // ���������
  {name:'spell_ug_undam2c', descr:'��������� ����������� ����', comp:['mater10', 1, 'mater16', 1, 'mater18', 1, 'mater19', 1, 'mater27', 1], location:1, possible:0, accepted:0},
  {name:'spell_ug_undam3c', descr:'��������� ���������� �����', comp:['mater12', 1, 'mater15', 1, 'mater17', 1, 'mater18', 1, 'mater30', 1], location:1, possible:0, accepted:0},
  {name:'spell_ug_unp10c', descr:'��������� ����������', comp:['mater26', 1, 'mater28', 1, 'mater24', 1], location:1, possible:0, accepted:0},
  {name:'spell_ug_unexprc', descr:'��������� ������� ��������', comp:['mater28', 1, 'mater26', 1, 'mater24', 1], location:1, possible:0, accepted:0},
  {name:'spell_curse', descr:'������ �����', comp:['mater12', 1, 'mater28', 1, 'mater16', 1, 'mater17', 1, 'mater18', 1, 'mater29', 1], location:1, possible:0, accepted:0},
//  {name:'spell_curseb', descr:'������� �����', comp:['mater14', 1, 'mater4', 1, 'mater25', 1, 'mater11', 1], location:1, possible:0, accepted:0}, // �� ��������

//  {name:'spell_repare_1', descr:'������ ������� 1', comp:['mater17', 2, 'mater10', 1, 'mater1', 1, 'mater3', 1], location:1, possible:0, accepted:0},
//  {name:'spell_repare_3', descr:'������ ������� 3', comp:['mater8', 1, 'mater15', 1, 'mater1', 1, 'mater4', 1], location:1, possible:0, accepted:0},
//  {name:'spell_repare_5', descr:'������ ������� 5', comp:['mater12', 1, 'mater15', 1, 'mater7', 2], location:1, possible:0, accepted:0},
//  {name:'spell_repare_7', descr:'������ ������� 7', comp:['mater17', 1, 'mater7', 1, 'mater8', 1], location:1, possible:0, accepted:0},
//  {name:'spell_repare_10', descr:'������ ������� 10', comp:['mater4', 1, 'mater17', 1, 'mater7', 1, 'mater28', 1, 'mater9', 1], location:1, possible:0, accepted:0},

//  {name:'ring116', descr:'������ �������� ����', comp:['mater25', 1, 'mater21', 3], location:1, possible:0, accepted:0},
  {name:'ring116_1', descr:'������ �������� ���� [10]', comp:['sp_mat3', 1, 'mater27', 1, 'mater16', 3, 'mater4', 1], location:4, possible:0, accepted:0},

//  {name:'ring110', descr:'������ �����', comp:['mater30', 1, 'mater23', 3], location:1, possible:0, accepted:0},
  {name:'ring110_1', descr:'������ ����� [10]', comp:['mater30', 1, 'mater23', 3, 'sp_mat3', 1, 'mater25', 1, 'mater17', 3, 'mater12', 1], location:4, possible:0, accepted:0},

//  {name:'ring117', descr:'������ ������� ������', comp:['mater25', 1, 'mater21', 3], location:1, possible:0, accepted:0},
  {name:'ring117_1', descr:'������ ������� ������ [10]', comp:['sp_mat3', 1, 'mater27', 1, 'mater16', 3, 'mater4', 1], location:4, possible:0, accepted:0},

//  {name:'ring83', descr:'������ ��������', comp:['mater2', 5, 'mater11', 2, 'mater14', 1, 'mater15', 2], location:1, possible:0, accepted:0},
//  {name:'ring83', descr:'������ ��������', comp:['mater1', 2, 'mater6', 5, 'mater19', 1], location:1, possible:0, accepted:0},  // �� ��������

//  {name:'ring85', descr:'������ ��������', comp:['mater3',5,'mater10',2,'mater17',1,'mater18',1,'mater19',1], location:1, possible:0, accepted:0}, // ���������
//  {name:'ring85', descr:'������ ��������', comp:['mater3',5,'mater7',2,'mater18',1], location:1, possible:0, accepted:0}, // �� ��������

//  {name:'ring106', descr:'��������� ������', comp:['mater4', 3, 'mater7', 2, 'mater8', 4, 'mater13', 3], location:1, possible:0, accepted:0}, // ���������
//  {name:'ring106', descr:'��������� ������', comp:['mater1', 3, 'mater8', 2, 'mater11', 2, 'mater14', 1], location:1, possible:0, accepted:0}, // �� ��������
//  {name:'ring106', descr:'��������� ������', comp:['mater4', 3, 'mater7', 3, 'mater8', 4], location:1, possible:0, accepted:0}, // �� ��������

//  {name:'ring207', descr:'Simplicity Ring', comp:['mater12', 2, 'mater13', 3, 'mater28', 1, 'mater29', 1], location:1, possible:0, accepted:0},
//  {name:'ring104', descr:'������ ����', comp:['mater1',4,'mater5',4,'mater9',3,'mater16',2,'mater19',1], location:1, possible:0, accepted:0}, // ���������
//  {name:'ring99', descr:'����� ������ �������', comp:['mater6',5,'mater15',2,'mater26',2,'mater22',1], location:1, possible:0, accepted:0}, // ���������

  {name:'boots22', descr:'������� �������� ���� [10]', comp:['sp_mat1', 1, 'mater30', 3], location:4, possible:0, accepted:0},
  {name:'boots21', descr:'������ ����� [10]', comp:['sp_mat1', 1, 'mater29', 3], location:4, possible:0, accepted:0},
  {name:'shield82', descr:'��� ����� [10]', comp:['sp_mat17', 1, 'mater21', 1, 'mater14', 2], location:4, possible:0, accepted:0},
  {name:'shield84_1', descr:'��� ������� ������ [10]', comp:['sp_mat17', 1, 'mater13', 2, 'mater31', 1], location:4, possible:0, accepted:0},

//  {name:'', descr:'', comp:['mater',0,'mater',0,'mater',0,'mater',0,'mater',0], location:4, possible:0, accepted:0},

  {name:'enhp_6_revamp10', descr:'', comp:[], location:2, possible:0, accepted:0},
  {name:'enhp_6_revamp10_2', descr:'', comp:[], location:2, possible:0, accepted:0},
//  {name:'pot_base_200_bot4', descr:'�������� ������', comp:['mater30',1], location:2, possible:0, accepted:0},

  {name:'axe88', descr:'����� �������� ����', comp:['mater15',8,'mater5',8], location:0, possible:0, accepted:0},
  {name:'mace67', descr:'������ �������� ����', comp:['mater28',2,'mater5',5], location:0, possible:0, accepted:0},
  {name:'hammer70', descr:'����� �������� ����', comp:['mater15',9,'mater5',10], location:0, possible:0, accepted:0},
  {name:'armor106', descr:'����� �������� ����', comp:['mater20',1,'mater5',8], location:0, possible:0, accepted:0},
  {name:'knife72', descr:'������ �������� ����', comp:['mater28',1,'mater5',12], location:0, possible:0, accepted:0},
  {name:'sword103', descr:'��� �������� ����', comp:['mater28',1,'mater5',12], location:0, possible:0, accepted:0},
  {name:'naruchi77', descr:'�������� �������� ����', comp:['mater28',1,'mater5',3], location:0, possible:0, accepted:0},
  {name:'helmet80', descr:'���� �������� ����', comp:['mater15',5,'mater5',6], location:0, possible:0, accepted:0},
  {name:'shield83', descr:'��� �������� ����', comp:['mater28',1,'mater5',3], location:0, possible:0, accepted:0},
  {name:'amulet80', descr:'������ �������� ����', comp:['mater28',2], location:0, possible:0, accepted:0},
  {name:'ring116', descr:'������ �������� ����', comp:['mater28',1], location:0, possible:0, accepted:0},
  {name:'braslet24', descr:'������� �������� ����', comp:['mater28',1,'mater5',3], location:0, possible:0, accepted:0},
  {name:'clip80', descr:'������ �������� ����', comp:['mater28',2], location:0, possible:0, accepted:0},
  {name:'boots22', descr:'������� �������� ����', comp:['mater28',1,'mater5',5], location:0, possible:0, accepted:0},
  {name:'belt36', descr:'���� �������� ����', comp:['mater28',1,'mater5',4], location:0, possible:0, accepted:0},
//!!!  {name:'leg12', descr:'������ �������� ����', comp:['mater28',1,'mater5',5], location:0, possible:0, accepted:0},
  
  {name:'knife71', descr:'������ �����', comp:['mater30',1,'mater12',12], location:0, possible:0, accepted:0},
  {name:'axe87', descr:'����� �����', comp:['mater18',9,'mater12',8], location:0, possible:0, accepted:0},
  {name:'mace66', descr:'������ �����', comp:['mater30',2,'mater12',5], location:0, possible:0, accepted:0},
  {name:'boots21', descr:'������ �����', comp:['mater30',1,'mater12',5], location:0, possible:0, accepted:0},
  {name:'helmet79', descr:'���� �����', comp:['mater18',5,'mater12',6], location:0, possible:0, accepted:0},
  {name:'naruchi76', descr:'������ �����', comp:['mater30',1,'mater12',3], location:0, possible:0, accepted:0},
  {name:'belt35', descr:'���� �����', comp:['mater30',1,'mater12',4], location:0, possible:0, accepted:0},
  {name:'shield82', descr:'��� �����', comp:['mater30',1,'mater18',3], location:0, possible:0, accepted:0},
  {name:'clip76', descr:'������ �����', comp:['mater30',2], location:0, possible:0, accepted:0},
  {name:'amulet75', descr:'������ �����', comp:['mater30',2], location:0, possible:0, accepted:0},
  {name:'ring110', descr:'������ �����', comp:['mater30',1], location:0, possible:0, accepted:0},
  {name:'sword102', descr:'��� �����', comp:['mater30',1,'mater12',12], location:0, possible:0, accepted:0},
  {name:'naruchi78', descr:'�������� �����', comp:['mater30',1,'mater12',3], location:0, possible:0, accepted:0},
  {name:'armor105', descr:'����� �����', comp:['mater22',1,'mater12',8], location:0, possible:0, accepted:0},
//!!!  {name:'leg13', descr:'������ �����', comp:['mater30',1,'mater12',5], location:0, possible:0, accepted:0},

  {name:'axe89', descr:'����� ������� ������', comp:['mater19',9,'mater6',8], location:0, possible:0, accepted:0},
  {name:'clip81', descr:'������ ������� ������', comp:['mater25',2], location:0, possible:0, accepted:0},
  {name:'amulet81', descr:'������ ������� ������', comp:['mater25',2], location:0, possible:0, accepted:0},
  {name:'ring117', descr:'������ ������� ������', comp:['mater25',1], location:0, possible:0, accepted:0},
  {name:'knife73', descr:'������ ������� ������', comp:['mater25',1,'mater6',12], location:0, possible:0, accepted:0},
  {name:'boots23', descr:'������ ������� ������', comp:['mater25',1,'mater6',5], location:0, possible:0, accepted:0},
  {name:'naruchi79', descr:'�������� ������� ������', comp:['mater25',1,'mater6',3], location:0, possible:0, accepted:0},
  {name:'braslet25', descr:'������ ������� ������', comp:['mater25',1,'mater6',3], location:0, possible:0, accepted:0},
  {name:'belt37', descr:'���� ������� ������', comp:['mater25',1,'mater6',4], location:0, possible:0, accepted:0},
  {name:'helmet81', descr:'���� ������� ������', comp:['mater19',5,'mater6',6], location:0, possible:0, accepted:0},
  {name:'mace68', descr:'������ ������� ������', comp:['mater25',2,'mater6',5], location:0, possible:0, accepted:0},
  {name:'hammer71', descr:'����� ������� ������', comp:['mater19',9,'mater6',10], location:0, possible:0, accepted:0},
  {name:'sword104', descr:'��� ������� ������', comp:['mater25',1,'mater6',12], location:0, possible:0, accepted:0},
  {name:'armor107', descr:'����� ������� ������', comp:['mater31',1,'mater6',8], location:0, possible:0, accepted:0},
  {name:'shield84', descr:'��� ������� ������', comp:['mater25',1,'mater19',3], location:0, possible:0, accepted:0},
//!!!  {name:'leg11', descr:'������ ������� ������', comp:['mater25',1,'mater6',5], location:0, possible:0, accepted:0},

  {name:'ring129', descr:'������ ���������', comp:['mater30',1], location:0, possible:0, accepted:0},
  {name:'axe90', descr:'����� ���������', comp:['mater16',9,'mater3',8], location:0, possible:0, accepted:0},
  {name:'hammer74', descr:'��� ���������', comp:['mater30',2,'mater3',5], location:0, possible:0, accepted:0},
  {name:'knife77', descr:'������ ���������', comp:['mater30',1,'mater3',12], location:0, possible:0, accepted:0},
  {name:'sword105', descr:'��� ���������', comp:['mater30',1,'mater3',12], location:0, possible:0, accepted:0},
  {name:'boots27', descr:'������� ���������', comp:['mater30',1,'mater3',5], location:0, possible:0, accepted:0},
  {name:'naruchi86', descr:'�������� ���������', comp:['mater30',1,'mater3',3], location:0, possible:0, accepted:0},
  {name:'armor109', descr:'����� ���������', comp:['mater22',1,'mater3',8], location:0, possible:0, accepted:0},
  {name:'helmet85', descr:'���� ���������', comp:['mater16',5,'mater3',6], location:0, possible:0, accepted:0},
  {name:'braslet32', descr:'������� ���������', comp:['mater30',1,'mater3',3], location:0, possible:0, accepted:0},
  {name:'belt44', descr:'���� ���������', comp:['mater30',1,'mater3',4], location:0, possible:0, accepted:0},
  {name:'shield86', descr:'��� ���������', comp:['mater30',1,'mater16',3], location:0, possible:0, accepted:0},
  {name:'clip90', descr:'������ ���������', comp:['mater30',2], location:0, possible:0, accepted:0},
  {name:'amulet98', descr:'������ ���������', comp:['mater30',2], location:0, possible:0, accepted:0},
//!!!  {name:'leg16', descr:'������ ���������', comp:['mater30',1,'mater3',5], location:0, possible:0, accepted:0},

  {name:'ring128', descr:'������ ���������', comp:['mater29',1], location:0, possible:0, accepted:0},
  {name:'knife76', descr:'������ ���������', comp:['mater29',1,'mater10',12], location:0, possible:0, accepted:0},
  {name:'sword100', descr:'��� ���������', comp:['mater14',8,'mater10',9], location:0, possible:0, accepted:0},
  {name:'boots26', descr:'������� ���������', comp:['mater29',1,'mater10',5], location:0, possible:0, accepted:0},
  {name:'naruchi85', descr:'�������� ���������', comp:['mater29',1,'mater10',3], location:0, possible:0, accepted:0},
  {name:'armor108', descr:'����� ���������', comp:['mater21',1,'mater10',8], location:0, possible:0, accepted:0},
  {name:'helmet84', descr:'���� ���������', comp:['mater14',5,'mater10',6], location:0, possible:0, accepted:0},
  {name:'braslet31', descr:'������ ���������', comp:['mater29',1,'mater10',3], location:0, possible:0, accepted:0},
  {name:'belt43', descr:'���� ���������', comp:['mater29',1,'mater10',4], location:0, possible:0, accepted:0},
  {name:'shield85', descr:'��� ���������', comp:['mater29',1,'mater14',3], location:0, possible:0, accepted:0},
  {name:'clip89', descr:'������ ���������', comp:['mater29',2], location:0, possible:0, accepted:0},
  {name:'amulet97', descr:'������ ���������', comp:['mater29',2], location:0, possible:0, accepted:0},
//!!!  {name:'leg17', descr:'������ ���������', comp:['mater29',1,'mater10',5], location:0, possible:0, accepted:0},

  {name:'knife74_du2', descr:'������ ��������� ������', comp:['mater27',1,'mater2',11,'mater2',1], location:0, possible:0, accepted:0},
  {name:'axe90_du2', descr:'����� ��������� ������', comp:['mater16',9,'mater2',8], location:0, possible:0, accepted:0},
  {name:'hammer72_du2', descr:'����� ��������� ������', comp:['mater27',2,'mater2',5], location:0, possible:0, accepted:0},
  {name:'sword105_du2', descr:'��� ��������� ������', comp:['mater27',1,'mater2',11,'mater2',1], location:0, possible:0, accepted:0},
  {name:'boots24_du2', descr:'������ ��������� ������', comp:['mater27',1,'mater2',5], location:0, possible:0, accepted:0},
  {name:'naruchi83_du2', descr:'�������� ��������� ������', comp:['mater27',1,'mater2',3], location:0, possible:0, accepted:0},
  {name:'armor108_du1', descr:'����� ��������� ������', comp:['mater23',1,'mater2',8], location:0, possible:0, accepted:0},
  {name:'helmet82_du2', descr:'���� ��������� ������', comp:['mater16',5,'mater2',6], location:0, possible:0, accepted:0},
  {name:'braslet26_du2', descr:'������ ��������� ������', comp:['mater27',1,'mater2',3], location:0, possible:0, accepted:0},
  {name:'belt38_du2', descr:'���� ��������� ������', comp:['mater27',1,'mater2',4], location:0, possible:0, accepted:0},
  {name:'shield85_du2', descr:'��� ��������� ������', comp:['mater27',1,'mater16',3], location:0, possible:0, accepted:0},
  {name:'clip82_du2', descr:'������ ��������� ������', comp:['mater27',2], location:0, possible:0, accepted:0},
  {name:'amulet83_du2', descr:'�������� ��������� ������', comp:['mater27',2], location:0, possible:0, accepted:0},
  {name:'ring119_du2', descr:'������ ��������� ������', comp:['mater27',1], location:0, possible:0, accepted:0},
//!!!  {name:'leg14', descr:'������ ��������� ������', comp:['mater27',1,'mater2',5], location:0, possible:0, accepted:0},

  {name:'belt39', descr:'���� ���������', comp:['mater26',1,'mater1',4], location:0, possible:0, accepted:0},
  {name:'roba51', descr:'������ ���������', comp:['mater24',1,'mater1',8], location:0, possible:0, accepted:0},
  {name:'braslet27', descr:'������ ���������', comp:['mater26',1,'mater1',3], location:0, possible:0, accepted:0},
  {name:'helmet83', descr:'����� ���������', comp:['mater17',5,'mater1',6], location:0, possible:0, accepted:0},
  {name:'staff52', descr:'����� ���������', comp:['mater24',1,'mater17',2], location:0, possible:0, accepted:0},
  {name:'naruchi84', descr:'�������� ���������', comp:['mater26',1,'mater1',6], location:0, possible:0, accepted:0},
  {name:'boots25', descr:'������ ���������', comp:['mater26',1,'mater1',5], location:0, possible:0, accepted:0},
  {name:'leg15', descr:'����� ���������', comp:['mater26',1,'mater1',5], location:0, possible:0, accepted:0},

  
//  {name:'', descr:'', comp:['mater',0,'mater',0,'mater',0,'mater',0,'mater',0], location:4, possible:0, accepted:0},

// ����� ;)
  { name:'el1', descr:'�����', comp: ['elka_vetv1',4,'shar3_2005',3,'shar5_2005',3,'shar2_2005',2,'ny06ball1',2,'ny06ball9',2,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'el2', descr:'�����', comp: ['shar1_2005',6,'shar5_2005',3,'elka_vetv2',2,'elka_vetv1',2,'shar2_2005',2,'ny06ball6',1,'ny06ball7',1,'elka_base1',1,'ny06ball5',1,'ny06ball11',1], location:3, possible:0, accepted:0},
  { name:'nel3', descr:'�����', comp: ['shar3_2005',3,'elka_vetv2',3,'shar5_2005',2,'shar2_2005',2,'shar1_2005',2,'svechka3',1,'elka_vetv1',1,'shar6_2005',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'nel1', descr:'�����', comp: ['shar5_2005',4,'shar2_2005',4,'elka_vetv2',3,'ny06ball6',1,'elka_vetv1',1,'ny06ball9',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'gnel2', descr:'�����', comp: ['elka_vetv2',3,'shar2_2005',3,'shar5_2005',2,'bengal1',1,'elka_vetv1',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'gnel1', descr:'�����', comp: ['elka_vetv2',2,'shar5_2005',2,'elka_vetv1',2,'bengal1',1,'svechka1',1,'ny06ball3',1,'shar1_2005',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'gnel3', descr:'�����', comp: ['shar4_2005',6,'shar2_2005',5,'elka_vetv1',3,'shar3_2005',1,'elka_vetv2',1,'shar5_2005',1,'ny06ball3',1,'ny06ball9',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'elka_w8', descr:'�����', comp: ['shar4_2005',4,'elka_vetv1',3,'elka_vetv2',1,'shar5_2005',1,'bengal1',1,'ny06ball5',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'elka_w9', descr:'�����', comp: ['shar4_2005',3,'shar3_2005',2,'elka_vetv2',2,'elka_vetv1',2,'shar7_2005',1,'ny06ball4',1,'ny06ball10',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'elka_w2', descr:'�����', comp: ['shar5_2005',4,'elka_vetv2',3,'shar2_2005',3,'shar1_2005',3,'shar3_2005',1,'bengal1',1,'svechka1',1,'elka_vetv1',1,'ny06ball1',1,'ny06ball5',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'elka_w7', descr:'�����', comp: ['shar4_2005',4,'elka_vetv2',3,'shar5_2005',2,'shar2_2005',1,'ny06ball10',1,'elka_vetv1',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'elka_w3', descr:'�����', comp: ['shar2_2005',7,'elka_vetv1',4,'shar3_2005',3,'shar4_2005',1,'shar7_2005',1,'ny06ball3',1,'elka_base1',1,'ny06ball12',1], location:3, possible:0, accepted:0},
  { name:'elka_w5', descr:'�����', comp: ['shar3_2005',4,'elka_vetv2',3,'shar4_2005',2,'shar2_2005',2,'elka_vetv1',1,'ny06ball1',1,'ny06ball3',1,'elka_base1',1,'ny06ball8',1], location:3, possible:0, accepted:0},
  { name:'elka_w4', descr:'�����', comp: ['shar1_2005',4,'shar4_2005',3,'elka_vetv2',2,'elka_vetv1',2,'shar3_2005',1,'ny06ball6',1,'svechka1',1,'elka_base1',1,'shar8_2005',1], location:3, possible:0, accepted:0},
  { name:'elka_w6', descr:'�����', comp: ['elka_vetv1',4,'shar4_2005',2,'shar3_2005',2,'shar5_2005',2,'shar1_2005',2,'ny06ball4',1,'ny06ball5',1,'elka_base1',1,'ny06ball8',1,'ny06ball11',1], location:3, possible:0, accepted:0},
  { name:'elka_w1', descr:'�����', comp: ['elka_vetv2',3,'shar3_2005',2,'shar4_2005',1,'ny06ball7',1,'elka_vetv1',1,'ny06ball1',1,'ny06ball5',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'elka_w15', descr:'�����', comp: ['elka_vetv2',3,'shar5_2005',3,'shar3_2005',2,'shar2_2005',1,'ny06ball10',1,'elka_vetv1',1,'ny06ball3',1,'shar1_2005',1,'elka_base1',1,'ny06ball8',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'elka_w17', descr:'�����', comp: ['shar3_2005',3,'shar1_2005',3,'elka_vetv2',2,'elka_vetv1',2,'shar4_2005',1,'shar5_2005',1,'svechka2',1,'ny06ball3',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'elka_w12', descr:'�����', comp: ['elka_vetv1',4,'shar4_2005',2,'shar1_2005',2,'ny06ball6',1,'elka_base1',1,'shar8_2005',1], location:3, possible:0, accepted:0},
  { name:'elka_w13', descr:'�����', comp: ['elka_vetv1',4,'shar5_2005',3,'shar1_2005',3,'shar3_2005',2,'shar2_2005',2,'shar4_2005',1,'bengal1',1,'svechka1',1,'ny06ball1',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'elka_w14', descr:'�����', comp: ['shar1_2005',4,'elka_vetv2',3,'shar2_2005',2,'shar4_2005',1,'ny06ball6',1,'shar5_2005',1,'bengal1',1,'elka_vetv1',1,'ny06ball5',1,'elka_base1',1,'ny06ball12',1], location:3, possible:0, accepted:0},
  { name:'elka_w16', descr:'�����', comp: ['elka_vetv2',3,'shar3_2005',2,'shar2_2005',2,'shar4_2005',1,'svechka3',1,'shar5_2005',1,'ny06ball4',1,'svechka1',1,'elka_vetv1',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'elka_w26', descr:'�����', comp: ['elka_vetv2',3,'shar5_2005',2,'shar1_2005',2,'shar4_2005',1,'ny06ball10',1,'elka_vetv1',1,'ny06ball5',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'elka_w27', descr:'�����', comp: ['elka_vetv1',3,'shar3_2005',2,'shar4_2005',2,'shar5_2005',2,'elka_vetv2',1,'svechka2',1,'ny06ball9',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'elka_w24', descr:'�����', comp: ['elka_vetv1',4,'shar2_2005',3,'shar4_2005',2,'ny06ball7',1,'svechka1',1,'elka_base1',1,'ny06ball2',1], location:3, possible:0, accepted:0},
  { name:'elka_w25', descr:'�����', comp: ['shar4_2005',3,'elka_vetv2',3,'shar5_2005',2,'shar2_2005',2,'shar3_2005',1,'elka_vetv1',1,'ny06ball1',1,'ny06ball5',1,'elka_base1',1,'ny06ball8',1], location:3, possible:0, accepted:0},
  { name:'elka_w23', descr:'�����', comp: ['shar2_2005',5,'shar3_2005',4,'elka_vetv1',3,'shar1_2005',2,'shar4_2005',1,'elka_vetv2',1,'ny06ball3',1,'elka_base1',1,'ny06ball8',1], location:3, possible:0, accepted:0},
  { name:'elka_w21', descr:'�����', comp: ['elka_vetv1',3,'shar3_2005',1,'shar4_2005',1,'elka_vetv2',1,'shar5_2005',1,'ny06ball4',1,'shar2_2005',1,'svechka1',1,'shar1_2005',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'elka_w20', descr:'�����', comp: ['shar4_2005',4,'elka_vetv1',3,'elka_vetv2',1,'shar2_2005',1,'ny06ball10',1,'elka_base1',1,'ny06ball2',1,'shar8_2005',1], location:3, possible:0, accepted:0},
  { name:'elka_w22', descr:'�����', comp: ['shar2_2005',4,'elka_vetv2',3,'shar4_2005',2,'ny06ball5',2,'shar5_2005',1,'elka_vetv1',1,'elka_base1',1,'shar8_2005',1], location:3, possible:0, accepted:0},
  { name:'elka_w29', descr:'�����', comp: ['elka_vetv2',3,'shar2_2005',3,'shar5_2005',2,'shar3_2005',1,'svechka3',1,'svechka2',1,'ny06ball4',1,'elka_vetv1',1,'shar1_2005',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'elka_w28', descr:'�����', comp: ['shar2_2005',3,'elka_vetv2',2,'elka_vetv1',2,'shar3_2005',1,'ny06ball7',1,'svechka2',1,'ny06ball3',1,'elka_base1',1], location:3, possible:0, accepted:0},
  { name:'elka_w19', descr:'�����', comp: ['shar3_2005',3,'shar4_2005',3,'elka_vetv2',2,'shar5_2005',2,'elka_vetv1',2,'shar2_2005',1,'ny06ball1',1,'elka_base1',1,'ny06ball12',1,'ny06ball2',1], location:3, possible:0, accepted:0}
  
];

//try {

if (opener.frames.length) {
  cells = opener.frames(3).document.getElementsByTagName('A');
} else {
  cells = opener.document.getElementsByTagName('A');
}

var show_type = '0';

components_count=0;
for(i=0;i<cells.length;i++) {
  var src = cells(i).href;

  var matches = /http\:\/\/.+?\/(mater\d+)\./.exec(src);
  var is_material = matches && (matches.length>1);
  if(!is_material)
    matches = /\/object\/(.+)\./.exec(src);
  if(!matches)
    continue;
  var id = matches[1];
  var is_rune = (id.match(/^rune_/)!=null);

  var name = cells(i).innerText;
  matches = /^(.*?)\s*\(x(\d+)\)/.exec(name);
  if(!matches)
    cnt=1;
  else {
    cnt=parseInt(matches[2]);
    name=matches[1];
  }

  for(j=0;j<components.length;j++) {
    if (components[j].id==id) {
      components[j].count+=cnt;
      break;
    }
  }
  components_count += cnt;
  if (j>=components.length)
    components.push({ 
      id:id, 
      src:'http://img.combats.com/i/items/'+id+'.gif', 
      count:cnt, 
      used:0, 
      name:name, 
      is_material:is_material,
      is_rune:is_rune
    });
}

for(j=0;j<components.length;j++)
  components[j].src='http://img.combats.com/i/items/'+components[j].id+'.gif';

components.sort(function(a,b) {if (a.name<b.name) return -1; else if (a.name>b.name) return 1; else return 0;});

function HintHide() {
  document.all['components'].contentWindow.document.all("hint").style.visibility = "hidden";
}

function HintRecipes(id,e) {
  var s='';
  for(i=0;i<recipes.length;i++) {
    for(k=0; k<recipes[i].comp.length; k+=2)
      if(id==recipes[i].comp[k]) {
        if (s)
          s += ',<br>';
        s += '<b>'+recipes[i].descr+'</b> ('+recipes[i].comp_str+')';
        break;
      }
  }
  if (s) {
    d = document.all['components'].contentWindow.document;
    hint = d.all("hint");
    hint.style.visibility = "visible";
    hint.innerHTML = s;
    hint.style.left = e.clientX;
    hint.style.top = e.clientY+d.body.scrollTop;
  }
}

function ShowComponents() {
  document.all['components'].contentWindow.document.open();

  if (components_count) {
    var s = '<html><body style="margin: 0; padding: 0;"><div id=\'hint\' style=\'position: absolute; z-index: 1; width: 80%; background: yellow; visibility: hidden;\'></div><table width=100%>';
    for(var i in components) {
      if(components[i].count && (show_type=='0' || show_type=='1' && components[i].is_material || show_type=='2' && components[i].is_rune))
        s += '<tr id="'+components[i].id+'"><td><img src="'+components[i].src+'" onmouseover="top.HintRecipes(\''+components[i].id+'\',window.event)" onmouseout="top.HintHide()"><td><b>'+components[i].name+'</b><td id="'+components[i].id+'_cnt">'+components[i].count;
    }
    s += '</table></body></html>';
  } else
    s = '<font color=red>��������� �� ����������, ���� � ������ �������� �� �������.</font><br>���������, ��� ������ ���������� ������ ������ ���������.';

  document.all['components'].contentWindow.document.writeln(s);
  document.all['components'].contentWindow.document.close();
}

function Accept(recipe,count) {
  recipe=recipes[recipe];
  if (0<recipe.possible) {
    recipe.accepted++;
    for(j=0; j<components.length; j++)
      for(k=0; k<recipe.comp.length; k+=2)
        if(components[j].id==recipe.comp[k]) {
          components[j].used+=recipe.comp[k+1];
          break;
        }
  }
  Analyze();
  ShowRecipes();
  ShowAccepted();
}

function Dismiss(recipe,count) {
  recipe=recipes[recipe];
  if (recipe.accepted>0) {
    recipe.accepted--;
    for(j=0; j<components.length; j++)
      for(k=0; k<recipe.comp.length; k+=2)
        if(components[j].id==recipe.comp[k]) {
          components[j].used-=recipe.comp[k+1];
          break;
        }
  }
  Analyze();
  ShowRecipes();
  ShowAccepted();
}

function Analyze() {
  for(var i in recipes) {
    m = -1;
    for(k=0; k<recipes[i].comp.length; k+=2) {
      c = 0;
      for(j=0; j<components.length; j++) {
        if (recipes[i].comp[k]==components[j].id) {
          c = Math.floor((components[j].count-components[j].used)/recipes[i].comp[k+1]);
          break;
        }
      }
      if (m<0)
        m = c;
      else
        m = Math.min(m,c);
    }
    if(m>=0) {
      recipes[i].possible = m;
    }
    if (!recipes[i].comp_str) {
      s = '';
      for(k=0; k<recipes[i].comp.length; k+=2) {
        for(j=0; j<components.length; j++) {
          if (recipes[i].comp[k]==components[j].id) {
            if (s)
              s += ', ';
            if (components[j].count<recipes[i].comp[k+1])
              s += '<font color=#FF3F00>'+components[j].name+'('+recipes[i].comp[k+1]+')</font>';
            else
              s += '<img src="http://img.combats.com/i/items/'+components[j].id+'.gif" style="height:20px"/>&nbsp;'+components[j].name+'('+recipes[i].comp[k+1]+')';
            break;
          }
        }
        if (j>=components.length) {
          if (s)
            s += ', ';
          s += '<font color=#FF3F00>'+recipes[i].comp[k]+'('+recipes[i].comp[k+1]+')</font>';
        }
      }
      recipes[i].comp_str = s;
    }
  }
}

function ShowRecipes() {
  t = 0;
  if(document.all['recipes'].contentWindow.document.body)
    t = document.all['recipes'].contentWindow.document.body.scrollTop;
  document.all['recipes'].contentWindow.document.open();
  var s = '<html><body style="margin: 0; padding: 0;"><table width=100%>';
  selected_location = parseInt(document.all['locations'].value);
  for(var i in recipes) {
    if((selected_location==0 || recipes[i].location==selected_location-1) && recipes[i].possible>0) {
      s += '<tr><td><img style="cursor: pointer;" src="http://img.combats.com/i/items/'+recipes[i].name+'.gif" onclick="top.Accept(\''+i+/*recipes[i].name+*/'\',1)"><td width=100%><b>'+recipes[i].descr+'</b><td rowspan=1>'+(recipes[i].possible);
      s += '<tr><td colspan=2 style="color: #888888">���������: '+recipes[i].comp_str+'<td>';
    }
  }
  s += '</table></body></html>';
  document.all['recipes'].contentWindow.document.writeln(s);
  document.all['recipes'].contentWindow.document.body.scrollTop = t;
}

function ShowAccepted() {
  t = 0;
  if(document.all['accepted'].contentWindow.document.body)
    t = document.all['accepted'].contentWindow.document.body.scrollTop;
  document.all['accepted'].contentWindow.document.open();
  var s = '<html><body style="margin: 0; padding: 0;"><table width=100%>';
  for(i=0; i<recipes.length; i++) {
    if(recipes[i].accepted>0) {
      s += '<tr><td><img style="cursor: pointer;" src="http://img.combats.com/i/items/'+recipes[i].name+'.gif" onclick="top.Dismiss(\''+i+/*recipes[i].name+*/'\',1)"><td width=100%><b>'+recipes[i].descr+'</b><td rowspan=1>'+recipes[i].accepted;
      s += '<tr><td colspan=2 style="color: #888888">���������: '+recipes[i].comp_str+'<td>';
    }
  }
  s += '</table></body></html>';
  document.all['accepted'].contentWindow.document.writeln(s);
  document.all['accepted'].contentWindow.document.close();
  document.all['accepted'].contentWindow.document.body.scrollTop = t;
}

Analyze();
load_cfg();
ShowComponents();
ShowRecipes();
ShowAccepted();

function save(sect,key,val){external.m2_writeIni(security_id,"Combats.RU","recipes\\underground.ini",sect,key,val);}
function load(sect,key,def_val){return external.m2_readIni(security_id,"Combats.RU","recipes\\underground.ini",sect,key,def_val);}
function save_cfg() {
  save('settings','show_type',show_type);
  save('settings','locations',document.all['locations'].value);
}
function load_cfg() {
  document.all['show_type'].selectedIndex = show_type = load('settings','show_type','0');
  document.all['locations'].value = load('settings','locations','0');
}

//} catch (e) {
//  alert(e.message+'\n'+e.description);
//}
//-->
</script>
