var apiserver_hostname;

var assetsbase_hostname = "https://master-preview.xn--80aaafmfwb5a7d2bq4h.xn--p1ai/assets/";
var markdown_assetsbase_hostname = "https://access.yourmeditation.deqstudio.com/"

function isLocalHost(url) {
  return url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1 || url.indexOf('192.') !== -1;
}

console.log("[GlobalProvider] process.env.NODE_ENV: " + process.env.NODE_ENV)

function isWebpackHotUpdate(){
  if (process.env.NODE_ENV === 'development') {
    return true;
  }else{
    return false;
  }
}

if (isWebpackHotUpdate() == true) {
  apiserver_hostname = "http://" + window.location.hostname + ":3000/";
  console.log("[GlobalProvider] Serving trough LOCAL (DEV) backend all further requests...")
} else {
  apiserver_hostname = "https://meditations-backend.deqstudio.com/";
  console.log("[GlobalProvider] Serving trough PRODUCTION backend all further requests...")
}

const data = {
  api: {
    hostname: apiserver_hostname
  },
  assets: {
    hostname: assetsbase_hostname
  },
  markdown_assets: {
    hostname: markdown_assetsbase_hostname
  },
  language: {
    currentlang: "ru"
  }
}

export default data;