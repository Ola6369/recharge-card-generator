let pin =document.getElementById('pin')
let amount = document.getElementById('amount')
let network = document.getElementById('network')
let card=[];
let display= document.getElementById('display')
// let result = get()
let date = new Date();
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()

// to generate pin
function get() {
    return Math.floor(Math.random() *100000000000)
}

//to display generated pin and network
function getRandom() {
    let recharge;
    pin.value=get()
    
 if (network.value == 'MTN') {
    recharge = `*555*${pin.value}#`
 }
 if (network.value == 'GLO') {
    recharge = `*123*${pin.value}#`
 }
 if (network.value == 'AIRTEL') {
    recharge = `*126*${pin.value}#`
 }
 if (network.value == '9-MOBILE') {
    recharge = `*222*${pin.value}#`
 }

    let tabEnter = {Network:network.value, Amount:amount.value,recharge:recharge,validity:false ,m :(day+'/'+month+'/'+year)};  
    card.push(tabEnter);
}
function change() {
    amount.value=''
    pin.value=''
    inputpin.value=''
}

//to save pin inside table
function savePin() {
    
    display.innerHTML=''
    card.forEach(function(element,index){
        display.innerHTML += 
      `<tr>
            <td>${index+1}</td>
            <td>${element.Network}</td>
            <td>${element.Amount}</td>
            <td>${element.recharge}</td>
            <td>${element.validity==false?`<span>VALID</span>`:`<span>INVALID</span>`}</td>
            <td>${element.m}</td>
            <td><button type="button" class="btn btn-dark" onclick="del(${index})">delete</button></td>
        </tr>`    
        
        inputpin.value = element.recharge;
        amount.value=''
        pin.value=''
        })   
      
       
}

function del(index) {
    card.splice(index,1)
    // display.innerHTML=''
    savePin()

}

function rechargeCard() {
    let seen = false;
     card.forEach(load=>{
        console.log(load);

        if ((inputpin.value).trim() == load.recharge) {
            if (load.validity == 'invalid') {
                alert('pin has been used')
                seen = true
                return
            }
            alert('recharge successful')
            load.validity = 'invalid'
            seen= true
            savePin()
        }
     })
     if (seen) {
        // alert('pin has been used')
        console.log('pin exist');
     }else{
        alert('invalid')
    }
     
}


