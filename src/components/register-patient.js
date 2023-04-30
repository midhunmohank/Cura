import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import { Helmet } from "react-helmet";



const Register =() =>{

    const history = useHistory();

    const [first_name,setFirstName] = useState('');
    const [last_name,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [contact_number,setContact] = useState('');
    const [username,setUsername] = useState('');
    const [age,setAge] = useState('');
    const [gender,setGender] = useState('');
    const [address,setAddress] = useState('');

    const register1 = async (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('username', username);
        data.append('contact_number', contact_number);
        data.append('email', email);
        data.append('password', password);
        data.append('address', address);
        data.append('user_role', 'patient');
        data.append('age', age);
        data.append('gender', gender);

        ApiFunctions.register(data,{
            // headers:{
            //     'content-type':'multipart/form-data'
            // }
        }).then(response => {
            history.push('/login');
       
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
                    <h1> Register
                    </h1>
                </div>
            </div>
        </section>
        
        <section class="login_wrapper">
            <div class="container">
                <div class="form_wrap">
                    <h3>Register</h3>

                   <form  action="" method="post">
                     
                        <div class="input">
                            <label>First Name</label>
                            <input type="text" name="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="" required/> 
                        </div>

                        <div class="input">
                            <label>Last Name</label>
                            <input type="text" name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder=""  required/>
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
                            <label>Age</label>
                            <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="" required/>
                        </div>

                        <div class="input">
                            <label>Gender</label>
                            <select value={gender} name="gender" onChange={(e) => setGender(e.target.value)} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
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
                            <label>Address</label>
                            <input type="text" class="txtarea" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                        </div>

                        <div class="input">
                        </div>


                        <div class="form_btn">
                            <button type="submit" onClick={register1} >Register</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>

        </div>
    );
}

export default Register;