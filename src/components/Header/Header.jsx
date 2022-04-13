import css from './Header.module.css';
import logo from './normokontrol-logo-white-backgroundBlack.svg';
import {NavLink} from "react-router-dom";


const Header = () => {
    return (
        <header className={css.header}>
            <NavLink to='/upload'>
                <img className={css.logo}
                     src={logo}
                />
            </NavLink>
            <p className={css.name}>normative<br/>control</p>
            {/*<ul className={css.menu}>*/}
            {/*    <li><NavLink className={css.menu_element} to='/'>Welcome</NavLink></li>*/}
            {/*    <li><NavLink className={css.menu_element} to='/upload'>Upload File</NavLink></li>*/}
            {/*    <li><NavLink className={css.menu_element} to='/result'>Get Result</NavLink></li>*/}
            {/*    <li><NavLink className={css.menu_element} to='/status'>Get Status</NavLink></li>*/}
            {/*</ul>*/}
        </header>
    );
};

export default Header;