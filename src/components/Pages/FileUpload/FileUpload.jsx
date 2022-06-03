import css from './FileUpload.module.css';
import icon from './doc.svg';
import uploading from './Uploading.svg';
import uploading_file_ico from './Frame.svg';
import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

// import state from "../../../storage/storage";

// Стейт стоит сохранять в локалсторидже, иначе при обновлении страницы всё сломается
let state;

class FileUpload extends Component {


    constructor() {
        super();
        state = JSON.parse(localStorage.getItem('normokontrol_state'));
        console.log('Получаем state из localStorage');
        console.log(state)
        this.checkFileStatusOnServer(state['documentId'])
        this.updateProgressBar();
    }

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

    updateDownloadingStatus = (intervalId) => {
        let checkStatus = state['checkStatus'];
        switch (checkStatus) {
            case 'QUEUE':
                console.log('GRAY', 'Файл в очереди');
                state['button_status'] = css.button_queue;
                state['progressbar_status'] = css.progressbar_queue;
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                this.forceUpdate();
                break;
            case 'PROCESSING':
                console.log('YELLOW', 'Файл обрабатывается');
                state['button_status'] = css.button_processing;
                state['progressbar_status'] = css.progressbar_processing;
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                this.forceUpdate();
                break;
            case 'ERROR':
                console.log('RED', 'Ошибка во время обработки файла');
                state['button_status'] = css.button_error;
                state['progressbar_status'] = css.progressbar_error;
                clearInterval(intervalId);
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                this.forceUpdate();
                break;
            case 'SAVED':
            case 'READY':
                console.log('GREEN', 'Файл обработан');
                state['button_status'] = css.button_ready;
                state['progressbar_status'] = css.progressbar_ready;
                clearInterval(intervalId);
                localStorage.setItem('normokontrol_state', JSON.stringify(state));
                this.forceUpdate();
                break;
            case 'UNDEFINED ':
                console.log('Состояние неизвестно');
                console.log('Состояние неизвестно');
                break;
            default:
                console.log('Неизвестная ошибка');
                console.log(checkStatus);
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
            <div className={css.file_upload}>

                <p className={css.introduction}>Этот бесплатный онлайн-сервис проверит вашу дипломную работу <br/>
                    на наличие ошибок оформления документа.<br/>
                    Сервис поддерживает файлы формата <span className={css.docx}>docx</span> объемом до <b>20МБ.</b>
                </p>

                <div className={css.file_upload_form + ' ' + css.status}>
                    <img className={css.file_uploading} src={uploading} alt="upload_man"/>

                    <div className={css.file_uploading_description}>
                        <img className={css.file_uploading_icon} src={uploading_file_ico}/>
                        <span>{state['fileName']}</span>
                        <div className={css.progressbar_container}>
                            <div className={`${css.progressbar} ${state['progressbar_status']}`}/>
                        </div>
                        {/*<span>Status</span>*/}
                        <NavLink to='/result'
                                 style={{display: (state['checkStatus'] === 'READY' || state['checkStatus'] === 'SAVED') ? "block" : "none"}}>
                            <button className={`${css.result_button} ${state['button_status']}`}>
                                Результат
                            </button>
                        </NavLink>

                        <p style={{display: state['checkStatus'] === 'ERROR' ? "block" : "none"}}>
                            Ошибка при обработке
                        </p>

                        <NavLink to='/' style={{display: state['checkStatus'] === 'ERROR' ? "block" : "none"}}>
                            <button className={`${css.result_button} ${state['button_status']}`}>
                                Повторить
                            </button>
                        </NavLink>

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