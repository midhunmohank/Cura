import logo from '../images/logo.png';

// import user from '../imgs/user.jpg';
import { Helmet } from 'react-helmet';
import {
    useHistory,
    Link,
    Redirect
} from "react-router-dom";
import useToken from './admin/useToken';


function Header() {
    const token = useToken();
    const history = useHistory();


    const isLoggedIn = token.token;
    var user_role = "";
    var role = "";
    if(isLoggedIn){
         user_role = token.token.data.user_role;

         if(user_role == 'staff'){
             role = token.token.staff.role;
         }
    }


    const logout = () => {
        localStorage.clear();
        return <Redirect to='/' />;
    };


    return (
        <div className="">
            <Helmet>
                <link rel="stylesheet" href={require('../css/main.css').default} />
            </Helmet>
            <header>
                <div class="container">
                    <nav class="navbar navbar-expand-lg">
                        <a class="navbar-brand" href="/">
                            Cura
                        </a>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav">

                                <li class="nav-item">
                                    <a class="nav-link" href="/#/">Home</a>
                                </li>



                                {isLoggedIn ? 
                                    (
                                        <>  

                                        
                                        {/* //************   Patient   **************** */ }

                                        {user_role === 'patient' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/view-all-hospitals">Hospitals</a>
                                            </li>
                                        : ""
                                        }

                                        {user_role === 'patient' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/doctors">Doctors</a>
                                            </li>
                                        : ""
                                        }


                                        {user_role === 'patient' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/my-appointments">My Appointments</a>
                                            </li>
                                        : ""
                                        }

                                        {user_role === 'patient' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/my-prescriptions">My Prescriptions</a>
                                            </li>
                                        : ""
                                        }

                                        {(user_role === 'patient') ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/test-reports">Test Report</a>
                                            </li>
                                        : ""
                                        }



                                        {/* //************   Inventory manager   **************** */}

                                        {(user_role === 'staff' && role == 'inventory_manager')? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/view-medicines">Medicines</a>
                                            </li>
                                        : ""
                                        }




                                        {/* //************   Doctor   **************** */}

                                        {user_role === 'doctor' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/appointments">Appointments</a>
                                            </li>
                                        : ""
                                        }


                                        {user_role === 'doctor' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/schedule">My Schedule</a>
                                            </li>
                                        : ""
                                        }


                                        {user_role === 'doctor' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/leaves">My Leaves</a>
                                            </li>
                                        : ""
                                        }



                                        {user_role === 'doctor' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/view-prescriptions">View Prescriptions</a>
                                            </li>
                                        : ""
                                        }





                                        {/* //************   Nurse   **************** */ }

                                        {(user_role === 'staff' && role == 'nurse') ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/view-prescriptions">Prescriptions</a>
                                            </li>
                                        : ""
                                        }

                                        
                                        {(user_role === 'staff' && role == 'nurse') ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/schedule">My Schedule</a>
                                            </li>
                                        : ""
                                        }


                                        {(user_role === 'staff' && role == 'nurse') ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/leaves">My Leaves</a>
                                            </li>
                                        : ""
                                        }


                                        {/* //************   Pathologist   **************** */ } 

                                        {(user_role === 'staff' && role == 'pathologist') ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/test-reports">Test Report</a>
                                            </li>
                                        : ""
                                        }



                                        {/* //************   Admin   **************** */ }


                                        {user_role === 'admin' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/view-medicines">Medicines</a>
                                            </li>
                                        : ""
                                        }


                                        {(user_role === 'admin') ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/view-hospitals">Hospital</a>
                                            </li>
                                        : ""
                                        }


                                        {user_role === 'admin' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/appointments">Appointments</a>
                                            </li>
                                        : ""
                                        }

                                        
                                        {user_role === 'admin' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/doctors">Doctors</a>
                                            </li>
                                        : ""
                                        }

                                        {user_role === 'admin' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/staffs">Staffs</a>
                                            </li>
                                        : ""
                                        }



                                        {user_role === 'admin' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/patients">Patients</a>
                                            </li>
                                        : ""
                                        }



                                        {user_role === 'admin' ? 
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/leaves">Leaves</a>
                                            </li>
                                        : ""
                                        }




                                        <li class="nav-item">
                                        <a  class="nav-link" href="/#" onClick={logout} >
                                        {
                                            token.token.data.username.charAt(0).toUpperCase()+ token.token.data.username.slice(1)
                                        }
                                        ,Logout</a></li>

                                        </>

                                    ) : (
                                        <>    
                                            
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/login">Login</a>
                                            </li>

                                            <li class="nav-item">
                                                <a class="nav-link" href="/#/register-patient">Register</a>
                                            </li>
                                        </>
                                    )
                                }

                                            
                            
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header;