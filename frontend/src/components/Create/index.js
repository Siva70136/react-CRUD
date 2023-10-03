import { useState } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import './index.css'


const Create = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        salary: '',
        designation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const {history}=props
    const logout=async()=>{
        Cookies.remove("jwt_token");
        history.replace("/login");
    }

    const register = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        console.log(formData)
        try {
            const response = await fetch('https://react-crud-iszo.onrender.com/api/emp/register', options);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className="create-container">
            <div className='nav-container'>
                <div className="navbar">
                    <div className="butt-container">
                    <Link to="/add">
                            <button className="butt buy">Add</button>
                        </Link>
                        <Link to="/update">
                            <button className="butt buy">Update</button>
                        </Link>
                        <Link to="/delete">
                            <button className="butt buy">Delete</button>
                        </Link>
                    </div>
                </div>

            </div>
            <div className="main-container">
                <div className="app-container">

                    <form  className="form">
                        <h2 className="textHead">Add The Employee</h2>

                        <p className="left">Name:</p>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                        />


                        <p className="left">Age:</p>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="input"
                        />


                        <p className="left">Salary:</p>
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className="input"
                        />

                        <p className="left">Designation:</p>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            className="input"
                        />

                        <div className="button-container">
                            <button type="submit" className="button btn" onClick={register}>Submit</button>
                            <button  className="button btn" onClick={logout}>Logout</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create;