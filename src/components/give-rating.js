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

    const [ratings,setRating] = useState('');
    const [doctor_id] = useState(id);

    const rate = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('doctor_id', doctor_id);
        data.append('ratings', ratings);
        
        ApiFunctions.addRating(data,{
            headers:{
                'Authorization': token.token.token,
               }
        }).then(response => {
            history.push('/doctors');
    
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
                <h1>Give Rating</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Give Rating</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">
                                                      
                            <div class="input">
                                <label>Ratings</label>
                                <select  name="ratings"   onChange={(e) => setRating(e.target.value)}>
                                    <option value="">Select Rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                              
                            </div>

                           
                            <div class="input">
                            </div>

                            <div class="form_btn">
                                <button type="submit" onClick={rate}>Give Rating</button>
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