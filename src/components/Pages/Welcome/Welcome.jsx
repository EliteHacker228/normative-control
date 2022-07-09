import css from './Welcome.module.css';
import icon from './doc.svg';
import loading from './loading-11.gif';
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import config from "../../../config/config";

import state from "../../../storage/storage";


// let state;

class Welcome extends Component {

    constructor() {
        super();
        this.state = JSON.parse(localStorage.getItem('normokontrol_state'));
        if (this.state === null) {
            this.state = state;
        }
        this.state['renderSizeError'] = false;
        this.state['renderFormatError'] = false;
        let accessKey = this.generateAccessKey(128);
        localStorage.setItem('accessKey', accessKey);
        this.state['accessKey'] = localStorage.getItem('accessKey');
    };

    componentDidMount() {
        this.reservePlaceInQueue();
    }

    generateAccessKey = (length) => {
        let result = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    };

    fileInputOnInput = (evt) => {
        let file = evt.target.files[0];
        this.reservePlaceInQueue().then(() => {
            let si = setInterval(() => {
                this.checkFileStatusOnServer(this.state['documentId'])
                let checkStatus = this.state['checkStatus'];
                switch (checkStatus) {
                    case 'READY_TO_ENQUEUE':
                        clearInterval(si);
                        this.sendFileToCheckOnServer(file);
                        break;
                    default:
                        break;
                }
            }, 100);
        });

    };

    checkFileStatusOnServer = (id) => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${config['apiAddress']}/document/${id}/status?access-key=${this.state['accessKey']}`, requestOptions)
            .then(response => {
                return response.text();
            })
            .then(result => {
                result = JSON.parse(result)['status'];
                this.state['checkStatus'] = result;
            })
            .catch(error => console.log('error', error));
    };

    fileSendButtonOnClick = (evt) => {
        evt.preventDefault();
        let input = document.createElement('input');
        input.type = 'file';
        input.oninput = this.fileInputOnInput;
        input.click();
    };

    async reservePlaceInQueue() {
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        let response = await fetch(`${config['apiAddress']}/queue/reserve?access-key=${this.state['accessKey']}`, requestOptions);
        let document = await response.json();
        this.state['documentId'] = document['document-id'];
    };

    sendFileToCheckOnServer = (file) => {
        let formdata = new FormData();
        if (file['size'] > 20971520) { //Это 20 Мегабайт в Байтах
            this.state['renderSizeError'] = true;
            this.state['renderFormatError'] = false;
            this.forceUpdate();
            return;
        } else if (file['name'].split('.').pop() !== 'docx') {
            this.state['renderSizeError'] = false;
            this.state['renderFormatError'] = true;
            this.forceUpdate();
            return;
        }

        this.state['file'] = file;

        let form = document.getElementById('upload_block');
        form.style.display = 'none';
        let load = document.getElementById('download');
        load.style.display = 'block';

        formdata.append("file", file, file.name);
        formdata.append("access-key", this.state['accessKey']);
        formdata.append("document-id", this.state['documentId']);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${config['apiAddress']}/queue/enqueue`, requestOptions)
            .then(response => {
                let status = response['status'];
                if (status === 202) {

                    this.state['fileName'] = file.name;
                    this.state['renderUploadInput'] = false;
                    this.state['checkStatus'] = 'QUEUE';
                    this.state['button_status'] = css.button_queue;
                    this.state['progressbar_status'] = css.progressbar_queue;

                    localStorage.setItem('normokontrol_state', JSON.stringify(this.state));
                    document.getElementById('reroute').click();
                }
            })
    };

    onDragEnter = (evt) => {
        evt.preventDefault();
        let uploadBlock = document.getElementById('drop_area');
        uploadBlock.style.backgroundColor = 'transparent';
    };

    onDragLeave = (evt) => {
        evt.preventDefault();
        let uploadBlock = document.getElementById('drop_area');
        uploadBlock.style.backgroundColor = 'transparent';
    };

    onDragOver = (evt) => {
        evt.preventDefault();
        let uploadBlock = document.getElementById('drop_area');
        uploadBlock.style.backgroundColor = 'rgba(192, 192, 192, 0.3)';
        uploadBlock.style.borderRadius = '25px';

    };

    onDrop = (evt) => {
        evt.preventDefault();
        let uploadBlock = document.getElementById('drop_area');
        uploadBlock.style.backgroundColor = 'transparent';

        let file = evt.dataTransfer.files[0];

        evt.file = file;
        evt.target.files = [file];
        this.fileInputOnInput(evt);
    };

    render() {


        return (
            <div className={css.file_upload}>

                <p className={css.introduction}>Этот бесплатный онлайн-сервис проверит вашу дипломную работу <br/>
                    на наличие ошибок оформления документа.<br/>
                    Сервис поддерживает файлы формата <span className={css.docx}>docx</span> объемом до <b>20МБ.</b>
                </p>

                <p style={{display: this.state['renderFormatError'] ? "block" : "none"}}
                   className={css.error_message}>Ошибка! Файл загружен в неверном формате. Пожалуйста,
                    загрузите <b>docx</b> файл.</p>
                <p style={{display: this.state['renderSizeError'] ? "block" : "none"}} className={css.error_message}>Ошибка!
                    Слишком большой файл. Пожалуйста, загрузите файл объёмом до <b>20 МБ</b> включительно.</p>

                <div className={css.file_upload_form} id="drop_area"
                     onDragEnter={this.onDragEnter}
                     onDragLeave={this.onDragLeave}
                     onDragOver={this.onDragOver}
                     onDrop={this.onDrop}
                     onDragEnd={this.onDragEnd}
                     onDragExit={this.onDragExit}
                >
                    <div id="upload_block">
                        <img className={css.doc_icon} src={icon} alt="file"/>
                        <button className={css.file_upload_button}
                                onClick={this.fileSendButtonOnClick}>Выбрать файл
                        </button>
                        <p className={css.subtext}>Или перетащите файл сюда</p>

                        <NavLink id="reroute" to='/upload' style={{display: "none"}}/>
                    </div>

                    <div id="download" style={{display: 'none'}}>
                        <img style={{width: '70%'}} src={loading}/>
                        <p className={css.subtext}>Идёт отправка файла на сервер...</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Welcome;

