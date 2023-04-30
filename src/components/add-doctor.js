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



    const [full_name,setFullName] = useState('');
    const [hospital_id,setHospital] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [contact_number,setContact] = useState('');
    const [username,setUsername] = useState('');


    const [experience,setExperience] = useState('');
    const [education,setEducation] = useState('');
    const [research_work,setResearchWork] = useState('');
    const [specialization,setSpecialization] = useState('');


    const [plist, setPList] = useState([]);

    useEffect(() => {
        ApiFunctions.viewHospital(null,{
               headers:{
                'Authorization': token.token.token,
               }
        }).then(res => {
            var data = res.data.data;
            setPList(data)
        })
    }, []);




    const add_doctor = async (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('full_name', full_name);
        data.append('username', username);
        data.append('contact_number', contact_number);
        data.append('password', password);
        data.append('email', email);
        data.append('user_role', 'doctor');

        data.append('hospital_id', hospital_id);
        data.append('experience', experience);
        data.append('education', education);
        data.append('research_work', research_work);
        data.append('specialization', specialization);


        ApiFunctions.add_doctor(data,{
            headers:{
                'content-type':'multipart/form-data'
            }
        }).then(response => {
            history.push('/doctors');
       
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
                    <h1> Add Doctor
                    </h1>
                </div>
            </div>
        </section>
        
        <section class="login_wrapper">
            <div class="container">
                <div class="form_wrap">
                    <h3>Add Doctor</h3>
                    <form  action="" method="post">
                     
                        <div class="input">
                            <label>Full Name</label>
                            <input type="text" name="full_name" value={full_name} onChange={(e) => setFullName(e.target.value)} placeholder="" required/> 
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
                            <label>Select Hospital</label>
                            <select name="hospital_id" value={hospital_id} className="form-control" onChange={(e) => setHospital(e.target.value)} required>
                                <option value="">Select Hospital</option>

                                {plist.map((data) => {
                                return(
                                    <option value={data._id}>{data.name}</option>
                                )})} 
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
                            <label>Experience</label>
                            <input type="number" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="" required/>
                        </div>

                       
                        <div class="input">
                            <label>Education</label>
                            <input type="text" name="education" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="" required/>
                        </div>

                        <div class="input">
                            <label>Research Work</label>
                            <input type="text" name="research_work" value={research_work} onChange={(e) => setResearchWork(e.target.value)} placeholder="" required/>
                        </div> 
                        
                        <div class="input">
                            <label>Specialization</label>
                            <input type="text" name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="" required/>
                        </div>
                        
        
                        <div class="form_btn">
                            <button type="submit" onClick={add_doctor} >Add Doctor</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>

        </div>
    );
}

export default Register;