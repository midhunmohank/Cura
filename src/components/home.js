import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import moment from "moment";

import { Helmet } from "react-helmet";


import radiology from '../images/radiology.jpg';
import cardiology from '../images/cardiology.jpg';
import surgery from '../images/surgery.jpg';
import home2 from '../images/home2.jpg';
import client1 from '../images/client1.jpg';
import client2 from '../images/client2.jpg';
import client3 from '../images/client3.jpg';



const Home = () => {

    // const [jobList,setJobList] = useState([]);
    // // const [orgList,setOrgList] = useState([]);
    // moment.locale('en');
    // // let date = "";
    // useEffect(() => {
	// 	// ApiFunctions.getAllOrg().then(res => {
    //     //   var data = res.data.data

    //     //   setOrgList( data)
    //     // })


    //     ApiFunctions.getAllJobs().then(res => {
    //         var data = res.data.data;

             
    //           const list = data.map((d,i)=>{
    //           var date = d.createdDate;
    //           data[i].date = moment(date).startOf('seconds').fromNow()
    //           return  data[i];
    //           });

    //         setJobList(list)
    //       })

	// }, []);
   
    return (
        <div className="">
            <Header />
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>


    <section class="home_1">
        <div class="container">
            <div class="heading">
                <h1>Our priority is your care </h1>
                <p>The ultimate goal of our service is to provide you with the best quality care in a most efficient and affordable way possible. </p>
                <a href="#" class="btn">View More</a>
            </div>
        </div>
    </section>

    <section class="home_2">
        <div class="container">


            <div class="dflex">
                <div class="col6">
                    <div class="colleft">
                        <img src={home2}/>
                    </div>
                </div>
                <div class="col6">
                    <div class="colright">
                        <span>Why us?</span>
                        <h3> Heart Surgery Specialist Expert Doctors</h3>
                        <p>Maintaining your well-being is our aim and there is no way we will compromise with our quality care for you.</p> <a href="#" class="btn">Learn More</a>

                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="home_5">
            <div class="container">
                <div class="heading">
                    <span>Service we provide 
                    </span>
                    <h2>Our services mean top services </h2>
                </div>
                <div class="service_wrap">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="service_box">
                                <div class="img">
                                    <img src={radiology} alt="image" title="image"/>
                                </div>
                                <div class="service_info">
                                    <h3>Radiology Services</h3>
                                    <p>Proper utilization of X-rays, magnetic waves, and ultrasound to get a detailed picture of what’s going on in your body. </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="service_box">
                                <div class="img">
                                    <img src={cardiology} alt="image" title="image"/>
                                </div>
                                <div class="service_info">
                                    <h3>Cardiology Services </h3>
                                    <p>Variety of services like diagnosing and treating chest pain, high blood pressure, or other heart valves or vascular issues. </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="service_box">
                                <div class="img">
                                    <img src={surgery} alt="image" title="image"/>
                                </div>
                                <div class="service_info">
                                    <h3>Surgical Services</h3>
                                    <p>Multiple necessary medical services such as cutting procedures, treatment of fractures and dislocations, and surgical dressings. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    </section>
    <section class="home_4">
        <div class="container">
            <div class="heading">
                <span>High-quality solutions </span>
                <h2>We try our best to provide you with the best quality and take care of our patients with the utmost efficiency. </h2>
                <a href="#" class="btn">Read more </a>
            </div>
        </div>
    </section>

    <section class="review">
        <div class="container">
            <div class="heading">
                <h2>Review </h2>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="service_box">
                        <div class="img">
                            <img src={client1} alt="client" title="client"/>
                        </div>
                        <div class="service_info">
                            <h3>Thomas Rich </h3>
                            <p>I had a high blood pressure issue and I contacted this hospital. I must say they have the highest quality service and they know how to take care of their patients very well. </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="service_box">
                        <div class="img">
                            <img src={client2} alt="client" title="client"/>
                        </div>
                        <div class="service_info">
                            <h3>Stephen Brown </h3>
                            <p>Max Care Hospital is one of the best hospitals for cardiology. I have been there with an issue in my heart. They were affordable and reliable. </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="service_box">
                        <div class="img">
                            <img src={client3} alt="client" title="client"/>
                        </div>
                        <div class="service_info">
                            <h3>Stella Watson </h3>
                            <p>I have taken their services and it is a good hospital. </p>
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

export default Home;