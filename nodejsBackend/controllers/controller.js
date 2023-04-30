const UserCredential = require('../models/user_credentials.model');
const Doctor = require('../models/doctor.model');
const DoctorSpecialization = require('../models/doctor_specialization.model');
const DoctorSchedule = require('../models/doctor_schedules.model');
const Hospital = require('../models/hospitals.model');
const Patient = require('../models/patient.model');
const Staff = require('../models/staff.model');
const Appointment = require('../models/appointment.model');
const PatientHealthHistory = require('../models/patient_health_histories.model');
const Leave = require('../models/leaves.model');
const Prescription = require('../models/prescriptions.model');
const PreviousPatientPrescription = require('../models/previous_patient_prescriptions.model');
const Rating = require('../models/ratings.model');
const TestReport = require('../models/test_reports.model');
const TestPayment = require('../models/test_payments.model');
const Medicine = require('../models/medicines.model');
const PaymentCardDetail = require('../models/payment_card_details.model');



const __dir = "../public/assets/"
const mongoose = require('mongoose');
const utils = require('../middleware/utils');
const db = require('../middleware/db');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');




//Find user
const findUser = async (username) => {
  return new Promise((resolve, reject) => {

        //Find user with the provided username
        UserCredential.findOne({username:username}).exec().then(item => {
          var err = null;
          utils.itemNotFound(err, item, reject, 'No account registered with us.');
          resolve(item)
      }).catch(err => {
          var item = null;
          utils.itemNotFound(err, item, reject, 'ERROR')
          resolve(item)
      })
    })
}


//Find user
const findUserr = async (user_id) => {
  return new Promise((resolve, reject) => {

        //Find user with the provided username
        UserCredential.findOne({_id:user_id}).exec().then(item => {
          var err = null;
          utils.itemNotFound(err, item, reject, 'No account registered with us.')
          resolve(item)
      }).catch(err => {
          var item = null;
          utils.itemNotFound(err, item, reject, 'ERROR')
          resolve(item)
      })
    })
}




//Find patient
const findPatient = async (credential_id) => {
  return new Promise((resolve, reject) => {

        //Find user with the provided username
        Patient.findOne({_user_credential_id:credential_id}).exec().then(item => {
          var err = null;
          utils.itemNotFound(err, item, reject, 'No patient exists.')
          resolve(item)
      }).catch(err => {
          var item = null;
          utils.itemNotFound(err, item, reject, 'ERROR')
          resolve(item)
      })
    })
}



//Find doctor
const findDoctor = async (credential_id) => {
  return new Promise((resolve, reject) => {

        //Find user with the provided username
        Doctor.findOne({_user_credential_id:credential_id}).exec().then(item => {
          var err = null;
          utils.itemNotFound(err, item, reject, 'No doctor exists.')
          resolve(item)
      }).catch(err => {
          var item = null;
          utils.itemNotFound(err, item, reject, 'ERROR')
          resolve(item)
      })
    })
}



//Find Staff
const findStaff = async (credential_id) => {
  return new Promise((resolve, reject) => {

        //Find user with the provided username
        Staff.findOne({_user_credential_id:credential_id}).exec().then(item => {
          var err = null;
          utils.itemNotFound(err, item, reject, 'No staff exists.')
          resolve(item)
      }).catch(err => {
          var item = null;
          utils.itemNotFound(err, item, reject, 'ERROR')
          resolve(item)
      })
    })
}





  
  
//Check user Status
const statusNotMatch = async UserCredential => {

  return new Promise((resolve, reject) => {

    if (UserCredential.status != 'active') {
      resolve(utils.buildErrObject(409, 'Status is inactive'))

    } 
    reject(utils.buildErrObject(422, 'ERROR'))
  })
}




//Upload Image
  async function uploadImage(object) {

    return new Promise((resolve, reject) => { 

        var obj = object.image_data;

        var name = Date.now() + obj.name ;

        obj.mv(object.path+"/"+name, function(err){
            if (err){
                reject(utils.buildErrObject(422, err.message))
            }
            resolve(name)
        });
    })  
  }
  


//generate token
  const generateToken = UserCredential => {
      return(jwt.sign({UserCredential},process.env.JWT_SECRET))
  }
  
  
  
  //register patient
  exports.registerPatient = async (req,res) => {

    try {
      var tr = req.body;

      const user_data = await db.registerPatient(tr,UserCredential,Patient)

      res.status(200).json({
          code : 200,
          data : user_data
      });
      } catch (error) {
          console.log(error);
          utils.handleError(res, error)
      }
    }



  //register doctor
  exports.registerDoctor = async (req,res) => {

    try {
      var tr = req.body;

      
      if(req.files && req.files.image){

        var image1 = await uploadImage({

            image_data: req.files.image,

            path: __dir + "doctors/"

        })
        tr.image = image1
      }



      const user_data = await db.registeDoctor(tr,UserCredential,Doctor)

      res.status(200).json({
          code : 200,
          data : user_data
      });
      } catch (error) {
          console.log(error);
          utils.handleError(res, error)
      }
    }




  //register staff
  exports.registerStaff = async (req,res) => {

    try {
      var tr = req.body;

      const user_data = await db.registerStaff(tr,UserCredential,Staff)

      res.status(200).json({
          code : 200,
          data : user_data
      });
      } catch (error) {
          console.log(error);
          utils.handleError(res, error)
      }
    }



  //add hospitals
  exports.addHospital = async (req,res) => {

    try {
     
        var tr = req.body;

        if(req.files && req.files.image){

          var image1 = await uploadImage({

              image_data: req.files.image,

              path: __dir + "hospitals/"

          })
          tr.image = image1
        }

        const data = await db.addHospital(tr,Hospital)

        res.status(200).json({
            code : 200,
            data : data
        });
      } catch (error) {
          console.log(error);
          utils.handleError(res, error)
      }
    }



  //add Schedule
  exports.addSchedule = async (req,res) => {

    try {      
        var tr = req.body;

        const doctor = await findDoctor(req.user._id)

        tr.doctor_id = doctor._id;

        const data = await db.addSchedule(tr,DoctorSchedule)

        res.status(200).json({
            code : 200,
            data : data
        });
      } catch (error) {
          console.log(error);
          utils.handleError(res, error)
      }
    }




  //Login
  exports.login = async (req, res) => {
    try {

      const data = req.body;
      //Find User
      const user = await findUser(data.username)

      //Check Password
      const isPasswordMatch = await auth.checkPassword(data.password, user)
      //Check user Status
      const isStatusActive = await auth.checkStatus(user)

      if(!isStatusActive){
        utils.handleError(res, await statusNotMatch(user))
      }

      //Generate Token
      const token = await generateToken(user.id);

      //If Incorrect Password
      if (!isPasswordMatch) {

        res.status(409).json({
          code: 409,
          message: "Password is not correct"
        });
      }
      else {

        if(user.user_role == 'staff'){
          Staff.findOne({_user_credential_id:user._id}).exec().then(data => {
            res.status(200).json({
              code: 200,
              token: token,
              data: user,
              staff: data
            });
          }).catch(err => {
            console.log(error);
            utils.handleError(res, error)
          })
        }else{
            res.status(200).json({
            code: 200,
            token: token,
            data: user
          });
        }
      }
    } catch (error) {
      utils.handleError(res, error)
    }
  }



    //book appointment
    exports.bookAppointment = async (req,res) => {

      try {
       
          var tr = req.body;

          const patient = await findPatient(req.user._id)

          tr.patient_id = patient._id;

          const data = await db.bookAppointment(tr,Appointment)
  
          res.status(200).json({
              code : 200,
              data : data
          });
        } catch (error) {
            console.log(error);
            utils.handleError(res, error)
        }
      }




      //Approve Appointment
      exports.updateAppointmentStatus= async(req,res)=>{

        try{
            const data = req.body;
          
            var respon = await db.updateAppointmentStatus(data,Appointment)

            res.status(200).json(respon);       
        } catch (error) {
          
            utils.handleError(res, error)
        }
      }


    //upload health history
     exports.uploadHealthHistory = async (req,res) => {

      try {
       
          var tr = req.body;

          const patient = await findPatient(req.user._id)

          tr.patient_id = patient._id;

          if(req.files && req.files.document){

            var image1 = await uploadImage({
  
                image_data: req.files.document,
  
                path: __dir + "health_history/"
  
            })
            tr.document = image1
          }

          const data = await db.uploadHealthHistory(tr,PatientHealthHistory)
  
          res.status(200).json({
              code : 200,
              data : data
          });
        } catch (error) {
            console.log(error);
            utils.handleError(res, error)
        }
      }



      //Update Specialization
      exports.updateSpecialization= async(req,res)=>{

        try{
            const data = req.body;

            const doctor = await findDoctor(req.user._id)

            data.doctor_id = doctor._id;

          
            var respon = await db.updateSpecialization(data,DoctorSpecialization)

            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }




       //Update Schedule
       exports.updateSchedule= async(req,res)=>{

        try{
            const data = req.body;

            const doctor = await findDoctor(req.user._id)

            data.doctor_id = doctor._id;

            var respon = await db.updateSchedule(data,DoctorSchedule)

            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }





      //Add Leave
      exports.addLeave= async(req,res)=>{

        try{
            const data = req.body;

            const user_id = req.user._id;

            const user = await findUserr(user_id)

            data.user = user;

            if(user.user_role == "doctor"){
              const doctor = await findDoctor(req.user._id)
              data.doctor_id = doctor._id;
            }

            if(user.user_role == "patient"){
              const patient = await findPatient(req.user._id)
              data.patient_id = patient._id;
            }            

            var respon = await db.addLeave(data,Leave)

            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }




      //Add Medicines
      exports.addMedicine= async(req,res)=>{

        try{
            const data = req.body;

            const user_id = req.user._id;

            const user = await findUserr(user_id)

            data.user = user;

           
            if(user.user_role == "staff"){
              const staff = await findStaff(req.user._id)
              data.staff_id = staff._id;
            }            

            var respon = await db.addMedicine(data,Medicine)

            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }






      //Update Reaserach Work
      exports.updateResearchWork= async(req,res)=>{

        try{
            const data = req.body;

            const doctor = await findDoctor(req.user._id)

            data.doctor_id = doctor._id;

          
            var respon = await db.updateResearchWork(data,Doctor)

            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }





       //Reschedule Appointment
       exports.rescheduleAppointment= async(req,res)=>{

        try{
            const data = req.body;

            var respon = await db.rescheduleAppointment(data,Appointment)

            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }





      //View Appointments
      exports.viewAppointments= async(req,res)=>{

        try{
            const data = req.body;

            const user_id = req.user._id;

            const user = await findUserr(user_id)

            data.user = user;

            if(user.user_role == "doctor"){
              const doctor = await findDoctor(req.user._id)
  
              data.doctor_id = doctor._id;
            }

            if(user.user_role == "patient"){
              const patient = await findPatient(req.user._id)

              data.patient_id = patient._id;
            }

            var respon = await db.viewAppointments(data,Appointment)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }







      //View Patient Health History
      exports.viewPatientHealthHistory= async(req,res)=>{

        try{
            const data = req.body;
            const user_id = req.user._id;

            const user = await findUserr(user_id)

            data.user = user;

            if(user.user_role == "patient"){
              const patient = await findPatient(req.user._id)
              data.patient_id = patient._id;
            }

            var respon = await db.viewPatientHealthHistory(data,PatientHealthHistory)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }





    //Add Prescriptions
    exports.addPrescriptions= async(req,res)=>{

      try{
          const data = req.body;

          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;

          if(req.files && req.files.document){

            var image1 = await uploadImage({
  
                image_data: req.files.document,
  
                path: __dir + "prescriptions/"
  
            })
            data.image = image1
          }


          if(user.user_role == "staff"){
            const staff = await findStaff(req.user._id)

            data.staff_id = staff._id;
          }

          var respon = await db.addPrescriptions(data,Prescription)

          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }



    
      //Edit Prescriptions
      exports.editPrescriptions= async(req,res)=>{

        try{
            const data = req.body;
  
            const user_id = req.user._id;
  
            const user = await findUserr(user_id)
  
            data.user = user;
  
            if(user.user_role == "staff"){
              const staff = await findStaff(req.user._id)
  
              data.staff_id = staff._id;
            }

            if(user.user_role == "doctor"){
              const doctor = await findDoctor(req.user._id)
  
              data.doctor_id = doctor._id;
            }
  
            var respon = await db.editPrescriptions(data,Prescription)
  
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }





      // get Doctors
      exports.getDoctors= async(req,res)=>{

        try{

            var respon = await db.getDoctors(UserCredential,Doctor)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }

      // get getMedicines
      exports.getMedicines= async(req,res)=>{

        try{

          const data = req.body;

          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;


          if(user.user_role == "staff"){
            const staff = await findStaff(req.user._id)

            data.staff_id = staff._id;
          }



            var respon = await db.getMedicines(data,Medicine)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }

      // get getTests
      exports.getTests= async(req,res)=>{

        try{

          const data = req.body;

          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;

        
          if(user.user_role == "patient"){
            const patient = await findPatient(req.user._id)

            data.patient_id = patient._id;
          }

          if(user.user_role == "staff"){
            const staff = await findStaff(req.user._id)

            data.staff_id = staff._id;
          }

            var respon = await db.getTests(data,TestReport)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }

    // get getStaff
      exports.getStaff= async(req,res)=>{

        try{

            var respon = await db.getStaff(UserCredential,Staff)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }


      // get getSchedule
      exports.getSchedule= async(req,res)=>{

        try{
           const data = req.body;
           const user_id = req.user._id;

          const user = await findUserr(user_id)

            data.user = user;

            if(user.user_role == "doctor"){
              const doctor = await findDoctor(req.user._id)

              data.doctor_id = doctor._id;
            }

            var respon = await db.getSchedule(data,DoctorSchedule)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }


        // get getLeave
        exports.getLeave= async(req,res)=>{

          try{
             const data = req.body;
             const user_id = req.user._id;
  
            const user = await findUserr(user_id)
  
              data.user = user;
  
              if(user.user_role == "doctor"){
                const doctor = await findDoctor(req.user._id)
  
                data.doctor_id = doctor._id;
              }


              if(user.user_role == "patient"){
                const patient = await findPatient(req.user._id)
  
                data.patient_id = patient._id;
              }
  
              var respon = await db.getLeave(data,Leave)
            
              res.status(200).json(respon);       
          } catch (error) {
              utils.handleError(res, error)
          }
        }

        


      
      // get Single Doctors
      exports.getSingleDoctors= async(req,res)=>{

        try{
            const data = req.body;
            var respon = await db.getSingleDoctors(data,Doctor)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }
    // get Single medicine
      exports.getSingleMedicine= async(req,res)=>{

        try{
            const data = req.body;
            var respon = await db.getSingleMedicine(data,Medicine)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }


    // get Single Patient
        exports.getSinglePatient= async(req,res)=>{

          try{
              const data = req.body;
              var respon = await db.getSinglePatient(data,Patient)
            
              res.status(200).json(respon);       
          } catch (error) {
              utils.handleError(res, error)
          }
        }

       
      // get getDoctorSpecialization
      exports.getDoctorSpecialization= async(req,res)=>{

        try{
            const data = req.body;
            var respon = await db.getDoctorSpecialization(data,DoctorSpecialization)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }


       // get getDoctorSchedule
       exports.getDoctorSchedule= async(req,res)=>{

        try{
            const data = req.body;
            var respon = await db.getDoctorSchedule(data,DoctorSchedule)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }

      


       // get Hospitals
       exports.getHospitals= async(req,res)=>{

        try{

            var respon = await db.getHospitals(Hospital)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }






       // get Patients
       exports.getPatients= async(req,res)=>{

        try{

            var respon = await db.getPatients(UserCredential,Patient)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }



       // get getHospitalDoctor
       exports.getHospitalDoctor= async(req,res)=>{

        try{
            const data = req.body;
            var respon = await db.getHospitalDoctor(data,Doctor)
          
            res.status(200).json(respon);       
        } catch (error) {
            utils.handleError(res, error)
        }
      }




      //View Prescriptions
      exports.viewPrescriptions= async(req,res)=>{

      try{
          const data = req.body;

          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;

          if(user.user_role == "doctor"){
            const doctor = await findDoctor(req.user._id)

            data.doctor_id = doctor._id;
          }

          if(user.user_role == "patient"){
            const patient = await findPatient(req.user._id)

            data.patient_id = patient._id;
          }

          if(user.user_role == "staff"){
            const staff = await findStaff(req.user._id)

            data.staff_id = staff._id;
          }

          var respon = await db.viewPrescriptions(data,Prescription)
        
          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }







    //Add Previous Prescriptions
    exports.addPreviousPrescriptions= async(req,res)=>{

      try{
          const data = req.body;

          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;

          if(req.files && req.files.document){

            var image1 = await uploadImage({
  
                image_data: req.files.document,
  
                path: __dir + "previous_prescriptions/"
  
            })
            data.image = image1
          }

          if(user.user_role == "patient"){
            const patient = await findPatient(req.user._id)
            data.patient_id = patient._id;
          }

          var respon = await db.addPreviousPrescriptions(data,PreviousPatientPrescription)

          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }





    //View Previous Prescriptions
    exports.viewPreviousPrescriptions= async(req,res)=>{

      try{
          const data = req.body;

          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;

          if(user.user_role == "patient"){
            const patient = await findPatient(req.user._id)
            data.patient_id = patient._id;
          }

          var respon = await db.viewPreviousPrescriptions(data,PreviousPatientPrescription)
        
          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }




    //Add rating
    exports.addRating= async(req,res)=>{

      try{
          const data = req.body;

          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;

          if(user.user_role == "patient"){
            const patient = await findPatient(req.user._id)
            data.patient_id = patient._id;
          }

          var respon = await db.addRating(data,Rating)

          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }





     //Add Test
     exports.addTest= async(req,res)=>{

      try{
          const data = req.body;

          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;

          if(user.user_role == "staff"){
            const staff = await findStaff(req.user._id)
            data.staff_id = staff._id;
          }

          var respon = await db.addTest(data,TestReport)

          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }



      //Update Test Result
      exports.updateTestResult= async(req,res)=>{

      try{
          const data = req.body;

          var respon = await db.updateTestResult(data,TestReport)

          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }

      //Update Medicine
      exports.editMedicine= async(req,res)=>{

      try{
          const data = req.body;

          var respon = await db.editMedicine(data,Medicine)

          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }



    //pay Test Amount
    exports.payTestAmount= async(req,res)=>{

      try{
          const data = req.body;
          const user_id = req.user._id;

          const user = await findUserr(user_id)

          data.user = user;

          if(user.user_role == "patient"){
            const patient = await findPatient(req.user._id)
            data.patient_id = patient._id;
          }

          var respon = await db.payTestAmount(data,TestReport,TestPayment,PaymentCardDetail)
          res.status(200).json(respon);       
      } catch (error) {
          utils.handleError(res, error)
      }
    }

    