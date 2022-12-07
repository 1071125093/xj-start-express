/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 13:54:52
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-06 15:30:40
 * @Description: 组件功能
 * @FilePath: /xj-start-express/app.js
 */
require('module-alias/register')
require('express-async-errors')
const express = require('express')
const app = express()
const joi = require('joi')
const { expressjwt } = require('express-jwt')
const { jwtSecretKey } = require('./config')
// #region ********** 全局中间件配置 start **************/
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
	expressjwt({
		secret: jwtSecretKey,
		algorithms: ['HS256']
	}).unless({
		path: [/^\/user\//]
	})
)
// #endregion ******* 全局中间件配置 ~end~ **************/

// #region ********** 数据库相关 start **************/
const { createPool } = require('./db/index')
createPool()
// #endregion ******* 数据库相关 ~end~ **************/

// #region ********** 路由等的引入 start **************/
app.use('/user', require('./api/user/index'))
app.use('/userInfo', require('./api/userInfo/index'))
app.use('/articleCate', require('./api/articleCate/index'))
// #endregion ******* 路由等的引入 ~end~ **************/

// #region ********** 自定义全局中间件 start **************/
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	if (err?.name === 'UnauthorizedError') {
		return res.send({
			status: 401,
			message: '无效的token'
		})
	} else if (!err?.message) {
		// 普遍处理法
		res.send({
			status: 500,
			message: '未知错误'
		})
	} else {
		// xj特色处理
		res.send({
			status: 500,
			message: err.message
		})
	}
	next()
})
// #endregion ******* 自定义全局中间件 ~end~ **************/

app.listen(99, () => {
	console.log('服务启动')
})
