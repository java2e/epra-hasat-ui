import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'primereact/button';

export const AppTopbar = (props) => {

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-2.png' : 'assets/layout/images/logo-1.svg'} alt="logo" />
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>


            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                <li>
                    <Button className="youtube p-2" onClick={props.onMobileSubTopbarMenuClick}>
                        <i className="pi pi-sign-out"></i>
                        <span className="px-3">Çıkış</span>
                    </Button>
                </li>
            </ul>
        </div>
    );
}
