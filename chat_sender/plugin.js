(function() {
  return {
    times: [0,0,0,0,0],
    timer: 0,
    messages_queue: [],
    toString: function() {
      return "�������� ���������";
    },
    process_queue: function() {
      if (this.timer!=0)
        clearTimeout(this.timer);
      var time = new Date().valueOf();
      if (time-this.times[0]<10000) {
        this.timer = setTimeout(
          top.combats_plugins_manager.get_binded_method(this,this.process_queue),
          10000-(time-this.times[0]));
      }
      this.timer = 0;
      if (this.messages_queue.length<=0)
        return;
      var ed = top.frames["bottom"].document.all["text"];
      var form = ed.form
      if(ed.value=='' && !top.AjaxBegin) {
        var obj = this.messages_queue.shift();
        if (obj.message===null) {
          top.RefreshChat(1);
          top.NextRefreshChat();
        } else {
          ed.value = obj.message;
          form.sbm.click();
          ed.value = '';
        }
        if (obj.callback)
          obj.callback();
        this.times.shift();
        this.times.push(new Date().valueOf());
      }
      this.timer = setTimeout(
        top.combats_plugins_manager.get_binded_method(this,this.process_queue),
        300);
    },
    send: function (message, callback) {
      this.messages_queue.push({message:message, callback:callback});
      this.process_queue();
    },
    refreshChat: function (callback) {
      this.messages_queue.push({message:null, callback:callback});
      this.process_queue();
    },
    search: function(message) {
      for(var i=0; i<this.messages_queue.length; i++);
        if (this.messages_queue[i].message==message)
          return i;
      return -1;
    },
    Init: function() {
      return this;
    }
  }.Init();
})()