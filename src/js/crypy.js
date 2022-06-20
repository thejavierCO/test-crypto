const crypto = require('crypto');
const {Text} = require("../js/tools")

const algorithm = 'aes-256-ctr';

function generateKey(str){
  return crypto.createHash('sha256').update(String(str)).digest('base64').substr(0, 32);
}

function generateIv(){
  return crypto.randomBytes(16);
}

const encrypt = (buffer,key,iv) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  const result = Buffer.concat([cipher.update(buffer), cipher.final()])
  return result
}

const decrypt = (encrypted,key,iv) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  const result = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return result
}

class SecretFile extends Text{
  constructor(name){
    super(name);
    this.iv = generateIv();
  }
  setData(data,key){
    this.data = encrypt(Buffer.from(data),key,this.iv);
    return this;
  }
  getData(key){
    return decrypt(this.data,key,this.iv);
  }
}

module.exports = {generateKey,generateIv,encrypt,decrypt};