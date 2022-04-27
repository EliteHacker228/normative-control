// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Welcome from "./components/Pages/Welcome/Welcome";
import FileUpload from "./components/Pages/FileUpload/FileUpload";
import GetStatus from "./components/Pages/GetStatus/GetStatus";
import GetResult from "./components/Pages/GetResult/GetResult";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='' element={<Welcome/>}/>
                        <Route path='upload' element={<FileUpload/>}/>
                        <Route path='test' element={<GetStatus/>}/>
                        <Route path='result' element={<GetResult/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
