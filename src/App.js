// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Welcome from "./components/Pages/Welcome/Welcome";
import FileUpload from "./components/Pages/FileUpload/FileUpload";
import GetResult from "./components/Pages/GetResult/GetResult";
import Faq from "./components/Pages/Faq/Faq";
import Login from "./components/Admin/Pages/Login/Login";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='' element={<Welcome/>}/>
                        <Route path='upload' element={<FileUpload/>}/>
                        <Route path='result' element={<GetResult/>}/>
                        <Route path='faq' element={<Faq/>}/>
                        <Route path='auth/login' element={<Login/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
