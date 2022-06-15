import css from './Login.module.css';
import file_ico from './file-ico.svg';
import globe_ico from './glode-ico.svg';
import {NavLink} from "react-router-dom";
import back_arrow from "../Login/back_arrow.svg";
import admin_ico from './admin_ico.png';
import login_ico from './login_ico.png';
import password_ico from './password_ico.png';
import React, {Component} from "react";
import state from "../../../../storage/storage";


class Login extends Component {

    constructor() {
        super();
        console.log('Состояние в локал сторидже Login');
        console.log(localStorage.getItem('normokontrol_state'));
        this.state = JSON.parse(localStorage.getItem('normokontrol_state'));
        if (this.state === null) {
            this.state = state;
        }
        console.log(this.state);
    }

    componentDidMount() {

        if (this.state['credentials'] !== undefined && this.state['credentials'] !== 'null') {
            setTimeout(() => {
                // document.getElementById('reroute').click();
                // window.location.reload();
                // document.location.href = '/admin_panel/search_file';
                // window.location.href = 'http://localhost:3000/admin_panel/search_file';
                // window.location.replace('http://localhost:3000/admin_panel/search_file');
                // window.location.assign('http://localhost:3000/admin_panel/search_file');
            }, 10);
        } else {
            console.log(this.state['credentials']);
        }
    }

    // redirect = () => {
    //     document.getElementById('reroute').click();
    // };

    login = (evt) => {
        evt.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let formData = new FormData(document.getElementById("login_form"));
        let emptyFormData = {};
        formData.forEach((value, key) => emptyFormData[key] = value);
        let raw = JSON.stringify(emptyFormData);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://normative-control-api.herokuapp.com/auth/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                state['credentials'] = result;
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                console.log(result);
                console.log(state);
                // document.getElementById('reroute').click();
                document.getElementById('login').click();
            })
            .catch(error => console.log('error', error));
    };

    render() {
        return (
            <div className={css.body}>
                <form className={css.login_form} onSubmit={this.login} id="login_form">
                    <img className={css.admin_ico} src={admin_ico}/>
                    <p>Вход в панель управления</p>
                    {/*<img className={css.login_ico} src={login_ico}/>*/}
                    <input type="text" placeholder="email" name="email"/>
                    {/*<img className={css.password_ico} src={password_ico}/>*/}
                    <input type="password" placeholder="password" name="password"/>
                    <input type="submit" value="Войти"/>
                </form>
                <NavLink id="reroute" to='/admin_panel/search_file' style={{display: "none"}}/>
                {/*<a href="http://localhost:3000/admin_panel/search_file" id="login" style={{display: "none"}}/>*/}
                <a href="https://normative-control.herokuapp.com/admin_panel/search_file" id="login" style={{display: "none"}}/>
            </div>
        );
    }
}

export default Login;