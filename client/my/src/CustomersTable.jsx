import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CustomersTable = () => {
    const [data, setData] = useState([])
    const [customer, setCustomer] = useState({
        fullName: '',
        email: '',
        password: '',
        country: '',
        state: '',
        city: '',
        languages: '',
        Cpassword:'',
    })


    const inputHendler = e => setCustomer({ ...customer, [e.target.name]: e.target.value });

    const getData = async (page) => {
        try {
            const res = await axios.get(`http://localhost:3004/getcustomer?pageno=${page}`);
            setData(res.data)
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCustomer = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3004/api/customers/${id}`);
            // setData(res.data)
            alert(res.data.message)
            getData()
        } catch (error) {
            console.log(error);
        }
    }

    const updateCustomer = async () => {
        try {
            const res = await axios.put(`http://localhost:3004/customers/${localStorage.getItem('customer_id')}`,customer);
            // setData(res.data)
            alert('updated');
            getData();
            setCustomer({
                fullName: '',
                email: '',
                password: '',
                country: '',
                state: '',
                city: '',
                languages: '',
                Cpassword:'',
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getCustomer = async (id) => {
        try {

            localStorage.setItem('customer_id',id)
            const res = await axios.get(`http://localhost:3004/customers/${id}`);

            const resData = {
                fullName: res.data.fullName,
                email: res.data.email,
                password: res.data.password,
                country: res.data.country,
                state: res.data.state,
                city: res.data.city,
                languages: res.data.languages,
                Cpassword:''
            }
            setCustomer(resData)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className='my-5 rounded'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Languages</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row._id}</td>
                                <td>{row.fullName}</td>
                                <td>{row.email}</td>
                                <td>{row.country}</td>
                                <td>{row.state}</td>
                                <td>{row.city}</td>
                                <td>{row.languages}</td>
                                <td>{new Date(row.createdDate).toDateString()}</td>
                                <td>
                                    <div style={{ display: 'flex' }}>
                                        <button className="primary btn btn-primary" onClick={() => { getCustomer(row._id) }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"  >Edit </button>
                                        <button className="secondary" onClick={() => { deleteCustomer(row._id) }} >Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item disabled">
                            <a class="page-link">Previous</a>
                        </li>
                        <li class="page-item" ><a onClick={(e) => { getData(1) }} class="page-link" href="#">1</a></li>
                        <li class="page-item" ><a onClick={(e) => { getData(2) }} class="page-link" href="#">2</a></li>
                        <li class="page-item" ><a onClick={(e) => { getData(3) }} class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* ----------------------Edite Modal-------------------- */}


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Customer Form</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Full Name</label>
                                    <input onChange={inputHendler} type="email" class="form-control" name='fullName' value={customer.fullName}  id="inputEmail4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Email</label>
                                    <input onChange={inputHendler} type="email" class="form-control" name='email' value={customer.email} id="inputEmail4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Password</label>
                                    <input onChange={inputHendler} type="password" class="form-control" name='password' value={customer.password}id="inputPassword4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label"> confirem Password</label>
                                    <input onChange={inputHendler} type="password" class="form-control" name='Cpassword' value={customer.Cpassword} id="inputPassword4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Languages</label>
                                    <input onChange={inputHendler} type="text" class="form-control"  name='languages'value={customer.languages} id="inputPassword4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputState" class="form-label">Country</label>
                                    <input onChange={inputHendler} id="inputState" name='country' value={customer.country} class="form-select">
                                    </input>
                                </div>
                                <div class="col-md-6">
                                    <label for="inputCity"  class="form-label">City</label>
                                    <input onChange={inputHendler} type="text" name='city'value={customer.city} class="form-control" id="inputCity" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputState" class="form-label">State</label>
                                    <input onChange={inputHendler} id="inputState" name='state' value={customer.state} class="form-select">
                                    </input>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input onChange={inputHendler} class="form-check-input" type="checkbox" id="gridCheck" />
                                        <label class="form-check-label" for="gridCheck">
                                            Active
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>{updateCustomer()}}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </>




    );
}

export default CustomersTable