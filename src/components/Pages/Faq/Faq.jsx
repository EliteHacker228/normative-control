import css from './Faq.module.css';
import img_student_with_headphones from "./img_student_in_headphones.png";
import ico_a_letter from "./ico_a_letter.png";
import ico_document from "./ico_document.png";
import ico_globe from "./ico_globe.png";
import ico_three_stripes from "./ico_three_stripes.png";
import React from "react";


const Faq = () => {

    return (
        <div className={css.page_body}>
            <div className={css.page_content}>
                <div className={css.page_description}>
                    <h1 className={css.page_description__header}>Ответы на часто задаваемые вопросы</h1>
                    <p className={css.page_description__text}>Мы думаем, что они также могут быть полезны для вас</p>
                    <img className={css.page_description__image} src={img_student_with_headphones}/>
                </div>
                <div className={css.questions_and_answers}>
                    <div className={css.questions_and_answers__question_block}>
                        <div className={css.questions_and_answers__head}>
                            <img className={css.questions_and_answers__icon} src={ico_document}/>
                            <h1 className={css.questions_and_answers__question}>Вы сохраняете копию моих обработанных
                                файлов?</h1>
                        </div>
                        <p className={css.questions_and_answers__answer}>Нет. Ваши файлы - только ваша собственность.
                            Пока ваши файлы находятся на наших серверах, они строго защищены, и никто не может получить
                            к ним доступ. Мы храним файлы на протяжении 2 часов, чтобы вы могли их скачать. Сразу после
                            этого они навсегда удаляются с наших серверов. Мы не будем проверять, копировать или
                            анализировать ваши файлы.</p>
                    </div>
                    <div className={css.questions_and_answers__question_block}>
                        <div className={css.questions_and_answers__head}>
                            <img className={css.questions_and_answers__icon} src={ico_globe}/>
                            <h1 className={css.questions_and_answers__question}>Каковы системные требования?</h1>
                        </div>
                        <p className={css.questions_and_answers__answer}>У нас есть основные системные требования. Для
                            бесперебойной работы нашего сервиса мы рекомендуем вам работать со следующими браузерами:
                            Chrome, Firefox, Internet Explorer +10 и Safari. </p>
                    </div>
                    <div className={css.questions_and_answers__question_block}>
                        <div className={css.questions_and_answers__head}>
                            <img className={css.questions_and_answers__icon} src={ico_a_letter}/>
                            <h1 className={css.questions_and_answers__question}>Word подчеркивает правильное слово как
                                неправильное: что мне делать?</h1>
                        </div>
                        <p className={css.questions_and_answers__answer}>Убедитесь, что текст написан на нужной
                            раскладке (это указано в левом нижнем углу окна Word) и перепишите слово, если это
                            потребуется. Важно: во избежании таких ошибок не вставляйте текст в документ, перепишите его
                            сами.</p>
                    </div>
                    <div className={css.questions_and_answers__question_block}>
                        <div className={css.questions_and_answers__head}>
                            <img className={css.questions_and_answers__icon} src={ico_three_stripes}/>
                            <h1 className={css.questions_and_answers__question}>Почему пишется, что позиция главы
                                неправильная хотя все главы у меня есть и идут в правильном порядке?</h1>
                        </div>
                        <p className={css.questions_and_answers__answer}>Проверьте наличие пустых строк с неверными
                            уровнями параграфа (они кстати тоже выделяются как ошибки).</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;