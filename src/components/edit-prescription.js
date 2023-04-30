import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet";

import dr2 from '../images/home2.jpg';




const AddSchedule = () => {

    const history = useHistory();

    const token = useToken();
    const { id } = useParams();
    
    if(!token.token){
        history.push('/');
    }

    const [prescription,setPrescription] = useState('');

    const [prescription_id] = useState(id);


    const schedule = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('prescription', prescription);
        data.append('prescription_id', prescription_id);
        
        ApiFunctions.updatePrescription(data,{
            headers:{
                'Authorization': token.token.token,
               }
        }).then(response => {
            history.push('/view-prescriptions');
    
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
                    Edit Prescription</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Edit Prescription</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">
                          
                            <div class="input">
                                <label>Prescription</label>
                                <input type="text" value={prescription}  name="prescription"   onChange={(e) => setPrescription(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                            </div>
                            
                            <div class="form_btn">
                                <button type="submit" onClick={schedule}>Edit Prescription</button>
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