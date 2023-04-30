import { useEffect, useState } from "react";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";



import eduction from '../images/eduction.png';
import register from '../images/register.png';
import location from '../images/location.png';
import language from '../images/language.png';
import doctor1 from '../images/doctor1.jpg';

import dr2 from '../images/doctor2.jpg';



const DoctorDetail = () => {

    const history = useHistory();
    const { id } = useParams();
        const token = useToken();
    
        if(!token.token){
            history.push('/');
        }
        
            
        const [doctor_id] = useState(id);
        const [list, setList] = useState([]);
        const [schedule_list, setScheduleList] = useState([]);
        const [details,setDetails] = useState([]);

        useEffect(() => {
            var data = new FormData();
            data.append('doctor_id', doctor_id);
         
            ApiFunctions.getSingleDoctor(data,{
                headers:{
                    'Authorization': token.token.token,
                   }
            }).then(response => {
                setDetails(response.data.data[0])
                

            }).catch(e => {
                // window.alert('Some error occured');
            })
        });


        useEffect(() => {
            var data = new FormData();
            data.append('doctor_id', doctor_id);
         
            ApiFunctions.getDoctorSpecialization(data,{
                headers:{
                    'Authorization': token.token.token,
                   }
            }).then(response => {
                var data = response.data.data[0];
                setList(data)
            }).catch(e => {
                // window.alert('Some error occured');
            })
        });


        useEffect(() => {
            var data = new FormData();
            data.append('doctor_id', doctor_id);
         
            ApiFunctions.getDoctorSchedule(data,{
                headers:{
                    'Authorization': token.token.token,
                   }
            }).then(response => {
                var data = response.data.data;
                setScheduleList(data)
            }).catch(e => {
                // window.alert('Some error occured');
            })
        });

        console.log(schedule_list);


       
    return (
        <div className="">
            <Header />
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>


            <section class="detail">
        <div class="container">
            <div class="doctor_detail">
                <div class="dflex">
                    <div class="col6">
                        <h3>Doctor - {details.full_name}</h3>
                        <div class="doctor_info">
                            <h4>Experience - {details.experience} years</h4>
                        </div>
                        <div class="info_wrap">
                            <div class="education">
                                <div class="img">
                                    <img src={eduction} alt="image" title="image" />
                                </div>
                                <div class="info">
                                    <h5>Qualifications </h5>
                                    <span> {details.education}</span>
                                </div>
                            </div>
                            <div class="education">
                                <div class="img">
                                    <img src={register} alt="image" title="image" />
                                </div>
                                <div class="info">
                                    <h5>Registration Number </h5>
                                    <span>{details.contact_number}</span>
                                </div>
                            </div>
                            <div class="education">
                                <div class="img">
                                    <img src={location} alt="image" title="image" />
                                </div>
                                <div class="info">
                                    <h5>Email </h5>
                                    <span>{details.email}</span>
                                </div>
                            </div>
                            <div class="education">
                                <div class="img">
                                    <img src={language} alt="image" title="image" />
                                </div>
                                <div class="info">
                                    <h5>Specialization </h5>
                                    <span>{list.specialization} </span>
                                </div>
                            </div>


                           

                            <div class="education">
                                <div class="img">
                                    <img src={language} alt="image" title="image" />
                                </div>
                                <div class="info">
                                    <h5>Research Work </h5>
                                    <span>{list.research_work} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col6">
                        <div class="colright">
                            <div class="image">
                                <img src={dr2} alt="dr" title="dr"/>
                            </div>
                            <p>Book your appointment for tomorrow </p>
                                <div class="button_wrap">
                                    <a href={"/#/book-appointment/" + details._id} class="btn">Book personal appointment
                                    </a>
                                </div>
                                <div class="button_wrap">
                                    <a href={"/#/give-rating/" + details._id} class="btn">Give Rating
                                    </a>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="detail_wrap">
                   
                    <div class="timings">
                        <h4>Timings</h4>
                        <ul>
                        {schedule_list.map((data) => {
                        return(
                            <li><span>{data.day}</span>
                                <span> {data.timing}</span></li>
                         )})} 
                            
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <Footer />
               
        </div>
    );
}

export default DoctorDetail;