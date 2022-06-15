import css from './Logout.module.css';
import {NavLink} from "react-router-dom";
import React, {Component} from "react";
import state from "../../../../storage/storage";


class Logout extends Component {

    constructor() {
        super();
        this.state = JSON.parse(localStorage.getItem('normokontrol_state'));
        if (this.state === null) {
            this.state = state;
        }
    }

    componentDidMount() {
        this.state['credentials'] = 'null';
        localStorage.setItem('normokontrol_state', JSON.stringify(this.state));
        setTimeout(() => {
            document.getElementById('reroute').click();
            window.location.reload();
        }, 0);
    }

    render() {
        return (
            <div className={css.body}>
                <NavLink id="reroute" to='/auth/login' style={{display: "none"}}/>
            </div>
        );
    }
}

export default Logout;