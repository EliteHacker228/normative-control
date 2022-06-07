import css from './Welcome.module.css';
import icon from './doc.svg';
import loading from './loading-11.gif';
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import state from "../../../storage/storage";


class Welcome extends Component {

    constructor() {
        super();
        state['renderSizeError'] = false;
        state['renderFormatError'] = false;
        console.log('генерим ключ');
        let accessKey = this.generateAccessKey(128);
        localStorage.setItem('accessKey', accessKey);
        state['accessKey'] = localStorage.getItem('accessKey');
        console.log(state['accessKey']);
    };

    componentDidMount() {
        this.reservePlaceInQueue().then(() => console.log(state['documentId']));
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

        // let form = document.getElementById('upload_block');
        // form.style.display = 'none';
        // let load = document.getElementById('download');
        // load.style.display = 'block';

        this.reservePlaceInQueue().then(() => {
            let si = setInterval(() => {
                this.checkFileStatusOnServer(state['documentId'])
                let checkStatus = state['checkStatus'];
                switch (checkStatus) {
                    case 'READY_TO_ENQUEUE':
                        clearInterval(si);
                        this.sendFileToCheckOnServer(file);
                        break;
                    default:
                        console.log('Неизвестная ошибка');
                        console.log(checkStatus);
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

        fetch(`https://normative-control-api.herokuapp.com/document/${id}/status?access-key=${state['accessKey']}`, requestOptions)
            .then(response => {
                return response.text();
            })
            .then(result => {
                console.log("РЕСПОООООНЗ");
                console.log(result);
                result = JSON.parse(result)['status'];
                console.log("ТУТА РЕЗУЛЬТ");
                console.log(result);
                state['checkStatus'] = result;
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

        let response = await fetch(`https://normative-control-api.herokuapp.com/queue/reserve?access-key=${state['accessKey']}`, requestOptions);
        let document = await response.json();
        console.log('=======================================');
        console.log(document);
        state['documentId'] = document['document-id'];
    };

    sendFileToCheckOnServer = (file) => {
        let formdata = new FormData();
        console.log('Получили файл для отправки:');
        console.log(file);

        /*TODO:
         * Сделать проверку на null в файле, по итогам которой
         * будет разблокироваться кнопка отправки.
         * До этого будет заблокированной
        */

        if (file['size'] > 20971520) { //Это 20 Мегабайт в Байтах
            state['renderSizeError'] = true;
            state['renderFormatError'] = false;
            this.forceUpdate();
            return;
        } else if (file['name'].split('.').pop() !== 'docx') {
            state['renderSizeError'] = false;
            state['renderFormatError'] = true;
            this.forceUpdate();
            return;
        }

        state['file'] = file;

        let form = document.getElementById('upload_block');
        form.style.display = 'none';
        let load = document.getElementById('download');
        load.style.display = 'block';

        formdata.append("file", file, file.name);
        formdata.append("access-key", state['accessKey']);
        formdata.append("document-id", state['documentId']);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`https://normative-control-api.herokuapp.com/queue/enqueue`, requestOptions)
            .then(response => {
                let status = response['status'];
                if (status === 202) {

                    state['fileName'] = file.name;
                    state['renderUploadInput'] = false;
                    state['checkStatus'] = 'QUEUE';
                    state['button_status'] = css.button_queue;
                    state['progressbar_status'] = css.progressbar_queue;

                    console.log('Всё окей, отправляем этот стейт');
                    console.log(state);
                    // console.log(state['documentId']);
                    localStorage.setItem('normokontrol_state', JSON.stringify(state));
                    document.getElementById('reroute').click();
                }
            })
    };

    onDragEnter = (evt) => {
        evt.preventDefault();
        console.log('onDragEnter');
        let uploadBlock = document.getElementById('drop_area');
        uploadBlock.style.backgroundColor = 'transparent';
    };

    onDragLeave = (evt) => {
        evt.preventDefault();
        console.log('onDragLeave');
        let uploadBlock = document.getElementById('drop_area');
        uploadBlock.style.backgroundColor = 'transparent';
    };

    onDragOver = (evt) => {
        evt.preventDefault();
        console.log('onDragOver');
        let uploadBlock = document.getElementById('drop_area');
        uploadBlock.style.backgroundColor = 'rgba(192, 192, 192, 0.3)';
        uploadBlock.style.borderRadius = '25px';

    };

    onDrop = (evt) => {
        evt.preventDefault();
        console.log('onDrop');
        let uploadBlock = document.getElementById('drop_area');
        uploadBlock.style.backgroundColor = 'transparent';

        let file = evt.dataTransfer.files[0];
        console.log(file);

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

                <p style={{display: state['renderFormatError'] ? "block" : "none"}}
                   className={css.error_message}>Ошибка! Файл загружен в неверном формате. Пожалуйста,
                    загрузите <b>docx</b> файл.</p>
                <p style={{display: state['renderSizeError'] ? "block" : "none"}} className={css.error_message}>Ошибка!
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

