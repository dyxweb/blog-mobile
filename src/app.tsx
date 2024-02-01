/**
 * 应用入口文件
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/pages/layout';
import BlogList from '@/pages/blogList';
import BlogDetail from '@/pages/blogDetail';
import My from '@/pages/my';

const App = () => {
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === 'production' ? '/blog-mobile' : '/'}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/blog" />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="my" element={<My />} />
        </Route>
        <Route path="/blog/:category/:blog" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
