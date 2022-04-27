import css from './Welcome.module.css';
import icon from './doc.svg';
import uploading from './Uploading.svg';
import uploading_file_ico from './Frame.svg';
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import state from "../../../storage/storage";


class Welcome extends Component {

    constructor() {
        super();
        state['renderSizeError'] = false;
        state['renderFormatError'] = false;
    }

    fileInputOnInput = (evt) => {
        console.log('test');
        console.log(evt.target.files[0]);
        this.sendFileToCheckOnServer(evt.target.files[0]);
    };

    fileSendButtonOnClick = (evt) => {
        evt.preventDefault();

        let input = document.createElement('input');
        input.type = 'file';
        input.oninput = this.fileInputOnInput;
        input.click();
    };

    //api-upload
    sendFileToCheckOnServer = (file) => {
        let formdata = new FormData();

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

        formdata.append("file", file, file.name);
        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://normative-control-api.herokuapp.com/documents/upload", requestOptions)
            .then(response => response.text())
            .then(result => {
                // console.log(result);
                let resultObj = JSON.parse(result);

                console.log(resultObj);

                if ('status' in resultObj && resultObj['status'] === 422) {
                    console.log('Файл фигня')

                    state['renderFormatError'] = true;
                    state['renderSizeError'] = false;


                    // } else if ('status' in resultObj && resultObj['status'] === 500 && 'upload' &&  resultObj['message']) {

                } else {
                    console.log('Файл ОК');
                    state['fileId'] = resultObj['id'];
                    state['fileName'] = file.name;
                    state['renderUploadInput'] = false;
                    state['renderUploadProgressbar'] = true;
                    state['renderFormatError'] = false;
                    state['checkStatus'] = 'QUEUE';
                    state['button_status'] = css.button_queue;

                    console.log(state);

                    // this.forceUpdate();
                    // const checkIntervalId = setInterval(() => {
                    //     this.checkFileStatusOnServer(state['fileId']);
                    //     this.updateDownloadingStatus(checkIntervalId);
                    // }, 200);
                }

                this.setState({redirect: "/someRoute"});
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                // this.forceUpdate();
                document.getElementById('reroute').click();


            })
            .catch(error => console.log('error', error));
    };

    render() {

        console.log(state);

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
                    <img className={css.doc_icon} src={icon} alt="file"/>
                    <button className={css.file_upload_button} onClick={this.fileSendButtonOnClick}>Выбрать файл
                    </button>
                    <p className={css.subtext}>Или перетащите файл сюда</p>

                    <NavLink id="reroute" to='/upload' style={{display: "none"}}/>
                </div>
            </div>
        );
    }
}

export default Welcome;

