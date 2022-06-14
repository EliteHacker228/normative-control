import css from './GetResult.module.css';
import icon from "../FileUpload/Uploading.svg";
import file from "../FileUpload/Frame.svg";
import React, {Component} from "react";
// import state from "../../../storage/storage";
import back_arrow from "../GetResult/back_arrow.svg";
import file_ico from "../GetResult/file_ico.svg";
import {NavLink} from "react-router-dom";
import logo from "../../Header/normokontrol-logo-white-backgroundBlack.svg";

let state;

let translations = {
    'CHAPTER_ANNOTATION_NOT_FOUND': 'Раздел "Реферат" не найден',
    'CHAPTER_ANNOTATION_POSITION_MISMATCH': 'Раздел "Реферат": некорректная позиция',
    'CHAPTER_APPENDIX_NOT_FOUND': 'Раздел "Приложение" не найден',
    'CHAPTER_APPENDIX_POSITION_MISMATCH': 'Раздел "Приложение": некорректная позиция',
    'CHAPTER_BODY_DISORDER': 'Основная часть находится на некорректной позиции',
    'CHAPTER_BODY_NOT_FOUND': 'Раздел "Основная часть" не найден',
    'CHAPTER_BODY_POSITION_MISMATCH': 'Раздел "Основная часть": некорректная позиция',
    'CHAPTER_CONCLUSION_NOT_FOUND': 'Раздел "Заключение" не найден',
    'CHAPTER_CONCLUSION_POSITION_MISMATCH': 'Раздел "Заключение": некорректная позиция',
    'CHAPTER_CONTENTS_NOT_FOUND': 'Раздел "Содержание" не найден',
    'CHAPTER_CONTENTS_POSITION_MISMATCH': 'Раздел "Содержание": некорректная позиция',
    'CHAPTER_EMPTY': 'Пустая часть',
    'CHAPTER_FRONT_PAGE_NOT_FOUND': 'Раздел "Титульный лист" не найден',
    'CHAPTER_FRONT_PAGE_POSITION_MISMATCH': 'Раздел "Титульный лист": некорректная позиция',
    'CHAPTER_INTRODUCTION_NOT_FOUND': 'Раздел "Введение" не найден',
    'CHAPTER_INTRODUCTION_POSITION_MISMATCH': 'Раздел "Введение": некорректная позиция',
    'CHAPTER_NO_ONE_CHAPTER_FOUND': 'Не найдено ни одного раздела',
    'CHAPTER_REFERENCES_NOT_FOUND': 'Раздел "Список литературы" не найден',
    'CHAPTER_REFERENCES_POSITION_MISMATCH': 'Раздел "Список литературы": некорректная позиция',
    'CHAPTER_UNDEFINED_CHAPTER': 'Неопознанная часть',
    'DOCUMENT_UNEXPECTED_CONTENT': 'Неопознанный контент на уровне параграфа',
    'LIST_LEVEL_MORE_THAN_2': 'Уровень вложенности списка больше 2',
    'ORDERED_LIST_INCORRECT_MARKER_FORMAT': 'Некорректный формат маркера ненумерованного списка',
    'ORDERED_LIST_INCORRECT_MARKER_FORMAT_AT_LEVEL_1': 'Некорректный формат маркера первого уровня нумерованного списка',
    'ORDERED_LIST_INCORRECT_MARKER_FORMAT_AT_LEVEL_2': 'Некорректный формат маркера второго уровня нумерованного списка',
    'PAGE_HEIGHT_IS_INCORRECT': 'Некорректная ширина страницы',
    'PAGE_MARGIN_BOTTOM_IS_INCORRECT': 'Некорректный нижний отступ страницы',
    'PAGE_MARGIN_LEFT_IS_INCORRECT': 'Некорректный левый отступ страницы',
    'PAGE_MARGIN_RIGHT_IS_INCORRECT': 'Некорректный правый отступ страницы',
    'PAGE_MARGIN_TOP_IS_INCORRECT': 'Некорректный верхний отступ страницы',
    'PAGE_WIDTH_IS_INCORRECT': 'Некорректная высота страницы',
    'PARAGRAPH_UNEXPECTED_CONTENT': 'Неопознанный контент на уровне рана',
    'PICTURE_IS_NOT_INLINED': 'Изображение не встроено в текст',
    'PICTURE_REQUIRED_BLANK_LINE_AFTER_PICTURE_TITLE': 'Необходима пустая строка после подписи изображения',
    'PICTURE_REQUIRED_BLANK_LINE_BEFORE_PICTURE': 'Необходима пустая строка перед изображением',
    'PICTURE_TITLE_ENDS_WITH_DOT': 'Точка в конце подписи к изображению',
    'PICTURE_TITLE_NOT_CENTERED': 'Некорректное выравнивание подписи к изображению',
    'PICTURE_TITLE_NUMBER_DISORDER': 'Неверный порядок нумерации изображений',
    'PICTURE_TITLE_REQUIRED_LINE_BREAK_BETWEEN_PICTURE_AND_TITLE': 'Необходим перенос строки между изображением и подписью к нему',
    'PICTURE_TITLE_WRONG_FORMAT': 'Неверный формат подписи изображений',
    'RUN_UNEXPECTED_CONTENT': 'Неопознанный контент на уровне текста',
    'TEXT_BODY_SUBHEADER_LEVEL_WAS_MORE_THAN_3': 'Уровень вложенности подразделов больше 3',
    'TEXT_BODY_SUBHEADER_NUMBER_ORDER_MISMATCH': 'Неверный порядок нумерации подразделов',
    'TEXT_COMMON_BACKGROUND_FILL': 'Найдена заливка фона у текста',
    'TEXT_COMMON_BORDER': 'Найдена рамка у параграфа',
    'TEXT_COMMON_FONT': 'Некорректный шрифт текста',
    'TEXT_COMMON_HIGHLIGHT': 'Найден текст с выделением',
    'TEXT_COMMON_INCORRECT_FONT_SIZE': 'Некорректный размер шрифта текста',
    'TEXT_COMMON_INDENT_FIRST_LINES': 'Некорректный отступ первой строки параграфа',
    'TEXT_COMMON_INDENT_LEFT': 'Некорректный левый отступ параграфа',
    'TEXT_COMMON_INDENT_RIGHT': 'Некорректный правый отступ параграфа',
    'TEXT_COMMON_ITALIC_TEXT': 'Найден курсивный текст',
    'TEXT_COMMON_RUN_SPACING': 'Некорректный межсимвольный интервал текста',
    'TEXT_COMMON_STRIKETHROUGH': 'Найден перечеркнутый текст',
    'TEXT_COMMON_TEXT_COLOR': 'Некорректный цвет текста',
    'TEXT_COMMON_UNDERLINED': 'Текст подчеркнут',
    'TEXT_HEADER_ALIGNMENT': 'Некорректное выравнивание заголовка раздела',
    'TEXT_HEADER_BODY_ALIGNMENT': 'Некорректное выравнивание заголовка/подзаголовка основной части',
    'TEXT_HEADER_BODY_UPPERCASE': 'Заголовок основной части написан строчными буквами',
    'TEXT_HEADER_EMPTY': 'Пустой заголовок раздела',
    'TEXT_HEADER_EMPTY_LINE_AFTER_HEADER_REQUIRED': 'Не найдена пустая строка после заголовка',
    'TEXT_HEADER_LINE_SPACING': 'Некорректный межстрочный интервал заголовка',
    'TEXT_HEADER_NOT_BOLD': 'Не полужирный заголовок',
    'TEXT_HEADER_NOT_UPPERCASE': 'Заголовок раздела написан не строчными буквами',
    'TEXT_HEADER_REDUNDANT_DOT': 'Точка на конце заголовка',
    'TEXT_HYPERLINKS_NOT_ALLOWED_HERE': 'Ссылки запрещены в данном разделе',
    'TEXT_REGULAR_INCORRECT_ALIGNMENT': 'Некорректное выравнивание текста',
    'TEXT_REGULAR_LINE_SPACING': 'Некорректный межстрочный интервал текста',
    'TEXT_REGULAR_UPPERCASE': 'Текст написан строчными буквами',
    'TEXT_REGULAR_WAS_BOLD': 'Полужирный текст',
    'TEXT_WHITESPACE_AFTER_HEADER_ALIGNMENT': 'Некорректное выравнивание пустой строки после заголовка',
    'TEXT_WHITESPACE_AFTER_HEADER_BOLD': 'Полужирная пустая строка после заголовка',
    'TEXT_WHITESPACE_AFTER_HEADER_UPPERCASE': 'Пустая строка после заголовка отформатирована в режиме только строчных букв',
    'TEXT_WHITESPACE_ALIGNMENT': 'Некорректное выравнивание пустой строки',
    'TEXT_WHITESPACE_BACKGROUND_FILL': 'Найдена заливка фона у пустой строки',
    'TEXT_WHITESPACE_BOLD': 'Полужирная пустая строка',
    'TEXT_WHITESPACE_BORDER': 'Найдена рамка у пустого параграфа',
    'TEXT_WHITESPACE_FONT': 'Некорректный шрифт пустой строки',
    'TEXT_WHITESPACE_HIGHLIGHT': 'Найдена пустая строка с выделением',
    'TEXT_WHITESPACE_INCORRECT_FONT_SIZE': 'Некорректный размер шрифта пустой строки',
    'TEXT_WHITESPACE_INDENT_FIRST_LINES': 'Некорректный отступ первой строки пустого параграфа',
    'TEXT_WHITESPACE_INDENT_LEFT': 'Некорректный левый отступ пустого параграфа',
    'TEXT_WHITESPACE_INDENT_RIGHT': 'Некорректный правый отступ пустого параграфа',
    'TEXT_WHITESPACE_ITALIC': 'Найден курсивная пустая строка',
    'TEXT_WHITESPACE_LINE_SPACING': 'Некорректный межстрочный интервал пустой строки',
    'TEXT_WHITESPACE_RUN_SPACING': 'Некорректный межсимвольный интервал пустой строки',
    'TEXT_WHITESPACE_STRIKETHROUGH': 'Найдена перечеркнутая пустая строка',
    'TEXT_WHITESPACE_TEXT_COLOR': 'Некорректный цвет пустой строки',
    'TEXT_WHITESPACE_UNDERLINED': 'Пустая строка подчеркнута',
    'TEXT_WHITESPACE_UPPERCASE': 'Пустая строка отформатирована в режиме только строчных букв',
    'TODO_ERROR': 'Неопределенная ошибка (будет обработана позже)',
    'WORD_GRAMMATICAL_ERROR': 'Грамматическая ошибка, которую нашел Word',
    'WORD_SPELL_ERROR': 'Ошибка правописания, которую нашел Word'
};

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
        state = JSON.parse(localStorage.getItem('normokontrol_state'));
        state['errors'] = [];
        state['checkResult'] = {};
        state['checkResult']['document-id'] = '';
        console.log('Имеем вот такой стейт');
        console.log(state);
    }

    getResult = () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://normative-control-api.herokuapp.com/document/${state['documentId']}/mistakes?access-key=${state['accessKey']}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                state['checkResult'] = JSON.parse(result);
                // console.log(state.checkResult.errors)
                let res = state.checkResult.errors;
                // console.log(res);
                console.log(res.map(x => x['mistakeType']));
                // state['errors'] = res.map(x => x['errorType']);
                // state['errors'] = res.map(x => x['errorType']).map(error_code => translations[error_code]).filter(x => x !== undefined);
                state['errors'] = res.map(x => x['mistake-type']).sort(x => x['paragraph-id']).map(error_code => translations[error_code]);
                console.log('Выводим ошибки');
                console.log(state.errors);
                this.forceUpdate();
            })
            .catch(error => console.log('error', error));

        // this.downloadResult();
    };

    // getZezult = () => {
    //     state['errors'] = [1, 2, 3, 4, 5];
    //     this.forceUpdate();
    // };

    downloadResult = () => {
        // var requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        // };
        //
        // fetch(`https://normative-control-api.herokuapp.com/document/${state['documentId']}/raw-file?access-key=${state['accessKey']}`, requestOptions)
        //     .then(response => response.blob())
        //     .then(blob => {
        //         const url = window.URL.createObjectURL(blob);
        //         const a = document.createElement('a');
        //         a.style.display = 'none';
        //         a.href = url;
        //         a.download = `${state['fileName']}`;
        //         document.body.appendChild(a);
        //         a.click();
        //         window.URL.revokeObjectURL(url);
        //     })
        //     .catch(error => console.log('error', error));

        document.getElementById('downloader').src = `https://normative-control-api.herokuapp.com/document/${state['documentId']}/raw-file?access-key=${state['accessKey']}`;
    };

    componentDidMount() {
        if (!state['errors'].length) {
            this.getResult();
        }
    };

    copyId() {
        // state['checkResult']['document-id']
        // Create a "hidden" input
        var aux = document.createElement("input");

        // Assign it the value of the specified element
        aux.setAttribute("value", state['checkResult']['document-id']);

        // Append it to the body
        document.body.appendChild(aux);

        // Highlight its content
        aux.select();

        // Copy the highlighted text
        document.execCommand("copy");

        // Remove it from the body
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
        // if (list.style.display !== 'none') {
        //     list.style.display = 'none';
        //     toggle_button_show.style.display = 'block';
        //     toggle_button_hide.style.display = 'none';
        //     toggle_title.textContent = "Развернуть список ошибок";
        // } else {
        //     list.style.display = 'block';
        //     toggle_button_show.style.display = 'none';
        //     toggle_button_hide.style.display = 'block';
        //     toggle_title.textContent = "Свернуть список ошибок";
        // }

        // if (list.style.height !== '0px') {
        //     list.style.height = '0px';
        //     setTimeout(()=>{list.style.display = 'none'}, 500);
        //     toggle_button_show.style.display = 'block';
        //     toggle_button_hide.style.display = 'none';
        //     toggle_title.textContent = "Развернуть список ошибок";
        // } else {
        //     list.style.display = 'block';
        //     setTimeout(()=>{list.style.height = '58vh';}, 10);
        //     toggle_button_show.style.display = 'none';
        //     toggle_button_hide.style.display = 'block';
        //     toggle_title.textContent = "Свернуть список ошибок";
        // }

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
            // document.getElementById('result_box').scrollIntoView();
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

    render() {


        let url = `https://docs.google.com/gview?url=https://normative-control-api.herokuapp.com/document/${state['documentId']}/raw-file?access-key=${state['accessKey']}&embedded=true`;
        // let url = `https://view.officeapps.live.com/op/embed.aspx?src=https://normative-control-api.herokuapp.com/document/1bc7aa15d7d84912b8a246efceec5123/raw-file?access-key=DAvapNGQVoIuYQsnpzxhvOn9BXbjvQLjgisQdo1IdnU4rBctrWfe52aMablY8YQHSDjQ2xzpj6rYudcAk559Hz6ovDpyQb7RRnWfeBy8eIrlHxbupzalx9LfQJE51jlH`;

        return (
            <div>
                <div id="result_box" className={css.result_box}>
                    <div className={css.result_header}>
                        <NavLink className={css.back_arrow_link} to='/upload'>
                            <img src={back_arrow} title="На главную"/>
                        </NavLink>
                        <span className={css.file_block}>
                            <img src={file_ico}/>
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

                <div className={css.toggle_statistics}>
                    <button id="toggle_button_hide" onClick={this.toggleListDisplay}/>
                    <button id="toggle_button_show" onClick={this.toggleListDisplay}/>
                    <p id="toggle_title" onClick={this.toggleListDisplay}>Развернуть список ошибок</p>
                </div>
                {/*<div className={css.statistics} id="errors_list" style={{display: 'none'}}>*/}
                {/*<div className={css.statistics} id="errors_list" style={{height: '0px', display: 'none'}}>*/}
                <div className={css.statistics} id="errors_list" style={{height: '0px'}}>
                    <p className={css.errors}>{'}'}</p>
                    <RenderList elements={state['errors']}/>
                    <p className={css.errors}>{'{'}</p>
                </div>
                <div id="holder" style={{height: '58vh', transition: '0.5s all'}}>
                </div>
                <iframe id="downloader" style={{display: 'none'}}/>
            </div>
        );

        // return (
        //     <div>
        //         <div className={css.result_box}>
        //             <div className={css.result_header}>
        //                 <NavLink className={css.back_arrow_link} to='/upload'>
        //                     <img src={back_arrow} title="На главную"/>
        //                 </NavLink>
        //                 <span className={css.file_block}>
        //                 <img src={file_ico}/>
        //                 <span>{state['fileName']}</span>
        //             </span>
        //             </div>
        //             <div className={css.statistics}>
        //                 <p className={css.errors}>Ошибки</p>
        //                 <RenderList elements={state['errors']}/>
        //             </div>
        //             <iframe className={css.document_view} src={url}/>
        //             {/*<iframe src='https://view.officeapps.live.com/op/embed.aspx?src=https://vk.com/s/v1/doc/8jezo_i9TzyPHZ1Kfxm2-vYi68Zk5uQZNdIFidX5O2UoMbKOQgY'/>*/}
        //         </div>
        //     </div>
        // );
    };
}

export default GetResult;