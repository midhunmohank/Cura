var bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UserCredential = require('../../nodejsBackend/models/user_credentials.model');
const Doctor = require('../../nodejsBackend/models/doctor.model');
const DoctorSpecialization = require('../../nodejsBackend/models/doctor_specialization.model');
const DoctorSchedule = require('../../nodejsBackend/models/doctor_schedules.model');
const Hospital = require('../../nodejsBackend/models/hospitals.model');
const Patient = require('../../nodejsBackend/models/patient.model');
const Staff = require('../models/staff.model');
const Appointment = require('../models/appointment.model');
const PatientHealthHistory = require('../models/patient_health_histories.model');
const Leave = require('../models/leaves.model');
const Rating = require('../models/ratings.model');
const Prescription = require('../models/prescriptions.model');
const PreviousPatientPrescription = require('../models/previous_patient_prescriptions.model');
const TestReport = require('../models/test_reports.model');
const TestPayment = require('../models/test_payments.model');
const PaymentCardDetail = require('../models/payment_card_details.model');
const Medicine = require('../models/medicines.model');


const {
    buildErrObject,
} = require('../middleware/utils');



module.exports = {



    //Register Patient
    async registerPatient(req, UserCredential,Patient ) {

        return new Promise((resolve, reject) => {  

            //To create hash password
            var bcrypt_password = bcrypt.hashSync(req.password,10)

            const credentials = new UserCredential({
              _id: new mongoose.Types.ObjectId(),
              username: req.username,
              password: bcrypt_password,
              user_role: req.user_role,
            });
    
            credentials.save()
              .then(result => {
                  if(result){
                      const patient = new Patient({
                        _id: new mongoose.Types.ObjectId(),
                        _user_credential_id: result._id,
                        address: req.address,
                        first_name: req.first_name,
                        last_name: req.last_name,
                        gender: req.gender,
                        age: req.age,
                        email: req.email,
                        contact_number: req.contact_number,
                    });
  
                    patient.save()
                        .then(data => {
                            resolve(data)
                        });
                  }else{
                      reject(buildErrObject(422, "Error in registering patient"))
                  }
                  resolve(result)
              }).catch(err => {
                  console.log(err, "error in registration");
                  reject(buildErrObject(422, err.message))
              })
        })
    },



    
    //Register Doctor
    async registeDoctor(req, UserCredential, Doctor) {

      return new Promise((resolve, reject) => {  

        //To create hash password
        var bcrypt_password = bcrypt.hashSync(req.password,10)

        const credentials = new UserCredential({
          _id: new mongoose.Types.ObjectId(),
          username: req.username,
          password: bcrypt_password,
          user_role: req.user_role,
        });

        

        credentials.save()
          .then(result => {
              if(result){
                  const doctor = new Doctor({
                    _id: new mongoose.Types.ObjectId(),
                    _user_credential_id: result._id,
                    experience: req.experience,
                    _hospital_id: req.hospital_id,
                    education: req.education,
                    research_work: req.research_work,
                    full_name: req.full_name,
                    email: req.email,
                    contact_number: req.contact_number,
                });

                if(req.image){
                    doctor.image = req.image
                }

                doctor.save()
                .then(result => {
                    if(result){
                        const specialization = new DoctorSpecialization({
                          _id: new mongoose.Types.ObjectId(),
                          _doctor_id: result._id,
                          specialization: req.specialization,
                      });
                      
                      specialization.save()
                        .then(data => {
                            resolve(data)
                        });
                    }else{
                        reject(buildErrObject(422, "Error in registering doctor"))
                    }
                    resolve(result)
                })
              }else{
                  reject(buildErrObject(422, "Error in registering doctor"))
              }
              resolve(result)
            }).catch(err => {
                console.log(err, "error in registration");
                reject(buildErrObject(422, err.message))
            })
      })
    },





    //Register staff
    async registerStaff(req, UserCredential,Staff ) {

      return new Promise((resolve, reject) => {  

          //To create hash password
          var bcrypt_password = bcrypt.hashSync(req.password,10)

          const credentials = new UserCredential({
            _id: new mongoose.Types.ObjectId(),
            username: req.username,
            password: bcrypt_password,
            user_role: req.user_role,
          });
  
          credentials.save()
            .then(result => {
                if(result){
                    const staff = new Staff({
                      _id: new mongoose.Types.ObjectId(),
                      _user_credential_id: result._id,
                      location: req.location,
                      name: req.name,
                      role: req.role,
                      gender: req.gender,
                      age: req.age,
                      email: req.email,
                      contact_number: req.contact_number,
                  });

                  staff.save()
                      .then(data => {
                          resolve(data)
                      });
                }else{
                    reject(buildErrObject(422, "Error in registering staff"))
                }
                resolve(result)
            }).catch(err => {
                console.log(err, "error in registration");
                reject(buildErrObject(422, err.message))
            })
      })
    },





    //Add Hospital
    async addHospital(req, Hospital ) {

        return new Promise((resolve, reject) => {  
            //To save the details of hospital 
            const add = new Hospital({
                _id: new mongoose.Types.ObjectId(),
                name: req.name,
                location: req.location,
                email: req.email,
                contact_number: req.contact_number,
            });

            if(req.image){
                add.image = req.image
            }
            
            add.save()
            .then(result => {
                resolve(result)
            }).catch(err => {
                console.log(err, "error in adding hospital");
                reject(buildErrObject(422, err.message))
            })
        })
    },




    //Add Schedule
    async addSchedule(req, DoctorSchedule ) {

      return new Promise((resolve, reject) => {  
          //To save the details of schedule 
          const add = new DoctorSchedule({
              _id: new mongoose.Types.ObjectId(),
              _doctor_id: req.doctor_id,
              day: req.day,
              timing: req.timing,
          });
          
          add.save()
            .then(result => {
                resolve(result)
            }).catch(err => {
                console.log(err, "error in adding schedule");
                reject(buildErrObject(422, err.message))
            })
       })
    },





       //book appointment
      async bookAppointment(req, Appointment ) {

        return new Promise((resolve, reject) => {  
            //To save the details of Appointment 
            const add = new Appointment({
                _id: new mongoose.Types.ObjectId(),
                _doctor_id: req.doctor_id,
                _patient_id: req.patient_id,
                appointment_date: req.appointment_date,
                appointment_time: req.appointment_time,
                name: req.name,
                email: req.email,
                contact: req.contact,
            });
            
            add.save()
              .then(result => {
                  resolve(result)
              }).catch(err => {
                  console.log(err, "error in booking appointment");
                  reject(buildErrObject(422, err.message))
              })
          })
      },




        //Approve Appointments Status
        async updateAppointmentStatus(body,Appointment){

            return new Promise((resolve,reject)=>{
    
            if(body.approval == 'approved'){
            var obj = { 
                "status"             :   body.approval,
            }
            }
    
            else if(body.approval == 'cancel'){
            var obj = { 
                "status"             :   body.approval,
            }
            }
            
            Appointment.updateOne(
                    {"_id" : body.appointment_id},
                    {$set : obj }
                )
            
            .then(async data=>{
                    if(data){
                        await Appointment.findOne({_id : body.appointment_id}).then(datas => {
                            if(datas){
                                resolve({
                                code:200,
                                message: 'Appointment Status Updated Successfully',
                                data:datas
                                })
                            } else {
                                console.log('Appointment Not found')
                            }
                        })
                    } else{
                    console.log('Not updated')
                    }
                }).catch(err => {
                reject(buildErrObject(422, err.message))
                })
            })    
        },
    

      



        //upload health history
        async uploadHealthHistory(req, PatientHealthHistory ) {

            return new Promise((resolve, reject) => {  
                //To save the details of Appointment 
                const add = new PatientHealthHistory({
                    _id: new mongoose.Types.ObjectId(),
                    _patient_id: req.patient_id,
                    health_description: req.health_description,
                });
                
                if(req.document){
                    add.document = req.document
                }
                
                add.save()
                .then(result => {
                    resolve(result)
                }).catch(err => {
                    console.log(err, "error in uploading health history");
                    reject(buildErrObject(422, err.message))
                })
            })
        },








    //Update Specialization
    async updateSpecialization(body,DoctorSpecialization){
        return new Promise((resolve,reject)=>{
  
        var obj = { 
        "specialization"             :   body.specialization,
        }
        
        DoctorSpecialization.updateOne(
                {"_doctor_id" : body.doctor_id},
                {$set : obj }
            )
           
          .then(async data=>{
                if(data){
                    await DoctorSpecialization.findOne({_doctor_id : body.doctor_id}).then(datas => {
                        if(datas){
                            resolve({
                            code:200,
                            message: 'Specialization Updated Successfully',
                            data:datas
                            })
                        } else {
                            console.log('Specialization Not found')
                        }
                    })
                } else{
                  console.log('Not updated')
                }
            }).catch(err => {
              reject(buildErrObject(422, err.message))
            })
        })    
      },
  




    //Update Schedule
    async updateSchedule(body,DoctorSchedule){

        return new Promise((resolve,reject)=>{

        var obj = { 
            "timing"             :   body.timing,
            "day"             :   body.day,
        }
        
        DoctorSchedule.updateOne(
                {"_id" : body.schedule_id},
                {$set : obj }
            )
        
        .then(async data=>{
           
                resolve({
                code:200,
                message: 'Schedule Updated Successfully',
                data:data
            })
            
            }).catch(err => {
            reject(buildErrObject(422, err.message))
            })
        })    
    },








    

    //Add Leave
    async addLeave(req, Leave ) {

        return new Promise((resolve, reject) => {  
            //To save the details of Leave 

            var end_date = new Date(req.leave_start_date);

            end_date.setDate(end_date.getDate() + Number(req.duration));

            const add = new Leave({
                _id: new mongoose.Types.ObjectId(),
                _doctor_id: req.doctor_id,
                _patient_id: req.patient_id,
                reason: req.reason,
                leave_start_date: req.leave_start_date,
                leave_end_date: end_date,
                duration: req.duration,
            });

            
            add.save()
            .then(result => {
                resolve(result)
            }).catch(err => {
                console.log(err, "error in adding leave");
                reject(buildErrObject(422, err.message))
            })
        })
    },




    //Add addMedicine
    async addMedicine(req, Medicine ) {

        return new Promise((resolve, reject) => { 

            //To save the details of Medicine 
            const add = new Medicine({
                _id: new mongoose.Types.ObjectId(),
                _staff_id: req.staff_id,
                company_name: req.company_name,
                name: req.name,
                type: req.type,
                description: req.description,
                price: req.price,
                quantity: req.quantity,
                re_stock_level: req.re_stock_level,
                is_available: req.is_available,
            });
            
            add.save()
            .then(result => {
                resolve(result)
            }).catch(err => {
                console.log(err, "error in adding medicines");
                reject(buildErrObject(422, err.message))
            })
        })
    },





     //Update Reaserach Work
     async updateResearchWork(body,Doctor){
        return new Promise((resolve,reject)=>{
  
        var obj = { 
            "research_work"             :   body.research_work,
        }
        
        Doctor.updateOne(
            {"_id" : body.doctor_id},
            {$set : obj }
        )
        
          .then(async data=>{
                if(data){
                    await Doctor.findOne({_id : body.doctor_id}).then(datas => {
                        if(datas){
                            resolve({
                            code:200,
                            message: 'Research Work Updated Successfully',
                            data:datas
                            })
                        } else {
                            console.log('Research Work Not found')
                        }
                    })
                } else{
                  console.log('Not updated')
                }
            }).catch(err => {
              reject(buildErrObject(422, err.message))
            })
        })    
      },
  



      //Reschedule Appointment
     async rescheduleAppointment(body,Appointment){
        return new Promise((resolve,reject)=>{
  
        var obj = { 
            "appointment_date"             :   body.appointment_date,
            "appointment_time"             :   body.appointment_time,
            "status"             :   "rescheduled",
        }
        
        Appointment.updateOne(
            {"_id" : body.appointment_id},
            {$set : obj }
        )
        
          .then(async data=>{
                if(data){
                    await Appointment.findOne({_id : body.appointment_id}).then(datas => {
                        if(datas){
                            resolve({
                            code:200,
                            message: 'Rescheduled Successfully',
                            data:datas
                            })
                        } else {
                            console.log('Appointment Not found')
                        }
                    })
                } else{
                  console.log('Not Rescheduled')
                }
            }).catch(err => {
              reject(buildErrObject(422, err.message))
            })
        })    
      },
  






        //View Appointments
        async viewAppointments(body,Appointment){

            return new Promise((resolve,reject)=>{
      
            var mysort = { _id: -1 };
              
            if(body.user.user_role == 'doctor'){
                Appointment.find({ _doctor_id: body.doctor_id}).sort(mysort).populate(['_patient_id','_doctor_id']).exec().then(data=>{
                    resolve({
                        data:data
                      })
              }).catch(err=>{
                reject(buildErrObject(422,err.message))
              }) 
            }
      
      
            if(body.user.user_role == 'patient'){
                Appointment.find({ _patient_id: body.patient_id}).populate(['_doctor_id']).exec().then(items => {
                    resolve({
                        data:items
                    })
              }).catch(err=>{
                reject(buildErrObject(422,err.message))
              }) 
            }

            if(body.user.user_role == 'admin'){
                Appointment.find().sort(mysort).populate(['_patient_id','_doctor_id']).exec().then(data=>{
                    resolve({
                        data:data
                      })
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            }
            })
        },





         //View Patient Health History
         async viewPatientHealthHistory(body,PatientHealthHistory){

            return new Promise((resolve,reject)=>{
      
                var mysort = { _id: -1 };
                
                PatientHealthHistory.find({ _patient_id: body.patient_id}).sort(mysort).then(data=>{
                        resolve({
                            data:data
                        })
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },





        //Add Prescritions
        async addPrescriptions(req, Prescription ) {

            return new Promise((resolve, reject) => {  
                //To save the details of Prescription 
                const add = new Prescription({
                    _id: new mongoose.Types.ObjectId(),
                    _doctor_id: req.doctor_id,
                    _patient_id: req.patient_id,
                    prescription: req.prescription,
                    _written_by: req.staff_id,
                });

                if(req.image){
                    add.document = req.image
                }

                add.save()
                .then(result => {
                    resolve(result)
                }).catch(err => {
                    console.log(err, "error in adding prescriptions");
                    reject(buildErrObject(422, err.message))
                })
            })
        },





        //Edit Prescritions
        async editPrescriptions(body, Prescription ) {

            return new Promise((resolve, reject) => {  
                

                if(body.user.user_role == 'staff' || body.user.user_role == 'doctor'){

                    var obj = { 
                        "prescription"             :   body.prescription,
                    }
                    
                    Prescription.updateOne(
                        {"_id" : body.prescription_id},
                        {$set : obj }
                    )
                    
                    .then(async data=>{
                        if(data){
                            await Prescription.findOne({_id : body.prescription_id}).then(datas => {
                                if(datas){
                                    resolve({
                                        code:200,
                                        message: 'Updated Successfully',
                                        data:datas
                                    })
                                } else {
                                    console.log('Prescription Not found')
                                }
                            })
                        } else{
                            console.log('Not Updated')
                        }
                    }).catch(err => {
                        reject(buildErrObject(422, err.message))
                    })
                }
            })
        },





        
        // get Doctors
        async getDoctors(UserCredential,Doctor){

            return new Promise((resolve,reject)=>{
      
                var mysort = { _id: -1 };
                
                UserCredential.find({user_role : "doctor", status : "active"}).select('_id').sort(mysort).then(data=>{

                    if(data){
                        Doctor.find({ '_user_credential_id': { $in: data } } ).sort(mysort).populate(['_hospital_id','specialization']).exec().then(datas=>{
                            resolve({
                                data:datas
                            })
                        }).catch(err=>{
                            reject(buildErrObject(422,err.message))
                        }) 
                    }
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },



  
        // get getMedicines
        async getMedicines(req,Medicine){

            return new Promise((resolve,reject)=>{
      
                var mysort = { _id: -1 };
                
                    if(req.staff_id){
                        Medicine.find({'_staff_id': req.staff_id } ).sort(mysort).populate(['_staff_id']).exec().then(datas=>{
                            resolve({
                                data:datas
                            })
                        }).catch(err=>{
                            reject(buildErrObject(422,err.message))
                        }) 
                    }else{
                        Medicine.find({}).sort(mysort).populate(['_staff_id']).exec().then(datas=>{
                            resolve({
                                data:datas
                            })
                        }).catch(err=>{
                            reject(buildErrObject(422,err.message))
                        }) 
                    }
            })
        },




         // get getStaff
        async getStaff(UserCredential,Staff){

            return new Promise((resolve,reject)=>{
      
                var mysort = { _id: -1 };
                
                UserCredential.find({user_role : "staff"}).select('_id').sort(mysort).then(data=>{

                    if(data){
                        Staff.find({ '_user_credential_id': { $in: data } } ).sort(mysort).then(datas=>{
                            resolve({
                                data:datas
                            })
                        }).catch(err=>{
                            reject(buildErrObject(422,err.message))
                        }) 
                    }
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },

 
        // get getSchedule
        async getSchedule(req,DoctorSchedule){

            return new Promise((resolve,reject)=>{
                      
                DoctorSchedule.find({_doctor_id : req.doctor_id}).then(data=>{
                   
                    resolve({
                        data:data
                    })
                       
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },

        // get getLeave
        async getLeave(req,Leave){

            return new Promise((resolve,reject)=>{
                      
                if( req.doctor_id){
                    Leave.find({_doctor_id : req.doctor_id}).then(data=>{
                       
                        resolve({
                            data:data
                        })
                    }).catch(err=>{
                        reject(buildErrObject(422,err.message))
                    }) 
                }

                if( req.patient_id){
                    Leave.find({_patient_id : req.patient_id}).then(data=>{
                       
                        resolve({
                            data:data
                        })
                    }).catch(err=>{
                        reject(buildErrObject(422,err.message))
                    }) 
                }else{
                    Leave.find().populate(['_doctor_id','_patient_id']).exec().then(data=>{
                       
                        resolve({
                            data:data
                        })
                    }).catch(err=>{
                        reject(buildErrObject(422,err.message))
                    }) 
                }
                       
            })
        },


        // get getTests
        async getTests(req,TestReport){

            return new Promise((resolve,reject)=>{
                      
              
                if( req.patient_id){
                    TestReport.find({_patient_id : req.patient_id}).populate(['_test_by','_patient_id']).exec().then(data=>{
                       
                        resolve({
                            data:data
                        })
                    }).catch(err=>{
                        reject(buildErrObject(422,err.message))
                    }) 
                }else{
                    TestReport.find({}).populate(['_patient_id','_test_by']).exec().then(data=>{
                       
                        resolve({
                            data:data
                        })
                    }).catch(err=>{
                        reject(buildErrObject(422,err.message))
                    }) 
                }
                       
            })
        },


        
        // get Single Doctors
        async getSingleDoctors(req,Doctor){

            return new Promise((resolve,reject)=>{
           
                Doctor.find({ '_id': req.doctor_id }).populate(['_hospital_id','specialization']).exec().then(datas=>{
                    resolve({
                        data:datas
                    })
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },
        // get Single Mediicne
        async getSingleMedicine(req,Medicine){

            return new Promise((resolve,reject)=>{
           
                Medicine.find({ '_id': req.medicine_id }).then(datas=>{
                    resolve({
                        data:datas
                    })
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },

        // get Single Patient
        async getSinglePatient(req,Patient){

            return new Promise((resolve,reject)=>{
           
                Patient.find({ '_id': req.patient_id }).exec().then(datas=>{
                    resolve({
                        data:datas
                    })
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },


        // get getDoctorSpecialization
        async getDoctorSpecialization(req,DoctorSpecialization){

            return new Promise((resolve,reject)=>{
           
                DoctorSpecialization.find({ '_doctor_id': req.doctor_id }).exec().then(datas=>{
                    resolve({
                        data:datas
                    })
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },



         // get getDoctorSchedule
         async getDoctorSchedule(req,DoctorSchedule){

            return new Promise((resolve,reject)=>{
           
                DoctorSchedule.find({ '_doctor_id': req.doctor_id }).exec().then(datas=>{
                    resolve({
                        data:datas
                    })
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },


        



         // get Hospitals
         async getHospitals(Hospital){

            return new Promise((resolve,reject)=>{
      
                var mysort = { _id: -1 };
                
                Hospital.find({}).sort(mysort).then(data=>{

                    if(data){
                       
                        resolve({
                            data:data
                        })
                    
                    }
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },







        // get Patients
        async getPatients(UserCredential,Patient){

            return new Promise((resolve,reject)=>{
        
                var mysort = { _id: -1 };
                
                UserCredential.find({user_role : "patient"}).select('_id').sort(mysort).then(data=>{

                    if(data){
                        Patient.find({ '_user_credential_id': { $in: data } }).sort(mysort).then(datas=>{
                            resolve({
                                data:datas
                            })
                        }).catch(err=>{
                            reject(buildErrObject(422,err.message))
                        }) 
                    }
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },




        // get getHospitalDoctor
        async getHospitalDoctor(req,Doctor){

            return new Promise((resolve,reject)=>{
        
                var mysort = { _id: -1 };
                
                Doctor.find({_hospital_id : req.hospital_id}).sort(mysort).populate(['_hospital_id']).exec().then(data=>{
                    resolve({
                        data:data
                    })
                       
                }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                }) 
            })
        },





        //View Prescriptions
        async viewPrescriptions(body,Prescription){

            return new Promise((resolve,reject)=>{
      
                var mysort = { _id: -1 };
                  
                if(body.user.user_role == 'doctor'){
                    Prescription.find({ _doctor_id: body.doctor_id}).sort(mysort).populate(['_patient_id','_written_by','_doctor_id']).exec().then(data=>{
                        resolve({
                            data:data
                          })
                  }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                  }) 
                }
          
          
                if(body.user.user_role == 'patient'){
                    Prescription.find({ _patient_id: body.patient_id}).populate(['_doctor_id','_written_by']).exec().then(items => {
                        resolve({
                            data:items
                        })
                  }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                  }) 
                }


                if(body.user.user_role == 'staff'){
                    Prescription.find({ _written_by: body.staff_id}).populate(['_patient_id','_doctor_id','_written_by']).exec().then(items => {
                        resolve({
                            data:items
                        })
                  }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                  }) 
                }

    
                if(body.user.user_role == 'admin'){
                    Prescription.find().sort(mysort).populate(['_patient_id','_doctor_id','_written_by']).exec().then(data=>{
                        resolve({
                            data:data
                          })
                    }).catch(err=>{
                        reject(buildErrObject(422,err.message))
                    }) 
                }
            })
        },




        //Add Previous Prescritions
        async addPreviousPrescriptions(req, PreviousPatientPrescription ) {

            return new Promise((resolve, reject) => {  
                //To save the details of Previous Prescription 
                const add = new PreviousPatientPrescription({
                    _id: new mongoose.Types.ObjectId(),
                    _patient_id: req.patient_id,
                    prescription: req.prescription,
                });

                if(req.image){
                    add.document = req.image
                }

                add.save()
                .then(result => {
                    resolve(result)
                }).catch(err => {
                    console.log(err, "error in adding prescriptions");
                    reject(buildErrObject(422, err.message))
                })
            })
        },





         //View Previous Prescriptions
         async viewPreviousPrescriptions(body,PreviousPatientPrescription){

            return new Promise((resolve,reject)=>{
      
                var mysort = { _id: -1 };
                  
                if(body.user.user_role == 'doctor'){
                    PreviousPatientPrescription.find({ _patient_id: body.patient_id}).sort(mysort).populate(['_patient_id']).exec().then(data=>{
                        resolve({
                            data:data
                          })
                  }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                  }) 
                }
          
          
                if(body.user.user_role == 'patient'){
                    PreviousPatientPrescription.find({ _patient_id: body.patient_id}).then(items => {
                        resolve({
                            data:items
                        })
                  }).catch(err=>{
                    reject(buildErrObject(422,err.message))
                  }) 
                }

    
                if(body.user.user_role == 'admin'){
                    PreviousPatientPrescription.find().sort(mysort).populate(['_patient_id']).exec().then(data=>{
                        resolve({
                            data:data
                          })
                    }).catch(err=>{
                        reject(buildErrObject(422,err.message))
                    }) 
                }
            })
        },



        //Add rating
        async addRating(req, Rating) {

            return new Promise((resolve, reject) => {  

                const add = new Rating({
                    _id: new mongoose.Types.ObjectId(),
                    _patient_id: req.patient_id,
                    _doctor_id: req.doctor_id,
                    ratings: req.ratings,
                });

                
                add.save()
                .then(result => {
                    resolve(result)
                }).catch(err => {
                    console.log(err, "error in adding rating");
                    reject(buildErrObject(422, err.message))
                })
            })
        },



        //Add Test
        async addTest(req, TestReport) {

            return new Promise((resolve, reject) => {  

                const add = new TestReport({
                    _id: new mongoose.Types.ObjectId(),
                    _patient_id: req.patient_id,
                    _test_by: req.staff_id,
                    sample: req.sample,
                    test_description: req.test_description,
                    amount: req.amount,
                    status: "Pending",
                });
                
                add.save()
                .then(result => {
                    resolve(result)
                }).catch(err => {
                    console.log(err, "error in adding test");
                    reject(buildErrObject(422, err.message))
                })
            })
        },



        //Update Test Result
        async updateTestResult(body, TestReport) {

            return new Promise((resolve, reject) => {  

                var obj = { 
                    "test_result"             :   body.test_result,
                    "status"                  :   "Test Result Uploaded",
                }
                TestReport.updateOne(
                    {"_id" : body.test_id},
                    {$set : obj }
                )
                .then(async data=>{
                    if(data){
                        await TestReport.findOne({_id : body.test_id}).then(datas => {
                            if(datas){
                                resolve({
                                    code:200,
                                    message: 'Result Updated Successfully',
                                    data:datas
                                })
                            } else {
                                console.log('Test Report Not found')
                            }
                        })
                    } else{
                        console.log('Not Updated')
                    }
                }).catch(err => {
                    reject(buildErrObject(422, err.message))
                })
            })
        },

            //Update Medicine
            async editMedicine(body, Medicine) {

                return new Promise((resolve, reject) => {  

                    var obj = { 
                        "company_name"             :   body.company_name,
                        "name"             :   body.name,
                        "type"             :   body.type,
                        "description"             :   body.description,
                        "price"             :   body.price,
                        "quantity"             :   body.quantity,
                        "re_stock_level"             :   body.re_stock_level,
                        "is_available"             :   body.is_available,
                    }
                    Medicine.updateOne(
                        {"_id" : body.medicine_id},
                        {$set : obj }
                    )
                    .then(async data=>{
                        if(data){
                            await Medicine.findOne({_id : body.medicine_id}).then(datas => {
                                if(datas){
                                    resolve({
                                        code:200,
                                        message: 'Medicine Updated Successfully',
                                        data:datas
                                    })
                                } else {
                                    console.log('Medicine Not found')
                                }
                            })
                        } else{
                            console.log('Not Updated')
                        }
                    }).catch(err => {
                        reject(buildErrObject(422, err.message))
                    })
                })
            },



        //Pay Test Amnount
        async payTestAmount(req, TestReport,TestPayment,PaymentCardDetail) {
            return new Promise((resolve, reject) => {  
                var obj = { 
                    "status"                  :   "Paid",
                    "is_amount_paid"                  :   "Yes",
                }
                TestReport.updateOne(
                    {"_id" : req.test_id},
                    {$set : obj }
                )
                .then(async data=>{
                    if(data){
                        const add = new TestPayment({
                            _id: new mongoose.Types.ObjectId(),
                            _patient_id: req.patient_id,
                            _test_id: req.test_id,
                            amount: req.amount,
                        });
                        
                        add.save()
                        .then(result => {
                            const add = new PaymentCardDetail({
                                _id: new mongoose.Types.ObjectId(),
                                _test_payment_id: result._id,
                                name_on_card: req.name_on_card,
                                card_type: req.card_type,
                                card_number: req.card_number,
                                cvv: req.cvv,
                                expiry_date: req.expiry_date,
                            });
                            add.save()
                            .then(result => {
                                resolve(result)
                            }).catch(err => {
                                console.log(err, "error in making payment");
                                reject(buildErrObject(422, err.message))
                            })
                            resolve(result)
                        }).catch(err => {
                            console.log(err, "error in making payment");
                            reject(buildErrObject(422, err.message))
                        })
                    } else{
                        console.log('Payment Not Made')
                    }
                }).catch(err => {
                    reject(buildErrObject(422, err.message))
                })
            })
        },






}