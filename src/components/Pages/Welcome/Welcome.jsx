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
        // console.log(localStorage.getItem('accessKey'));
        // if (localStorage.getItem('accessKey') === null) {
        console.log('генерим ключ');
        let accessKey = this.generateAccessKey(4);
        localStorage.setItem('accessKey', accessKey);
        // }
        state['accessKey'] = localStorage.getItem('accessKey');
        console.log(state['accessKey']);
    };

    componentDidMount() {
        this.getPlaceInQueue().then(() => console.log(state['documentId']));
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
        this.getPlaceInQueue().then(() => this.sendFileToCheckOnServer(evt.target.files[0]));
    };

    fileSendButtonOnClick = (evt) => {
        evt.preventDefault();

        let input = document.createElement('input');
        input.type = 'file';
        input.oninput = this.fileInputOnInput;
        input.click();
    };

    async getPlaceInQueue() {
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        let response = await fetch(`https://normative-control-api.herokuapp.com/documents/queue?accessKey=${state['accessKey']}`, requestOptions);
        let document = await response.json();
        state['documentId'] = document['documentId'];
    };

    //api-upload
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

        let form = document.getElementById('upload_block');
        form.style.display = 'none';
        let load = document.getElementById('download');
        load.style.display = 'block';

        formdata.append("file", file, file.name);
        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        // console.log('До отправки');
        // console.log(state);
        fetch(`https://normative-control-api.herokuapp.com/documents/upload?documentId=${state['documentId']}&accessKey=${state['accessKey']}`, requestOptions)
            .then(response => {
                let status = response['status'];
                if (status === 202) {

                    state['fileName'] = file.name;
                    state['renderUploadInput'] = false;
                    state['checkStatus'] = 'QUEUE';
                    state['button_status'] = css.button_queue;

                    console.log('Всё окей, отправляем этот стейт');
                    console.log(state);
                    // console.log(state['documentId']);
                    localStorage.setItem('normokontrol_state', JSON.stringify(state));
                    document.getElementById('reroute').click();
                }
            })


        // fetch(`https://normative-control-api.herokuapp.com/documents/upload?documentId=${state['documentId']}&accessKey=${state['accessKey']}`, requestOptions)
        //     .then(response => console.log(response['status']))
        // .then(result => {
        //     let resultObj = JSON.parse(result);
        //
        //     if ('status' in resultObj && resultObj['status'] === 422) {
        //         state['renderFormatError'] = true;
        //         state['renderSizeError'] = false;
        //         // } else if ('status' in resultObj && resultObj['status'] === 500 && 'upload' &&  resultObj['message']) {
        //
        //     } else {
        //         state['fileId'] = resultObj['id'];
        //         state['fileName'] = file.name;
        //         state['renderUploadInput'] = false;
        //         state['renderUploadProgressbar'] = true;
        //         state['renderFormatError'] = false;
        //         state['checkStatus'] = 'QUEUE';
        //         state['button_status'] = css.button_queue;
        //         // this.forceUpdate();
        //         // const checkIntervalId = setInterval(() => {
        //         //     this.checkFileStatusOnServer(state['fileId']);
        //         //     this.updateDownloadingStatus(checkIntervalId);
        //         // }, 200);
        //         console.log('Успешно отправили файл:');
        //         console.log(file);
        //     }
        //
        //     console.log('Помещаем в localStorage:');
        //     console.log(state);
        //     console.log(JSON.stringify(state));
        //     localStorage.setItem('normokontrol_state', JSON.stringify(state));
        //     document.getElementById('reroute').click();
        // })
        // .catch(error => console.log('error', error));
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

                <div className={css.file_upload_form}>
                    <div id="upload_block">
                        <img className={css.doc_icon} src={icon} alt="file"/>
                        <button className={css.file_upload_button}
                                onClick={this.fileSendButtonOnClick}>Выбрать файл
                        </button>
                        <p className={css.subtext}>Или перетащите файл сюда</p>

                        <NavLink id="reroute" to='/upload' style={{display: "none"}}/>
                    </div>

                    <div id = "download" style={{display: 'none'}}>
                        <img style={{width: '50%'}} src={loading}/>
                        <p className={css.subtext}>Идёт отправка файла на сервер...</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Welcome;

