const { generateIv, generateKey, encrypt, decrypt } = require('./js/crypy.js')
const { atob, btoa, downloadFile, Dir } = require('./js/tools')

const Test = new Dir("test")
const Img = new Dir("img")

async function Main(){
  
  let fileiv = Test.getFile('iv.txt');
  let filekey = Test.getFile('key.txt');

  if (fileiv.data.length <= 0){
    console.log("generando iv")
    fileiv.data = generateIv();
  }
  if (filekey.data.length <= 0) {
    console.log("generando key");
    filekey.data = generateKey('test_test_test');
  }
  
  let fileEnc0 = Test.getFile('testE0.txt');
  let fileEnc1 = Test.getFile('testE1.txt');
  
  if(fileEnc0.data.length <= 0){
    let fileImageTest0 = Img.getFile("i0.jpg");
    if(fileImageTest0.data.length<=0){
      console.log("descargando imagen 1")
      await Img.getFileForUrl("https://i.imgur.com/GfUIlC7.jpeg",'i0.jpg');
    }
    console.log("encrypting image 1")
    fileEnc0.data = encrypt(
      Buffer.from(fileImageTest0.data),
      filekey.data,
      fileiv.data,
    )
  }
  if(fileEnc1.data.length <= 0){
    let fileImageTest1 = Img.getFile("i1.jpg");
    if(fileImageTest1.data.length<=0){
      console.log("descargando imagen 2")
      await Img.getFileForUrl("https://i.imgur.com/lhffj99.jpeg",'i1.jpg');
    }
    console.log("encrypting image 2")
    fileEnc1.data = encrypt(
      Buffer.from(fileImageTest1.data),
      filekey.data,
      fileiv.data,
    )
  }
  console.log("decrypting in test.jpg")
  let fileDec = Test.getFile('test.jpg');
  fileDec.data = decrypt(fileEnc0.data,filekey.data,fileiv.data)
}
Main();

