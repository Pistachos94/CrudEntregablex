import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({getUser, userSelected, deselectUser}) => {
    const {register, handleSubmit, reset}=useForm()

    const [name, setName]= useState("");
    const [lastName, setLastName]= useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]= useState("");
    const [date, setDate]=useState("");

    useEffect(()=>{
        if(userSelected){
            reset(userSelected)
        }
    },[userSelected])

    const submit =(data)=>{
        if(userSelected){
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
                .then(()=>getUser())
        }
        else{
            axios.post('https://users-crud1.herokuapp.com/users/', data)
            .then(()=>getUser())
            .catch(error =>console.log(error.response));
        }
        clear();
    }
    
    const clear =()=>{
        reset({
            first_name:"",
            last_name:"",
            email:"",
            password: "",
            birthday: ""
        })
        deselectUser();
    }
    return (
        <div className='formCont'>
            <form onSubmit={handleSubmit(submit)}>
                <h2>New User</h2>
                <div className='disflex contInfo'>
                    <div className='iconCont'>
                        <label><i class="fas fa-user"></i></label>
                    </div>
                    <div className='inputCont  disflex wrap'>
                        <input 
                            className='nameInput inputInfo' 
                            type="text" 
                            placeholder='Firstname' 
                            {...register("first_name")}    
                        />
                        <input 
                            className='inputInfo' 
                            type="text" 
                            placeholder='LastName'
                            {...register("last_name")}
                        />
                    </div>
                </div>
                <div className='disflex contInfo'>
                    <div className='iconCont'>
                        <label>
                            <i class="fas fa-envelope"></i>
                        </label>
                    </div>
                    <div className='inputCont'>
                        <input 
                            className='inputInfo' 
                            type="email"
                            placeholder='Email'
                            {...register("email")}                       
                        />
                    </div>
                </div>
                <div className='disflex contInfo'>
                    <div className='iconCont'>
                        <label>
                            <i className="fa-solid fa-lock"></i>
                        </label>
                    </div>
                    <div className='inputCont'>
                        <input 
                            className='inputInfo' 
                            type="password"
                            placeholder='password'
                            {...register("password")}
                        />
                    </div>
                </div>
                <div className='disflex contInfo'>
                    <div className='iconCont'>
                        <label>
                            <i className="fa-solid fa-cake-candles"></i>
                        </label>
                    </div>
                    <div className='inputCont'>
                        <input 
                            className='inputInfo' 
                            type="date"
                            {...register("birthday")}    
                        />
                    </div>
                </div>
                <div className="buttonCont contInfo disflex">
                    <button>{userSelected? "Update":"Create"}</button>
                    <button type='button' onClick={clear}>{userSelected? "Cancel":"Clear"}</button>
                </div>
            </form>
        </div>
    );
};

export default UsersForm;