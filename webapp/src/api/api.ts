import {User, Rock} from '../shared/shareddtypes';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function getRocas():Promise<Rock[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/rocks/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
} 


export async function getRocksSedimentary():Promise<Rock[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/rocks/list/sedimentary');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getRocksFiery():Promise<Rock[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/rocks/list/fiery');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}
export async function getRocksMetamorphic():Promise<Rock[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/rocks/list/metamorphic');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function checkUser(username:String,password:String):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/users/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'usuario':username, 'contraseña':password})
    });
  if (response.status===200)
    return true;
  else
    return false;

}