import { useState } from "react";
import { Link } from 'react-router-dom';



const Delete = (props) => {

  
    const [formData, setFormData] = useState({
        name: '',
        category: '',

    });

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
                        <h2 className="textHead">Delete Stock</h2>

                        <p className="left">Name:</p>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                        />


                        <p className="left">Category:</p>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input"
                        />

                        <div className="button-container">
                            <button type="submit" className="button btn">Delete</button>
                            <button  className="button btn">Logout</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Delete;