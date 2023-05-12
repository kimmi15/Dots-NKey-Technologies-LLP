const { default: mongoose } = require("mongoose");
const customer=require('../models/Customer')


// create customer

const createcustomer = async (req, res) => {
  try {

    // if(!fullName || !email || !password  || !country  || !state ||  !city ||  !languages){
    //   return  res.status(400).send({ status: false, msg:'fill all feilds' });
    // }
    const newCustomer =  await new customer({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      languages: req.body.languages,
      isActive: true,
      createdDate: Date.now(),
      modifiedDate: Date.now()
    });


    const savedCustomer = await newCustomer.save();
    return  res.status(201).send({ status: true, data: savedCustomer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}



const getCustomers = async (req, res) => {
  try {
    let {pageno , limit } = req.query;

    pageno =  pageno || 1;
    limit  = limit || 2;
    let skip = (pageno - 1) * limit
    const customers = await customer.find().skip(skip).limit(limit);
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: 'No customers found.' });
    }
    res.status(200).json(customers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while retrieving customers.' });
  }
};


const editCustomer=async (req, res) => {
    const customerId = req.params.id;
    try {
      const result = await customer.findById(customerId);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const editsCustomer=async (req, res) => {
    const customerId = req.params.id;

    try {
      const result = await customer.findByIdAndUpdate(customerId,  req.body, { new: true });
      return res.status(200).json('update');
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };


const deletecustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }
     return  res.status(200).json({ message: 'Customer deleted successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while deleting the customer.' });
  }
};

module.exports.createcustomer = createcustomer;
module.exports.getCustomers=getCustomers;
module.exports.deletecustomer=deletecustomer;
module.exports.editCustomer=editCustomer
module.exports.editsCustomer=editsCustomer

