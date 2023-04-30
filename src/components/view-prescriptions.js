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


    var user_role = "";
    var role = "";
    user_role = token.token.data.user_role;

    if(user_role == 'staff'){
        role = token.token.staff.role;
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
                    <h1>View Prescriptions</h1>
                </div>
            </div>
        </section>
    <section class="patient_detail">
        <div class="container">
           
            <div>

                {(role === 'nurse') ? 
                    <a href="/#/write-prescription">Write Prescription</a>
                    : 
                    ""
                }

            </div>
            <div class="heading">
          
               <div class="text">
               <h2>View Prescriptions</h2>
               </div>
                
            </div>
            <div class="patient_table">
                <table>
                    <tbody>
                        <tr class="appointment_history">
                            <td class="productname_td">S.No.</td>
                            <td class="productsize_td">Doctor</td>
                            <td class="productsize_td">Patient</td>
                            <td class="sellingprice_td">Written By</td>
                            <td class="sellingprice_td">Prescriptions</td>
                            <td class="quantity_td">Written On</td>
                            <td class="quantity_td">Action</td>
                        </tr>

                        {list.map((data,id) => {
                        return(
                       
                       <tr class="appointment_history">
                            <td class="productname_td">{id+1}</td>
                            <td class="productsize_td">{data._doctor_id.full_name}</td>
                            <td class="productsize_td">{data._patient_id.first_name} {data._patient_id.last_name}</td>
                            <td class="productsize_td">{data._written_by.name}</td>
                            <td class="sellingprice_td">{data.prescription}</td>
                            <td class="subtotal_td">{moment(data.written_on).format("DD-MM-YYYY")}</td>
                            <td class="subtotal_td">
                                <a href={"/#/edit-prescription/" + data._id}>Edit</a>
                            </td>
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