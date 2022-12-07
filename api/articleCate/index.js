/*
 * @Author: XiaoJun
 * @Date: 2022-12-06 15:06:50
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-06 15:52:34
 * @Description: 组件功能
 * @FilePath: /xj-start-express/api/articleCate/index.js
 */
// #region ********** 全局性 start **************/
const express = require('express')
const router = express.Router()
const service = require('./service')
const rules = require('../../rules/articleCate')
const expressJoi = require('@escook/express-joi')
// #endregion ******* 全局性 ~end~ **************/

// #region ********** 路由注册 start **************/
router.post('/add', expressJoi(rules.add), async (req, res) => {
	await service.doAdd(req, res)
})
router.get('/allList', async (req, res) => {
	await service.allList(req, res)
})
router.post('/delete', expressJoi(rules.delete), async (req, res) => {
	await service.delete(req, res)
})
// #endregion ******* 路由注册 ~end~ **************/

module.exports = router
