const Axios = require("axios");
const path = require("path");
const fs = require("fs");
const { generateIv, encrypt, decrypt } = require("./crypy");

function atob(str){
  return Buffer.from(str).toString("base64")
}

function btoa(str){
  return Buffer.from(str,"base64").toString()
}

function downloadFile(url,path){
  return Axios.get(url,{responseType:"stream"})
  .then(e=>e.data.pipe(fs.createWriteStream(path.resolve(path))))
}

class File{
  constructor(name){
    this._name = name;
    this._data = "";
    this._ruta = path.resolve(__dirname)
  }
  get name(){
    return this._name;
  }
  set name(n){
    this._name = n;
  }
  set data(data){
    if(fs.existsSync(path.resolve(this._ruta)))fs.writeFileSync(path.resolve(this._ruta),data);
    this._data = data;
  }
  get data(){
    if(fs.existsSync(path.resolve(this._ruta)))this._data = fs.readFileSync(path.resolve(this._ruta));
    return this._data;
  }
  isExist(){
    return fs.existsSync(this._ruta);
  }
}

class Text extends File{
  constructor(name){
    super(name);
    this._ruta = path.resolve(__dirname,"..","test",name);
    if(fs.existsSync(this._ruta))this.data = fs.readFileSync(this._ruta);
    if(!fs.existsSync(this._ruta))fs.writeFileSync(this._ruta,this.data);
  }
}

class Img extends File{
  constructor(name){
    super(name);
    this._ruta = path.resolve(__dirname,"..","img",name);
    if(fs.existsSync(this._ruta))this.data = fs.readFileSync(this._ruta);
    if(!fs.existsSync(this._ruta))fs.writeFileSync(this._ruta,this.data);
  }
}

class SecretFile extends File{
  constructor(name){
    super(name);
    this._ruta = path.resolve(__dirname,"..","test",name);
    this._iv = atob(generateIv());
    if(fs.existsSync(this._ruta)){
      this.data = fs.readFileSync(this._ruta);
    }else if(!fs.existsSync(this._ruta))fs.writeFileSync(this._ruta,this.data);
  }
  setData(data,key){
    this.data = {
      data:encrypt(Buffer.from(data),key,Buffer.from(this._iv,"base64")),
      iv:atob(this._iv)
    }
  }
  getData(key){
    return decrypt(this.data,key,Buffer.from(this._iv,"base64")).toString()
  }
}

module.exports = {atob,btoa,downloadFile,File,Img,Text,SecretFile};