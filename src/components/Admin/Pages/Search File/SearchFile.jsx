import css from './SearchFile.module.css';
import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import state from "../../../../storage/storage";
import config from "../../../../config/config";
import translations from "../../../../translations/translations";

const RenderList = (props) => {
    let elements = props.elements;
    return (
        <ul>
            {elements.map(element => (
                <li>{element}</li>
            ))}
        </ul>
    );
};


let refreshed = 0;

class SearchFile extends Component {

    constructor() {
        super();
        this.state = JSON.parse(localStorage.getItem('normokontrol_state'));
        if (this.state === null) {
            this.state = state;
            this.state['credentials'] = "null"
        }
        this.state['result'] = {}
        this.state['result']['document-id'] = ""
        this.state['result']['password'] = ""
        this.state['result']['mistakes'] = []
        this.credentials = JSON.parse(this.state['credentials']);
    }

    componentDidMount() {

        if (this.state['credentials'] === "null") {
            setTimeout(() => {
                document.getElementById('reroute').click();
            }, 0);
        }
    }

    findFile = (evt) => {
        evt.preventDefault();
        let myHeaders = new Headers();
        let accessToken = `Bearer ${this.credentials['access-token']}`;
        myHeaders.append("Authorization", accessToken);

        let formData = new FormData(document.getElementById("login_form"));
        let emptyFormData = {};
        formData.forEach((value, key) => emptyFormData[key] = value);
        let raw = emptyFormData;

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let status = 0;

        fetch(`${config['apiAddress']}/control-panel/find-by-id?document-id=${raw['document-id']}`, requestOptions)
            .then(response => {
                status = response['status'];
                return response.json();
            })
            .then(result => {
                if (status === 200) {
                    this.state['result'] = result;
                    refreshed = 0;
                    this.makeVisible();
                    this.makeErrorInvisible();
                    this.forceUpdate();
                } else if (status === 404) {
                    this.makeInvisible();
                    this.makeErrorVisible();
                    this.forceUpdate();
                } else if (status === 401) {
                    if (refreshed === 0) {
                        this.refreshToken().then(() => this.findFile(new Event("Event", {event: false})));
                        refreshed += 1;
                    } else if (refreshed === 1) {
                        refreshed += 1;
                    } else {
                        document.getElementById('logout').click();
                    }
                }
            })
            .catch(error => console.log('error', error));
    };

    refreshToken = () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "refresh-token": `${this.credentials['refresh-token']}`
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch(`${config['apiAddress']}/auth/refresh-token`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.credentials['access-token'] = result['access-token'];
                this.credentials['refresh-token'] = result['refresh-token'];
            })
            .catch(error => console.log('error', error));
    };

    deleteFile = (evt) => {
        evt.preventDefault();
        let myHeaders = new Headers();
        let accessToken = `Bearer ${this.credentials['access-token']}`;
        myHeaders.append("Authorization", accessToken);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${config['apiAddress']}/control-panel/delete?document-id=${this.state['result']['document-id']}`, requestOptions)
            .then(response => response.text())
            .then(_ => {
                this.makeInvisible();
            })
            .catch(error => console.log('error', error));
    };

    clearInput = (evt) => {
        evt.preventDefault();
        document.getElementById("document-id").value = "";
    };

    downloadFile = (evt) => {
        evt.preventDefault();
        document.getElementById('downloader').src = `${config['apiAddress']}/document/${this.state['result']['document-id']}/raw-file?access-key=${this.state['result']['access-key']}`;
    };

    makeVisible() {
        document.getElementById("inf_block").style.visibility = "visible";
        document.getElementById("errors_block").style.display = "block";
        document.getElementById("errors_block").style.visibility = "visible";
        document.getElementById("errors").style.visibility = "hidden";
    };

    makeErrorVisible() {
        document.getElementById("wrong_id_error").style.display = "block";
    };

    makeErrorInvisible() {
        document.getElementById("wrong_id_error").style.display = "none";
    };

    makeInvisible() {
        document.getElementById("inf_block").style.visibility = "hidden";
        document.getElementById("errors_block").style.display = "none";
        document.getElementById("errors_block").style.visibility = "hidden";
        document.getElementById("errors").style.visibility = "visible";
    };

    render() {
        return (
            <div className={css.body}>
                <div className={css.content}>
                    <div className={css.search_block}>
                        <form className={css.search_form} onSubmit={this.findFile} id="login_form">
                            <p>Чтобы просмотреть результат проверки файла студента, вставьте ID документа:</p>
                            <div className={css.input_block}>
                                <input type="text" placeholder="ID документа" name="document-id" id="document-id"/>
                                <input type="submit" alt="Поиск" value="" title="Найти файл"/>
                                <input type="button" value="" title="Очистить поле ввода" className={css.clear_input} onClick={this.clearInput}/>
                            </div>
                        </form>
                    </div>

                    <div className={css.doc_inf}>
                        <p id="wrong_id_error" style={{display: "none"}} className={css.wrong_id_error}>Файл с указанным
                            ID не существует, или был удалён</p>
                        <div className={css.inf_block} id="inf_block" style={{visibility: "hidden"}}>
                            <h1>Найденный файл</h1>
                            <p>Используйте указанный ниже пароль для разблокировки файла и дальнейшей проверки.</p>
                            <div className={css.file_data}>
                                <div className={css.file_data_block}>
                                    <p>ID: <span
                                        className={css.file_data_inf}>{this.state['result']['document-id']}</span></p>
                                    <p>Пароль: <span
                                        className={css.file_data_inf}>{this.state['result']['password']}</span></p>
                                    <p>Найдено ошибок в файле: <span
                                        className={css.file_data_inf}>{this.state['result']['mistakes'].length}</span>
                                    </p>
                                </div>
                                <div className={css.file_data_buttons}>
                                    <button className={css.file_data_buttons_download}
                                            onClick={this.downloadFile}
                                            title="Скачать файл"/>
                                    <button className={css.file_data_buttons_delete}
                                            onClick={this.deleteFile}
                                            title="Удалить файл"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={css.errors} id="errors">
                        <div className={css.errors_block} id="errors_block" style={{visibility: "hidden"}}>
                            <RenderList
                                elements={this.state['result']['mistakes'].map(x => x['mistake-type']).sort(x => x['paragraph-id']).map(error_code => translations[error_code])}/>
                        </div>
                    </div>
                    <NavLink id="reroute" to='/auth/login' style={{display: "none"}}/>
                    <NavLink id="logout" to='/auth/logout' style={{display: "none"}}/>
                </div>
                <iframe id="downloader" style={{display: 'none'}}/>
            </div>
        );
    }
}

export default SearchFile;