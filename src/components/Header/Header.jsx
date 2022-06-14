import css from './Header.module.css';
import logo from './normokontrol-logo-white-backgroundBlack.svg';
import {NavLink} from "react-router-dom";


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

                <div style={{width: '60%'}}/>
                <NavLink to='/faq' className={css.linkfaq}>
                    <p className={css.faq}>FAQ</p>
                </NavLink>


            </header>
        );

    }else{
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


                <div style={{width: '60%'}}/>
                <NavLink to='auth/logout' className={css.linkfaq}>
                    <p className={css.faq}>Выйти</p>
                </NavLink>


            </header>
        );
    }
};

export default Header;