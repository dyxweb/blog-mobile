## beforeunload事件
- 当浏览器窗口关闭或者刷新时，会触发beforeunload事件。
- 当前页面不会直接关闭，可以点击确定按钮关闭或刷新，也可以取消关闭或刷新。
### 显示确认对话框
- 根据规范要显示确认对话框，事件处理程序需要在事件上调用preventDefault()。
- 并非所有浏览器都支持上述方法，有些浏览器需要事件处理程序实现两个遗留方法中的一个作为代替：
  1. 将字符串分配给事件的returnValue属性。
  2. 从事件处理程序返回一个字符串。
### 示例
- JS
```
window.addEventListener("beforeunload", (event) => {
  console.log('beforeunload event triggered');
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = "Are you sure you want to exit?";
});
```
- React
```
const App = () => {
  useEffect(() => {
    const handleTabClose = (event: any) => {
      console.log('beforeunload event triggered');
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "Are you sure you want to exit?";
    };

    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div>hello world</div>
  );
};
```
