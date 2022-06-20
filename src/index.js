const {generateIv,generateKey,encrypt,decrypt} = require("./js/crypy.js")
const {atob,btoa,downloadFile,path,File} = require("./js/tools");


let fileiv = new File("iv.txt");
if(fileiv.data.length<=0){fileiv.data = generateIv();}

let filekey = new File("key.txt");
if(filekey.data.length<=0){filekey.data = generateKey("test_test_test");}

let fileEnc = new File("testE.txt");
let fileDec = new File("test.txt");

fileDec.data = encrypt(Buffer.from(JSON.stringify("test")).toString(),filekey.data,fileiv.data);