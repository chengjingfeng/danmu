// Generated by CoffeeScript 1.6.3
(function() {
  $(function() {
    var getUrlValue, socket, vid;
    getUrlValue = function(name) {
      return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || ['', null])[1]);
    };
    vid = getUrlValue('id') || 0;
    socket = io.connect('/video');
    socket.on('connected', function() {
      return socket.emit('connected', {
        id: vid
      });
    });
    socket.on('new message' + vid, function(msg) {
      var $item;
      $item = $("<div class=\"item\">" + msg + "</div>");
      $('#container .messages').append($item);
    });
    $("#container input:text").keyup(function(e) {
      if (e.keyCode === 13) {
        socket.emit('send' + vid, $(this).val());
        $(this).val('');
      }
    });
    socket.on('someone connect' + vid, function(data) {
      return $('#count').text(data.count);
    });
    window.onbeforeunload = function(e) {
      socket.emit('someone disconnected' + vid, {
        id: vid
      });
    };
  });

}).call(this);