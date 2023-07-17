import Jobsite from "./routing/Jobsite"
import { Route, Routes } from "react-router";
import {Link} from "react-router-dom";
import Home from "./routing/Home";
import Login from "./routing/Login";
import Register from "./routing/Register";
import CreateJobs from "./routing/CreateJobs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createjob' element={<CreateJobs/>}/>
        <Route path='/alljob' element={<Jobsite/>}/>
      </Routes>
    </div>
  );
}

export default App;
