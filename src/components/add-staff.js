import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import { Helmet } from "react-helmet";
import useToken from "./admin/useToken";



const Register =() =>{

    const history = useHistory();
    const token = useToken();


    if (!token.token) {
        history.push('/');
    }



    const [name,setFullName] = useState('');
    const [location,setLocation] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [contact_number,setContact] = useState('');
    const [username,setUsername] = useState('');


    const [gender,setGender] = useState('');
    const [role,setRole] = useState('');



    const add_staff = async (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('name', name);
        data.append('username', username);
        data.append('contact_number', contact_number);
        data.append('password', password);
        data.append('email', email);
        data.append('role', role);
        data.append('user_role', 'staff');

        data.append('location', location);
        data.append('gender', gender);


        ApiFunctions.addStaff(data,{
            headers:{
                'Authorization': token.token.token,
            }
        }).then(response => {
            history.push('/staffs');
       
        }).catch(e => {
            window.alert('Some error occured');
            console.log(e);
        })
    }
    return (
        <div className="App">
            <Header />
        
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>

        <section class="home_1" class="b_img4">
            <div class="container">
                <div class="heading">
                    <h1> Add Staff
                    </h1>
                </div>
            </div>
        </section>
        
        <section class="login_wrapper">
            <div class="container">
                <div class="form_wrap">
                    <h3>Add Staff</h3>
                    <form  action="" method="post">
                     
                        <div class="input">
                            <label>Full Name</label>
                            <input type="text" name="name" value={name} onChange={(e) => setFullName(e.target.value)} placeholder="" required/> 
                        </div>

                       
                        <div class="input">
                            <label>Username</label>
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=""  required/>
                        </div>

                        <div class="input">
                            <label>Password</label>
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" required />
                        </div>

                        <div class="input">
                            <label>Location</label>
                            <textarea  name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder=""  required ></textarea>
                        </div>


                        <div class="input">
                            <label>Contact Number</label>
                            <input type="text" name="contact_number" value={contact_number} onChange={(e) => setContact(e.target.value)} placeholder="" required/>
                        </div>

                        <div class="input">
                            <label>Email</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" required/>
                        </div>

                        <div class="input">
                            <label>Select Gender</label>
                            <select name="gender" value={gender} className="form-control" onChange={(e) => setGender(e.target.value)} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div class="input">
                            <label>Select Role</label>
                            <select name="role" value={role} className="form-control" onChange={(e) => setRole(e.target.value)} required>
                                <option value="">Select Role</option>
                                <option value="nurse">Nurse</option>
                                <option value="pathologist">Pathologist</option>
                                <option value="inventory_manager">Inventory Manager</option>
                            </select>
                        </div>


                    
        
                        <div class="form_btn">
                            <button type="submit" onClick={add_staff} >Add Staff</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>

        </div>
    );
}

export default Register;