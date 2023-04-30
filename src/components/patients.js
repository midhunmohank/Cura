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
        ApiFunctions.getPatient(null,{
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
                    <h1>View Patients</h1>
                </div>
            </div>
        </section>
    <section class="patient_detail">
        <div class="container">
   
           
            <div class="heading">
          
               <div class="text">
               <h2>View Patients</h2>
               </div>
                
            </div>
            <div class="patient_table">
                <table>
                    <tbody>
                        <tr class="appointment_history">
                            <td class="productname_td">S.No.</td>
                            <td class="productsize_td">Name</td>
                            <td class="productsize_td">Email</td>
                            <td class="sellingprice_td">Contact</td>
                            <td class="sellingprice_td">Gender</td>
                            <td class="sellingprice_td">Age</td>
                            <td class="sellingprice_td">Address</td>
                        </tr>

                        {list.map((data,id) => {
                        return(
                       
                       <tr class="appointment_history">
                            <td class="productname_td">{id+1}</td>
                            <td class="productsize_td">{data.first_name} {data.last_name}</td>
                            <td class="productsize_td">{data.email} </td>
                            <td class="productsize_td">{data.contact_number}</td>
                            <td class="sellingprice_td">{data.gender}</td>
                            <td class="sellingprice_td">{data.age}</td>
                            <td class="sellingprice_td">{data.address}</td>
                           
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