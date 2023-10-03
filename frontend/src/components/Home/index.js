import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

const Home=(props)=>{
    const [data,setData]=useState([]);
    const {history}=props
    const logout=async()=>{
        Cookies.remove("jwt_token");
        history.replace("/login");
    }

    useEffect(()=>{
        const getData = async () => {
            try {
                const response = await fetch('https://react-crud-iszo.onrender.com/api/emp/get');
                const data1 = await response.json();
                setData(data1);
                console.log(data);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        getData();
    })

    return(
        <div className="main-container">
            <h1>Hello</h1>
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
                        <button className="butt buy" onClick={logout}>Logout</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Home