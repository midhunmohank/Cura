import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import moment from "moment";

import { Helmet } from "react-helmet";


import emergency from '../images/emergency.png';
import healthcare from '../images/healthcare.png';
import doctor from '../images/doctor.png';
import services from '../images/services.png';


import doctor1 from '../images/doctor1.jpg';
import doctor2 from '../images/doctor2.jpg';
import doctor3 from '../images/doctor3.jpg';
import doctor4 from '../images/doctor4.jpg';




const WrittenPrescription = () => {

    // const [jobList,setJobList] = useState([]);
    // // const [orgList,setOrgList] = useState([]);
    // moment.locale('en');
    // // let date = "";
    // useEffect(() => {
	// 	// ApiFunctions.getAllOrg().then(res => {
    //     //   var data = res.data.data

    //     //   setOrgList( data)
    //     // })


    //     ApiFunctions.getAllJobs().then(res => {
    //         var data = res.data.data;

             
    //           const list = data.map((d,i)=>{
    //           var date = d.createdDate;
    //           data[i].date = moment(date).startOf('seconds').fromNow()
    //           return  data[i];
    //           });

    //         setJobList(list)
    //       })

	// }, []);
   
    return (
        <div className="">
            <Header />
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>


            <section class="home_1 ap_img1">
            <div class="container">
                <div class="heading">
                    <h1>Written Prescriptions</h1>
                </div>
            </div>
        </section>
    <section class="patient_detail">
        <div class="container">
            <div>
                <a href="/#/write-prescription">Write Prescription</a>
            </div>
            <div class="heading">
                <h2>Prescriptions</h2>
            </div>
            <div class="patient_table">
                <table>
                    <tbody>
                        <tr class="appointment_history">
                            <td class="productname_td">S.No.</td>
                            <td class="productsize_td">Doctor</td>
                            <td class="sellingprice_td">Prescriptions</td>
                            <td class="quantity_td">Written On</td>
                            <td class="quantity_td">Action</td>
                        </tr>

                        <tr class="appointment_history">
                            <td class="productname_td">1</td>
                            <td class="productsize_td">John Thomas</td>
                            <td class="sellingprice_td">Ciplabid</td>
                            <td class="subtotal_td">20 Nov,2022</td>
                            <td class="subtotal_td">
                                <a href="">Edit</a>
                            </td>
                        </tr>

                        <tr class="appointment_history">
                            <td class="productname_td">2</td>
                            <td class="productsize_td">Jackson</td>
                            <td class="sellingprice_td">Derocc</td>
                            <td class="subtotal_td">14 Nov,2022</td>
                            <td class="subtotal_td">
                                <a href="">Edit</a>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <Footer />
               
        </div>
    );
}

export default WrittenPrescription;