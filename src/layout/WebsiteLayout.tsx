
import { Outlet } from 'react-router-dom';
import '../component/css/style.css'
import './layout.css'


const WebsiteLayout = () => {
    return (
        <>
            <header>
                <div className="header-area " style={{ backgroundColor: "black", }}>
                    <div id="sticky-header" className="main-header-area">
                        <div className="container-fluid"  >
                            <div className="header_bottom_border">
                                <div className="row align-items-center">
                                    <div className="col-xl-3 col-lg-2">
                                        <div className="logo">
                                            <a href="index.html" style={{ display: "flex" }}>
                                                <div className="loading" style={{ height: '90%' }}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>

                                                </div>
                                                <p style={{ color: 'white', fontSize: '25px', marginTop: '8px', fontWeight: 'bold', marginLeft: '-20px' }}>Ketamin</p>

                                                {/* <img src="https://res.cloudinary.com/dw6wgytc3/image/upload/v1691917796/DUAN/logo_xsyovs.png" alt="" /> */}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-7">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><a className="active" href="index.html">home</a></li>
                                                    <li><a href="about.html">About</a></li>
                                                    <li><a href="track.html">tracks</a></li>
                                                    <li><a href="#">blog <i className="ti-angle-down"></i></a>
                                                        <ul className="submenu">
                                                            <li><a href="blog.html">blog</a></li>
                                                            <li><a href="single-blog.html">single-blog</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">pages <i className="ti-angle-down"></i></a>
                                                        <ul className="submenu">
                                                            <li><a href="elements.html">elements</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="contact.html">Contact</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                                        <div className="social_icon text-right">
                                            <ul>
                                                <li><a href="#"> <i className="fa fa-facebook"></i> </a></li>
                                                <li><a href="#"> <i className="fa fa-twitter"></i> </a></li>
                                                <li><a href="#"> <i className="fa fa-instagram"></i> </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default WebsiteLayout