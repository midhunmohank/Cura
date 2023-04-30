import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";

import { Helmet } from "react-helmet";

import dr2 from '../images/home2.jpg';




const AddSchedule = () => {

    const history = useHistory();

    const token = useToken();
    
    if(!token.token){
        history.push('/');
    }

    const [reason,setReason] = useState('');
    const [leave_start_date,setStartDate] = useState('');
    const [duration,setDuration] = useState('');


    const leave = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('reason', reason);
        data.append('leave_start_date', leave_start_date);
        data.append('duration', duration);
        
        ApiFunctions.addLeave(data,{
            headers:{
                'Authorization': token.token.token,
               }
        }).then(response => {
            history.push('/leaves');
    
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
                    Add Leave</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Add Leave</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">

                            <div class="input">
                                <label>Reason</label>
                                <input type="text" value={reason}  name="reason"   onChange={(e) => setReason(e.target.value)} placeholder="" required/>
                            </div>

                            <div class="input">
                                <label>Date</label>
                                <input type="date" value={leave_start_date}  name="leave_start_date"   onChange={(e) => setStartDate(e.target.value)} placeholder="" required/>
                            </div>


                            <div class="input">
                                <label>Duration</label>
                                <input type="text" value={duration}  name="duration"   onChange={(e) => setDuration(e.target.value)} placeholder="" required/>
                            </div>

                          
                            
                            <div class="form_btn">
                                <button type="submit" onClick={leave}>Add Leave</button>
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