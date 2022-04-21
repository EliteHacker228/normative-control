import css from './FileUpload.module.css';
import icon from './doc.svg';
import uploading from './Uploading.svg';
import uploading_file_ico from './Frame.svg';
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import state from "../../../storage/storage";


class FileUpload extends Component {

    // state = {
    //     renderUploadInput: true,
    //     renderUploadProgressbar: false,
    //     file: undefined,
    //     fileId: undefined
    // };

    fileInputOnInput = (evt) => {
        // this.state['file'] = evt.target.files[0];
        // console.log(this.state['file']);
        console.log('test');
        // localStorage.setItem('fileName', this.state['file'].name);

        this.sendFileToCheckOnServer(evt.target.files[0]);
    };

    fileSendButtonOnClick = (evt) => {
        evt.preventDefault();

        let input = document.createElement('input');
        input.type = 'file';
        input.oninput = this.fileInputOnInput;
        input.click();

        // let formdata = new FormData();
        //
        // /*TODO:
        //  * Сделать проверку на null в файле, по итогам которой
        //  * будет разблокироваться кнопка отправки.
        //  * До этого будет заблокированной
        // */
        //
        // formdata.append("file", state['file'], state['file'].name);
        // let requestOptions = {
        //     method: 'POST',
        //     body: formdata,
        //     redirect: 'follow'
        // };
        // fetch("https://normative-control.herokuapp.com/api/upload-document", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    };

    //api-check
    checkFileStatusOnServer = (id) => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://normative-control-api.herokuapp.com/documents/state?id=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)['state'];

                console.log(result);
                state['checkStatus'] = result;
                console.log(state);
            })
            .catch(error => console.log('error', error));
    };


    //api-upload
    sendFileToCheckOnServer = (file) => {
        let formdata = new FormData();

        /*TODO:
         * Сделать проверку на null в файле, по итогам которой
         * будет разблокироваться кнопка отправки.
         * До этого будет заблокированной
        */

        formdata.append("file", file, file.name);
        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        return fetch("https://normative-control-api.herokuapp.com/documents/upload", requestOptions)
            .then(response => response.text())
            .then(result => {
                // console.log(result);
                let resultObj = JSON.parse(result);

                console.log(resultObj);

                state['fileId'] = resultObj['id'];
                state['fileName'] = file.name;
                state['renderUploadInput'] = false;
                state['renderUploadProgressbar'] = true;

                state['checkStatus'] = 'QUEUE';
                state['button_status'] = css.button_queue;

                console.log(state);

                this.forceUpdate();
                const checkIntervalId = setInterval(() => {
                    this.checkFileStatusOnServer(state['fileId']);
                    this.updateDownloadingStatus(checkIntervalId);
                }, 200);

                // this.forceUpdate();

            })
            .catch(error => console.log('error', error));
    };

    updateDownloadingStatus = (intervalId) => {
        let checkStatus = state['checkStatus'];
        switch (checkStatus) {
            case 'QUEUE':
                console.log('GRAY', 'Загружаем файл');
                state['button_status'] = css.button_queue;
                state['progressbar_status'] = css.progressbar_queue;
                this.forceUpdate();
                break;
            case 'PROCESSING':
                console.log('YELLOW', 'Обрабатываем файл');
                state['button_status'] = css.button_processing;
                state['progressbar_status'] = css.progressbar_processing;
                this.forceUpdate();
                break;
            case 'ERROR':
                console.log('RED', 'Ошибка во время обработки файла');
                state['button_status'] = css.button_error;
                state['progressbar_status'] = css.progressbar_error;
                clearInterval(intervalId);
                this.forceUpdate();
                break;
            case 'READY':
                console.log('GREEN', 'Файл обработан');
                state['button_status'] = css.button_ready;
                state['progressbar_status'] = css.progressbar_ready;
                clearInterval(intervalId);
                this.forceUpdate();
                break;
            default:
                console.log('х3 чё))0)');
                break;
        }
    };

    render() {


        return (
            <div className={css.file_upload}>

                <p className={css.introduction}>Этот бесплатный онлайн-сервис проверит вашу дипломную работу <br/>
                    на наличие ошибок оформления документа.<br/>
                    Сервис поддерживает файлы формата <span className={css.docx}>docx</span> объемом до <b>5МБ.</b>
                </p>

                <div style={{display: state['renderUploadInput'] ? "block" : "none"}}
                     className={css.file_upload_form}>
                    <img className={css.doc_icon} src={icon} alt="file"/>
                    <button className={css.file_upload_button} onClick={this.fileSendButtonOnClick}>Выбрать файл
                    </button>
                    <p className={css.subtext}>Или перетащите файл сюда</p>
                </div>

                <div style={{display: state['renderUploadProgressbar'] ? "block" : "none"}}
                     className={css.file_upload_form + ' ' + css.status}>
                    <img className={css.file_uploading} src={uploading} alt="upload_man"/>

                    <div className={css.file_uploading_description}>
                        <img className={css.file_uploading_icon} src={uploading_file_ico}/>
                        <span>{state['fileName']}</span>
                        <div className={css.progressbar_container}>
                            <div className={`${css.progressbar} ${state['progressbar_status']}`}/>
                        </div>
                        {/*<span>Status</span>*/}
                        <NavLink to='/result' style={{display: state['checkStatus'] === 'READY' ? "block" : "none"}}>
                            <button className={`${css.result_button} ${state['button_status']}`}>
                                Результат
                            </button>
                        </NavLink>

                        <p style={{display: state['checkStatus'] === 'ERROR' ? "block" : "none"}}>Ошибка при
                            обработке</p>
                        <p style={{display: state['checkStatus'] === 'PROCESSING' ? "block" : "none"}}>Файл
                            обрабатывается</p>
                        <p style={{display: state['checkStatus'] === 'QUEUE' ? "block" : "none"}}>В очереди на
                            обработку</p>
                    </div>

                </div>

            </div>
        );
    }
}

export default FileUpload;