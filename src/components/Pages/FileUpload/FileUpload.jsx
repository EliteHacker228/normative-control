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
        this.send(evt.target.files[0]);

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

    send = (file) => {
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
        fetch("https://normative-control.herokuapp.com/api/documents/upload", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);

                state['fileId'] = result['id'];
                state['fileName'] = file.name;
                state['renderUploadInput'] = false;
                state['renderUploadProgressbar'] = true;

                this.forceUpdate();

            })
            .catch(error => console.log('error', error));
    };

    render() {


        return (
            <div className={css.file_upload}>

                <p className={css.introduction}>Этот бесплатный онлайн-сервис проверит вашу дипломную работу <br/>
                    на наличие ошибок оформления документа.<br/>
                    Сервис поддерживает файлы формата <b>docx</b> объемом до <b>5МБ.</b>
                </p>

                <div style={{display: state['renderUploadInput'] ? "block" : "none"}}
                     className={css.file_upload_form}>
                    <img className={css.doc_icon} src={icon} alt="file"/>
                    <button className={css.file_upload_button} onClick={this.fileSendButtonOnClick}>Выбрать файл
                    </button>
                    <p className={css.subtext}>Или перетащите файл сюда</p>
                </div>

                <div style={{display: state['renderUploadProgressbar'] ? "block" : "none"}}
                     className={css.file_upload_form}>
                    <img className={css.file_uploading} src={uploading} alt="upload_man"/>

                    <div className={css.file_uploading_description}>
                        <img className={css.file_uploading_icon} src={uploading_file_ico}/>
                        <span>{state['fileName']}</span>
                        <div className={css.progressbar_container}>
                            <div className={css.progressbar}/>
                        </div>
                        {/*<span>Status</span>*/}
                        <NavLink to='/result'>
                            <button className={css.result_button}>Результат</button>
                        </NavLink>
                    </div>

                </div>

            </div>
        );
    }
}

export default FileUpload;