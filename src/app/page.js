"use client"; 
import { useState, useEffect } from 'react';
import Category from "./components/Category/page";
import Banner1 from "./components/homepage/page";
import Footer from "./components/footer/page";
import Navbar from "./components/navbar/page";
import "./globals.css" 
import AdminProfile from './adminprofile/page'; 
import ContactPage from './components/contact/page';
import RistalMica from './ristalmica/page';
import ProductCraousel from './components/productcraousel/page';
import LittleboxLanding from './components/LittleboxLanding/page';
import AllProductDisplay from './allproductdisplay/page';

export default function Home() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    } else {
      setUserRole("user"); 
    }
  }, []); 

  if (userRole === "admin") {
    return <div>
      <AdminProfile />  
    </div>;
  }

  return (
    <main>
      <Navbar />
      <Banner1 />
      <Category />  
      <ProductCraousel />
      <AllProductDisplay /> 
         <LittleboxLanding />
      <Footer />
    </main>
  );
}