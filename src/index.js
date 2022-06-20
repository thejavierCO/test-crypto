const {generateIv,generateKey,encrypt,decrypt,SecretFile} = require("./js/crypy.js")
const {atob,btoa,downloadFile,Img,Text} = require("./js/tools");

let fileImageTest0 = new Img("233879.png");
let fileImageTest1 = new Img("origi.jpg");

let testS = new SecretFile("test");

console.log(testS);
// let fileiv = new Text("iv.txt");
// if(fileiv.data.length<=0){fileiv.data = generateIv();}

// let filekey = new Text("key.txt");
// if(filekey.data.length<=0){filekey.data = generateKey("test_test_test");}

// let fileEnc = new Text("testE.txt");
// let fileDec = new Text("test.png");

// fileEnc.data = encrypt(fileImageTest1.data,filekey.data,fileiv.data);
// fileDec.data = decrypt(fileEnc.data,filekey.data,fileiv.data);