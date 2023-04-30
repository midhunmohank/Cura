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
    const [approval,setApproval] = useState('');
    const [appointment_id] = useState(id);


    const appointment = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('appointment_id', appointment_id);
        data.append('approval', approval);
        
        ApiFunctions.updateAppointment(data,{
            headers:{
                'Authorization': token.token.token,
               }
        }).then(response => {
            history.push('/appointments');
    
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
                <h1>Update Appointment Status</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Update Appointment Status</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">
                            <div class="input">
                                <label>Select Status</label>
                               
                                <select name="approval" value={approval} className="form-control" onChange={(e) => setApproval(e.target.value)} required>
                                    <option value="">---Select Status ---</option>
                                    <option value="approved">Approve</option>
                                    <option value="cancel">Reject</option>
                                </select>
                            </div>

                            <div class="input">
                            </div>

                       
                            <div class="form_btn">
                                <button type="submit" onClick={appointment}>Update Status</button>
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