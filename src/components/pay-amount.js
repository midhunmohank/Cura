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
    const { id } = useParams();
    const { amt } = useParams();

    if (!token.token) {
        history.push('/');
    }


    const [test_id] = useState(id);
    const [amount] = useState(amt);



    const [name_on_card,setName] = useState('');
    const [card_type,setCardType] = useState('');
    const [card_number,setCardNum] = useState('');
    const [cvv,setCvv] = useState('');
    const [expiry_date,setExpiry] = useState('');

    const add_test = async (e) => {
        e.preventDefault();
        var data = new FormData();
        data.append('name_on_card', name_on_card);
        data.append('card_type', card_type);
        data.append('card_number', card_number);
        data.append('cvv', cvv);
        data.append('expiry_date', expiry_date);
        data.append('test_id', test_id);
        data.append('amount', amount);

        ApiFunctions.payAmount(data,{
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
                    <h1> Pay Amount 
                    </h1>
                </div>
            </div>
        </section>
        
        <section class="login_wrapper">
            <div class="container">
                <div class="form_wrap">
                    <h3>Pay Amount</h3>
                    <form  action="" method="post">
                     

                        <div class="input">
                            <label>Name On Card</label>
                            <input type="text" name="name_on_card" value={name_on_card} onChange={(e) => setName(e.target.value)} placeholder="" required/> 
                        </div>

                        <div class="input">
                            <label>Select Card Type</label>
                            <select name="card_type" value={card_type} onChange={(e) => setCardType(e.target.value)}>
                                <option value="">Select Card Type</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Credit Card">Credit Card</option>
                            </select>
                        </div>

                       
                        <div class="input">
                            <label>Card Number</label>
                            <input type="text" name="card_number" value={card_number} onChange={(e) => setCardNum(e.target.value)} placeholder=""  required/>
                        </div>

                        <div class="input">
                            <label>CVV</label>
                            <input type="password" name="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder=""  required/>
                        </div>
                      
                        <div class="input">
                            <label>Expiry Date</label>
                            <input type="date" name="expiry_date" value={expiry_date} onChange={(e) => setExpiry(e.target.value)} placeholder=""  required/>
                        </div>
                    

                        <div class="input">
                        </div>
        
                        <div class="form_btn">
                            <button type="submit" onClick={add_test} >Make Payment</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>

        </div>
    );
}

export default Register;