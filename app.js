/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 13:54:52
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-02 18:09:29
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

// #region ********** 自定义全局中间件 start **************/
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	console.error(err)
	res.send({
		status: 500,
		message: '未知错误'
	})
})
// #endregion ******* 自定义全局中间件 ~end~ **************/

// #region ********** 数据库相关 start **************/
const { createPool } = require('./db/index')
createPool()
// #endregion ******* 数据库相关 ~end~ **************/

// #region ********** 路由等的引入 start **************/

const user = require('./api/user/index')
// #endregion ******* 路由等的引入 ~end~ **************/

app.use('/user', user)

app.listen(99, () => {
	console.log('服务启动')
})
