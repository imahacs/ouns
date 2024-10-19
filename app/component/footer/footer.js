"use client";
import React from 'react';
import { Layout} from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
    return (
      <Footer style={{ textAlign: 'center' }}>
      ouns ©{new Date().getFullYear()} Created by ouns
    </Footer>
    );
};

export default AppFooter;
