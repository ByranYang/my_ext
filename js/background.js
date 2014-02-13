


$(document).ready(function(){
    
    var context_array = ['New Tab', 'Duplicate', 'Tab to Front', 'Tab to End', 'Reload', 'Close', 'Close Window', 'New Window' , 'New Icognito',0,1,2,3,4,5,6,7,8];
    chrome.storage.sync.set({'context_array':context_array},function(){
      console.log('Set arrays');
    });
    console.log(context_array.length);
});


function change_preferences(new_arr){
  var array = chrome.storage.sync.get('user_array',function(setting){
    array = setting.array;
  });
  var array_names = chrome.storage.sync.get('user_array_names',function(setting){
    array_names = setting.array_names;
  });
  return [array, array_names];
}

function do_command(id, value){
  console.log(id + ' ' + value);
  switch (value){
    case '0':
    console.log('here');
      chrome.tabs.create({});
      break;
    case '1': 
      chrome.tabs.duplicate(id);
      break;
    case '2':
      chrome.tabs.move(id,{'index':0});
      break; 
    case '3':
      chrome.tabs.move(id,{'index':-1});
      break;
    case '4':
      chrome.tabs.reload(id, {});
      break;
    case '5':
      chrome.tabs.remove(id);
      break;
    case '6':
      chrome.windows.remove(id);
      break;
    case '7':
      chrome.windows.create({});
      break;
    case '8':
      chrome.windows.create({'incognito':true});
      break;
    default:
      break;
  }
}


//listen to the requests from content_script
chrome.runtime.onMessage.addListener(function (request,sender, sendResponse){
  if (request.request == 'fetch_preferences') {
    var context_array;
    chrome.storage.sync.get('context_array',function(getting){
      context_array = getting.context_array;
      sendResponse({'context':context_array});
    });
    return true;
  } else if (request.request == 'preferences_changed'){
    change_preferences();
    return true;
  }else if (request.request == 'command'){
    console.log(sender.tab.id);
    do_command(sender.tab.id, request.value);
    return true;
  } else{
    return true;
  }
});   

