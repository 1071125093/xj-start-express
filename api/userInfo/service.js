/*
 * @Author: XiaoJun
 * @Date: 2022-12-05 20:09:49
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-06 10:12:00
 * @Description: 组件功能
 * @FilePath: /xj-start-express/api/userInfo/service.js
 */
const { getPool, querySync } = require('../../db/index.js')
const bcript = require('bcryptjs')
const { send } = require('express/lib/response.js')
module.exports = {
	// #region ********** 通用sql部分 start **************/
	/** 查找指定用户 */
	async queryUserInfo({ body }, res) {
		const pool = getPool()
		const { username } = body
		let sql = `select * from express_user where username=${pool.escape(
			username
		)}`
		const { results } = await querySync(sql)
		return results
	},
	// #endregion ******* 通用sql部分 ~end~ **************/
	/** 获取用户信息 */
	async handleGetUserInfo(req, res) {
		const results = await this.queryUserInfo(req, res)
		if (!results?.length) {
			throw new Error('获取用户信息失败')
		}
		res.send({
			status: 200,
			message: '获取用户信息成功',
			data: results[0]
		})
	},
	/** 修改用户信息 */
	async handleEditUserInfo(req, res) {
		const { body } = req
		const targetValue = { ...body }
		delete targetValue.username
		let sql = `update express_user set ? where username = ? `
		const { results } = await querySync(sql, [targetValue, body.username])
		if (!results?.affectedRows) {
			throw new Error('更新用户信息失败')
		}
		res.send({
			status: 200,
			message: '更新用户数据成功'
		})
	},
	/** 重置用户密码 */
	async handleResetPassword(req, res) {
		const { body } = req
		// 获取用户信息
		let results = await this.queryUserInfo(req, res)
		if (!results?.length) {
			throw new Error('获取用户信息失败')
		}
		// 判断原密码是否正确
		let { oldPassword, newPassword, username } = body
		const judge = bcript.compareSync(oldPassword, results[0]?.password)
		if (!judge) {
			throw new Error('原密码不正确')
		}
		// 执行操作
		let sql = `update express_user set password = ? where username = ?`
		newPassword = bcript.hashSync(newPassword, 10)
		let { results: updateResults } = await querySync(sql, [
			newPassword,
			username
		])
		if (!updateResults?.affectedRows) {
			throw new Error('更新密码失败')
		}
		res.send({
			code: 200,
			message: '更新密码成功'
		})
	}
}
