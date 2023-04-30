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
        ApiFunctions.viewMedicine(null,{
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
                    <h1>View Medicines</h1>
                </div>
            </div>
        </section>
    <section class="patient_detail">
        <div class="container">
           
            <div>

            <a href="/#/add-medicine">Add Medicine</a>
               
            </div>
            <div class="heading">
          
               <div class="text">
               <h2>View Medicines</h2>
               </div>
                
            </div>
            <div class="patient_table">
                <table>
                    <tbody>
                        <tr class="appointment_history">
                            <td class="productname_td">S.No.</td>
                            <td class="productsize_td">Name</td>
                            <td class="productsize_td">Company Name</td>
                            <td class="sellingprice_td">Medicine Type</td>
                            <td class="sellingprice_td">Description</td>
                            <td class="sellingprice_td">Price</td>
                            <td class="sellingprice_td">Quantity</td>
                            <td class="sellingprice_td">Re-Stock Level</td>
                            <td class="sellingprice_td">Is Available</td>
                            <td class="sellingprice_td">Added By</td>
                            <td class="sellingprice_td">Added On</td>
                            <td class="sellingprice_td">Action</td>
                        </tr>

                        {list.map((data,id) => {
                        return(
                       
                       <tr class="appointment_history">
                            <td class="productname_td">{id+1}</td>
                            <td class="productsize_td">{data.name}</td>
                            <td class="productsize_td">{data.company_name} </td>
                            <td class="productsize_td">{data.type}</td>
                            <td class="sellingprice_td">{data.description}</td>
                            <td class="sellingprice_td">${data.price}</td>
                            <td class="sellingprice_td">{data.quantity}</td>
                            <td class="sellingprice_td">{data.re_stock_level}</td>
                            <td class="sellingprice_td">{data.is_available}</td>
                            <td class="sellingprice_td">{data._staff_id.name}</td>
                            <td class="sellingprice_td">{moment(data.added_on).format("DD-MM-YYYY")}</td>
                            <td class="sellingprice_td">
                                <a href={"/#/edit-medicine/" + data._id}>Edit</a>
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