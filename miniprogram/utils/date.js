function add0(m){return m<10?'0'+m:m }

// YY-MM-DD HH:MM:SS
export function format(timestamp) {
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

// YY.MM.DD HH:MM
export function format2(timestamp) {
  if(timestamp.indexOf('-') > -1){
    timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  }
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'.'+add0(m)+'.'+add0(d)+' '+add0(h)+':'+add0(mm);
}

// YY-MM-DD
export function format3(timestamp) {
  // if(timestamp.indexOf('-') > -1){
  //   timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  // }
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d);
}

// YY.MM.DD
export function format4(timestamp) {
  if(typeof(timestamp) === 'string' && timestamp.indexOf('-') > -1){
    timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  }
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'.'+add0(m)+'.'+add0(d);
}

// YY.MM.DD HH:MM:SS
export function format5(timestamp) {
  if(timestamp.indexOf('-') > -1){
    timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  }
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'.'+add0(m)+'.'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}


// YY-MM-DDTHH:MM:SS
export function utcformat(time){
  // if(time.indexOf('-') > -1){
  //   time = time.replace(new RegExp(/-/gm) ,"/")
  // }
  var timestamp = new Date(time).getTime()
    // - 8 * 60 * 60 * 1000;
  var time = new Date(timestamp)
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+'T'+add0(h)+':'+add0(mm)+':'+add0(s);
}

// YY.MM.DD HH:MM（）
export function utcformat2(timestamp) {
  // if(timestamp.indexOf('-') > -1){
  //   timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  // }
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'.'+add0(m)+'.'+add0(d)+' '+add0(h)+'.'+add0(mm);
}

// YY.MM.DD
export function getDay(timestamp) {
  if(timestamp.indexOf('-') > -1){
    timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  }
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  return y+'.'+add0(m)+'.'+add0(d);
}

// HH:MM:SS
export function getTime(timestamp) {
  if(timestamp.indexOf('-') > -1){
    timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  }
  var time = new Date(timestamp);
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return add0(h)+':'+add0(mm)+':'+add0(s);
}

// YY-MM-DD 星期n HH:MM
export function format6(timestamp) {
  if(String(timestamp).indexOf('-') > -1){
    timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  }
  var time = new Date(timestamp);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var d0 = time.getDay();
  var week = whichDay(d0);
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+ week +' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

export function whichDay(week){
  switch(week){
    case 1: week = "星期一"; break;
    case 2: week = "星期二"; break;
    case 3: week = "星期三"; break;
    case 4: week = "星期四"; break;
    case 5: week = "星期五"; break;
    case 6: week = "星期六"; break;
    case 0: week = "星期日"; break;
  }
  return week
}

// YY.MM.DD HH:MM
export function reverseFormat(timestamp) {
  timestamp = String(timestamp);
  if(timestamp.indexOf('-') > -1){
    timestamp = timestamp.replace(new RegExp(/-/gm) ,"/")
  }
  var time = new Date(timestamp);
  return time;
}
