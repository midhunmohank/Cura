import useScript from "./useScript";
import "../../css/ad-main.css";
import "../../css/admin.css";
import useToken from "./useToken";
import {
    Link,
    Redirect
} from "react-router-dom";


function Sidebar() {
	useScript('js/jquery.min.js');

    const token = useToken();
    const logout = () => {
        localStorage.clear();
        return <Redirect to='/admin' />;
    };

  


    return (
        // <div className="">
            <div class="main_sidebar" >
                <div class="logo">
                    <h3>Cura Admin</h3>
                </div>
                <ul class="main_sidemenu">
                <li><a href="/#/dashboard"><i class="fa fa-home" aria-hidden="true"></i><span>Dashboard</span></a></li>
                <li><a href="/#/doctors-list"><i class="fa fa-file" aria-hidden="true"></i><span>Hospitals</span></a></li>
                </ul>
            </div>
        // </div>
    );
}

export default Sidebar;