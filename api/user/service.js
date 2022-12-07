/*
 * @Author: XiaoJun
 * @Date: 2022-12-05 15:36:36
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-06 15:26:40
 * @Description:
 * @FilePath: /xj-start-express/api/user/service.js
 */
const bcrypt = require('bcryptjs')
const { jwtSecretKey } = require('../../config/index')
const jwt = require('jsonwebtoken')
// #region ********** mysql相关 start **************/
const { getPool, querySync } = require('../../db/index')
const pool = getPool()
// #endregion ******* mysql相关 ~end~ **************/
module.exports = {
	// #region ********** 模块内复用 start **************/
	/** 查找指定用户 */
	async doFindUser({ body }, res) {
		const { username } = body
		let sql = `select * from express_user where username=${pool.escape(
			username
		)}`
		const { results } = await querySync(sql)
		return results
	},
	/** 注册时判断数据是否已存在 */
	async judgeUniqueLegal(req, res) {
		const data = this.doFindUser(req, res)
		if (data?.length) {
			throw new Error('用户已存在')
		}
	},
	// #endregion ******* 模块内复用 ~end~ **************/
	/** 执行注册 */
	async doRegist({ body }, res) {
		let { username, password } = body
		// 执行密码加密  10可理解为密码复杂度
    // 不知道咋实现的 反正比较的时候 不需要这个10  
		password = bcrypt.hashSync(password, 10)
		// 执行sql
		let sql = `insert into express_user (
      username,
      password
    ) values (
      ${pool.escape(username)},
      ${pool.escape(password)}
    )`
		const { results } = await querySync(sql)
		if (!results) {
			throw new Error('新增失败')
		} else {
			res.send({
				message: '注册成功'
			})
		}
	},
	/** 处理登录-总控制 */
	async handleLogin(req, res) {
		const results = await this.doFindUser(req, res)
		const { body } = req
		/** 校验用户存在 */
		if (!results) {
			throw new Error('用户不存在')
		}
		/** 校验密码是否正确 */
		const innerPassword = results[0]?.password
		const judge = bcrypt.compareSync(body.password, innerPassword)
		// 反了
		// const judge = bcrypt.compareSync(innerPassword, body.password)
		if (!judge) {
			throw new Error('密码错误')
		}
		// 执行登录后续操作
		const tempObj = { ...body }
		delete tempObj.password
		const tokenStr = jwt.sign(tempObj, jwtSecretKey, {
			expiresIn: '30h' //有效期s m h
		})
		res.send({
			status: 200,
			message: '登录成功',
			data: {
				token: tokenStr
			}
		})
	}
}
