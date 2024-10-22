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
    router.push('/'); 
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };


  return (
    <div className='bg-gradient-to-r from-blue-100 to-white'>
      <div className='py-5'>
        <div className='container mx-auto'>
          <div className='flex items-center justify-between'>
            <Image src={logo} alt="شعار أنس" height={40} width={40} className="mr-6 md:mr-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
