/**
 * 文章详情
 */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { UnorderedListOutline } from 'antd-mobile-icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'github-markdown-css';
import Layer from '@/components/layer';
import NavList from './components/navList';
import styleConfig from '@/styles/common.scss';
import styles from './index.scss';

const BlogDetail = () => {
  const [navVisible, setNavVisible] = useState(false); // 目录是否显示
  const { category, blog } = useParams();
  const navigate = useNavigate();

  const blogContent: any =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`../../md/interview/${category}/${blog}.md`).default; // 获取到的文档内容
  return (
    <Layer className={styles.blogDetail}>
      <NavBar
        onBack={() => navigate(-1)}
        right={
          <UnorderedListOutline
            style={{ fontSize: 24 }}
            onClick={() => setNavVisible(true)}
          />
        }
        style={{
          '--border-bottom': `1px ${styleConfig.backColor} solid`
        }}
      >
        {blog}
      </NavBar>
      <div className={styles.content}>
        <ReactMarkdown
          // 类名必须有
          className="markdown-body"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code(props: any) {
              const { children, ...rest } = props;
              return (
                <SyntaxHighlighter
                  {...rest}
                  style={vscDarkPlus}
                  PreTag="div"
                  language="javascript"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
          }}
        >
          {blogContent}
        </ReactMarkdown>
      </div>
      <NavList onClose={() => setNavVisible(false)} visible={navVisible} />
    </Layer>
  );
};

export default BlogDetail;
