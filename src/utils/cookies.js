export function setCookie(name, value, lifeTime) { // lifeTime in seconds
  var d = new Date();
  d.setTime(d.getTime() + (lifeTime*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + value + "; " + expires;
}

export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function removeCookie(name) {
  var d = new Date();
  d.setTime(d.getTime() - 1000);
  var expires = "expires="+ d.toUTCString();
  document.cookie = name + "=; " + expires;
}

