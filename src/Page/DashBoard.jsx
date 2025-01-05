import React, { useEffect } from 'react';
import ArticleList from '../componants/Articlelist';
import { useNavigate } from 'react-router-dom';
import Export from '../componants/Export';
import ExportPai from '../componants/ExportPai';


const Dashboard = () => {
    const router = useNavigate();

    const HandleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        router("/login");
    }

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
            router("/login");
        }
    }, [router]);
    return (
        <div>
            {/*<Navbar />*/}
            <div className="container mx-auto p-4  ">
                <div className='bg-indigo-500 rounded-full flex justify-between ...'>
                    <h2 className="text-2xl font-semibold text-white m-2 p-2 ">News Dashboard</h2>
                    <button type='button' onClick={HandleLogout} className='m-3 font-semibold text-white'>Logout</button>
                </div>

                <ArticleList />
                <ExportPai />
                <Export />

            </div>
        </div>
    );
};

export default Dashboard;
