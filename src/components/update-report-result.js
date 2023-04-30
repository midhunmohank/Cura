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

    const [test_result,setResult] = useState('');

    const [test_id] = useState(id);


    const schedule = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('test_result', test_result);
        data.append('test_id', test_id);
        
        ApiFunctions.updateTestReport(data,{
            headers:{
                'Authorization': token.token.token,
               }
        }).then(response => {
            history.push('/test-reports');
    
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
                    Update Report Result</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Update Report Result</h3>
                <div class="row">
                    <div class="col6">
                        <form  action="" method="post">
                          
                            <div class="input">
                                <label>Test Result</label>
                                <textarea value={test_result}  name="test_result"   onChange={(e) => setResult(e.target.value)} placeholder="" required></textarea>
                            </div>

                            <div class="input">
                            </div>
                            
                            <div class="form_btn">
                                <button type="submit" onClick={schedule}>Update Result</button>
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