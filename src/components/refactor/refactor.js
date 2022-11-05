import React, {useRef, useState} from 'react';
import './refactor.css'
const Refactor = (props) => {
    const inputText = useRef();
    const [inputName,setInputName] = useState('');
    const {type,prevName,setRefactor,doSth} = props;
    const files = type==='find'?doSth('getFile'):undefined;
    const searchFile = (fileName,root)=>{
        const findFileByName = (fileName,root)=>{
            if(root.name.match(fileName)!==null&&root.name.match(fileName)[0]!==''){
                return  <div
                    onClick={()=>{
                        doSth('focusFile')(root);
                        setRefactor('cancel');
                    }}
                >{root.name}
                    {
                        !root.isFile&&root.children.map((r)=>{
                           return searchFile(fileName,r)
                        })
                    }
                </div>
            }
            else if(!root.isFile){
                return root.children.map((r)=>(
                    searchFile(fileName,r)
                ))
            }

        }
        return findFileByName(fileName,root);
    }
    if(type==='rename')
        return (
        <div id={'refactor'}>
            <p className={'cancel'} onClick={()=>{setRefactor()}}>X</p>
            <p>将文件名改为:</p>
            <input value={prevName} ref={inputText}/>
            <button onClick={()=>{setRefactor();doSth(inputText.current.value)}}>确定</button>
        </div>
        )
    else if(type==='createFile'||type==='createDir')
        return (
            <div id={'refactor'}>
                <p className={'cancel'} onClick={()=>{setRefactor()}}>X</p>
                <p>将文件命名为:</p>
                <input value={prevName} ref={inputText}/>
                <button onClick={()=>{setRefactor();doSth(inputText.current.value)}}>确定</button>
            </div>
        )
    else
        return (
        <div id={'refactor'}>
            <p onClick={()=>{setRefactor('cancel')}} className={'cancel'}>X</p>
            <p>要查找的文件？</p>
            <input value={prevName} ref={inputText} onKeyUp={(e)=>{setInputName(e.target.value)}}/>
            {searchFile(inputName,files)}
        </div>
    );
};

export default Refactor;
