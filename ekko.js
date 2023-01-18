const Matrix = require('./Matrix');
log=(n)=>{console.log(n)};
const {relu,tanh,sigmoid}=require("./actFUNC")
randomize=(n)=>{return n.map(e => 1);}
rand=(a)=>{ return Math.floor(Math.random()*(a.length-0))}
class ekkoNet{
constructor (NN,Lr,act1,act2,verbose){
this.NN =NN;
this.Lr=Lr;
this.weights=[];
this.act1=act1;
this.act2=act2;
this.verbose=verbose;
this.bias=[];
for (let i = 1; i < this.NN.length; i++) {
this.bias.push(new Matrix(this.NN[i],1).randomize())
this.weights.push(new Matrix(this.NN[i],this.NN[i-1]).randomize())
}	
}
    
predict(inputArray){
let output=Matrix.fromArray(inputArray)
for (let i = 0; i < this.weights.length; i++) {
output=Matrix.multiply(this.weights[i],output)  
output.add(this.bias[i])  
if(i<this.weights.length-1){output.map(this.act1.func)}
if(i===this.weights.length-1){output.map(this.act2.func)} 
}     
return output.toArray()
//end of predict
}
//find a better way to calculate error
train(inputArray,targetArray){
let inputs=Matrix.fromArray(inputArray)
let output=inputs
let targets = Matrix.fromArray(targetArray)
let sums=[]
let schemes=[]
for (let i = 0; i < this.weights.length; i++) {
output=Matrix.multiply(this.weights[i],output)  
output.add(this.bias[i])  
if(i<this.weights.length-1){output.map(this.act1.func)}
if(i===this.weights.length-1){output.map(this.act2.func)} 
sums.push (output)
}
let gradients
let deltas
let error
for (let g =this.weights.length-1;g>=0; g--) {
if(g===this.weights.length-1){
error=Matrix.subtract(targets,output)
if(this.verbose===true){log(`error.. : ${error.toArray()}`)}
gradients=Matrix.map(sums[g],this.act2.dfunc)
}
gradients=Matrix.map(sums[g],this.act1.dfunc)
gradients.multiply(error)
gradients.multiply(this.Lr)
if(g===0){
deltas = Matrix.multiply(gradients,Matrix.transpose(inputs))
error=Matrix.multiply(Matrix.transpose(this.weights[g]),error)
this.error = error
}
if(g>0){
deltas = Matrix.multiply(gradients,Matrix.transpose(sums[g-1]))
error=Matrix.multiply(Matrix.transpose(this.weights[g]),error)
}
this.weights[g].add(deltas)
this.bias[g].add(gradients)
//end of trai
}
}	
}

module.exports=ekkoNet;