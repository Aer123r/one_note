import React, {useEffect} from 'react';
import {useState} from "react";
import './dirs.css';
import Markdown from "../Markdown";
import { v4 as uuidv4 } from 'uuid';
import Refactor from "../refactor/refactor";
const Index = () => {
    const [preview,setPreview] = useState(false);
    const resetStatus = (type)=>{
         switch (type){
             case 'rename':
                return ()=>{
                    setRefactor({isShow: false,name:'',type:'',file: refactor.file})
                };
             case 'find':
                 return (action)=>{
                     if(action==='cancel')
                        setRefactor({isShow: false,name:'',type:'',file: refactor.file})
                     else
                         console.log("@")
                 };
             default:
                 return ()=>{
                     setRefactor({isShow: false,name:'',type:'',file: refactor.file})
                 };
        }
    }
    const doSth = (type)=>{
        switch (type){
            case 'rename':
                return (name)=>{ refactor.file.name = name;setFiles({...files})};
            case 'find':
                return (action)=>{
                    switch (action){
                        case 'getFile':
                            return getFile();
                        case 'focusFile':
                            return (curFile)=>{
                                setCurrentFile(curFile);
                                setPreview(false);
                                updateVditor(curFile.content);
                            };
                        case 'setFiles':
                            return (files)=>{setFiles({...files})}
                        default:
                            return;
                    }
                };
            case 'preview':
                return ()=>{
                    setPreview(true);
                }
            case 'createFile':
                const file = refactor.file;
                return (name)=>{
                    addFile(file,name);

                    window.localStorage.setItem('files', JSON.stringify(files));
                };
            case 'createDir':
                const dir = refactor.file;
                return (name)=>{
                    addDir(dir,name);
                    window.localStorage.setItem('files', JSON.stringify(files));
                };
            default:
                return ()=>{}
        }
    }
    /**
     *
     * @param type 重构类型 rename,re-path,find
     * @param selectedFile 当前右键选中的文件
     */
    const remove=(file,root)=>{
        let url = file.url;
        root.children= root.children.filter((c)=>{
            if(url === c.url){
                const delFile = {
                  files:[],
                };
                if(localStorage.getItem('delFiles')){
                    delFile.files = JSON.parse(localStorage.getItem('delFiles'));
                };
                delFile.files.push(c);
                localStorage.setItem('delFiles',JSON.stringify(delFile.files));
            }
            return c.url !== url;
        })
        setFiles({...files});
        if(!root.isFile){
            root.children.forEach(r=>{
                if(!r.isFile){
                    remove(file,r);
                }
            })
        }
    };
    const doReactor = (type,selectedFile=files)=>{
        refactor.type= type;
        refactor.name = selectedFile.name;
        refactor.isShow = true;
        refactor.file = selectedFile;
        setRefactor({...refactor});
    }
    //设置重命名，一定文件等操作
    const [refactor,setRefactor] = useState({
        isShow:false,
        file:null,
        type:'',
        name:''
    });
    const createFile = (isFile,name,url,parent=files,content='点此处编辑')=>{
        return {
            isFile,
            name,
            url:url+'/'+name+uuidv4(),
            children:[],
            content:content,
            isSelected:true,
            createTime: getCurrentTime(),
        }
    }
    const getCurrentTime = ()=>{
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const dates = date.getDate();
        return `${year}/${month}/${dates}`
    }
    const [files,setFiles] = useState({

        name:'root',
        url:'/root',
        createTime: getCurrentTime(),
        children:[{
            name:'使用指南',
            url:'/root/readme',
            content:'# i-mark使用指南',
            children:[],
            isFile:true,
            isSelected:true,
        }],
        isFile:false,
        content:'',
    });
    const [color,setColor] = useState('transparent')
    useEffect(()=>{
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        function darkModeHandler() {
            if (mediaQuery.matches) {
                setColor('#012940');
            } else {
               setColor('#F1F3F4');
            }
        }
    // 判断当前模式
        darkModeHandler()
    // 监听模式变化
        mediaQuery.addListener(darkModeHandler)
        let fileStr=window.localStorage.getItem("files");
        if(fileStr){
            const file = JSON.parse(fileStr);
            setFiles({...file});
        }
    },[])
    useEffect(()=>{
        const fileNodes = document.getElementsByClassName('file');
        let len = fileNodes.length
        for(let i=0;i<len;i++){
            if(fileNodes[i].style.backgroundColor!=='transparent')
                fileNodes[i].style.backgroundColor = color;
        }
    },[color])
    useEffect(()=>{
        document.getElementById('dir').oncontextmenu = function (e){
            setContextMenu(e,files);
            return false;
        }
        document.onclick = function (e){
            menu.isShow=false;
            setMenu({...menu});
            window.localStorage.setItem('files',JSON.stringify(files));
        }
    })
    const getFile = ()=>{
        return files;
    }
    const showContextMenu=()=>{
        const {isShow,x,y,file} = menu;
        if(!isShow) return "";
        return (
            <div
                style={{left:x,top:y}}
                id={'rightClick'}>
                {!file.isFile&&<div
                    onClick={(e)=>{
                        e.stopPropagation();
                        menu.isShow = false;
                        setMenu({...menu});
                        doReactor('createFile',file);
                    }}>文件
                </div>}
                {!file.isFile&&<div
                    onClick={async (e) => {
                        e.stopPropagation();
                        menu.isShow = false;
                        setMenu({...menu});
                        doReactor('createDir', file)
                    }}>文件夹
                </div>}
                <div onClick={()=>{
                    doReactor('rename',file);
                }}>重命名</div>
                <div onClick={()=>{
                    remove(file,files);
                }}>删除</div>
             </div>
        )}
    /**
     * @param currentFile:当前文件
     * 当前选择的文件
     */
    const [currentFile,setCurrentFile] = useState(null);
    const [menu,setMenu] = useState({
        isShow:false,
        x:0,
        y:0,
        file:files
    });
    /**
     * @param updateVditor:()=>{} 用于设置vditor 内容
     */
    const [updateVditor,getFunction] = useState(number=>{});
    /**
     * @function 监听按键，更新内容
     * @param value
     */
    const keydown = (value)=>{
        currentFile.content = value;
        setFiles({...files});
        window.localStorage.setItem('files',JSON.stringify(files));
    }
    const onRef = (update)=>{
        getFunction(()=>update);
    }
    const addFile = (file,name='untitled')=>{
        if(file.isFile) {console.log("error! the file is not a directory"); return;}
        file.children.push(createFile(true,name,file.url,file));
        setFiles({...files});
    };
    const addDir = (file,name='文件夹')=> {
        if(file.isFile) {console.log("error! the file is not a directory"); return;}
        file.children.push(createFile(false,name,file.url,file));
        setFiles({...files});
    };
    const setContextMenu = (e,file,isShow=true)=>{
        menu.isShow = isShow;
        menu.x = e.pageX;
        menu.y = e.pageY;
        menu.file = file;
        setMenu({...menu});
    };
    useEffect(()=>{

    },[currentFile])

    const showFiles = (files)=>{
        // if(files.isFile) return <div style={{font:'40px'}}>{files.name}<p style={{overflow:'hidden'}}>{files.createTime+"  "+ files.content}</p></div>;
        if(files.children.length===0) return "";
        return files.children.map((file,index)=>{
            return (<div
                key={index}
                className={'file'}
                style={{border:'1px solid red',width:'100px',position:'relative',left:0}}
                onClick={(e)=>{
                    if(file.isFile){
                        e.stopPropagation();
                        //设置vditor内容
                        setCurrentFile(file);
                        setPreview(false);
                        updateVditor(file.content);
                        const fileNodes = document.getElementsByClassName('file');
                        let len = fileNodes.length
                        for(let i=0;i<len;i++){
                            fileNodes[i].style.backgroundColor = 'transparent';
                        }

                        e.currentTarget.style.backgroundColor = color;
                    }else{
                        e.stopPropagation();
                        file.isSelected = !file.isSelected;
                        setFiles({...getFile()});
                    }
                }}
                onContextMenu={(e)=>{
                    setContextMenu(e,file);
                    e.stopPropagation();
                    e.preventDefault();
                }}

            >{file.name}
                <p style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap', fontSize:'14px',position:'relative'}}>
                    {files.createTime+"    "+(file.isFile?file.content:'')}</p>
                {!file.isFile&&file.isSelected&&showFiles(file)}
            </div>)
        })
    }
    return (
        <div id={'right'}>
            <div id={'dir'} >
                <div id={'toolbar'}>
                    <p id={'find'} onClick={()=>{doReactor('find')}}>查找</p>
                    <p id={'preview'} onClick={()=>{doSth('preview')()}}>预览</p>
                </div>
                {files.length===0&&<div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>没有文件</div>}
                {showFiles(files)}
                {showContextMenu()}
            </div>
            {!preview&&currentFile!==null&&files.children.length!==0&&<Markdown
                    value={currentFile.content}
                    onRef={onRef}
                    keydown={keydown}
                />}
            {refactor.isShow&&<Refactor type={refactor.type} setRefactor={resetStatus(refactor.type)} doSth={doSth(refactor.type)}/>}
        </div>
    );
};



export default Index;
