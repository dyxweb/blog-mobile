/**
 * 文章列表
 */
import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Collapse, List } from 'antd-mobile';
import Layer from '@/components/layer';
import styleConfig from '@/styles/common.scss';

const mdData = require.context('../../md/interview', true, /\.md$/);
const menuConfig: any = [];
// 根据目录动态生成导航数据
mdData.keys().forEach((item: any) => {
  const itemArr = item.split('/');
  const category = itemArr[1]; // 类目
  const blog = itemArr[2]?.replace('.md', ''); // 文章博客
  if (category && blog) {
    const findIndex = menuConfig.findIndex(
      (menu: any) => menu.key === category
    );
    if (findIndex > -1) {
      menuConfig[findIndex].children.push({
        key: `/${category}/${blog}`,
        title: blog
      });
    } else {
      menuConfig.push({
        key: category,
        title: category,
        children: [{ key: `/${category}/${blog}`, title: blog }]
      });
    }
  }
});

const BlogList = () => {
  const [activeKey, setActiveKey] = useState(''); // 点击的目录key
  const navigate = useNavigate();

  // 点击文章标题跳转
  const onBlogClick = (key: string) => {
    setActiveKey(key);
    navigate(`/blog${key}`);
  };

  return (
    <div>
      <Layer>
        <Collapse accordion>
          {menuConfig.map((category: any) => {
            const { key, title, children = [] } = category;
            return (
              <Collapse.Panel key={key} title={title}>
                {children.map((blog: any) => (
                  <List.Item
                    key={blog.key}
                    onClick={() => onBlogClick(blog.key)}
                  >
                    <div
                      style={
                        activeKey === blog.key
                          ? { color: styleConfig.primaryColor }
                          : {}
                      }
                    >
                      {blog.title}
                    </div>
                  </List.Item>
                ))}
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </Layer>
      <Outlet />
    </div>
  );
};

export default BlogList;
