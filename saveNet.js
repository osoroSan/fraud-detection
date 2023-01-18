const fs = require('fs')
const { sigmoid } = require('./actFUNC')
const ekkoNet = require('./ekko')

freeze=(n,b)=>{
// let das= {'label':JSON.stringify(n)}
let das=JSON.stringify(n)
fs.writeFile(`${b}.json`,das,(error)=>{
if(error){log(error)}
})
}
thaw=(b)=>{
let net =require(`./${b}`)
log(net)
let brain=new ekkoNet(net.NN,net.Lr,sigmoid,sigmoid,false)
for (let i = 0; i < brain.bias.length; i++) {
brain.bias[i].data=net.bias[i].data
brain.weights[i].data=net.weights[i].data
}
return brain
}


module.exports={
    thaw:thaw,
    freeze:freeze
}