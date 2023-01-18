const neuralNet= require('./ekko.js')
const {relu,tanh,sigmoid}=require("./actFUNC")
const data=require('./card')
const { thaw, freeze } = require('./saveNet.js')
let john = new neuralNet([7,10,10,1],0.01,sigmoid,sigmoid,false)
let traindata=data.splice(0,8000)
let testdata=data
let epochs=1
let unos=[]
let dos=[]
let dataTest=testdata.map((n)=>{
let input=[n.distance_from_home,n.distance_from_last_transaction,n.ratio_to_median_purchase_price,n.repeat_retailer,n.used_chip,n.used_pin_number,n.online_order]
let output=[n.fraud]
if (output==1) {
unos.push({
'input':input,
'output':output
}) 
}
if (output==0) {
dos.push({
'input':input,
'output':output
}) 
}
return {
'input':input,
'output':output
}
})
let dataTrain=traindata.map((n)=>{
let input=[n.distance_from_home,n.distance_from_last_transaction,n.ratio_to_median_purchase_price,n.repeat_retailer,n.used_chip,n.used_pin_number,n.online_order]
let output=[n.fraud]
if (output==1) {
unos.push({
'input':input,
'output':output
}) 
}
if (output==0) {
dos.push({
'input':input,
'output':output
}) 
}
return {
'input':input,
'output':output
}
})
shuffle=(n)=>{
    return  n.sort(()=>{return Math.random() - 0.5});
    }
    
    
dos.length=841
let data1=[...dos.splice(0,41),...unos.splice(0,41)]
let data2=[...dos,...unos]
shuffle(data2)
shuffle(data1)
for (let i = 0; i <epochs; i++) {
log(`iteration no .... ${i+1}`)
for (let j = 0; j <data2.length; j++) {
// john.train(data2[j].input,data2[j].output)
}
}

let totalfitness=0
for (let f = 0; f < data1.length; f++) {
let guess=john.predict(data1[f].input)
if(Math.round(guess[0])==data1[f].output[0]){
// log([guess,data1[f].output])
totalfitness++
}   
}
// log(totalfitness)
// log(`accuracy ..: ${(totalfitness/data1.length)*100}%`)
// log(john)

log(john.predict([1,2,3,4,5,6,7]))
freeze(john,'mike')
// let beam = thaw('mike')
// log(beam.predict([1,2,3,4,5,6,7]))
// thaw('mike.json')
let quin=require('./mike.js')
log(quin)