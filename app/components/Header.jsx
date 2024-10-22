'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { MdMenu, MdClose } from 'react-icons/md'; 
import logo from '../../public/assets/logo.svg'; 
import { useRouter } from 'next/navigation'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/onboarding'); 
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (href) => {
    setMenuOpen(false); 
  };

  return (
    <header className='sticky top-0 backdrop-blur-sm z-20' >
      <div className='py-5'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
            <Image src={logo} alt="شعار أنس" height={40} width={40} className="mr-6 md:mr-8" />
            
            <MdMenu 
              className="h-6 w-6 cursor-pointer md:hidden ml-6" 
              onClick={toggleMenu} 
            />
            
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#about">حول</a>
              <a href="#services">الخدمات</a>
              <a href="#how-it-works">طريقة العمل</a>
              <button 
                className='bg-black text-white px-4 py-2 ml-4 rounded-lg font-medium inline-flex align-center justify-center tracking-tight'
                onClick={handleButtonClick}
              >
                احصل على الخدمة 
              </button>
            </nav>

            <nav className={`fixed top-0 right-0 h-full min-h-screen w-full z-30 transform transition-transform duration-300 ease-in-out 
            ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            } 
            md:hidden flex flex-col gap-6 p-6 text-black`} 
            style={{
              backgroundColor: '#EAEFFA', 
            }}>
      
              <div className="flex justify-between items-center">
              
                <Image src={logo} alt="شعار أنس" height={40} width={40} />
            
                <MdClose 
                  className="h-6 w-6 cursor-pointer" 
                  onClick={toggleMenu} 
                />
              </div>

              {/* Menu Items */}
              <a href="#about" onClick={() => handleMenuItemClick('#about')}>حول</a>
              <a href="#services" onClick={() => handleMenuItemClick('#services')}>الخدمات</a>
              <a href="#how-it-works" onClick={() => handleMenuItemClick('#how-it-works')}>طريقة العمل</a>
              <button 
                className='bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-center justify-center tracking-tight'
                onClick={handleButtonClick}
              >
                احصل على الخدمة 
                </button>
            </nav>

            {menuOpen && <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleMenu}></div>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
