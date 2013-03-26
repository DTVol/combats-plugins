(function(){
  var actualVersion = '1.9.2';
  var downloadsURL = 'http://code.google.com/p/combats-plugins/downloads/list';

  var CPM = combats_plugins_manager;
  var version = CPM.getVersion();
  var av = actualVersion.split('.');
  var v = version.split('.');
  
  var newVersionFound = false;
  for (var i=0; i<av.length || i<v.length; i++) {
    if (av[i] && v[i] && parseInt(av[i])>parseInt(v[i]) || !v[i]) {
      CPM.plugins_list['check_updates'].hasUpdate(':idea: ��������! �������� ����� ������ <b>��������� �������� ��� ��</b>. �������� ������ ����� �� <a href="'+downloadsURL+'" target=_blank title="Google Code">�������� ��������</a>.')
      return;
    }
  }
  CPM.plugins_list['check_updates'].noUpdates()
})()