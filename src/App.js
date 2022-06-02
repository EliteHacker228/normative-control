// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Welcome from "./components/Pages/Welcome/Welcome";
import FileUpload from "./components/Pages/FileUpload/FileUpload";
import GetResult from "./components/Pages/GetResult/GetResult";
import About from "./components/Pages/About/About";
import Faq from "./components/Pages/Faq/Faq";

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
                        <Route path='about' element={<About/>}/>
                        <Route path='faq' element={<Faq/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
