import axios from 'axios';
import React from 'react';

const UserList = ({users, selectUser, getUser}) => {

    const deleteUser=(id)=>{
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}`)
            .then(()=>getUser())
    }

    return (
        <div className='listCont'>
            <ul>
                {users.map(user=>(
                    <li key={user.id} className="userCont disflex">                 
                            <div className='infoUserCont'>
                                <div>
                                    <h3>{user.first_name} {user.last_name}</h3>
                                </div>
                                <div>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <p>{user.birthday}</p>
                                </div>
                            </div>
                            <div className='buttonUserCont disflex'>
                                <button onClick={()=>selectUser(user)}><i className="fa-solid fa-pencil"></i></button>
                                <button onClick={()=>deleteUser(user.id)} type="button"><i className="fa-solid fa-trash"></i></button>
                            </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;