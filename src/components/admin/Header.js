
// import { Helmet } from 'react-helmet';

// import user from '../../imgs/user_icon.png';
import '../../css/admin.css'
import {
    Redirect,
    useHistory
    // useRouteMatch,
    // useParams
} from "react-router-dom";
import useToken from './useToken';

function Header() {
    const token = useToken();
    const history = useHistory();
    if(!token.token) {
        history.push('/admin');
    }

    const isLoggedIn = token.token;

    const logout = () => {
        localStorage.clear();
        return <Redirect to='/admin' />;
    };

    return (
        <div className="">    
            <link rel="stylesheet" href={require('../../css/admin.css').default} />   
            <link rel="stylesheet" href={require('../../../node_modules/bootstrap/dist/css/bootstrap.css').default} />            
            <header>
                        <div class="header-leftside">
                            <h3>Cura</h3>

                            <div class="logo_wrap">
                                <div class="toggle">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div class="header-rightside">
                            <div class="user">
                                <div class="username">
                                
                                    {isLoggedIn ? 
                                    (
                                        <a type="button" href="/#" onClick={logout} >
                                        {
                                            token.token.data.user_role ==='admin' ?
                                            token.token.data.username.charAt(0).toUpperCase()+ token.token.data.username.slice(1)
                                            :
                                            token.token.data.user_role ==='org'?
                                            token.token.data.org_name
                                            :
                                            <></>
                                        }
                                        ,Logout</a>
                                    ) : (
                                        <h3><a href="/#">Back To Home</a></h3>
                                    )}
                            
                                </div>
                            </div>
                        </div>
                    </header>
            </div>
    );
}

export default Header;