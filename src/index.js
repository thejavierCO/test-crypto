const {generateIv,generateKey,encrypt,decrypt} = require("./js/crypy.js")
const {atob,btoa,downloadFile,Img,Text,SecretFile} = require("./js/tools");

let fileImageTest0 = new Img("233879.png");
let fileImageTest1 = new Img("origi.jpg");

let key = generateKey("comida");

// let testS = new SecretFile("test");

// testS.setData(JSON.stringify({ok:true}),key)

let filetest = new Text("test.txt");
console.log(filetest);
// if(fileiv.data.length<=0){fileiv.data = generateIv();}

// let filekey = new Text("key.txt");
// if(filekey.data.length<=0){filekey.data = generateKey("test_test_test");}

// let fileEnc = new Text("testE.txt");
// let fileDec = new Text("test.png");

// fileEnc.data = encrypt(fileImageTest1.data,filekey.data,fileiv.data);
// fileDec.data = decrypt(fileEnc.data,filekey.data,fileiv.data);