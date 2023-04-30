import { useEffect, useState } from "react";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import { useHistory } from "react-router";

import { Helmet } from "react-helmet";


import emergency from '../images/emergency.png';
import healthcare from '../images/healthcare.png';
import doctor from '../images/doctor.png';
import services from '../images/services.png';
import useToken from "./admin/useToken";

import dr2 from '../images/doctor2.jpg';


function Doctor() {
    
    const history = useHistory();
    const token = useToken();


    if (!token.token) {
        
        history.push('/login');
    }

    var user_role = "";
    user_role = token.token.data.user_role;


    const [list, setList] = useState([]);
    useEffect(() => {
        ApiFunctions.getDoctors(null,{
               headers:{
                'Authorization': token.token.token,
               }
        }).then(res => {
            var data = res.data.data;
            setList(data)
        })
    }, []);
   

    return (
        <div className="">
            <Header />
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>


    <section class="home_1" class="d_img">
        <div class="container">

            <div class="heading">
                <h1> We put patients and their wellbeing above all
                </h1>
                <p> We are trusted by hundreds of thousands of people for the quality of our service. </p>
            </div>
        </div>
    </section>
    <section class="patient_detail">
        <div class="container">
            <div>

                {user_role === 'admin' ? 
                    <a href="/#/add-doctor">Add Doctor</a>
                    : 
                    ""
                }

            </div>
            <div class="heading">
                <h2>Our Doctors</h2>
            </div>
            <div class="doctor_wrap">
                <div class="row">

                {list.map((data) => {
                     return(

                        <div class="col-md-3">
                            <div class="doctor_box">
                                <div class="img">
                                    <img src={dr2} alt="image" title="image" />
                                </div>
                                <div class="doctor_info">
                                    <h3>{data.full_name} </h3>
                                    <span>{data.education} </span>
                                    {/* <p>One of the best cardiologists in the two with more than 7 years of experience as a cardiac surgeon. Dr. Amanda is amazingly friendly and incredibly flawless in her practice. </p> */}
                                    <ul>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                    </ul>
                                    
                                    <a href={"/#/doctor-detail/" + data._id} class="btn">View More</a>
                                </div>
                            </div>
                        </div>                   
                )})} 
                   
                </div>
            </div>
        </div>
    </section>
   
    <section class="best">
        <div class="container">
            <div class="heading">
                <h2> We are the best for a reason </h2>
                <p> There are a million reasons why we are trusted </p>
            </div>
            <div class="best_wrap">
                <div class="row">
                    <div class="col-md-3">
                        <div class="best_box">
                            <div class="icon">
                                <img src={emergency} alt="image" title="image" />
                            </div>
                            <div class="best_info">
                                <h4>Emergency Care </h4>
                                <p>24X7 emergency care and doctors available on duty round the clock to ensure that medical care to no patient is delayed and lives are saved well in time. </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="best_box">
                            <div class="icon">
                                <img src={healthcare} alt="image" title="image" />
                            </div>
                            <div class="best_info">
                                <h4>Advanced Healthcare
                                </h4>
                                <p>We have adapted to a highly digitalized medical care infrastructure from robotic surgeries to the most advanced pathological labs for best healthcare experience. </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="best_box">
                            <div class="icon">
                                <img src={doctor} alt="image" title="image" />
                            </div>
                            <div class="best_info">
                                <h4>Expert Doctors </h4>
                                <p>We have the most accomplished doctors in the country leading different departments and that gives great confidence and optimism to patients who come to us. </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="best_box">
                            <div class="icon">
                                <img src={services} alt="image" title="image" />
                            </div>
                            <div class="best_info">
                                <h4>Anytime Access </h4>
                                <p>Customers can access their electronic health records anytime, book appointments at any time and upload their reports in real time through our digital channels. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
               
        </div>
    );
}

export default Doctor;