/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 17:14:16
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-02 17:14:17
 * @Description: 组件功能
 * @FilePath: /xj-start-express/db/fake.js
 */
/*
 * @Author: your name
 * @Date: 2021-04-26 10:43:04
 * @LastEditTime: 2022-05-06 14:19:15
 * @LastEditors: 白志明
 * @Description: In User Settings Edit
 * @FilePath: \trs-network-disk-server\db\db.js
 */
const mysql = require('mysql');
let pool;
/**
 * @description: 重写poolConnection方法，增加同步方法
 * @param {*} connection
 * @return {*}
 */
function rewritePoolConnection(connection) {
  if (!connection.beginTransactionAsync) {
    /**
     * @description: 增加事务开始同步方法
     * @param {*} options
     * @return {*}
     */
    connection.__proto__.beginTransactionSync = function (options) {
      const self = this;
      return new Promise((resolve, reject) => {
        self.beginTransaction(options, (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        });
      })
    }
  }
  if (!connection.querySync) {
    /**
     * @description: 增加事务查询，同步方法
     * @param {*} sql
     * @return {*}
     */
    connection.__proto__.querySync = function (sql) {
      const self = this;
      return new Promise((resolve, reject) => {
        self.query(sql, (err, results, fields) => {
          if (err) {
            console.error(err);
            reject(err);
            return
          }
          resolve({
            err,
            results,
            fields
          });
        })
      });
    }
  }
  if (!connection.commitSync) {
    /**
     * @description: 增加事务提交，同步方法
     * @param {*}
     * @return {*}
     */
    connection.__proto__.commitSync = function () {
      const self = this;
      return new Promise((resolve, reject) => {
        self.commit((error) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            self.release();  // 提交后自动释放
            resolve();
          }
        })
      });
    }
  }
  if (!connection.rollbackSync) {
    /**
     * @description: 增加事务回滚，同步方法
     * @param {*}
     * @return {*}
     */
    connection.__proto__.rollbackSync = function () {
      const self = this;
      return new Promise((resolve) => {
        self.rollback(() => {
          resolve();
        });
      });
    }
  }
}
module.exports = {
  /**
   * @description: 创建数据库连接池
   * @param {*}
   * @return {*}
   */
  createPool() {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: 'Trsadmin!@#123',
      port: '3306',
      database: 'smart_design',
      supportBigNumbers: true,
      bigNumberStrings: true
    });
    console.log('连接到数据库成功...');
    /**
     * @description: 定义同步查询方法
     * @param {*} sql
     * @return {*}
     */
    pool.querySync = function (sql) {
      const self = this;
      return new Promise((resolve, reject) => {
        self.query(sql, (err, results, fields) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve({
            err,
            results,
            fields
          });
        })
      });
    }
  },
  /**
   * @description: 获取连接池
   * @param {*}
   * @return {*}
   */
  getPool() {
    return pool;
  },
  /**
   * @description: 获取连接，用于事务
   * @param {*}
   * @return {*}
   */0
  getConnectionSync() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('连接错误：' + err.stack + '\n' + '连接ID：' + connection.threadId)
          reject(err)
        } else {
          rewritePoolConnection(connection)
          resolve(connection)
        }
      });
    })
  }
};