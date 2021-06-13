import axios from 'axios'



const ListeVoiture = () => {
  return axios.get("http://localhost:3212/api/v1/voiture/")
}
const CreateVoiture = (data) => {
  return axios.post("http://localhost:3212/api/v1/voiture/",data)
}

const LoginUser = (data) => {
  return axios.post("http://localhost:3212/api/v1/users/login", data)
}

const RegisterUser = (data) =>{
    return axios.post("http://localhost:3212/api/v1/users/signup",data)
}
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
const AjouterCommenatire  = (data) =>{
  return axios.post("http://localhost:3212/api/v1/commenatire/",data,{headers: headers})
}

const ListeCommenatireByVoiture = (id) =>{
  return axios.get("http://localhost:3212/api/v1/commenatire/" +id,{headers: headers})
}
export {
    RegisterUser,
    LoginUser,
    ListeVoiture,
    CreateVoiture,
    AjouterCommenatire,
    ListeCommenatireByVoiture

};