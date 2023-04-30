import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";

import { Helmet } from "react-helmet";

import dr2 from '../images/home2.jpg';




const AddSchedule = () => {

    const history = useHistory();

    const token = useToken();
    
    if(!token.token){
        history.push('/');
    }

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [contact_number,setContact] = useState('');
    const [image,setImage] = useState('');
    const [location,setLocation] = useState('');


    const hospital = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('name', name);
        data.append('email', email);
        data.append('contact_number', contact_number);
        data.append('image', image);
        data.append('location', location);
        
        ApiFunctions.addHospital(data,{
            headers:{
                'Authorization': token.token.token,
                'content-type':'multipart/form-data',
               }
        }).then(response => {
            history.push('/view-hospitals');
    
        }).catch(e => {
            window.alert('Some error occured');
            console.log(e);
        })
    }
   
    return (
        <div className="">
            <Header />
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>


          
    <section class="home_1 ap_img2">
        <div class="container">
            <div class="heading">
                <h1>
                    Add Hospital</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Add Hospital</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">

                            <div class="input">
                                <label>Name</label>
                                <input type="text" value={name}  name="name"   onChange={(e) => setName(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                                <label>Email</label>
                                <input type="email" value={email}  name="email" onChange={(e) => setEmail(e.target.value)} placeholder="" required/>
                            </div>


                            <div class="input">
                                <label>Contact</label>
                                <input type="text" value={contact_number}  name="contact_number" onChange={(e) => setContact(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                                <label>Image</label>
                                <input type="file" value={image}  name="image" onChange={(e) => setImage(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                                <label>Location</label>
                                <input type="text" value={location}  name="location" onChange={(e) => setLocation(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                            </div>
                            
                            <div class="form_btn">
                                <button type="submit" onClick={hospital}>Add Hospital</button>
                            </div>

                        </form>
                    </div>
                    <div class="col6">
                        <div class="image"><img src={dr2} alt="appointment" title="appointment" /></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
               
        </div>
    );
}

export default AddSchedule;