import React, {useState} from 'react';
import Btn from "../../components/button/MyBtn";
import './frontPage.css'
import Mask from "../../components/mask/Mask";
const Index = () => {
    let [isClickLogin, setIsClickLogin] = useState(false);
    const closeLoginForm = () => {
        setIsClickLogin(() => false)
    }
    {
        const isMobile = () => {
            return /(iPhone|iPad|iPod|iOS|Android|Linux armv8l|Linux armv7l|Linux aarch64)/i.test(navigator.userAgent);
        };
        if(isMobile()){
            return (<div style={{height:'100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div style={{position:'relative',top:'-20%'}}>下载移动端软件</div>
                </div>)
        }

    }
    return (
        <div id='frontPage'>

            {isClickLogin ? <Mask closeLoginForm={closeLoginForm}/> : ""}
            <div className='mid'>
                <div className='mainTitle'>正发生</div>
                <div>立即加入Two-Note</div>
                <Btn slogan={'注册'} onClick={() => {
                    alert('注册')
                }}/>
                <Btn slogan={'登录'} onClick={() => {
                    setIsClickLogin(() => true)
                }}/>
            </div>
        </div>
    );
};

export default Index;
