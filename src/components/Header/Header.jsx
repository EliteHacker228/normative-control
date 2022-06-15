import css from './Header.module.css';
import logo from './normokontrol-logo-white-backgroundBlack.svg';
import {NavLink} from "react-router-dom";
import React from "react";


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
                    <p className={css.name}>normative<br/>control</p>
                </NavLink>

                <div style={{width: '80%'}}/>
                <NavLink to='/faq' className={css.linkfaq}>
                    <p className={css.faq}>FAQ</p>
                </NavLink>


            </header>
        );

    } else {
        return (
            <header className={css.header}>
                {/*<NavLink to='/'>*/}
                {/*    <img className={css.logo}*/}
                {/*         src={logo}*/}
                {/*         title="На главную"*/}
                {/*    />*/}
                {/*</NavLink>*/}

                {/*<a href="http://localhost:3000/">*/}
                <a href="https://normative-control.herokuapp.com/">
                    <img className={css.logo}
                         src={logo}
                         title="На главную"
                    />
                </a>


                {/*<NavLink to='/' className={css.linkname} title="На главную">*/}
                {/*    <p className={css.name}>normative<br/>control</p>*/}
                {/*</NavLink>*/}

                {/*<a href="http://localhost:3000/" className={css.linkname} title="На главную">*/}
                <a href="https://normative-control.herokuapp.com/" className={css.linkname} title="На главную">
                    <p className={css.name}>normative<br/>control</p>
                </a>


                <div style={{width: '70%'}}/>
                {/*<NavLink to='/faq' className={css.linkfaq}>*/}
                {/*    <p className={css.faq}>FAQ</p>*/}
                {/*</NavLink>*/}

                {/*<a href="http://localhost:3000/faq" className={css.linkfaq}>*/}
                <a href="https://normative-control.herokuapp.com/faq" className={css.linkfaq}>
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