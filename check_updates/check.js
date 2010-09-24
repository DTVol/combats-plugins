(function(){
  var actualVersion = '1.8';
  var downloadsURL = 'http://code.google.com/p/combats-plugins/downloads/list';

  var version = combats_plugins_manager.getVersion();
  var av = actualVersion.split('.');
  var v = version.split('.');
  
  var newVersionFound = false;
  for (var i=0; i<av.length || i<v.length; i++) {
    if (av[i] && v[i] && parseInt(av[i])>parseInt(v[i]) || !v[i]) {
      combats_plugins_manager.add_chat(':idea: ��������! �������� ����� ������ <b>��������� �������� ��� ��</b>. �������� ������ ����� �� <a href="'+downloadsURL+'" target=_blank title="Google Code">�������� ��������</a>.')
      break;
    }
  }
})()