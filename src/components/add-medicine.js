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

    const [name,setMedName] = useState('');
    const [medicine_type,setMedType] = useState('');
    const [company_name,setCompany] = useState('');
    const [description,setDesc] = useState('');
    const [price,setPrice] = useState('');
    const [quantity,setQuantity] = useState('');


    const [re_stock_level,setReStock] = useState('');
    const [is_available,setAvailable] = useState('');



    const add_medicine = async (e) => {
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


        ApiFunctions.addMedicine(data,{
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
                    <h1> Add Medicine
                    </h1>
                </div>
            </div>
        </section>
        
        <section class="login_wrapper">
            <div class="container">
                <div class="form_wrap">
                    <h3>Add Medicine</h3>
                    <form  action="" method="post">
                     
                        <div class="input">
                            <label>Medicine Name</label>
                            <input type="text" name="name" value={name} onChange={(e) => setMedName(e.target.value)} placeholder="" required/> 
                        </div>

                        <div class="input">
                            <label>Select Medicine Type</label>
                            <select name="medicine_type" onChange={(e) => setMedType(e.target.value)}>
                                <option value="">Select Medicine Type</option>
                                <option value="tablet">Tablet</option>
                                <option value="syrup">Syrup</option>
                            </select>
                        </div>

                       
                        <div class="input">
                            <label>Company Name</label>
                            <input type="text" name="company_name" value={company_name} onChange={(e) => setCompany(e.target.value)} placeholder=""  required/>
                        </div>

                       

                        <div class="input">
                            <label>Description</label>
                            <textarea  name="description" value={description} onChange={(e) => setDesc(e.target.value)} placeholder=""  required ></textarea>
                        </div>


                        <div class="input">
                            <label>Price</label>
                            <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="" required/>
                        </div>

                        <div class="input">
                            <label>Quantity</label>
                            <input type="text" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="" required/>
                        </div>

                        <div class="input">
                            <label>Re-Stock Level</label>
                            <input type="text" name="re_stock_level" value={re_stock_level} onChange={(e) => setReStock(e.target.value)} placeholder="" required/>
                        </div>


                        <div class="input">
                            <label>Select Availability</label>
                            <select name="is_available" value={is_available} className="form-control" onChange={(e) => setAvailable(e.target.value)} required>
                                <option value="">Select Availability</option>
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option>
                            </select>
                        </div>

                       
        
                        <div class="form_btn">
                            <button type="submit" onClick={add_medicine} >Add Medicine</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>

        </div>
    );
}

export default Register;