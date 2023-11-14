
declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// 代码高亮start
declare module 'react-syntax-highlighter';
declare module 'react-syntax-highlighter/dist/esm/styles/prism';
// 代码高亮end