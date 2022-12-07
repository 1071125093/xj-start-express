/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 13:56:09
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-05 20:46:27
 * @Description: 组件功能
 * @FilePath: /xj-start-express/api/user/index.js
 */
// #region ********** 公共组件相关 start **************/
const express = require('express')
const router = express.Router()
const service = require('./service')
const expressJoi = require('@escook/express-joi')
const rules = require('../../rules/user')
// #endregion ******* 公共组件相关 ~end~ **************/

// #region ********** 注册相关模块 start **************/
router.post('/regist', expressJoi(rules.registValidate), async (req, res) => {
	await service.judgeUniqueLegal(req, res)
	await service.doRegist(req, res)
})
// #endregion ******* 注册相关模块 ~end~ **************/

// #region ********** 登录相关模块 start **************/
router.post('/login', expressJoi(rules.registValidate), async (req, res) => {
	await service.handleLogin(req, res)
})
// #endregion ******* 登录相关模块 ~end~ **************/

module.exports = router
