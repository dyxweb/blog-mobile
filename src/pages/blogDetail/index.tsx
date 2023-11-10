/**
 * 文章详情
 */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styleConfig from '@/styles/common.scss';
import 'github-markdown-css';
import styles from './index.scss';

const BlogDetail = () => {
  const { category, blog } = useParams();
  const navigate = useNavigate();

  const blogContent: any =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(`../../md/interview/${category}/${blog}.md`).default; // 获取到的文档内容
  return (
    <div className={styles.blogDetail}>
      <NavBar
        onBack={() => navigate(-1)}
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
    </div>
  );
};

export default BlogDetail;
