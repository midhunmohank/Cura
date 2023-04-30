import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";




import dr2 from '../images/home2.jpg';




const WritePrescription = () => {

    const history = useHistory();

    const token = useToken();
    
    if(!token.token){
        history.push('/');
    }

    const [patient_id,setPatient] = useState('');
    const [doctor_id,setDoctor] = useState('');
    const [prescription,setPrescription] = useState('');
    const [document,setDocument] = useState('');

    const [list, setList] = useState([]);

    useEffect(() => {
        ApiFunctions.getDoctors(null,{
               headers:{
                'Authorization': token.token.token,
               }
        }).then(res => {
            var data = res.data.data;
            setList(data)
        })
    }, []);


    const [plist, setPList] = useState([]);

    useEffect(() => {
        ApiFunctions.getPatient(null,{
               headers:{
                'Authorization': token.token.token,
               }
        }).then(res => {
            var data = res.data.data;
            setPList(data)
        })
    }, []);



    const write = async (e) => {

        e.preventDefault();
        var data = new FormData();  
        data.append('patient_id', patient_id);
        data.append('doctor_id', doctor_id);
        data.append('prescription', prescription);
        data.append('document', document);
        
        ApiFunctions.writePresc(data,{
            headers:{
                'Authorization': token.token.token,
                'content-type':'multipart/form-data',
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
                Write Prescription</h1>
            </div>
        </div>
    </section>
    <section class="appointment">
        <div class="container">
            <div class="form_wrap">
                <h3>Write Prescription</h3>
                <div class="row">
                    <div class="col6">
                            <form  action="" method="post">
                            <div class="input">
                                <label>Select Patient</label>
                                <select name="patient_id" value={patient_id} className="form-control" onChange={(e) => setPatient(e.target.value)} required>
                                    <option value="">Select Patient</option>

                                    {plist.map((data) => {
                                    return(
                                        <option value={data._id}>{data.first_name} {data.last_name}</option>
                                    )})} 
                                </select>
                            </div>

                            <div class="input">
                                <label>Select Doctor</label>
                                <select name="doctor_id" value={doctor_id} className="form-control" onChange={(e) => setDoctor(e.target.value)} required>
                                    <option value="">Select Doctor</option>
                                    {list.map((data) => {
                                    return(
                                        <option value={data._id}>{data.full_name}</option>
                                    )})} 
                                </select>
                            </div>


                            <div class="input">
                                <label>Prescription</label>
                                <input type="text" value={prescription}  name="prescription"   onChange={(e) => setPrescription(e.target.value)} placeholder="" required/>
                            </div>



                            <div class="input">
                                <label>Upload Document</label>
                                <input type="file" name="document" onChange={(e) => setDocument(e.target.value)} placeholder="" />
                            </div>

                         
                            <div class="form_btn">
                                <button type="submit" onClick={write}>Write Prescription</button>
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

export default WritePrescription;