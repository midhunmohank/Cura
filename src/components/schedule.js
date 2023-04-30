import { useEffect, useState } from "react";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";


const Schedule = () => {

    const history = useHistory();
    const token = useToken();


    if (!token.token) {
        history.push('/');
    }

    const [list, setList] = useState([]);
    useEffect(() => {
        ApiFunctions.getSchedule(null,{
               headers:{
                'Authorization': token.token.token,
               }
        }).then(res => {
            var data = res.data.data;
            setList(data)
        })
    }, []);
   
    return (
        <div className="">
            <Header />
            <Helmet>
				<link rel="stylesheet" href={require('../css/style.css').default} />
			</Helmet>


            <section class="home_1 ap_img1">
            <div class="container">
                <div class="heading">
                    <h1>My Schedule</h1>
                </div>
            </div>
        </section>
    <section class="patient_detail">
        <div class="container">
            <div>
                <a href="/#/add-schedule">Add Schedule</a>
            </div>
            <div class="heading">
                <h2>My Schedule</h2>
            </div>
            <div class="patient_table">
                <table>
                    <tbody>
                        <tr class="appointment_history">
                            <td class="productname_td">S.No.</td>
                            <td class="productsize_td">Day</td>
                            <td class="sellingprice_td">Timing</td>
                            <td class="subtotal_td">Action</td>
                        </tr>

                        {list.map((data,id) => {
                     return(

                        <tr class="appointment_history">
                            <td class="productname_td">{id+1}</td>
                            <td class="productsize_td">{data.day}</td>
                            <td class="productsize_td">{data.timing}</td>
                            <td class="subtotal_td">
                               <a href={"/#/edit-schedule/" + data._id}> Edit</a>
                               {/* <a href=""> Delete</a> */}
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

export default Schedule;