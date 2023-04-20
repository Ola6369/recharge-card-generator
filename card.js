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

let recharge= {
 MTN:'*555*',
 GLO:'*123*',
 AIRTEL:'*126*',
 MOBILE:'*222*'
};

// to generate pin
function get() {
    return Math.floor(Math.random() *100000000000)
}

//to display generated pin and network
function getRandom() {
    pin.value=get()

 if (amount.value=="") {
    pin.value=''
}    

    let tabEnter = {Network:network.value, Amount:amount.value,recharge:`${recharge[network.value]}${pin.value}#`,validity:false ,m :(day+'/'+month+'/'+year)};  
    card.push(tabEnter);
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
       
}

function del(index) {
    card.splice(index,1)
    // display.innerHTML=''
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
