'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../assets/logo.svg'; 
import { MdMenu } from 'react-icons/md'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className='sticky top-0 backdrop-blur-sm z-20'>
      <div className='py-5'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
            <Image src={logo} alt="شعار أنس" height={40} width={40} className="mr-8 md:mr-0" />
            <MdMenu 
              className={`h-6 w-6 cursor-pointer md:hidden ${menuOpen ? 'ml-4' : 'ml-8'}`} 
              onClick={toggleMenu} 
            />
            <nav className={`md:flex gap-6 text-black/60 items-center ${menuOpen ? 'flex' : 'hidden'}`}>
            <a href="#about">حول</a>
          <a href="#services">الخدمات</a>
          <a href="#how-it-works">طريقة العمل</a>
              <button className='bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-center justify-center tracking-tight'>احصل على الخدمة مجاناً</button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
