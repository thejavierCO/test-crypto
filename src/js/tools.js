const Axios = require('axios')
const path = require('path')
const fs = require('fs')

function atob(str) {
  return Buffer.from(str).toString('base64')
}

function btoa(str) {
  return Buffer.from(str, 'base64').toString()
}

function downloadFile(url, router) {
  return Axios.get(url, { responseType: 'stream' }).then((e) =>
    e.data.pipe(fs.createWriteStream(path.resolve(router))),
  )
}

class Dir {
  constructor(ruta="temp") {
    this._router = path.join(__dirname,"..",ruta)
    if(!fs.existsSync(this._router))fs.mkdirSync(this._router)
  }
  getFile(name) {
    return new File(name,this._router)
  }
  getFileForUrl(url,name){
    const file = new File(name,this._router);
    return new Promise((res,rej)=>{
      if(file.data.length>0)res(file);
      else downloadFile(url,path.join(this._router,name)).then(_=>res(file)).catch(e=>rej(e));
    })
  }
}

class File {
  constructor(name, ruta) {
    this._name = name
    this._data = Buffer.from('')
    this._ruta = path.join(ruta,name);
    if(fs.existsSync(this._ruta))this._data = fs.readFileSync(this._ruta);
    else fs.writeFileSync(this._ruta,this._data);
  }
  get name() {
    return this._name
  }
  set name(n) {
    this._name = n
  }
  set data(data) {
    if (fs.existsSync(path.resolve(this._ruta)))fs.writeFileSync(path.resolve(this._ruta), data)
    this._data = Buffer.from(data)
  }
  get data() {
    return this._data
  }
}

module.exports = { atob, btoa, downloadFile, File, Dir }
