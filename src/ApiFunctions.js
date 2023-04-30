import Api from "./Api";

class ApiFunctions {
  
  register(data,headers) {
    return Api.post("/register/patient",data,headers);
  }
  
  login(data,headers) {
    return Api.post("/login", data,headers);
  }

  getHospitals(data,headers){
    return Api.post('/get/hospitals',data,headers);
  }

  getDoctors(data,headers){
    return Api.post('/get/doctors',data,headers);
  }    
  
  addRating(data,headers){
    return Api.post('/add/rating',data,headers);
  }    
  
  testReport(data,headers){
    return Api.post('/get/tests',data,headers);
  }   
  
  addTest(data,headers){
    return Api.post('/add/test',data,headers);
  }    
  
  
  updateTestReport(data,headers){
    return Api.post('/update/test/result',data,headers);
  }    
  
  payAmount(data,headers){
    return Api.post('/pay/test/amount',data,headers);
  }  
  
  viewStaff(data,headers){
    return Api.post('/get/staffs',data,headers);
  }  
  addStaff(data,headers){
    return Api.post('/register/staff',data,headers);
  }  
  
  viewHospital(data,headers){
    return Api.post('/get/hospitals',data,headers);
  }    
  
  getHospitalDoctors(data,headers){
    return Api.post('/get/hospital/doctor',data,headers);
  }   
  addMedicine(data,headers){
    return Api.post('/add/medicine',data,headers);
  }  
  viewMedicine(data,headers){
    return Api.post('/get/medicines',data,headers);
  }   
  getSingleMedicine(data,headers){
    return Api.post('/get/single/medicine',data,headers);
  }   
  editMedicine(data,headers){
    return Api.post('/edit/medicine',data,headers);
  }   
  
  add_doctor(data,headers){
    return Api.post('/register/doctor',data,headers);
  }  
  
  addHospital(data,headers){
    return Api.post('/add/hospital',data,headers);
  }
  
  getPatient(data,headers){
    return Api.post('/get/patients',data,headers);
  }
  
  getSingleDoctor(data,headers){
    return Api.post('/get/single/doctors',data,headers);
  }

  getDoctorSpecialization(data,headers){
    return Api.post('/get/doctor/specialization',data,headers);
  }

  getDoctorSchedule(data,headers){
    return Api.post('/get/doctor/schedule',data,headers);
  }

  bookAppointment(data,headers) {
    return Api.post("/book/appointment",data,headers);
  }

  myAppointment(data,headers) {
    return Api.post("/view/appointments",data,headers);
  }

  editAppointment(data,headers) {
    return Api.post("/reschedule/appointment",data,headers);
  }

  updateAppointment(data,headers) {
    return Api.post("/update/appointment/status",data,headers);
  }
  

  viewPrescriptions(data,headers) {
    return Api.post("/view/prescriptions",data,headers);
  }
  addPreviousPrescriptions(data,headers) {
    return Api.post("/add/previous/prescriptions",data,headers);
  }

  viewPreviousPrescriptions(data,headers) {
    return Api.post("/view/previous/prescriptions",data,headers);
  }

  getSinglePatient(data,headers){
    return Api.post('/get/single/patient',data,headers);
  }

  getPreviousPresc(data,headers){
    return Api.post('/view/previous/prescriptions',data,headers);
  } 
  
  updatePrescription(data,headers){
    return Api.post('/edit/prescriptions',data,headers);
  }


  getHealthHistory(data,headers){
    return Api.post('/view/patient/health/history',data,headers);
  }

  getSchedule(data,headers){
    return Api.post('/get/schedule',data,headers);
  }

  addSchedule(data,headers){
    return Api.post('/add/schedule',data,headers);
  } 

  writePresc(data,headers){
    return Api.post('/add/prescriptions',data,headers);
  } 
  
  updateSchedule(data,headers){
    return Api.post('/update/schedule',data,headers);
  }
  
  addLeave(data,headers){
    return Api.post('/add/leave',data,headers);
  }
  
  getLeave(data,headers){
    return Api.post('/get/leave',data,headers);
  }
}

export default new ApiFunctions();