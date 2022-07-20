import css from './Header.module.css';
import logo from './logo-new.png';
import {NavLink} from "react-router-dom";
import React from "react";

import config from "../../config/config";


const Header = () => {
    if (window.location.pathname !== "/admin_panel/search_file") {

        return (
            <header className={css.header}>
                <NavLink to='/'>
                    <img className={css.logo}
                         src={logo}
                         title="На главную"
                    />
                </NavLink>

                <NavLink to='/' className={css.linkname} title="На главную">
                    <p className={css.name}>normative <br/> control</p>
                </NavLink>

                <div style={{width: '69vw'}}/>
                <NavLink to='/faq' className={css.linkfaq}>
                    <p className={css.faq}>FAQ</p>
                </NavLink>


            </header>
        );

    } else {
        return (
            <header className={css.header}>
                <a href={`${config['frontendAddress']}`}>
                    <img className={css.logo}
                         src={logo}
                         title="На главную"
                    />
                </a>

                <a href={`${config['frontendAddress']}`} className={css.linkname} title="На главную">
                    <p className={css.name}>normative<br/>control</p>
                </a>


                <div style={{width: '60%'}}/>

                <a href={`${config['frontendAddress']}/faq`} className={css.linkfaq}>
                    <p className={css.faq}>FAQ</p>
                </a>

                <NavLink to='auth/logout' className={css.linklogout}>
                    <p className={css.logout}>Выйти</p>
                </NavLink>
            </header>
        );
    }
};

export default Header;