let pin =document.getElementById('pin');
let amount = document.getElementById('amount');
let network = document.getElementById('network');
let display= document.getElementById('display');
let card=[];

// to get  date 
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();



// to generate pin
function get() {
    return Math.floor(Math.random() *100000000000)
}


//to display generated pin and network
function getRandom() {
    if (network.value=='network.value') {
        display.innerHTML=''
        return
    }else if(amount.value == 'amount.value'){
        display.innerHTML=''
        return
    }

    pin.value=get()

    // to show recharge pin for all network
    let recharge;
if (network.value == 'MTN') {
    recharge = `*555*${pin.value}#`
}
else if (network.value=='GLO') {
    recharge= `*123*${pin.value}#`
}
else if (network.value=='AIRTEL') {
    recharge =`126${pin.value}#`
}
else if (network.value == '9-MOBILE') {
    recharge= `*222*${pin.value}#`
}
 
    //all the element in array
    let tabEnter = {Network:network.value, Amount:amount.value,pin:pin.value,validity:false ,m :(day+'/'+month+'/'+year),recharge:recharge};  
    card.push(tabEnter);

    if (amount.value=="") {
        pin.value=''
    }    
    

}

function change() {
    amount.value=''
    pin.value=''
    inputpin.value=''
}

//to save pin inside table
function savePin() {    
    amount.value=''
    pin.value=''
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
     })   
     
    //  if (amount.value == '') {
    //     alert('fill the inputs above')
    //     return
    //  }
     localSave = localStorage.setItem('saveData',JSON.stringify(card));
}

getData = localStorage.getItem('saveData');

function storePin(getdata) {
    if (getdata) {
        card = JSON.parse(getdata)
        savePin()
    }
}

storePin()

function del(index) {
    card.splice(index,1)
    savePin()
}

function rechargeCard() {
    let seen = false;
     card.forEach(load=>{
        
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
        alert('invalid card')
    }         
}
