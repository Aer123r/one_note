import React from 'react';
import {Navigate} from "react-router";
const Index = (p) => {
    return (
        <div>
            {p.render()?<Navigate to={'/home'}/>:""}
        </div>
    );
};

export default Index;
