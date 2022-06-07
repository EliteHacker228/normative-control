import css from './Login.module.css';
import file_ico from './file-ico.svg';
import globe_ico from './glode-ico.svg';
import {NavLink} from "react-router-dom";
import back_arrow from "../Login/back_arrow.svg";
import React, {Component} from "react";
import state from "../../../../storage/storage";


class Login extends Component {

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
                console.log(result);
            })
            .catch(error => console.log('error', error));
    };

    render() {
        return (
            <div className={css.body}>
                <form className={css.login_form} onSubmit={this.login} id="login_form">
                    <input type="text" placeholder="E-mail" name="email"/>
                    <input type="password" placeholder="Пароль" name="password"/>
                    <input type="submit" value="Войти"/>
                </form>
            </div>
        );
    }
}

export default Login;