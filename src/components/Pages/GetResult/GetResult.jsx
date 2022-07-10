import css from './GetResult.module.css';
import React, {Component} from "react";
import back_arrow from "../GetResult/back_arrow.svg";
import file_ico from "../GetResult/file_ico.svg";
import {NavLink} from "react-router-dom";
import config from "../../../config/config";
import translations from "../../../translations/translations";

let state;

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

const RenderClickableList = (props) => {
    let elements = [];
    if (props.elements[0].length !== 0) {
        elements = props.elements[0];
    }
    let res = [];
    for (let i = 0; i < elements.length; i++) {
        res.push(elements[i]);
    }
    return (
        <ul>
            {res.map(element => (
                <li>
                    <span onClick={props.elements[1]}
                          data-paragraph-id={element['paragraph-id']}>{translations[element['mistake-type']]}</span>
                </li>
            ))}
        </ul>
    );
};

class GetResult extends Component {

    constructor() {
        super();
        state = JSON.parse(localStorage.getItem('normokontrol_state'));
        state['errors'] = [];
        state['fullErrors'] = {
            elements: []
        };
        state['checkResult'] = {};
        state['checkResult']['document-id'] = '';
    }

    getResult = () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${config['apiAddress']}/document/${state['documentId']}/mistakes?access-key=${state['accessKey']}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                state['checkResult'] = JSON.parse(result);
                let res = state.checkResult.errors;
                state['fullErrors'] = state.checkResult.errors;
                state['errors'] = res.map(x => x['mistake-type']).sort(x => x['paragraph-id']).map(error_code => translations[error_code]);
                this.forceUpdate();
            })
            .catch(error => console.log('error', error));
    };

    downloadResult = () => {
        document.getElementById('downloader').src = `${config['apiAddress']}/document/${state['documentId']}/raw-file?access-key=${state['accessKey']}`;
    };

    componentDidMount() {
        if (!state['errors'].length) {
            this.getResult();
        }

        let lastScrollTop = 0;
        window.addEventListener("scroll", function () {
            let st = document.documentElement.scrollTop;
            let list = document.getElementById('errors_list');
            if (st > lastScrollTop && list.style.height === '0px' && window.scrollY > 230) { //Скроллим вверх
                document.getElementById('toggle_title').click();
            } else if (st < lastScrollTop && list.style.height !== '0px' && window.scrollY < 450) { //Скроллим вниз
                document.getElementById('toggle_title').click();
            }
            lastScrollTop = st <= 0 ? 0 : st;
        }, false);

        this.getFileHtml();
    };

    copyId() {
        let aux = document.createElement("input");
        aux.setAttribute("value", state['checkResult']['document-id']);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);

        let copy_button = document.getElementById("copy_button");
        copy_button.style.display = "none";
        let copy_alert = document.getElementById("copy_alert");
        copy_alert.style.display = "block";


        setTimeout(() => {
            copy_button.style.display = "block";
            copy_alert.style.display = "none";
        }, 5000);
    };

    toggleListDisplay(evt) {
        evt.preventDefault();
        let list = document.getElementById('errors_list');
        let toggle_button_show = document.getElementById('toggle_button_show');
        let toggle_button_hide = document.getElementById('toggle_button_hide');
        let toggle_title = document.getElementById('toggle_title');
        let holder = document.getElementById('holder');

        if (list.style.height !== '0px') {
            // Сворачиваем
            list.style.height = '0px';
            list.style.overflowY = 'hidden';
            list.scrollTop = 0;

            list.style.backgroundColor = 'rgba(0, 0, 0, 0)';

            toggle_button_show.style.display = 'block';
            toggle_button_hide.style.display = 'none';
            toggle_title.textContent = "Развернуть список ошибок";

            holder.style.height = '58vh';
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            //Разворачиваем
            list.style.height = '58vh';
            list.style.overflowY = 'scroll';

            list.style.backgroundColor = '#FFFFFF';

            toggle_button_show.style.display = 'none';
            toggle_button_hide.style.display = 'block';
            toggle_title.textContent = "Свернуть список ошибок";

            holder.style.height = '0px';
            holder.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

    iframeScroll(evt) {
        let iframe = document.getElementById("test");
        let scrollTargetElement = iframe.contentWindow.document.getElementsByTagName("p")[evt.target.attributes['data-paragraph-id'].nodeValue];
        scrollTargetElement.style.backgroundColor = 'cyan';
        scrollTargetElement.scrollIntoView();
    };

    getFileHtml() {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let iframe = document.getElementById("test");
        iframe = iframe.contentWindow || (iframe.contentDocument.document || iframe.contentDocument);

        fetch(`${config['apiAddress']}/document/${state['documentId']}/render?access-key=${state['accessKey']}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                iframe.document.open();
                iframe.document.write(result);
                iframe.document.close();
            }).then(_ => {
                let iframe = document.getElementById("test");
                let errors = state['fullErrors'];
                for (let i = 0; i < errors.length; i++) {
                    if (iframe.contentWindow.document.getElementsByTagName("p")[errors[i]['paragraph-id']].title === "") {
                        iframe.contentWindow.document.getElementsByTagName("p")[errors[i]['paragraph-id']].title = translations[errors[i]['mistake-type']];
                    } else {
                        iframe.contentWindow.document.getElementsByTagName("p")[errors[i]['paragraph-id']].title =
                            iframe.contentWindow.document.getElementsByTagName("p")[errors[i]['paragraph-id']].title + "\n" + translations[errors[i]['mistake-type']];
                    }
                    iframe.contentWindow.document.getElementsByTagName("p")[errors[i]['paragraph-id']].style.backgroundColor = 'cyan';
                }
            }
        )
            .catch(error => console.log('error', error));
    };

    render() {
        return (
            <div>
                <div id="result_box" className={css.result_box}>
                    <div className={css.result_header}>
                        <NavLink className={css.back_arrow_link} to='/upload'>
                            <img alt="Стрелка 'Назад'" src={back_arrow} title="На главную"/>
                        </NavLink>
                        <span className={css.file_block}>
                            <img alt="Значок файла" src={file_ico}/>
                            <span>{state['fileName']}</span>
                        </span>
                    </div>
                    <div className={css.content}>
                        <h1>Мы проверили ваш файл и нашли в нем <span
                            style={{color: 'red'}}>{state['errors'].length}</span> ошибок</h1>
                        <p>Чтобы преподаватель смог просмотреть результат, скопируйте и отправьте ему ID документа:</p>
                        <div className={css.document_id}>
                            <p id="document_id">{state['checkResult']['document-id']}</p>
                            <button id="copy_button" onClick={this.copyId} title="Скопировать">
                            </button>
                            <div id="copy_alert" title="Скопировано">
                                ✔
                            </div>
                        </div>
                        <button className={css.file_download_button}
                                onClick={this.downloadResult}>Скачать файл
                        </button>
                    </div>
                </div>

                <div className={css.toggle_statistics} style={{
                    display: 'none'
                }}>
                    <button id="toggle_button_hide" onClick={this.toggleListDisplay}/>
                    <button id="toggle_button_show" onClick={this.toggleListDisplay}/>
                    <p id="toggle_title" onClick={this.toggleListDisplay}>Развернуть список ошибок</p>
                </div>
                <div className={css.statistics} id="errors_list" style={{height: '0px'}}>
                    <RenderList elements={state['errors']}/>
                </div>
                <div id="holder" style={{height: '58vh', transition: '0.5s all'}}>
                </div>
                <iframe title="Ваш документ" id="downloader" style={{display: 'none'}}/>
                <hr/>
                <div className={css.test_results}>
                    <div className={css.test_errors_list} id="errors">
                        <RenderClickableList elements={[state['fullErrors'], this.iframeScroll]}/>
                    </div>
                    <div className={css.test_document_view} id="document">
                        <iframe title="test" id="test" name="test"/>
                    </div>
                </div>
            </div>
        );
    };
}

export default GetResult;