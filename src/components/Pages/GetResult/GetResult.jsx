import css from './GetResult.module.css';
import icon from "./Uploading.svg";
import file from "./Frame.svg";
import React from "react";
import state from "../../../storage/storage";

const GetResult = () => {
    console.log(state);
    return (
        <div className={css.file_upload}>

            <p className={css.introduction}>Этот бесплатный онлайн-сервис проверит вашу дипломную работу <br/>
                на наличие ошибок оформления документа.<br/>
                Сервис поддерживает файлы формата <b>docx</b> объемом до <b>5МБ.</b>
            </p>

            <div className={css.file_upload_form}>
                {/*<input type='file' id='file-upload' name='file' className={css.file_upload_input}*/}
                {/*       onInput={fileInputOnInput}/>*/}
                <img className={css.doc_icon} src={icon}/>
                <div className={css.progress_bar}>
                    <img src={file}/>
                    {/*<p>{state['file']}</p>*/}
                    <p>{localStorage.fileName}</p>
                    <p className={css.completed}>✔ Completed</p>
                </div>
            </div>



        </div>
    );
};

export default GetResult;