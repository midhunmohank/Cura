
import './App.css';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
  // useRouteMatch,
  // useParams
} from "react-router-dom";

import Home from './components/home';
import Login from './components/admin/login';
import FrontendLogin from './components/login';
import Register from './components/register-patient';
import useToken from './components/admin/useToken';
import DoctorList from './components/doctors';
import DoctorDetail from './components/doctor-detail';
import PatientDetail from './components/patient-detail';
import MyAppointments from './components/my-appointments';
import BookAppointment from './components/book-appointment';
import MyPrescription from './components/prescriptions';
import Appointment from './components/appointments';
import Schedule from './components/schedule';
import EditSchedule from './components/edit-schedule';
import AddSchedule from './components/add-schedule';
import WrittenPrescription from './components/wriiten-prescriptions';
import WritePrescription from './components/write-prescription';
import EditAppointment from './components/edit-appointment';
import UpdateAppointmentStatus from './components/update-appointment-status';
import AddPreviousPrescription from './components/add-previous-prescription';
import PreviousPrescription from './components/previous-prescriptions';
import AddLeave from './components/add-leave';
import Leave from './components/leaves';
import ViewPrescriptions from './components/view-prescriptions';
import EditPrescriptions from './components/edit-prescription';
import ViewHospital from './components/view-hospitals';
import AddHospital from './components/add-hospital';
import AddDoctor from './components/add-doctor';
import ViewStaff from './components/view-staff';
import AddStaff from './components/add-staff';
import Patients from './components/patients';
import GiveRating from './components/give-rating';
import Test from './components/tests';
import AddTest from './components/add-test';
import PayAmount from './components/pay-amount';
import UpdateReportResult from './components/update-report-result';
import GetHospital from './components/get-hospitals';
import HospitalDoctor from './components/hospital-doctors';
import AddMedicine from './components/add-medicine';
import ViewMedicine from './components/view-medicine';
import EditMedicine from './components/edit-medicine';



function App() {

  const { token, setToken } = useToken();

  return (
    <div className="App">

      <Switch>
      <Route path="/" exact>
          <Home />
        </Route>

        
        <Route path="/register-patient" exact>
          <Register/>
        </Route>


        <Route path="/login" exact>
          <FrontendLogin setToken={setToken} />
        </Route>


        <Route path="/doctors" exact>
          <DoctorList/>
        </Route>
        
        <Route path="/test-reports" exact>
          <Test/>
        </Route>
         <Route path="/patients" exact>
          <Patients/>
        </Route> 
        
        <Route path="/view-all-hospitals" exact>
          <GetHospital/>
        </Route>
        
        <Route path="/add-doctor" exact>
          <AddDoctor/>
        </Route>
         <Route path="/add-test" exact>
          <AddTest/>
        </Route>
        
         <Route path="/staffs" exact>
          <ViewStaff/>
        </Route>
        <Route path="/add-staff" exact>
          <AddStaff/>
        </Route>

        <Route path="/doctor-detail/:id" exact>
          <DoctorDetail/>
        </Route>
        
        <Route path="/edit-medicine/:id" exact>
          <EditMedicine/>
        </Route>
          <Route path="/hospital-doctor/:id" exact>
          <HospitalDoctor/>
        </Route>
         
          <Route path="/pay-amount/:id/:amount" exact>
          <PayAmount/>
        </Route>
        
        
         <Route path="/update-report-result/:id" exact>
          <UpdateReportResult/>
        </Route>
         <Route path="/give-rating/:id" exact>
          <GiveRating/>
        </Route>
        
        <Route path="/patient-detail/:id" exact>
          <PatientDetail/>
        </Route>

        <Route path="/my-appointments" exact>
          <MyAppointments/>
        </Route> 
        
        <Route path="/view-hospitals" exact>
          <ViewHospital/>
        </Route> 
        
        <Route path="/view-medicines" exact>
          <ViewMedicine/>
        </Route>
        <Route path="/add-hospital" exact>
            <AddHospital/>
          </Route>
        <Route path="/add-medicine" exact>
            <AddMedicine/>
          </Route>

        <Route path="/book-appointment/:id" exact>
          <BookAppointment/>
        </Route> 
        
        <Route path="/edit-appointment/:id" exact>
          <EditAppointment/>
        </Route>
        
        <Route path="/edit-prescription/:id" exact>
          <EditPrescriptions/>
        </Route>
        
        <Route path="/update-appointment-status/:id" exact>
          <UpdateAppointmentStatus/>
        </Route>
        
        <Route path="/my-prescriptions" exact>
          <MyPrescription/>
        </Route> 
         <Route path="/view-prescriptions" exact>
          <ViewPrescriptions/>
        </Route> 
        
        <Route path="/add-previous-prescription" exact>
          <AddPreviousPrescription/>
        </Route>
        <Route path="/view-previous-prescription" exact>
          <PreviousPrescription/>
        </Route>

        <Route path="/appointments" exact>
          <Appointment/>
        </Route> 
        
        <Route path="/add-leave" exact>
          <AddLeave/>
        </Route> 
        
        
         <Route path="/leaves" exact>
          <Leave/>
        </Route> 
        
        <Route path="/written-prescriptions" exact>
          <WrittenPrescription/>
        </Route>

        <Route path="/write-prescription" exact>
          <WritePrescription/>
        </Route>

        <Route path="/schedule" exact>
          <Schedule/>
        </Route>

        <Route path="/add-schedule" exact>
          <AddSchedule/>
        </Route>


        <Route path="/edit-schedule/:id" exact>
          <EditSchedule/>
        </Route>


      </Switch>

    </div>
  );
}

export default App;
