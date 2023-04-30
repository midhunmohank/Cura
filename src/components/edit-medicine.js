import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import { Helmet } from "react-helmet";
import useToken from "./admin/useToken";
import { useParams } from "react-router-dom";



const Register =() =>{

    const history = useHistory();
    const token = useToken();


    if (!token.token) {
        history.push('/');
    }


    const { id } = useParams();


    const [name,setMedName] = useState('');
    const [medicine_type,setMedType] = useState('');
    const [company_name,setCompany] = useState('');
    const [description,setDesc] = useState('');
    const [price,setPrice] = useState('');
    const [quantity,setQuantity] = useState('');


    const [re_stock_level,setReStock] = useState('');
    const [is_available,setAvailable] = useState('');

    const [medicine_id] = useState(id);
    const [details,setDetails] = useState([]);

    useEffect(() => {
        var data = new FormData();
        data.append('medicine_id', medicine_id);
     
        ApiFunctions.getSingleMedicine(data,{
            headers:{
                'Authorization': token.token.token,
               }
        }).then(response => {
            setDetails(response.data.data[0])
            setMedName(response.data.data[0].name)
            setMedType(response.data.data[0].type)
            setCompany(response.data.data[0].company_name)
            setDesc(response.data.data[0].description)
            setPrice(response.data.data[0].price)
            setQuantity(response.data.data[0].quantity)
            setReStock(response.data.data[0].re_stock_level)
            setAvailable(response.data.data[0].is_available)


        }).catch(e => {
        })
    }, [medicine_id]);




    const edit_medicine = async (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('name', name);
        data.append('type', medicine_type);
        data.append('company_name', company_name);
        data.append('description', description);
        data.append('price', price);
        data.append('quantity', quantity);
        data.append('re_stock_level', re_stock_level);
        data.append('is_available', is_available);
        data.append('medicine_id', medicine_id);


        ApiFunctions.editMedicine(data,{
            headers:{
                'Authorization': token.token.token,
            }
        }).then(response => {
            history.push('/view-medicines');
       
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
                    <h1> Edit Medicine
                    </h1>
                </div>
            </div>
        </section>
        
        <section class="login_wrapper">
            <div class="container">
                <div class="form_wrap">
                    <h3>Edit Medicine</h3>
                    <form  action="" method="post">
                     
                        <div class="input">
                            <label>Medicine Name</label>
                            <input type="text" name="name" defaultValue={details.name} onChange={(e) => setMedName(e.target.value)} placeholder="" required/> 
                        </div>

                        <div class="input">
                            <label>Select Medicine Type</label>
                            <select name="medicine_type" defaultValue={details.type} onChange={(e) => setMedType(e.target.value)}>
                                <option value="">Select Medicine Type</option>
                                <option value="Tablet" selected>Tablet</option>
                                <option value="Syrup" selected>Syrup</option>
                            </select>
                        </div>

                       
                        <div class="input">
                            <label>Company Name</label>
                            <input type="text" name="company_name" defaultValue={details.company_name} onChange={(e) => setCompany(e.target.value)} placeholder=""  required/>
                        </div>

                       

                        <div class="input">
                            <label>Description</label>
                            <textarea  name="description" defaultValue={details.description}  onChange={(e) => setDesc(e.target.value)} placeholder=""  required ></textarea>
                        </div>


                        <div class="input">
                            <label>Price</label>
                            <input type="text" name="price" defaultValue={details.price} onChange={(e) => setPrice(e.target.value)} placeholder="" required/>
                        </div>

                        <div class="input">
                            <label>Quantity</label>
                            <input type="text" name="quantity" defaultValue={details.quantity}  onChange={(e) => setQuantity(e.target.value)} placeholder="" required/>
                        </div>

                        <div class="input">
                            <label>Re-Stock Level</label>
                            <input type="text" name="re_stock_level" defaultValue={details.re_stock_level}  onChange={(e) => setReStock(e.target.value)} placeholder="" required/>
                        </div>


                        <div class="input">
                            <label>Select Availability</label>
                            <select name="is_available" defaultValue={details.is_available} className="form-control" onChange={(e) => setAvailable(e.target.value)} required>
                                <option value="">Select Availability</option>
                                <option value="Available" selected>Available</option>
                                <option value="Not Available" selected >Not Available</option>
                            </select>
                        </div>

                       
        
                        <div class="form_btn">
                            <button type="submit" onClick={edit_medicine} >Edit Medicine</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>

        </div>
    );
}

export default Register;