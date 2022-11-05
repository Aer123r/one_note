import React, {useEffect} from 'react';
import './home.css'

import {Outlet, useNavigate} from "react-router";
const Index = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        document.getElementById('ctr').onclick = function (e){
            const docks = document.getElementsByClassName("dock");
            for(let i=0;i<docks.length;i++){
                docks[i].style.backgroundColor = 'transparent';
            }
        }
    },[])
    return (
        <div id={'home1'}>
            <div id={'ctr'}>
                <div className={'dock'} onClick={(e)=>{
                    navigate('dirs');
                    e.target.style.backgroundColor = 'purple';
                }}>笔记本📒</div>
                <div className={'dock'} onClick={(e)=>{
                    navigate('del');
                    e.target.style.backgroundColor = 'purple';
                }}>回收站♻️</div>
                <div className={'dock'} onClick={(e)=> {
                    navigate('coop');
                    e.target.style.backgroundColor = 'purple';
                }}>云协作☁️</div>
            </div>
            <Outlet/>
        </div>

    );
};

export default Index;
