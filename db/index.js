/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 15:53:33
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-02 17:04:21
 * @Description: database
 * @FilePath: /xj-start-express/db/index.js
 */
const mysql = require('mysql')
const db = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'xjMySQL@00',
	database: 'xj_db',
	supportBigNumbers: true,
	bigNumberStrings: true
})
const asd = db.getConnection((err, connection) => {
})

module.exports = db
