import css from './Welcome.module.css';
import icon from './doc.svg';
import student_writing from './student_writing.png';
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
            let uploadingError = document.getElementById('uploading_error');
            uploadingError.textContent = 'Ошибка! Файл слишком большой. Загрузите файл размером до 20 МБ';
            uploadingError.style.display = 'block';
            this.forceUpdate();
            return;
        } else if (file['name'].split('.').pop() !== 'docx') {
            let uploadingError = document.getElementById('uploading_error');
            uploadingError.textContent = 'Ошибка! Неверный формат. Загрузите .docx файл';
            uploadingError.style.display = 'block';
            this.forceUpdate();
            return;
        }

        this.state['file'] = file;

        this.startFileUploadingAnimation();

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

    startFileUploadingAnimation = () => {
        let uploadBlockButton = document.getElementById('upload_block_controls_button');
        uploadBlockButton.style.display = 'none';

        let uploadBlockControls = document.getElementById('upload_block_controls');
        uploadBlockControls.style.justifyContent = 'center';

        let uploadBlockTip = document.getElementById('upload_block_controls_tip');
        uploadBlockTip.textContent = 'Идёт отправка файла на сервер.';

        this.forceUpdate();

        let counter = 0;
        setInterval(() => {
            counter++;
            switch (counter % 3) {
                case 0:
                    uploadBlockTip.textContent = 'Идёт отправка файла на сервер.';
                    break;

                case 1:
                    uploadBlockTip.textContent = 'Идёт отправка файла на сервер..';
                    break;

                case 2:
                    uploadBlockTip.textContent = 'Идёт отправка файла на сервер...';
                    break;

                default:
                    break;
            }
        }, 500);

    };

    resetControlsAfterDragNDrop = () => {
        let uploadBlock = document.getElementById('upload_block_controls');
        uploadBlock.style.backgroundColor = 'transparent';
        uploadBlock.style.border = 'none';

        let uploadBlockButton = document.getElementById('upload_block_controls_button');
        uploadBlockButton.style.display = 'block';

        let uploadBlockControls = document.getElementById('upload_block_controls');
        uploadBlockControls.style.justifyContent = 'normal';

        let uploadBlockTip = document.getElementById('upload_block_controls_tip');
        uploadBlockTip.textContent = 'или перетащите файл сюда';
    };

    onDragEnter = (evt) => {
        evt.preventDefault();
        this.resetControlsAfterDragNDrop();
    };

    onDragLeave = (evt) => {
        evt.preventDefault();
        this.resetControlsAfterDragNDrop();
    };

    onDragOver = (evt) => {
        evt.preventDefault();

        let uploadBlock = document.getElementById('upload_block_controls');
        uploadBlock.style.backgroundColor = 'rgba(192, 192, 192, 0.3)';
        uploadBlock.style.borderRadius = '25px';
        uploadBlock.style.borderStyle = 'dashed';
        uploadBlock.style.borderWidth = '2px';
        uploadBlock.style.borderColor = 'grey';

        let uploadBlockButton = document.getElementById('upload_block_controls_button');
        uploadBlockButton.style.display = 'none';

        let uploadBlockControls = document.getElementById('upload_block_controls');
        uploadBlockControls.style.justifyContent = 'center';

        let uploadBlockTip = document.getElementById('upload_block_controls_tip');
        uploadBlockTip.textContent = 'перетащите файл сюда';

        let uploadingError = document.getElementById('uploading_error');
        uploadingError.style.display = 'none';
    };

    onDrop = (evt) => {
        evt.preventDefault();
        this.resetControlsAfterDragNDrop();

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
                    <div id="upload_block_controls" className={css.upload_block__controls}
                         onDragEnter={this.onDragEnter}
                         onDragLeave={this.onDragLeave}
                         onDragOver={this.onDragOver}
                         onDrop={this.onDrop}
                         onDragEnd={this.onDragEnd}
                         onDragExit={this.onDragExit}>
                        <button id="upload_block_controls_button" className={css.upload_block__button}
                                onClick={this.fileSendButtonOnClick}>Выбрать файл
                        </button>
                        <p id="upload_block_controls_tip" className={css.upload_block__drag_n_drop_tip}>или перетащите
                            файл сюда</p>
                    </div>
                    <div id="uploading_error" className={css.uploading_error}>Ошибка!</div>
                </div>
                <img className={css.image_student_writing} src={student_writing} alt="Студент делает записи в тетради"/>

                <NavLink id="reroute" to='/test' style={{display: "none"}}/>
            </div>
        );
    }
}

export default Welcome;

