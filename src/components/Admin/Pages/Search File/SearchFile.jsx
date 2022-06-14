import css from './SearchFile.module.css';
import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import state from "../../../../storage/storage";

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

class SearchFile extends Component {

    // credentials = null;
    // state = null;

    constructor() {
        super();
        // this.credentials = JSON.parse(state['credentials']);
        console.log('Состояние в локал сторидже SearchFile');
        console.log(localStorage.getItem('normokontrol_state'));
        this.state = JSON.parse(localStorage.getItem('normokontrol_state'));
        if (this.state === null) {
            this.state = state;
            this.state['credentials'] = "null"
        }
        this.state['result'] = {}
        this.state['result']['document-id'] = ""
        this.state['result']['password'] = ""
        this.state['result']['mistakes'] = []
        this.credentials = JSON.parse(this.state['credentials']);
        console.log(this.credentials);
    }

    componentDidMount() {

        if (this.state['credentials'] === "null") {
            console.log('NULL CREDS');
            setTimeout(() => {
                document.getElementById('reroute').click();
            }, 0);
        } else {
            console.log('CREDS');
            console.log(this.state['credentials']);
        }
    }

    findFile = (evt) => {
        evt.preventDefault();
        let myHeaders = new Headers();
        let accessToken = `Bearer ${this.credentials['access-token']}`;
        console.log('accessToken');
        console.log(accessToken);
        myHeaders.append("Authorization", accessToken);

        console.log('this.credentials');
        console.log(this.credentials);

        let formData = new FormData(document.getElementById("login_form"));
        let emptyFormData = {};
        formData.forEach((value, key) => emptyFormData[key] = value);
        let raw = emptyFormData;

        console.log('raw');
        console.log(raw);
        console.log("raw['document-id']");
        console.log(raw['document-id']);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let status = 0;

        fetch(`https://normative-control-api.herokuapp.com/control-panel/find-by-id?document-id=${raw['document-id']}`, requestOptions)
            .then(response => {
                console.log('response');
                status = response['status'];
                return response.json();
            })
            // .then(result => console.log("ABOBA", JSON.parse(result)))
            .then(result => {
                if (status === 200) {
                    this.state['result'] = result;
                    console.log("ABOBA", status, result);
                    this.makeVisible();
                    this.makeErrorInvisible();
                    this.forceUpdate();
                } else if(status === 404) {
                    this.makeInvisible();
                    this.makeErrorVisible();
                    this.forceUpdate();
                } else if(status === 401) {
                    document.getElementById('logout').click();
                }
            })
            .catch(error => console.log('error', error));
    };

    deleteFile = (evt) => {
        evt.preventDefault();
        this.makeInvisible();
        evt.preventDefault();
        let myHeaders = new Headers();
        let accessToken = `Bearer ${this.credentials['access-token']}`;
        // console.log(accessToken);
        // console.log('DELETE');
        myHeaders.append("Authorization", accessToken);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://normative-control-api.herokuapp.com/control-panel/delete?document-id=${this.state['result']['document-id']}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
            })
            .catch(error => console.log('error', error));
    };

    clearInput = (evt) => {
        evt.preventDefault();
        document.getElementById("document-id").value = "";
    };

    // downloadFile = (evt) => {
    //     evt.preventDefault();
    //     let myHeaders = new Headers();
    //     let accessToken = `Bearer ${this.credentials['access-token']}`;
    //     // console.log(accessToken);
    //     // console.log('DELETE');
    //     myHeaders.append("Authorization", accessToken);
    //
    //     var requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };
    //
    //     fetch(`https://normative-control-api.herokuapp.com/control-panel/download/${this.state['result']['document-id']}`, requestOptions)
    //         .then(response => response.blob())
    //         .then(blob => {
    //             const url = window.URL.createObjectURL(blob);
    //             const a = document.createElement('a');
    //             a.style.display = 'none';
    //             a.href = url;
    //             a.download = `${this.state['result']['document-id']}.docx`;
    //             document.body.appendChild(a);
    //             a.click();
    //             window.URL.revokeObjectURL(url);
    //         })
    //         .catch(error => console.log('error', error));
    // };

    downloadFile = (evt) => {
        evt.preventDefault();
        document.getElementById('downloader').src = `https://normative-control-api.herokuapp.com/document/${this.state['result']['document-id']}/raw-file?access-key=${this.state['result']['access-key']}`;
    };

    makeVisible () {
        document.getElementById("inf_block").style.visibility = "visible";
        document.getElementById("errors_block").style.display = "block";
        document.getElementById("errors_block").style.visibility = "visible";
        document.getElementById("errors").style.visibility = "hidden";
    };

    makeErrorVisible () {
        document.getElementById("wrong_id_error").style.display = "block";
    };

    makeErrorInvisible () {
        document.getElementById("wrong_id_error").style.display = "none";
    };

    makeInvisible () {
        document.getElementById("inf_block").style.visibility = "hidden";
        document.getElementById("errors_block").style.display = "none";
        document.getElementById("errors_block").style.visibility = "hidden";
        document.getElementById("errors").style.visibility = "visible";
    };

    render() {
        return (
            <div className={css.body}>
                <div className={css.content}>
                    <div className={css.search_block}>
                        <form className={css.search_form} onSubmit={this.findFile} id="login_form">
                            <p>Чтобы просмотреть результат проверки файла студента, вставьте ID документа:</p>
                            <div className={css.input_block}>
                                <input type="text" placeholder="ID документа" name="document-id" id="document-id"/>
                                <input type="submit" alt="Поиск" value="" title="Скачать файл"/>
                            </div>
                            {/*<input type="button" value="Очистить ввод" onClick={this.clearInput}/>*/}
                        </form>
                    </div>

                    {/*<div className={css.doc_inf}>*/}
                    {/*    <div className={css.inf_block}>*/}
                    {/*        <h1>Найденный файл</h1>*/}
                    {/*        <p>Используйте указанный ниже пароль для разблокировки файла и дальнейшей проверки.</p>*/}
                    {/*        <p>ID: {this.state['result']['document-id']}</p>*/}
                    {/*        <p>Пароль: {this.state['result']['password']}</p>*/}
                    {/*        <p>Колво ошибок: {this.state['result']['mistakes'].length}</p>*/}
                    {/*        <button onClick={this.deleteFile}>Удалить</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={css.doc_inf}>
                        <p id="wrong_id_error" style={{display: "none"}} className={css.wrong_id_error}>Файл с указанным ID не существует, или был удалён</p>
                        <div className={css.inf_block} id="inf_block" style={{visibility: "hidden"}}>
                            <h1>Найденный файл</h1>
                            <p>Используйте указанный ниже пароль для разблокировки файла и дальнейшей проверки.</p>
                            <div className={css.file_data}>
                                <div className={css.file_data_block}>
                                    <p>ID: <span
                                        className={css.file_data_inf}>{this.state['result']['document-id']}</span></p>
                                    <p>Пароль: <span
                                        className={css.file_data_inf}>{this.state['result']['password']}</span></p>
                                    <p>Найдено ошибок в файле: <span
                                        className={css.file_data_inf}>{this.state['result']['mistakes'].length}</span>
                                    </p>
                                </div>
                                <div className={css.file_data_buttons}>
                                    <button className={css.file_data_buttons_download}
                                            onClick={this.downloadFile}
                                            title="Скачать файл"/>
                                    <button className={css.file_data_buttons_delete}
                                            onClick={this.deleteFile}
                                            title="Удалить файл"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className={css.doc_inf}>*/}
                    {/*    <div className={css.inf_block}>*/}
                    {/*        <h1>Найденный файл</h1>*/}
                    {/*        <p>Используйте указанный ниже пароль для разблокировки файла и дальнейшей проверки.</p>*/}
                    {/*        <div className={css.file_data}>*/}
                    {/*            <div className={css.file_data_block}>*/}
                    {/*                <p>ID: <span className={css.file_data_inf}>Y7YBV78VBO7UB45O87GFBS4I5E7GH</span></p>*/}
                    {/*                <p>Пароль: <span*/}
                    {/*                    className={css.file_data_inf}>dab1335d36a147bf8d242cfa42d9c26b</span></p>*/}
                    {/*                <p>Найдено ошибок в файле: <span className={css.file_data_inf}>5</span></p>*/}
                    {/*            </div>*/}
                    {/*            <div className={css.file_data_buttons}>*/}
                    {/*                <button className={css.file_data_buttons_download} title="Скачать файл"/>*/}
                    {/*                <button className={css.file_data_buttons_delete} onClick={this.deleteFile} title="Удалить файл"/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={css.errors} id="errors">
                        <div className={css.errors_block} id="errors_block" style={{visibility: "hidden"}}>
                            <p className={css.error}>{'}'}</p>
                            <RenderList
                                elements={this.state['result']['mistakes'].map(x => x['mistake-type']).sort(x => x['paragraph-id']).map(error_code => translations[error_code])}/>
                            <p className={css.error}>{'{'}</p>
                        </div>
                    </div>
                    <NavLink id="reroute" to='/auth/login' style={{display: "none"}}/>
                    <NavLink id="logout" to='/auth/logout' style={{display: "none"}}/>
                </div>
                <iframe id="downloader" style={{display: 'none'}}/>
            </div>
        );
    }
}

export default SearchFile;