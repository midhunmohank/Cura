import { useEffect, useState } from "react";
import ApiFunctions from "../ApiFunctions";
import Header from "./Header";
import Footer from "./Footer";
import useToken from "./admin/useToken";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import moment from "moment";


const Schedule = () => {

    const history = useHistory();
    const token = useToken();


    if (!token.token) {
        history.push('/');
    }


    var user_role = "";
    user_role = token.token.data.user_role;


    const [list, setList] = useState([]);
    useEffect(() => {
        ApiFunctions.getLeave(null,{
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
                    <h1>Leaves</h1>
                </div>
            </div>
        </section>
    <section class="patient_detail">
        <div class="container">
            <div>

                {user_role !== 'admin' ? 
                    <a href="/#/add-leave">Add Leave</a>
                    : 
                    ""
                }
            </div>
            <div class="heading">
                <h2>Leaves</h2>
            </div>
            <div class="patient_table">
                <table>
                    <tbody>
                        <tr class="appointment_history">
                            <td class="productname_td">S.No.</td>


                            {/* {user_role === 'admin' ?  */}
                               <td class="productsize_td">Patient</td>
                                {/* : 
                                ""
                            } */}

                            {/* {user_role === 'admin' ?  */}
                               <td class="productsize_td">Doctor</td>
                                {/* : 
                                ""
                            } */}


                            <td class="productsize_td">Reason</td>
                            <td class="sellingprice_td">Leave Start Date</td>
                            <td class="sellingprice_td">Duration</td>

                            {user_role === 'admin' ? 
                               <td class="productsize_td">Action</td>
                                : 
                                ""
                            }

                        </tr>

                        {list.map((data,id) => {
                        return(

                        <tr class="appointment_history">
                            <td class="productname_td">{id+1}</td>

                            {(user_role === 'admin' &&  data._patient_id)?
                               <td class="productsize_td">{data._patient_id.first_name} {data._patient_id.last_name}</td>
                                : 
                                <td>---</td>
                            }

                          
                            {(user_role === 'admin' &&  data._doctor_id) ? 
                               <td class="productsize_td">{data._doctor_id.full_name}</td>
                                : 
                                <td>---</td>
                            }


                            <td class="productsize_td">{data.reason}</td>
                            <td class="productsize_td">{moment(data.leave_start_date).format("DD-MM-YYYY")}</td>
                            <td class="productsize_td">{data.duration} days</td>
                           
                            {(user_role === 'admin') ? 
                               <td class="productsize_td"><a href="">Edit</a></td>
                                : 
                                ""
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

export default Schedule;