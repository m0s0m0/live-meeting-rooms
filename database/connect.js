var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'database-1.ck2unyypkcpi.us-east-1.rds.amazonaws.com',
  user            : 'admin',
  password        : 'cheeradmin',
  database        : 'cheer'
});

async function runQuery(query){
	let result = {};
	pool.query(query, (err, res) => {
		if (err) {
			throw (err);
			console.log('errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr')
			console.log(err);
			result.err = err;
			result.status = 0;
		}
		else {
			console.log('query successs full')
			console.log(res)
			result.data = res.rows;
			result.status = 1;
		}
	});
	return result;
}

module.exports = {
  pool: pool,
  runQuery: runQuery
};