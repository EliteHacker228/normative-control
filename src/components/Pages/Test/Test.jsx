import css from './Test.module.css';
import React, {Component} from 'react';
import img_student_sleeps from './sleeping_student.png';
import img_stack_of_books from './stack_of_books.png';
import img_progressbar from './progressbar.png';
import img_progressbar_done from './progressbar_done.png';
import {NavLink} from "react-router-dom";

import config from "../../../config/config";

// import state from "../../../storage/storage";

// Стейт стоит сохранять в локалсторидже, иначе при обновлении страницы всё сломается
let state;

class Test extends Component {


    constructor() {
        super();
        state = JSON.parse(localStorage.getItem('normokontrol_state'));
        this.checkFileStatusOnServer(state['documentId'])
        this.updateProgressBar();
    }

    checkFileStatusOnServer = (id) => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${config['apiAddress']}/document/${id}/status?access-key=${state['accessKey']}`, requestOptions)
            .then(response => {
                return response.text();
            })
            .then(result => {
                result = JSON.parse(result)['status'];
                state['checkStatus'] = result;
            })
            .catch(error => console.log('error', error));
    };

    updateDownloadingStatus = (intervalId) => {

        let textField = document.getElementById("upload_progress_block__progress_text");

        let checkStatus = state['checkStatus'];
        switch (checkStatus) {
            case 'QUEUE':
                textField.textContent = "Ваш файл в очереди на обработку";
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                this.forceUpdate();
                break;
            case 'PROCESSING':
                textField.textContent = "Идёт проверка вашей работы<br/>на наличие ошибок оформления документа";
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                this.forceUpdate();
                break;
            case 'ERROR':
                textField.textContent = "Во время проверки вашей работы произошла ошибка.<br/> Пожалуйста, загрузите файл заново";
                clearInterval(intervalId);
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                this.forceUpdate();
                break;
            case 'SAVED':
            case 'READY':
                textField.textContent = "Проверка вашей работы завершена!";
                let image = document.getElementById("img_progressbar");
                image.src = img_progressbar_done;
                image.style.animation = 'none';
                image.style.padding = '36.5px';
                clearInterval(intervalId);
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                this.forceUpdate();
                break;
            case 'UNDEFINED ':
                break;
            default:
                break;
        }
    };

    updateProgressBar = () => {
        const checkIntervalId = setInterval(() => {
            this.checkFileStatusOnServer(state['documentId']);
            this.updateDownloadingStatus(checkIntervalId);
        }, 2000);
    };

    render() {

        return (
            <div className={css.page_body}>
                <div className={css.page_content}>
                    <img src={img_student_sleeps} className={css.img_student_sleeps} alt="Студент спит за партой"/>
                    <div className={css.upload_progress_block}>
                        <div className={css.upload_progress_block__progress_wheel}>
                            <img id="img_progressbar" src={img_progressbar} className={css.img_progressbar} alt="Индикатор прогресса обработки файла"/>
                        </div>
                        <div id="upload_progress_block__progress_text" className={css.upload_progress_block__progress_text}>
                            Ваш файл в очереди на обработку
                        </div>
                        <button className={css.upload_progress_block__see_result}>
                            *статус* вашей работы на наличие ошибок оформления документа
                        </button>
                    </div>
                    <img src={img_stack_of_books} className={css.img_stack_of_books} alt="Стопка учебников, шапка бакалавра, сёрнутый диплом"/>
                </div>
            </div>
        );
    }
}

export default Test;