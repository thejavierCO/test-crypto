const { generateIv, generateKey, encrypt, decrypt} = require('./js/crypy.js')
const { encryptECIES, decryptECIES } = require("@stacks/encryption")
const { Dir } = require('./js/tools');

const Test = new Dir("test")
const Music = new Dir("temp")
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
  let fileEnc2 = Test.getFile('testE2.txt');
  if(fileEnc0.data.length <= 0){
    let fileImageTest0 = Img.getFile("i0.jpg");
    if(fileImageTest0.data.length<=0){
      console.log("descargando imagen 1")
      let file = await Img.getFileForUrl("https://i.imgur.com/GfUIlC7.jpeg",'i0.jpg')
      console.log("encrypting image 1")
      fileEnc0.data = encrypt(
        file.data,
        filekey.data,
        fileiv.data,
      )
    }else{
      console.log("encrypting image 1")
      fileEnc0.data = encrypt(
        fileImageTest0.data,
        filekey.data,
        fileiv.data,
      )
    }
  }
  if(fileEnc1.data.length <= 0){
    let fileImageTest1 = Img.getFile("i1.jpg");
    if(fileImageTest1.data.length<=0){
      console.log("descargando imagen 2")
      let file = await Img.getFileForUrl("https://i.imgur.com/lhffj99.jpeg",'i1.jpg');
      console.log("encrypting image 2")
      fileEnc1.data = encrypt(
        file.data,
        filekey.data,
        fileiv.data,
      )
    }else{
      console.log("encrypting image 2")
      fileEnc1.data = encrypt(
        fileImageTest1.data,
        filekey.data,
        fileiv.data,
      )
    }
  }
  if(fileEnc2.data.length <= 0){
    let file = Music.getFile("test.mp3");
    if(file.data.length<=0){
      console.log("descargando file 3")
      await Music.getFileForUrl("https://anchor.fm/s/484b1994/podcast/play/53025400/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2022-5-4%2Febbad037-4d57-974d-ae03-b8c3b4f4b8d2.mp3",'test.mp3')
      .then(file=>{
        console.log("encrypting file 1")
        fileEnc2.data = encrypt(
          file.data,
          filekey.data,
          fileiv.data,
        )
      })
    }else{
      console.log("encrypting file 1")
      fileEnc2.data = encrypt(
        file.data,
        filekey.data,
        fileiv.data,
      )
    }
  }
  console.log("decrypting in test.jpg")
  let fileDec = Test.getFile('test.jpg');
  fileDec.data = decrypt(fileEnc1.data,filekey.data,fileiv.data)
}

// async function test(data){
//   const privateKey = 'a5c61c6ca7b3e7e55edee68566aeab22e4da26baa285c7bd10e8d2218aa3b229';
//   const publicKey = '027d28f9951ce46538951e3697c62588a87f1f1f295de4a14fdd4c780fc52cfe69';
//   const testString = data;
//   // Encrypt string with public key
//   const cipherObj = await encryptECIES(publicKey, Buffer.from(testString), true);
//   return cipherObj;
// }

// test(fs.readFileSync(path.resolve(__dirname,"test","test.jpg")))
// .then(e=>{
//   let testFile = Test.getFile("encryptFile.json");
//   testFile.data = JSON.stringify(e);
// })

Main()