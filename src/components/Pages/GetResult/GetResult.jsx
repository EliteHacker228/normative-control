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
        "ANNOTATION_MUST_NOT_CONTAINS_MEDIA" : "Реферат не должен содержать медиа-ресурсы",
        "CHAPTER_ANNOTATION_NOT_FOUND" : "Главы реферата отсутствуют",
        "CHAPTER_ANNOTATION_POSITION_MISMATCH" : "Глава реферата находится на некорректной позиции",
        "CHAPTER_APPENDIX_NOT_FOUND" : "Приложение главы отсутствует",
        "CHAPTER_APPENDIX_POSITION_MISMATCH" : "Приложение главы находится на некорректной позиции",
        "CHAPTER_BODY_NOT_FOUND" : "Основная часть главы отсутствует",
        "CHAPTER_BODY_POSITION_MISMATCH" : "Основная часть главы находится на некорректной позиции",
        "CHAPTER_CONCLUSION_NOT_FOUND" : "Заключение главы отсутствует",
        "CHAPTER_CONCLUSION_POSITION_MISMATCH" : "Заключение главы находится на некорректной позиции",
        "CHAPTER_CONTENTS_NOT_FOUND" : "Содержимое главы отсутствует",
        "CHAPTER_CONTENTS_POSITION_MISMATCH" : "Содержимое главы находится на некорректной позиции",
        "CHAPTER_EMPTY" : "Глава пустая",
        "CHAPTER_FRONT_PAGE_NOT_FOUND" : "Титульный лист главы отсутствует",
        "CHAPTER_FRONT_PAGE_POSITION_MISMATCH" : "Титульный лист главы находится на некорректной позиции",
        "CHAPTER_INTRODUCTION_NOT_FOUND" : "Введение главы отсутствует",
        "CHAPTER_INTRODUCTION_POSITION_MISMATCH" : "Введение главы находится на некорректной позиции",
        "CHAPTER_NO_ONE_CHAPTER_FOUND" : "Главы отсутствуют",
        "CHAPTER_REFERENCES_NOT_FOUND" : "Список источников в главе отсутствует",
        "CHAPTER_REFERENCES_POSITION_MISMATCH" : "Список литературы находится на некорректной позиции",
        "CHAPTER_UNDEFINED_CHAPTER" : "Глава неопределена",
        "PAGE_HEIGHT_IS_INCORRECT" : "Некорректная высота страницы",
        "PAGE_MARGIN_BOTTOM_IS_INCORRECT" : "Некорректный нижний отступ страницы",
        "PAGE_MARGIN_LEFT_IS_INCORRECT" : "Некорректный левый отступ страницы",
        "PAGE_MARGIN_RIGHT_IS_INCORRECT" : "Некорректный правый отступ страницы",
        "PAGE_MARGIN_TOP_IS_INCORRECT" : "Некорректный верхний отступ страницы",
        "PAGE_WIDTH_IS_INCORRECT" : "Некорректная ширина страницы",
        "TEXT_COMMON_BACKGROUND_FILL" : "Некорректная заливка текста",
        "TEXT_COMMON_BORDER" : "Некорректная границы текста",
        "TEXT_COMMON_FONT" : "Некорректный шрифт",
        "TEXT_COMMON_HIGHLIGHT" : "Некорректная подсветка текста",
        "TEXT_COMMON_INCORRECT_DIRECTION" : "Некорректное направление текста",
        "TEXT_COMMON_INCORRECT_FONT_SIZE" : "Некорректный размер шрифта",
        "TEXT_COMMON_INDENT_FIRST_LINES" : "Некорректный отступ первой строки",
        "TEXT_COMMON_INDENT_LEFT"  : "Некорректный отступ слева",
        "TEXT_COMMON_INDENT_RIGHT" : "Некорректный отступ слева",
        "TEXT_COMMON_ITALIC_TEXT" : "Курсивный шрифт",
        "TEXT_COMMON_RUN_SPACING" : "Некорректный интервал",
        "TEXT_COMMON_STRIKETHROUGH" : "Перечёркнутый текст",
        "TEXT_COMMON_TEXT_COLOR" : "Некорректный цвет текста",
        "TEXT_COMMON_UNDERLINED" : "Подчёркнутый текст",
        "TEXT_HEADER_ALIGNMENT" : "Некорректное выравнивание заголовка",
        "TEXT_HEADER_EMPTY" : "Пустой заголовок",
        "TEXT_HEADER_EMPTY_LINE_AFTER_HEADER_REQUIRED" : "Отсутствует пустая строка после заголовка",
        "TEXT_HEADER_LINE_SPACING" : "Некорректная расстановка пробелов в заголовке",
        "TEXT_HEADER_NOT_BOLD" : "Полужирный текст в заголовке",
        "TEXT_HEADER_NOT_UPPERCASE"  : "Текст в верхнем регистре в заголовке",
        "TEXT_HEADER_REDUNDANT_DOT" : "Избыточная точка в заголовке",
        "TEXT_REGULAR_INCORRECT_ALIGNMENT" : "Некорректное выравнивание в заголовке",
        "TEXT_REGULAR_LINE_SPACING" : "Некорректная расстановка пробелов в тексте",
        "TEXT_REGULAR_UPPERCASE" : "Текст в верхнем регистре",
        "TEXT_REGULAR_WAS_BOLD" : "Полужирный текст",
        "TEXT_WHITESPACE_AFTER_HEADER_ALIGNMENT" : "Пробел после выравнивания заголовка",
        "TEXT_WHITESPACE_AFTER_HEADER_BOLD" : "Пробел после полужирного заголовка",
        "TEXT_WHITESPACE_AFTER_HEADER_UPPERCASE"  : "Пробел после заголовка в верхнем регистре",
        "TEXT_WHITESPACE_ALIGNMENT" : "Выравнивание пустой строки",
        "TEXT_WHITESPACE_BACKGROUND_FILL" : "Заливка пустой строки",
        "TEXT_WHITESPACE_BOLD" : "Полужирная пустая строка",
        "TEXT_WHITESPACE_BORDER" : "Граница пустой строки",
        "TEXT_WHITESPACE_FONT" : "Некорректный шрифт пустой строки",
        "TEXT_WHITESPACE_HIGHLIGHT" : "Некорректная подсветка пустой строки",
        "TEXT_WHITESPACE_INCORRECT_DIRECTION" : "Некорректное направление текста в пустой строке",
        "TEXT_WHITESPACE_INCORRECT_FONT_SIZE" : "Некорректный размер шрифта в пустой строке",
        "TEXT_WHITESPACE_INDENT_FIRST_LINES" : "Некорректный отступ первой пустой строки",
        "TEXT_WHITESPACE_INDENT_LEFT" : "Некорректный отступ пустой строки слева",
        "TEXT_WHITESPACE_INDENT_RIGHT" : "Некорректный отступ пустой строки справа",
        "TEXT_WHITESPACE_ITALIC" : "Курсивный шрифт в пустой строке",
        "TEXT_WHITESPACE_LINE_SPACING" : "Некорректная расстановка пробелов в пустой строке",
        "TEXT_WHITESPACE_RUN_SPACING"  : "Некорректный интервал в пустой строке",
        "TEXT_WHITESPACE_STRIKETHROUGH" : "Перечёркнутый текст в пустой строке",
        "TEXT_WHITESPACE_TEXT_COLOR" : "Некорректный цвет текста в пустой строке",
        "TEXT_WHITESPACE_UNDERLINED" : "Перечёркнутый текст в пустой строке",
        "TEXT_WHITESPACE_UPPERCASE" : "Текст в верхнем регистре в пустой строке",
        "TODO_ERROR" : "Ошибка TODO"
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
        console.log('Имеем вот такой стейт');
        console.log(state);
    }

    getResult = () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://normative-control-api.herokuapp.com/documents/errors?documentId=${state['documentId']}&accessKey=${state['accessKey']}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                state['checkResult'] = JSON.parse(result);
                // console.log(state.checkResult.errors)
                let res = state.checkResult.errors;
                // console.log(res);
                console.log(res.map(x => x['errorType']));
                // state['errors'] = res.map(x => x['errorType']);
                state['errors'] = res.map(x => x['errorType']).map(error_code => translations[error_code]).filter(x => x !== undefined);
                console.log(state.errors);
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

        let url = `https://docs.google.com/gview?url=https://normative-control-api.herokuapp.com/documents/file?data=${state['documentId']}_${state['accessKey']}&embedded=true`;

        return (
            <div className={css.result_box}>
                <div className={css.result_header}>
                    <NavLink className={css.back_arrow_link} to='/upload'>
                        <img src={back_arrow}/>
                    </NavLink>
                    <span className={css.file_block}>
                        <img src={file_ico}/>
                        <span>{state['fileName']}</span>
                    </span>
                </div>
                <div className={css.statistics}>
                    <p className={css.errors}>Ошибки</p>
                    <RenderList elements={state['errors']}/>
                </div>
                <div className={css.document_content}>
                    <iframe className={css.document_view} src={url}/>
                </div>
            </div>
        );
    };
}

export default GetResult;