import React, {useEffect, useState} from 'react';

const Deleted = () => {
    const [delFiles,setDelFiles] = useState([])
    const [content,setContent] = useState('')
    useEffect(()=>{
        let files;
        if(files=localStorage.getItem('delFiles')){
            setDelFiles(JSON.parse(files));
        }

    },[])
    return (
        <div style={{display:'flex',flexDirection:'row'}}>
            <div>
                {delFiles.map((f,i)=>(
                    <div key={i} onClick={()=>{
                        setContent(f.content);
                    }}>{f.name}</div>
                ))}
            </div>
            <div>{content}</div>
        </div>
    );
};

export default Deleted;
