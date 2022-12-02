/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 13:56:09
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-02 17:59:26
 * @Description: 组件功能
 * @FilePath: /xj-start-express/api/user/index.js
 */
const express = require('express')
const router = express.Router()
const { getPool } = require('../../db/index')
const pool = getPool()

// #region ********** 注册相关模块 start **************/
router.post('/regist', async (req, res) => {
	const body = req.body
	/** 判断数据是否完整 */
	const judgeBodyLegal = async () => {
		return new Promise((resolve, reject) => {
			if (!body.username || !body.password) {
				res.send({
					code: 500,
					message: '用户信息不完整'
				})
				reject('用户信息不完整')
			}
			resolve()
		})
	}
	const judgeUniqueLeagal = async () => {
		if (body.username && body.password) {
			let sql = `select * from xj_join_classes where username=${body.username}`
			const { results } = await pool.querySync(sql)
		}
	}
	await judgeBodyLegal()
	// await judgeUniqueLegal()
	// await judgeBodyLegal()
	res.send({
		message: '注册成功'
	})
})
// #endregion ******* 注册相关模块 ~end~ **************/

// #region ********** 登录相关模块 start **************/
router.post('/login', (req, res) => {
	res.send({
		message: '登录成功'
	})
})
// #endregion ******* 登录相关模块 ~end~ **************/

module.exports = router
