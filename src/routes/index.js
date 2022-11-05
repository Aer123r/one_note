import {lazy} from "react";
import FrontPage from "../pages/frontPage";
import Dirs from "../components/Dirs/dirs"
import Deleted from "../pages/Deleted";
import Coop from "../pages/Coop";
const Home = lazy(()=>import("../pages/Home"))
const gate = ()=>{
    if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'))
        return <Home/>
    }
    return <FrontPage />
}
const routes = [
    {
        path:'/',
        element:<FrontPage/>
    },
    {
        path:'/home',
        element:gate(),
        children:[
            {
                path:'dirs',
                element: <Dirs/>
            },
            {
                path:'del',
                element: <Deleted/>
            },
            {
                path:'coop',
                element: <Coop/>
            }
        ]
    }
]
export default routes
