import css from './Test.module.css';
import icon from './doc.svg';
import student_writing from './student_writing.png';
import loading from './loading-11.gif';
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import config from "../../../config/config";

import state from "../../../storage/storage";


// let state;

class Test extends Component {

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
            <div className={css.page}>
                <div className={css.upload_block}>
                    <h1 className={css.upload_block__header}>Проверка вашей выпускной квалифицированной работы
                        на наличие ошибок оформления документа</h1>
                    <p className={css.upload_block__notation}>
                        Сервис поддерживает файлы формата <b
                        className={css.upload_block__notation___bold}>docx</b> объемом до <b
                        className={css.upload_block__notation___bold}>20МБ</b>.
                    </p>
                    <div className={css.upload_block__controls}>
                        <button className={css.upload_block__button}>Выбрать файл</button>
                        <p className={css.upload_block__drag_n_drop_tip}>или перетащите файл сюда</p>
                    </div>
                </div>
                <img className={css.image_student_writing} src={student_writing} alt="Студент делает записи в тетради"/>
            </div>
        );
    }
}

export default Test;

