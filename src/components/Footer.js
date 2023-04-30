// import logo from '../images/logo.png';
// import user from '../imgs/user.jpg';
import { Helmet } from 'react-helmet';
import {
    Link,
    Redirect
} from "react-router-dom";
import useToken from './admin/useToken';


function Footer() {
    const token = useToken();


    return (
        <div className="">
=            <Helmet>
                <link rel="stylesheet" href={require('../css/main.css').default} />
            </Helmet>
            <footer>
                <p>Copyright © 2022. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Footer;