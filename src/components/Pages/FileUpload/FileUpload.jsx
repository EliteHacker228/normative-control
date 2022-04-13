import css from './FileUpload.module.css';
import icon from './doc.svg';
import React from 'react';
import state from "../../../storage/storage";

// let state = {};

const fileInputOnInput = (evt) => {
    state['file'] = evt.target.files[0];
    console.log(state['file']);
    console.log('test');
    localStorage.setItem('fileName', state['file'].name);
    send();

    // FileUploadForm.

    // setTimeout(() => window.location.pathname = '/result', 200);
};

const fileSendButtonOnClick = (evt) => {
    evt.preventDefault();

    var input = document.createElement('input');
    input.type = 'file';
    input.oninput = fileInputOnInput;
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

const send = () => {
    let formdata = new FormData();

    /*TODO:
     * Сделать проверку на null в файле, по итогам которой
     * будет разблокироваться кнопка отправки.
     * До этого будет заблокированной
    */

    formdata.append("file", state['file'], state['file'].name);
    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    fetch("https://normative-control.herokuapp.com/api/documents/upload", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            localStorage.setItem('fileId', result['id']);
        })
        .catch(error => console.log('error', error));
};

let FileUploadForm = React.createRef()

const FileUpload = () => {
    return (
        <div className={css.file_upload}>

            <p className={css.introduction}>Этот бесплатный онлайн-сервис проверит вашу дипломную работу <br/>
                на наличие ошибок оформления документа.<br/>
                Сервис поддерживает файлы формата <b>docx</b> объемом до <b>5МБ.</b>
            </p>

            <div ref={FileUploadForm} className={css.file_upload_form}>
                {/*<input type='file' id='file-upload' name='file' className={css.file_upload_input}*/}
                {/*       onInput={fileInputOnInput}/>*/}
                <img className={css.doc_icon} src={icon}/>
                <button className={css.file_upload_button} onClick={fileSendButtonOnClick}>Выбрать файл</button>
                <p className={css.subtext}>Или перетащите файл сюда</p>
            </div>

        </div>
    );
};

export default FileUpload;