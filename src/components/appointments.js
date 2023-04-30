import { useEffect, useState } from "react";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";



const Appointments = () => {

    const history = useHistory();
    const token = useToken();


    if (!token.token) {
        history.push('/');
    }

    const [list, setList] = useState([]);
    useEffect(() => {
        ApiFunctions.myAppointment(null,{
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
                    <h1>Appointments</h1>
                </div>
            </div>
        </section>
    <section class="patient_detail">
        <div class="container">
            
            <div class="heading">
                <h2>Appointments</h2>
            </div>
            <div class="patient_table">
                <table>
                    <tbody>
                        <tr class="appointment_history">
                            <td class="productname_td">S.No.</td>
                            <td class="productsize_td">Doctor</td>
                            <td class="productsize_td">Patient Name</td>
                            <td class="sellingprice_td">Email</td>
                            <td class="sellingprice_td">Contact</td>
                            <td class="quantity_td">Status</td>
                            <td class="subtotal_td">Appointment DateTime </td>
                            <td class="subtotal_td">Action</td>
                        </tr>

                        {list.map((data,id) => {
                     return(

                        <tr class="appointment_history">
                            <td class="productname_td">{id+1}</td>
                            <td class="productsize_td">{data._doctor_id.full_name}</td>
                            <td class="productsize_td">{data._patient_id.first_name} {data._patient_id.last_name}</td>
                            <td class="productsize_td">{data._patient_id.email}</td>
                            <td class="productsize_td">{data._patient_id.contact_number}</td>
                            <td class="productsize_td">{data.status}</td>
                            <td class="productsize_td">{data.appointment_date} at {data.appointment_time}</td>
                        

                            {(data.status  === 'pending' || data.status  === 'rescheduled') ? 
                                <td class="subtotal_td">
                                    <a href={"/#/update-appointment-status/" + data._id}> Update Status</a>
                                    <a href={"/#/edit-appointment/" + data._id}> Reschedule</a>
                                     <a href={"/#/patient-detail/" + data._patient_id._id}> View Patient Detail</a>
                                </td>
                                : 
                                <td class="subtotal_td">
                                 <a href={"/#/patient-detail/" + data._patient_id._id}> View Patient Detail</a>
                                </td>
                            }
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

export default Appointments;