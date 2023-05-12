
const router = require('express').Router();

const customerControllers=require('../controllers/customer')

// Api to createcustomer
router.post("/customer",customerControllers.createcustomer);

// Api to getcustomer
 router.get("/getcustomer",customerControllers.getCustomers);

 // Api to edit customer
router.get('/customers/:id',customerControllers.editCustomer);
router.put('/customers/:id',customerControllers.editsCustomer);
//api to deletes customer
 router.delete('/api/customers/:id',customerControllers.deletecustomer)

module.exports = router;










