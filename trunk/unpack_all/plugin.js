function plugin_unpack_all() {
  this.toString = function() {
    return "��������������";
  }
}

plugin_unpack_all.prototype.getProperties = function() {
  return [
    { name:"������ ����������", value: this.start },
    { name:"���������� ����������", value: this.stop },
  ];
}

plugin_unpack_all.prototype.setProperties = function(a) {
}

plugin_unpack_all.prototype.start = function() {
  frames[2].frameElement.attachEvent("onload",unpack_all.onloadHandler);
  frames[2].location=location.protocol+'//'+location.host+'/main.pl?edit=4&'+Math.random();
}

plugin_unpack_all.prototype.stop = function() {
  frames[2].frameElement.detachEvent("onload",unpack_all.onloadHandler);
}

plugin_unpack_all.prototype.onloadHandler = function() {
  try {
    var d=top.frames[2].document;
    var links=d.getElementsByTagName('A');
    var found = null;
    for(var i=0;i<links.length;i++) {
      if (links[i].innerHTML!='���-��')
        continue;
      var matches = links[i].href.match(/javascript\:UseMagick\('(.*?)',(?:%20)?'(.*?)',(?:%20)?'(.*?)',.*\)/);
      if(!matches)
        continue;
      if (matches[3].substring(0,7)!='larec1_')
        continue;
      found = links[i]
      break;
    }
    if (found) {
      found.click();
      d.forms['slform'].elements['tmpname423'].click();
    } else {
      unpack_all.stop();
    }
  } catch (e) {
    combats_plugins_manager.logError(unpack_all,e);
  }
}

unpack_all = new plugin_unpack_all();