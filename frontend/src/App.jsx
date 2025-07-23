import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UpdatePassword from './pages/UpdatePassword';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<SignIn/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/update-password' element={<UpdatePassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
