import { useEffect, useState } from "react";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import moment from "moment";


import doctor1 from '../images/doctor1.jpg';




const DoctorDetail = () => {

    const history = useHistory();
    const { id } = useParams();
        const token = useToken();
    
        if(!token.token){
            history.push('/');
        }
        
            
        const [patient_id] = useState(id);
        const [list, setList] = useState([]);
        const [prescription_list, setPrescriptionList] = useState([]);
        const [health_list, setHealthList] = useState([]);
        const [details,setDetails] = useState([]);

        useEffect(() => {
            var data = new FormData();
            data.append('patient_id', patient_id);
         
            ApiFunctions.getSinglePatient(data,{
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
            data.append('patient_id', patient_id);
         
            ApiFunctions.getPreviousPresc(data,{
                headers:{
                    'Authorization': token.token.token,
                   }
            }).then(response => {
                var data = response.data.data;
                setPrescriptionList(data)
            }).catch(e => {
                // window.alert('Some error occured');
            })
        });


        useEffect(() => {
            var data = new FormData();
            data.append('patient_id', patient_id);
         
            ApiFunctions.getHealthHistory(data,{
                headers:{
                    'Authorization': token.token.token,
                   }
            }).then(response => {
                var data = response.data.data;
                setHealthList(data)
            }).catch(e => {
                // window.alert('Some error occured');
            })
        });


       
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
                        <h3>Patient - {details.first_name} {details.last_name}</h3>
                        
                        <div class="info_wrap">
                           
                            <div class="education">
                                <div class="info">
                                    <h5>Registration Number </h5>
                                    <span>{details.contact_number}</span>
                                </div>
                            </div>
                            <div class="education">
                      
                                <div class="info">
                                    <h5>Email </h5>
                                    <span>{details.email}</span>
                                </div>
                            </div>
                            <div class="education">
                      
                                <div class="info">
                                    <h5>Age </h5>
                                    <span>{details.age} years</span>
                                </div>
                            </div>

                            <div class="education">
                           
                                <div class="info">
                                    <h5>Gender </h5>
                                    <span>{details.gender}</span>
                                </div>
                            </div>

                            <div class="education">
                               
                                <div class="info">
                                    <h5>Address </h5>
                                    <span>{details.address}</span>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div class="col6">
                        <div class="colright">
                            <div class="image">
                                <img src={doctor1} alt="dr" title="dr"/>
                            </div>
                     
                        </div>
                    </div>
                </div>
                <div class="detail_wrap">
          
                   
                    <div class="timings">
                        <h4>Previous Prescriptions</h4>
                        <ul>
                            <li><span>S.No.</span>
                                <span>Prescription</span>
                                <span> Uploaded On </span></li>
                          
                        {prescription_list.map((data,id) => {
                        return(
                            <li><span>{id+1}</span>
                                <span>{data.prescription}</span>
                                <span> {moment(data.uploaded_on).format("DD-MM-YYYY")}</span></li>
                         )})} 
                            
                        </ul>
                    </div>
                </div>



                <div class="detail_wrap">
                    <div class="timings">
                        <h4>Health History</h4>
                        <ul>
                            <li><span>S.No.</span>
                                <span>Health History</span>
                                <span> Uploaded On </span><span> Download </span></li>
                            
                                {health_list.map((data,id) => {
                                return(
                                    <li><span>{id+1}</span>
                                        <span>{data.health_description}</span>
                                        <span> {moment(data.uploaded_on).format("DD-MM-YYYY")}</span>
                                        <span><a target="_blank" href={'../../../assets/health_history/' + data.document} download>Download</a></span>
                                    </li>
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