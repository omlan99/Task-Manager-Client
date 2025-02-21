import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Componets/Navbar';
import Header from '../Componets/Header';
import Sidebar from '../Componets/Sidebar';
import App from '../Componets/App';
import Todo from '../Componets/Todo';
import Board from '../Componets/Board';
import Banner from '../Componets/Banner';

const MainLayout = () => {
    return (
        <div>
       

                    
       


            <Outlet></Outlet>
            
        </div>
    );
};

export default MainLayout;