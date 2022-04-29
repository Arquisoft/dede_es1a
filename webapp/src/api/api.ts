import {User, Rock, Order} from '../shared/shareddtypes';

const apiEndPoint =process.env.REACT_APP_API_URI || 'http://localhost:5000/api';

export async function addUser(user:User):Promise<boolean>{
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email, 'dni':user.dni, 'password':user.password, 'repeatPassword': user.repeatPassword})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function getRocas():Promise<Rock[]>{
  let response = await fetch(apiEndPoint+'/rocks/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
} 

export async function getRocksById(rockId:String):Promise<Rock[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/rocks/' + rockId);
  //The objects returned by the api are directly convertible to User objects
  return response.json()
} 


export async function getRocksSedimentary():Promise<Rock[]>{
  let response = await fetch(apiEndPoint+'/rocks/list/sedimentary');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getRocksFiery():Promise<Rock[]>{
  let response = await fetch(apiEndPoint+'/rocks/list/fiery');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getRocksMetamorphic():Promise<Rock[]>{
  let response = await fetch(apiEndPoint+'/rocks/list/metamorphic');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getFilteredRocks(mohsMin:Number,mohsMax:Number,densityMin:Number,densityMax:Number,priceMin:Number,priceMax:Number,nameSubString:string,type:string):Promise<Rock[]> {
  let response = await fetch(apiEndPoint+'/rocks/list/critery?mohsMin='+mohsMin+"&mohsMax="+mohsMax+"&densityMin="+densityMin+"&densityMax="+densityMax+"&priceMin="+priceMin+"&priceMax="+priceMax+"&nameSubString="+nameSubString+"&type="+type);
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getMaxAndMins() {
  let response = await fetch(apiEndPoint+'/rocks/maxvalues');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function checkUser(email:String,password:String):Promise<boolean>{
  let response = await fetch(apiEndPoint+'/users/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'email':email, 'password':password})
    });
  if (response.status===200){
    sessionStorage.setItem("userLogged", email.toString());
    return true;
  }
  else
    return false;

}

export async function getDeliveryCosts(address:String):Promise<Number>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/orders/deliveryCosts', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'address':address})
    });
  
  if (response.status===200){
    return response.json();
  }
  else
    return -1;

}

export async function logout():Promise<any>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/users/logout');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getOrders(): Promise<Order[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint + "/orders/userList/" + sessionStorage.getItem("userLogged"));
  return response.json();
}