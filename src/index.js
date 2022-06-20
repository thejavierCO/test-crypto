const {generateIv,generateKey,encrypt,decrypt} = require("./js/crypy.js")
const {atob,btoa,downloadFile,Img,Test} = require("./js/tools");

let fileImageTest0 = new Img("233879.png");
let fileImageTest1 = new Img("origi.jpg");

let fileiv = new Test("iv.txt");
if(fileiv.data.length<=0)fileiv.data = generateIv();

let filekey = new Test("key.txt");
if(filekey.data.length<=0)filekey.data = generateKey("test_test_test");

let fileEnc = new Test("testE.txt");
let fileDec = new Test("test.jpg");

fileEnc.data = encrypt(Buffer.from(fileImageTest1.data),filekey.data,fileiv.data);
fileDec.data = decrypt(fileEnc.data,filekey.data,fileiv.data);