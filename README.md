# vite-plugin-szmap
Vite插件，用于SzMap

## 安装

```shell
npm i  @sanzhisoft/szmap  @sanzhisoft/vite-plugin-szmap vite -D
# 或者使用yarn
yarn add @sanzhisoft/szmap @sanzhisoft/vite-plugin-szmap vite -D
```

## 使用
将以下代码添加到 `vite.config.js`

```js
import { defineConfig } from 'vite';
import SzMap from '@sanzhisoft/vite-plugin-szmap';
export default defineConfig({
  plugins: [SzMap()]
});
```

##选项参数

**_libPath_**

SzMap库所在的目录

- **type** : String
- **default**: './node_modules/@sanzhisoft/szmap'

**_outPath_**

导出SzMap库的目录

- **type** : String
- **default**: '/libs/szmap'