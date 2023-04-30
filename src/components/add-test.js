import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import { Helmet } from "react-helmet";
import useToken from "./admin/useToken";



const Register =() =>{

    const history = useHistory();
    const token = useToken();


    if (!token.token) {
        history.push('/');
    }


    
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





    const [patient_id,setPatient] = useState('');
    const [sample,setSample] = useState('');
    const [amount,setAmount] = useState('');
    const [test_description,setDesc] = useState('');




    const add_test = async (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('patient_id', patient_id);
        data.append('sample', sample);
        data.append('amount', amount);
        data.append('test_description', test_description);

        ApiFunctions.addTest(data,{
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
        <div className="App">
            <Header />
        
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>

        <section class="home_1" class="b_img4">
            <div class="container">
                <div class="heading">
                    <h1> Add Test
                    </h1>
                </div>
            </div>
        </section>
        
        <section class="login_wrapper">
            <div class="container">
                <div class="form_wrap">
                    <h3>Add Test</h3>
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
                            <label>Sample</label>
                            <input type="text" name="sample" value={sample} onChange={(e) => setSample(e.target.value)} placeholder="" required/> 
                        </div>

                       
                        <div class="input">
                            <label>Amount</label>
                            <input type="text" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder=""  required/>
                        </div>


                        <div class="input">
                            <label>Test Description</label>
                            <textarea  name="test_description" value={test_description} onChange={(e) => setDesc(e.target.value)} placeholder=""  required ></textarea>
                        </div>


                      
                    
        
                        <div class="form_btn">
                            <button type="submit" onClick={add_test} >Add Test Report</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>

        </div>
    );
}

export default Register;