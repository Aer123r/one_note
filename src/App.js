import './App.css'
import {useRoutes} from 'react-router'
import {Suspense} from "react";
import routes from './routes'
import Loading from "./pages/Loading";
function App() {
  return (
    <div className="App" style={{maxHeight:'100vh',overflow:'hidden'}}>
      <Suspense fallback={<Loading/>}>
        {useRoutes(routes)}
      </Suspense>
    </div>
  );
}

export default App;
