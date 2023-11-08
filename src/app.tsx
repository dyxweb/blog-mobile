/**
 * 应用入口文件
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
import My from '@/pages/my';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="my" element={<My />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
