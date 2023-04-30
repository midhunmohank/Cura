const controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })
const trimRequest = require('trim-request');
const cors = require('cors');


router.use(cors());



/******************************************* login ************************************************** d */
router.post(
  '/login',
  trimRequest.all,
  controller.login
);



/******************************************* register patient (patient)************************************************** d */
router.post(
  '/register/patient',
  trimRequest.all,
  controller.registerPatient
);


/******************************************* register doctor (admin)************************************************** */
router.post(
  '/register/doctor',
  trimRequest.all,
  controller.registerDoctor
);


/******************************************* register staff (admin)************************************************** */
router.post(
  '/register/staff',
  trimRequest.all,
  controller.registerStaff
);


/******************************************* add hospital (admin) ************************************************** */
router.post(
  '/add/hospital',
  trimRequest.all,
  controller.addHospital
);



/******************************************* add schedule of doctor (admin)************************************************** */
router.post(
  '/add/schedule',
  trimRequest.all,
  requireAuth,
  controller.addSchedule
);



/******************************************* book appointment (patient)************************************************** */
router.post(
  '/book/appointment',
  trimRequest.all,
  requireAuth,
  controller.bookAppointment
);



/******************************************* update appointment (doctor)************************************************** */
router.post(
  '/update/appointment/status',
  trimRequest.all,
  requireAuth,
  controller.updateAppointmentStatus
);



/******************************************* upload health history (patient)************************************************** */
router.post(
  '/upload/health/history',
  trimRequest.all,
  requireAuth,
  controller.uploadHealthHistory
);


/******************************************* update Specialization (doctor)************************************************** */
router.post(
  '/update/specialization',
  trimRequest.all,
  requireAuth,
  controller.updateSpecialization
);


/******************************************* update schedule (doctor)************************************************** */
router.post(
  '/update/schedule',
  trimRequest.all,
  requireAuth,
  controller.updateSchedule
);



/******************************************* add leave (doctor / staff )  ************************************************** */
router.post(
  '/add/leave',
  trimRequest.all,
  requireAuth,
  controller.addLeave
);



/******************************************* add leave (doctor / staff )  ************************************************** */
router.post(
  '/add/medicine',
  trimRequest.all,
  requireAuth,
  controller.addMedicine
);


/******************************************* update Reaserach Work (doctor)************************************************** */
router.post(
  '/update/research/work',
  trimRequest.all,
  requireAuth,
  controller.updateResearchWork
);


/******************************************* Reschedule Appointment (doctor)************************************************** */
router.post(
  '/reschedule/appointment',
  trimRequest.all,
  requireAuth,
  controller.rescheduleAppointment
);



/******************************************* view appointments (doctor / patient )  ************************************************** */
router.post(
  '/view/appointments',
  trimRequest.all,
  requireAuth,
  controller.viewAppointments
);



/******************************************* view patient details (doctor/admin)  ************************************************** */
router.post(
  '/view/patient/health/history',
  trimRequest.all,
  requireAuth,
  controller.viewPatientHealthHistory
);



/******************************************* add prescriptions (nurse)  ************************************************** */
router.post(
  '/add/prescriptions',
  trimRequest.all,
  requireAuth,
  controller.addPrescriptions
);





/******************************************* edit prescriptions (nurse)  ************************************************** */
router.post(
  '/edit/prescriptions',
  trimRequest.all,
  requireAuth,
  controller.editPrescriptions
);



/******************************************* get doctors (staff,admin,patient)  ************************************************** */
router.post(
  '/get/doctors',
  trimRequest.all,
  requireAuth,
  controller.getDoctors
);


/******************************************* get medicines (staff,admin,patient)  ************************************************** */
router.post(
  '/get/medicines',
  trimRequest.all,
  requireAuth,
  controller.getMedicines
);

/******************************************* get doctors (staff,admin,patient)  ************************************************** */
router.post(
  '/get/staffs',
  trimRequest.all,
  requireAuth,
  controller.getStaff
);





/******************************************* get doctors scheudle (staff,admin,patient)  ************************************************** */
router.post(
  '/get/schedule',
  trimRequest.all,
  requireAuth,
  controller.getSchedule
);



/******************************************* get leave (staff,admin,patient)  ************************************************** */
router.post(
  '/get/leave',
  trimRequest.all,
  requireAuth,
  controller.getLeave
);

/******************************************* get single doctors (staff,admin,patient)  ************************************************** */
router.post(
  '/get/single/doctors',
  trimRequest.all,
  requireAuth,
  controller.getSingleDoctors
);


/******************************************* get single medicine (staff,admin,patient)  ************************************************** */
router.post(
  '/get/single/medicine',
  trimRequest.all,
  requireAuth,
  controller.getSingleMedicine
);



/******************************************* get single patient (staff,admin,patient)  ************************************************** */
router.post(
  '/get/single/patient',
  trimRequest.all,
  requireAuth,
  controller.getSinglePatient
);




/******************************************* get doctors specializations (staff,admin,patient)  ************************************************** */
router.post(
  '/get/doctor/specialization',
  trimRequest.all,
  requireAuth,
  controller.getDoctorSpecialization
);


/******************************************* get doctors schedule (staff,admin,patient)  ************************************************** */
router.post(
  '/get/doctor/schedule',
  trimRequest.all,
  requireAuth,
  controller.getDoctorSchedule
);




/******************************************* get hospitals (staff,admin,patient)  ************************************************** */
router.post(
  '/get/hospitals',
  trimRequest.all,
  requireAuth,
  controller.getHospitals
);



/******************************************* get patients (staff,admin,doctor)  ************************************************** */
router.post(
  '/get/patients',
  trimRequest.all,
  requireAuth,
  controller.getPatients
);



/******************************************* get doctors with hospitals  ************************************************** */
router.post(
  '/get/hospital/doctor',
  trimRequest.all,
  requireAuth,
  controller.getHospitalDoctor
);





/******************************************* view prescriptions (doctor / patient )  ************************************************** */
router.post(
  '/view/prescriptions',
  trimRequest.all,
  requireAuth,
  controller.viewPrescriptions
);



/******************************************* add previous prescriptions (patient)  ************************************************** */
router.post(
  '/add/previous/prescriptions',
  trimRequest.all,
  requireAuth,
  controller.addPreviousPrescriptions
);


/******************************************* view previous prescriptions (doctor / patient )  ************************************************** */
router.post(
  '/view/previous/prescriptions',
  trimRequest.all,
  requireAuth,
  controller.viewPreviousPrescriptions
);



/******************************************* add rating (patient)  ************************************************** */
router.post(
  '/add/rating',
  trimRequest.all,
  requireAuth,
  controller.addRating
);



/******************************************* add test (pathologist)  ************************************************** */
router.post(
  '/add/test',
  trimRequest.all,
  requireAuth,
  controller.addTest
)



/******************************************* update test result (pathologist)  ************************************************** */
router.post(
  '/update/test/result',
  trimRequest.all,
  requireAuth,
  controller.updateTestResult
)

/******************************************* update medicne (pathologist)  ************************************************** */
router.post(
  '/edit/medicine',
  trimRequest.all,
  requireAuth,
  controller.editMedicine
)



/******************************************* pay test amount (patient)  ************************************************** */
router.post(
  '/pay/test/amount',
  trimRequest.all,
  requireAuth,
  controller.payTestAmount
)



/******************************************* get tests (staff,admin,patient)  ************************************************** */
router.post(
  '/get/tests',
  trimRequest.all,
  requireAuth,
  controller.getTests
);


module.exports = router
