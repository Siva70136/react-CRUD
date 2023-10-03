import { useState } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'



const Update = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        salary: '',
        designation: '',
        
    });
    const {history}=props
    const logout=async()=>{
        Cookies.remove("jwt_token");
        history.replace("/login");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // You can submit the formData to your server here
        console.log(formData);

    };

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

                    <form onSubmit={handleSubmit} className="form">
                        <h2 className="textHead">Update Stock</h2>

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
                            <button type="submit" className="button btn">Update</button>
                            <button  className="button btn" onClick={logout}>Logout</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update;