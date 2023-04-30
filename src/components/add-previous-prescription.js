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

    const [prescription,setPrescription] = useState('');
    const [document,setDocument] = useState('');


    const appointment = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('prescription', prescription);
        data.append('document', document);
        
        ApiFunctions.addPreviousPrescriptions(data,{
            headers:{
                'Authorization': token.token.token,
                'content-type':'multipart/form-data',
               }
        }).then(response => {
            history.push('/my-prescriptions');
    
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
                <h1>Add Previous Prescriptions</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Add Previous Prescriptions</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">
                                                      
                            <div class="input">
                                <label>Prescriptions</label>
                                <input type="text" value={prescription}  name="prescription"   onChange={(e) => setPrescription(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                                <label>Document</label>
                                <input type="file" name="document"  onChange={(e) => setDocument(e.target.value)}  placeholder="" required/>
                            </div>

                            <div class="input">
                            </div>

                            <div class="form_btn">
                                <button type="submit" onClick={appointment}>Add</button>
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