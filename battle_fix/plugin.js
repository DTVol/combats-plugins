(function(){
  return {
    toString: function(){
      return '����������� ��������� ���';
    },
    getProperties: function(){
      return [
        { name: '��������� ���', value: this.Fix }
      ];
    },
    Fix: function(){
      try {
        var sURL = top.Battle.oQuery.sURL;
        top.Battle.SetScript(sURL);
        top.Battle.nRequests = 0;
        
      } catch(e) {
        alert('������');
      }
    },
    Init: function(){
      return this;
    }
  }.Init();
})()