## 这里存放着所有请求的api

### 页面内使用方式

1. 引入

   ` import { apiName } from '../api/xxx' `  aipName为文件中export导出的名称，xxx为文件名，注意只能使用相对路径

2. 创建对象

   `const api = new apiName()`

3. 使用

   `api.fun()`  fun为方法名