import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UsersForm from './Components/UsersForm'
import axios from 'axios';
import UserList from './Components/UserList';

function App() {
  
  const [users,setUsers]=useState([]);
  const [userSelected, setUserSelected]=useState(null)
  useEffect(()=>{
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res=> setUsers(res.data));
  },[])
  console.log(users)

  const getUser=()=>{
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res=>setUsers(res.data))
  }

  const selectUser=(user)=>{
    setUserSelected(user)
  }
  const deselectUser= ()=> setUserSelected(null)

  return (
    <div className="App">
        <UsersForm getUser={getUser} userSelected={userSelected} deselectUser={deselectUser}/>
        <UserList users={users} selectUser={selectUser} getUser={getUser}/>
    </div>
  )
}

export default App
