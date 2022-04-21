import css from './GetResult.module.css';
import icon from "../FileUpload/Uploading.svg";
import file from "../FileUpload/Frame.svg";
import React, {Component} from "react";
import state from "../../../storage/storage";
import back_arrow from "../GetResult/back_arrow.svg";
import file_ico from "../GetResult/file_ico.svg";

const RenderList = (props) => {
    let elements = props.elements;
    return (
        <ul>
            {elements.map(element => (
                <li>{element}</li>
            ))}
        </ul>
    );
};

class GetResult extends Component {

    constructor() {
        super();
        state['errors'] = [];
    }

    getResult = () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://normative-control-api.herokuapp.com/documents/result?id=${state['fileId']}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                state['checkResult'] = JSON.parse(result);
                let res = state.checkResult['result']['errors'];
                console.log(res);
                console.log(res.map(x => x['errorType']));
                state['errors'] = res.map(x => x['errorType']);
                this.forceUpdate();
            })
            .catch(error => console.log('error', error));
    };

    // getZezult = () => {
    //     state['errors'] = [1, 2, 3, 4, 5];
    //     this.forceUpdate();
    // };

    render() {
        if (!state['errors'].length) {
            this.getResult();
        }
        return (
            <div className={css.result_box}>
                <div className={css.result_header}>
                    <img src={back_arrow}/>
                    <span className={css.file_block}>
                        <img src={file_ico}/>
                        <span>{state['fileName']}</span>
                    </span>
                </div>
                <div className={css.statistics}>
                    <p color="red">Ошибки</p>
                    <RenderList elements={state['errors']}/>
                </div>
                <div className={css.document_content}></div>
            </div>
        );
    };
}

export default GetResult;