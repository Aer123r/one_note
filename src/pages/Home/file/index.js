import React from 'react';
import './file.css'
import {useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
const Index = () => {
    const [content,setContent] = useState('');
    const textArea = useRef();
    const mdEle = useRef();
    useEffect(()=>{
    },[content]);
    return (
        <div id={'file'}>
            <div id={'markdown'} ref={mdEle} >
                <Markdown children={content}/>
            </div>
            <div id={'textArea'}
                 autoFocus={true}
                 placeholder={'在这里做笔记'}
                 onKeyDown={(e)=>{
                     setTimeout(()=>{
                         setContent(()=>e.target.innerText)
                     },10)
                 }}
                 contentEditable={true}
                 ref={textArea}
            />
        </div>
    );
};
const Markdown = (p) => {
    const {children} = p
    useEffect(()=>{
    })
    return (
        <ReactMarkdown unwrapDisallowed={true} children={children}></ReactMarkdown>
    );
};
export default Index;
