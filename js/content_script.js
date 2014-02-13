
var list_arr;
$(document).ready(function(){
  chrome.runtime.sendMessage({request:'fetch_preferences'}, function (response){
    list_arr = response.context;
    create_cmenu();
  });
  $('#contextmenu2').click(function(){
    $('#contextmenu2').hide();
  })
  $(document).click(function() {
        $('#contextmenu2').hide();
    });

});

function create_cmenu(){
  $('body').append("<ul id='contextmenu2' />");
  var counter = 0;
  while (counter<9) {
    var li = $('<li/>')
    .appendTo('#contextmenu2');
    var button = $('<button/>')
    .attr({value:list_arr[counter+9]})
    .text(list_arr[counter])
    .appendTo(li);
    counter++;
  }
  $('#contextmenu2').css({
      "position": "absolute",
      "padding": "10px",
      "background-color": "#ffffff",
      "border": "1px solid #000",
      "list-style-type": "none"}).hide();
  $('#contextmenu2 li button').click(function(){
    var value = $(this).attr('value');
    clicker(value);
  });
}

function clicker(curr_value){
  chrome.runtime.sendMessage({request:'command',value: curr_value});
}

var down = 0;
var up = 0;
$(document).bind('contextmenu',function(e){
 console.log(up-down);
 if(up-down>200){
   $('#contextmenu2').css({
     top:e.pageY + 'px',
     left:e.pageX + 'px'
   }).show();
   return false;
 }else{
   return true;
 }
});
$(document).on({
  'mousedown':function(e){
    down = new Date();
    console.log('mouse down',down);
  },
  'mouseup':function(e){
   up = new Date();
    console.log('mouse up', up);
  }
  });
