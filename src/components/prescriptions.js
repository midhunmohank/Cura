import { useEffect, useState } from "react";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import moment from "moment";




const Prescription = () => {

    const history = useHistory();
    const token = useToken();


    if (!token.token) {
        history.push('/');
    }

    const [list, setList] = useState([]);
    useEffect(() => {
        ApiFunctions.viewPrescriptions(null,{
               headers:{
                'Authorization': token.token.token,
               }
        }).then(res => {
            var data = res.data.data;
            setList(data)
        })
    }, []);

    console.log(list);


    return (
        <div className="">
            <Header />
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>


            <section class="home_1 ap_img1">
            <div class="container">
                <div class="heading">
                    <h1>My Prescriptions</h1>
                </div>
            </div>
        </section>
    <section class="patient_detail">
        <div class="container">
         

           
            <div class="heading">
        
                <div class="text">
                    <h2>My Prescriptions</h2>
                </div>
                <div class="heading-button">
                    <a href="/#/add-previous-prescription">Add Previous Prescription</a>
                    <a href="/#/view-previous-prescription">View Previous Prescription</a>
                </div>
            </div>
            <div class="patient_table">
                <table>
                    <tbody>
                        <tr class="appointment_history">
                            <td class="productname_td">S.No.</td>
                            <td class="productsize_td">Doctor</td>
                            <td class="sellingprice_td">Written By</td>
                            <td class="sellingprice_td">Prescriptions</td>
                            <td class="quantity_td">Written On</td>
                        </tr>

                        {list.map((data,id) => {
                        return(
                       
                            <tr class="appointment_history">
                                <td class="productname_td">{id+1}</td>
                                <td class="productsize_td">{data._doctor_id.full_name}</td>
                                <td class="productsize_td">{data._written_by.name}</td>
                                <td class="sellingprice_td">{data.prescription}</td>
                                <td class="subtotal_td">{moment(data.written_on).format("DD-MM-YYYY")}</td>
                            </tr>

                        )})} 

                      

                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <Footer />
               
        </div>
    );
}

export default Prescription;