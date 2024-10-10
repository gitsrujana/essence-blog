
import { Route, Routes } from 'react-router-dom';
import './App.css';


import Navbar from './components/Navbar/Navbar';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

import BlogHome from './components/Home/BlogHome';
import BlogPost from './components/Home/BlogPost';





function App() {
  return (
    <div className="App">
      <Navbar/>
     
      {/* <RegistrationData/> */}
   
     <Routes>
      <Route path='/home' element={<BlogPost/>}/>
      <Route path='/post' element={<BlogHome/>}/>
      <Route path='/RegistrationForm' element={<RegistrationForm/>}/>
     </Routes>
    </div>
  );
}

export default App;
