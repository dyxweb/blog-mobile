/**
 * Home
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse, List } from 'antd-mobile';

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

const Home = () => {
  const navigate = useNavigate();

  // 点击文章标题跳转
  const onBlogClick = (key: string) => {
    navigate(`/home${key}`);
  };
  return (
    <Collapse accordion>
      {menuConfig.map((category: any) => {
        const { key, title, children = [] } = category;
        console.log();
        return (
          <Collapse.Panel key={key} title={title}>
            {children.map((blog: any) => (
              <List.Item key={blog.key} onClick={() => onBlogClick(blog.key)}>
                {blog.title}
              </List.Item>
            ))}
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
};

export default Home;
