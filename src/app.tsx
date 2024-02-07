/**
 * 应用入口文件
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/pages/layout';
import BlogList from '@/pages/blogList';
import BlogDetail from '@/pages/blogDetail';
import MyList from '@/pages/myList';
import MyDetail from '@/pages/myDetail';

const App = () => {
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === 'production' ? '/blog-mobile' : '/'}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/blog" />} />
          <Route path="blog" element={<BlogList />}>
            <Route path=":category/:blog" element={<BlogDetail />} />
          </Route>
          <Route path="my" element={<MyList />}>
            <Route path=":category/:blog" element={<MyDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
