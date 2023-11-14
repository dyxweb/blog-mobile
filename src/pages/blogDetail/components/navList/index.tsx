/**
 * 文章目录
 */
import React, { useState, useEffect } from 'react';
import { Popup } from 'antd-mobile';
import styles from './index.scss';

interface NavListProps {
  visible: boolean; // 是否显示
  onClose: () => void; // 关闭方法
}
const NavList = (props: NavListProps) => {
  const { visible, onClose } = props;
  const [navs, setNavs] = useState([]); // 目录数据

  // 根据H标签获取目录数据以及为H标签添加锚点
  const getNavs = () => {
    const blogDom = document.getElementsByClassName('markdown-body')[0];
    let eid = 0;
    const titles: any = [];
    for (const item of blogDom.childNodes as any) {
      const { nodeName, innerText } = item;
      if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(nodeName)) {
        const a = document.createElement('a');
        a.setAttribute('id', '#' + eid);
        a.innerText = ' ';
        const title = {
          type: nodeName,
          id: eid,
          name: innerText
        };
        titles.push(title);
        item.appendChild(a);
        eid++;
      }
    }
    setNavs(titles);
  };

  useEffect(() => {
    getNavs();
  }, []);

  // 点击目录移动到对应内容
  const onNavClick = (e: any, id: number) => {
    e.preventDefault();
    if (id) {
      // 找到锚点对应得的节点
      const element = document.getElementById(`#${id}`);
      // 如果对应id的锚点存在，就跳滚动到锚点顶部
      element && element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <Popup
      position="right"
      visible={visible}
      showCloseButton
      onClose={onClose}
      closeOnMaskClick
    >
      <div className={styles.navBox}>
        {navs.map((item: any) => {
          const { id, name, type } = item;
          return (
            <div
              key={id}
              onClick={(e: any) => onNavClick(e, id)}
              className={styles[`nav${type}`]}
            >
              {name}
            </div>
          );
        })}
      </div>
    </Popup>
  );
};

export default NavList;
