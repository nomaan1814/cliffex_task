import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import './bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Header />
     <Routes>
         <Route path= '/' element={<LoginScreen />}/>
         <Route path= '/login' element={<LoginScreen />}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
