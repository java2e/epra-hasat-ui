import React, { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from '../AppTopbar';
import { AppFooter } from '../AppFooter';
import { AppMenu } from '../AppMenu';
import { AppConfig } from '../AppConfig';

import Dashboard from '../components/Dashboard';

import EmptyPage from './EmptyPage';
import UserManagement from './UserManagement';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../assets/demo/flags/flags.css';
import '../assets/demo/Demos.scss';
import '../assets/layout/layout.scss';
import '../App.scss';
import Login from './Login';
import Company from './Company/Company';
import UserAuth from './User/UserAuth';
import PVLocation from './PV/PVLocation';
import ReactivePower from './RP/ReactivePower';
import AuthContext from '../store/auth/auth-context';
import CompanyUserRegister from './CompanyNewUserRegister/CompanyUserRegister';
import PVLocationList from './PV/PVLocationList';
import PVLocaationResult from './PV/PVLocationResult';
import ReactivePowerResult from './RP/RactivePowerResult';
import RPowerList from './RP/RPowerList';
import { Redirect } from 'react-router-dom';
import NotFound from './404/NotFound';
import { Toast } from 'primereact/toast';


const MainPage = () => {

    const authCtx = useContext(AuthContext);
    const toastBR = useRef(null);

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    const [name,setName]=useState();
    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    let [isAdmin,setIsAdmin] = useState(false);
    let [isAltAdmin,setIsAltAdmin] = useState(false);

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();


        const loadData = async()=> {
            setName(localStorage.getItem('name'));
            
            const userRole = localStorage.getItem('userRole');
              

            if(userRole === 'ROLE_USER')
            {
                setIsAdmin(false);
                setIsAltAdmin(false);
            }
            else if(userRole === 'ROLE_ADMIN')
            {
                setIsAdmin(true);
                setIsAltAdmin(false);        
            }
            else if(userRole === 'ROLE_COMPANY_ADMIN')
            {
                setIsAdmin(false);
                setIsAltAdmin(true);        
            }

        }

        loadData();

    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
       
        authCtx.logout();

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        
        {
            label: 'Anasayfa',   
            isAdmin:true,isAltAdmin:true,         
            items: [{
                label: 'Gösterge Paneli', icon: 'pi pi-fw pi-home', to: '/',isAdmin:true,isAltAdmin:true 
            }]
        },
        {
            label: 'UYGULAMA YÖNETİMİ', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Kullanıcı Yönetimi', icon: 'pi pi-fw pi-users', to: '/userManagement',isAdmin:isAdmin,isAltAdmin:false },
                { label: 'Firma Yönetimi', icon: 'pi pi-fw pi-ticket', to: '/company',isAdmin:isAdmin,isAltAdmin:false },
                { label: 'Yetki Tanımlama', icon: 'pi pi-fw pi-user-plus', to: '/userAuth',isAdmin:isAdmin,isAltAdmin:false },
                { label: 'Firma Yeni Kullanıcı Talep', icon: 'pi pi-fw pi-id-card', to: '/companyUserRegister',isAdmin:isAdmin,isAltAdmin:isAltAdmin }
            ],
            isAdmin:isAdmin,
            isAltAdmin:isAltAdmin
        },
        {
            label: 'PV OPTİMUM KONUMLANDIRMA',
            isAdmin:true,isAltAdmin:true ,
            items: [
                { label: 'PV Optimum Konumlandırma', icon: 'pi pi-fw pi-chart-line', to: '/pvLocation',isAdmin:true,isAltAdmin:true },
                { label: 'Sonuçlar', icon: 'pi pi-fw pi-check-circle', to: '/pvLocationResults',isAdmin:true,isAltAdmin:true }

            ]
        },
        {
            label: 'REAKTİF GÜÇ OPTİMİZASYONU',
            isAdmin:true,isAltAdmin:true ,
            items: [
                { label: 'Reaktif Güç Optimizasyonu', icon: 'pi pi-fw pi-chart-line', to: '/reactivePower',isAdmin:true,isAltAdmin:true },
                { label: 'Sonuçlar', icon: 'pi pi-fw pi-check-circle', to: '/reactivePowerResults',isAdmin:true,isAltAdmin:true  }

            ]
        }
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    const toast = (data,type) => {
        toastBR.current.show({ severity: 'success', summary: 'Talebiniz alınmıştır. Analiz tamamlandığında mail yoluyla bilgilendirme yapılacaktır.', detail: 'Başarılı', life: 3000 });
    }

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>

            <Toast ref={toastBR} position="top-right" />

            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
        
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />            
            <div className="layout-sidebar" onClick={onSidebarClick}>
            <h6>Hoşgeldin  {name} </h6> 
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>
           
            

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard toast={toast}  />} />
                   {isAdmin && <Route path="/company" exact component={Company}  /> }
                   {isAdmin && <Route path="/userAuth" exact component={UserAuth} /> }
                   {isAdmin && <Route path="/userManagement" component={UserManagement} /> }
                    <Route path= "/companyUserRegister" exact component={CompanyUserRegister}/>
                    <Route path="/pvLocation" exact render={()=> <PVLocation toast={toast} />} />
                    <Route path="/pvLocationResults" exact component={PVLocationList} />
                    <Route path="/pvLocationResult/:id" exact component={PVLocaationResult} />
                    <Route path="/empty" component={EmptyPage} />
                    <Route path="/reactivePower" exact render={() => <ReactivePower toast={toast} />} />
                    <Route path="/reactivePowerResults" exact component={RPowerList} />
                    <Route path="/reactivePowerResult/:id" exact component={ReactivePowerResult} />
                </div>

                <AppFooter layoutColorMode={layoutColorMode} />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default MainPage;