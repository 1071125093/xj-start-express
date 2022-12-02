/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 13:54:52
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-02 16:02:12
 * @Description: 组件功能
 * @FilePath: /xj-start-express/app.js
 */
require('module-alias/register')
const express = require('express')
const app = express()

// #region ********** 全局中间件配置 start **************/
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// #endregion ******* 全局中间件配置 ~end~ **************/

// #region ********** 路由等的引入 start **************/

const user = require('./api/user/index')
// #endregion ******* 路由等的引入 ~end~ **************/

app.use('/user', user)

app.listen(99, () => {
	console.log('服务启动')
})
