import axios from 'axios'
import React, { useEffect } from 'react'

function Profile() {


  useEffect(() => {
   getUserList()
  }, [])

  const getUserList = () => {
    let token = localStorage.getItem("access_token")
    if(!token){
      return null
    }
    let headers = {
      Authorization : token
    }
    axios.get("http://localhost:9000/user/getAll",{headers})
    .then((res) => console.log(res))
    .catch(err => console.log(err))
  }
  

  return (
    <div>Profile</div>
  )
}

export default Profile