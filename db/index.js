/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 15:53:33
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-05 21:09:46
 * @Description: database
 * @FilePath: /xj-start-express/db/index.js
 */
const mysql = require('mysql')
let pool
module.exports = {
	/** 创建数据池 */
	createPool() {
		pool = mysql.createPool({
			host: '127.0.0.1',
			user: 'root',
			password: 'xjMySQL@00',
			database: 'xj_db',
			supportBigNumbers: true,
			bigNumberStrings: true
		})
		console.log('数据库连接成功')
	},
	querySync(sql, paramsArr) {
		return new Promise((resolve, reject) => {
			paramsArr = paramsArr?.length ? paramsArr : [paramsArr]
			pool.query(sql, [...paramsArr], (err, results, fields) => {
				if (err) {
					reject(err)
				}
				resolve({
					err,
					results,
					fields
				})
			})
		})
	},
	/** 获取数据池 */
	getPool() {
		return pool
	}
}
