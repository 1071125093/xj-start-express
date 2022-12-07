/*
 * @Author: XiaoJun
 * @Date: 2022-12-05 20:09:45
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-06 09:49:02
 * @Description: 组件功能
 * @FilePath: /xj-start-express/api/userInfo/index.js
 */
// #region ********** 公共部分 start **************/
const express = require('express')
const router = express.Router()
const service = require('./service')
const rules = require('../../rules/user')
const expressJoi = require('@escook/express-joi')
// #endregion ******* 公共部分 ~end~ **************/

// #region ********** 接口controller层 start **************/
router.get('/getUserInfo', async (req, res) => {
	await service.handleGetUserInfo(req, res)
})
router.post(
	'/updateUserInfo',
	expressJoi(rules.updateValidate),
	async (req, res) => {
		await service.handleEditUserInfo(req, res)
	}
)

router.post(
	'/resetPassword',
	expressJoi(rules.resetPasswordValidate),
	async (req, res) => {
		await service.handleResetPassword(req, res)
	}
)
// #endregion ******* 接口controller层 ~end~ **************/
module.exports = router
