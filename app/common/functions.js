const isElectron = process.env.NODE_ENV === 'electron' ? true : false;

// DATES
const now = new Date()
const tonight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
const dayOfWeek = tonight.getDay()
const friday = new Date(tonight.getTime() + ((5 - dayOfWeek) * (1000 * 60 * 60 * 24)))

function toDate(date) {
  if (date === void 0) {
    return new Date(0);
  }
  if (isDate(date)) {
    return date;
  } else {
    return new Date(parseFloat(date.toString()));
  }
}

function isDate(date) {
  return (date instanceof Date);
}

function formatDate(date, format) {
  var d = toDate(date);
  return format
    .replace(/Y/gm, d.getFullYear().toString())
    .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
    .replace(/d/gm, ('0' + (d.getDate() + 1)).substr(-2))
    .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
    .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
    .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
    .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
}

const ObjToSource=(o)=> {
    if (!o) return null;
    let str="",na=0,k,p;
    if (typeof(o) == "object") {
        if (!ObjToSource.check) ObjToSource.check = new Array();
        for (k=ObjToSource.check.length;na<k;na++) if (ObjToSource.check[na]==o) return '{}';
        ObjToSource.check.push(o);
    }
    k="",na=typeof(o.length)=="undefined"?1:0;
    for(p in o){
        if (na) k = "'"+p+"':";
        if (typeof o[p] == "string") str += k+"'"+o[p]+"',";
        else if (typeof o[p] == "object") str += k+ObjToSource(o[p])+",";
        else str += k+o[p]+",";
    }
    if (typeof(o) == "object") ObjToSource.check.pop();
    if (na) return "{"+str.slice(0,-1)+"}";
    else return "["+str.slice(0,-1)+"]";
}

function convertToText(obj) {
    var string = [];
    if (typeof(obj) == "object" && (obj.join == undefined)) {
        string.push("{");
        for (prop in obj) {
            string.push(prop, ": ", convertToText(obj[prop]), ",");
        };
        string.push("}");
    } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
        string.push("[")
        for(prop in obj) {
            string.push(convertToText(obj[prop]), ",");
        }
        string.push("]")
    } else if (typeof(obj) == "function") {
        string.push(obj.toString())
    } else {
        string.push(JSON.stringify(obj))
    }
    return string.join("")
}

module.exports = {
  isElectron: isElectron,
  formatDate: formatDate,
  now: now,
  tonight: tonight,
  dayOfWeek: dayOfWeek,
  friday: friday,
  ObjToSource: ObjToSource,
  convertToText: convertToText
}
