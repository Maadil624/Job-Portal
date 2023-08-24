import Jobsite from "./routing/Jobsite"
import { Route, Routes } from "react-router";
import Home from "./routing/Home";
import Login from "./routing/Login";
import Register from "./routing/Register";
import CreateJobs from "./routing/CreateJobs";
import Files from "./routing/Files";
import FbLoginDisplay from "./routing/FbLoginDisplay";
import AllfileUsers from "./routing/AllfileUsers";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createjob' element={<CreateJobs/>}/>
        <Route path='/alljob' element={<Jobsite/>}/>
        <Route path='/fileupload' element={<Files/>}/>
        <Route path='fileusers' element={<AllfileUsers/>}/>
        <Route path='/facebook/callback' element={<FbLoginDisplay/>}/>
      </Routes>
    </div>
  );
}

export default App;
