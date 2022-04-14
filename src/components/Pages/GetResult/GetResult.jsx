import css from './GetResult.module.css';
import icon from "../FileUpload/Uploading.svg";
import file from "../FileUpload/Frame.svg";
import React from "react";
import state from "../../../storage/storage";

const GetResult = () => {
    console.log(state);
    return (
        <div className={css.result_box}>
            <div className={css.statistics}></div>
            <div className={css.document_content}></div>
        </div>
    );
};

export default GetResult;