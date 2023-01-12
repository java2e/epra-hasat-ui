import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/epra_logo_transparant.png' : 'assets/layout/images/epra_logo_transparant.png'} alt="Logo" height="20" className="mr-2" />
            by
            <span className="font-medium ml-2">SESASIS</span>
        </div>
    );
}
