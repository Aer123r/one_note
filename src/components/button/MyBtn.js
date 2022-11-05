import React from 'react';
import './MyBtn.css'

/**
 *
 * @param p 参数需要一个'slogen',作为按钮的名字
 * @returns {JSX.Element}
 * @constructor
 *
 */
const MyBtn = (p) => {
    return (
        <div id='Btn' onClick={p.onClick}>
            <span>{p.slogan}</span>
        </div>
    );
};

export default MyBtn;
