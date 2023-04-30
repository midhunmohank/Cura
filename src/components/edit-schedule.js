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

    const [timing,setTiming] = useState('');
    const [day,setDay] = useState('');

    const [schedule_id] = useState(id);


    const schedule = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('timing', timing);
        data.append('day', day);
        data.append('schedule_id', schedule_id);
        
        ApiFunctions.updateSchedule(data,{
            headers:{
                'Authorization': token.token.token,
               }
        }).then(response => {
            history.push('/schedule');
    
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
                    Edit Schedule</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Edit Schedule</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">
                            <div class="input">
                                <label>Day</label>
                                <select name="day" value={day} className="form-control" onChange={(e) => setDay(e.target.value)} required>
                                    <option value="">Select Day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                            </div>

                            <div class="input">
                                <label>Timings</label>
                                <input type="text" value={timing}  name="timing"   onChange={(e) => setTiming(e.target.value)} placeholder="" required/>
                            </div>

                            
                            <div class="form_btn">
                                <button type="submit" onClick={schedule}>Edit Schedule</button>
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