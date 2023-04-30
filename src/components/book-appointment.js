import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";

import { Helmet } from "react-helmet";

import dr2 from '../images/home2.jpg';


const BookAppointment = () => {


    const history = useHistory();

    const token = useToken();
    
    if(!token.token){
        history.push('/');
    }


    const { id } = useParams();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [appointment_date,setAppointmentDate] = useState('');
    const [appointment_time,setAppointmentTime] = useState('');

    const [doctor_id] = useState(id);

    console.log(doctor_id);


    const appointment = async (e) => {

        e.preventDefault();
        var data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('contact', contact);        
        data.append('doctor_id', doctor_id);
        data.append('appointment_date', appointment_date);
        data.append('appointment_time', appointment_time);
        
        console.log(data);

        ApiFunctions.bookAppointment(data,{
            headers:{
                'Authorization': token.token.token,
               }
        }).then(response => {
            history.push('/my-appointments');
    
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
                <h1>Book Appointment</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Book Appointment</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">
                            <div class="input">
                                <label>Name</label>
                                <input type="text" value={name}  name="name"  onChange={(e) => setName(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                                <label>Email</label>
                                <input type="email" value={email}  name="email"  onChange={(e) => setEmail(e.target.value)} placeholder=""  required/>
                            </div>

                            <div class="input">
                                <label>Contact Number</label>
                                <input type="text" value={contact}  name="contact"  onChange={(e) => setContact(e.target.value)} placeholder="" required/>
                            </div>

                          
                            <div class="input">
                                <label>Appointment Date</label>
                                <input type="date" value={appointment_date}  name="appointment_date"   onChange={(e) => setAppointmentDate(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                                <label>Appointment Time</label>
                                <input type="time" value={appointment_time}  name="appointment_time"  onChange={(e) => setAppointmentTime(e.target.value)}  placeholder="" required/>
                            </div>

                            <div class="input">
                            </div>

                         
                            <div class="form_btn">
                                <button type="submit" onClick={appointment}>Book Appointment</button>
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

export default BookAppointment;