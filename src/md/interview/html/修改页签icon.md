## 修改页签icon
### 正常显示
```
<head>
  <link rel="shortcut icon" href="/logo.jpg" type="image/x-icon"/>
</head>
```
### react中使用react-helmet动态修改页签
```
import Helmet from "react-helmet";
import logoImg from '@/assets/image/logo.jpg';

// 修改页签icon
<Helmet
  link={[
    { "rel": "shortcut icon", "href": logoImg },
  ]}
/>
```