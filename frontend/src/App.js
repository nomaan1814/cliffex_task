import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import './bootstrap.min.css';
import UsersScreen from './screens/UsersScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <BrowserRouter>
    <Header />
     <Routes>
         <Route path= '/' element={<LoginScreen />}/>
         <Route path= '/login' element={<LoginScreen />}/>
         <Route path='/userlist' element={<UsersScreen />} />
         <Route path='/register' element={<RegisterScreen />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
