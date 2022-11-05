import React, {useEffect, useRef, useState} from 'react';
import './Mask.css'
import {useNavigate} from "react-router";
import MyBtn from "../button/MyBtn";
const Mask = (p) => {
    const navigate = useNavigate()
    const acct = useRef();
    const psw = useRef();
    const [msg,setMsg] = useState('');
    useEffect(()=>{
        console.log(msg)
    })
//     method:'POST',
//

    const login = async () => {
        try {
            const response = (await fetch('/login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    username:acct.current.value,
                    password:psw.current.value
                })
            }));
            const data = await response.json()
            if (data.code === 200) {
                window.localStorage.setItem('token','123');
                setTimeout(()=>{
                    navigate('/home')
                },2000)
            }else{
                setMsg(()=>data.message);
            }
        }catch (e){
            setMsg(()=>'the network is not connected')
        }


    }

    return (
        <div id='Mask'>
            <div className='form'>
                <div className='closeBtn'  onClick={p.closeLoginForm}/>
                <div className={'formMid'}>
                    <p style={{color:'red',position:'absolute',top:'20px'}}>{msg}</p>
                    <input type='text' placeholder={'账号'} ref={acct} onKeyDown={()=>{setMsg('')}}/>
                    <input type='text' placeholder={'密码'} ref={psw} onKeyDown={()=>{setMsg('')}}/>
                    <MyBtn onClick={login} slogan={'确定'}/>
                </div>

            </div>
        </div>
    );
};

export default Mask;
