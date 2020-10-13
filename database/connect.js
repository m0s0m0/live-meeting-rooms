const { Pool } = require('pg')
var pool  = new Pool({
  connectionLimit : 10,
  host            : 'cheerdatabase.ck2unyypkcpi.us-east-1.rds.amazonaws.com',
  user            : 'postgres',
  password        : 'cheer408',
  database        : 'cheer'
});

function runQuery(query) {
  return new Promise( async function(resolve, reject) {
  	let result = {};
	pool.query(query, (err, res) => {
		if (err) {
			throw (err);
			console.log('errerrerrerrerrerrerrerrerrerrerrerrerrerrerrerr')
			console.log(err);
			result.err = err;
			result.status = 0;
			resolve();
		}
		else {
			console.log('query successs full')
			console.log(res)
			result.data = res.rows;
			result.status = 1;
			resolve(result);
		}
	});
})
}




module.exports = {
  pool: pool,
  runQuery: runQuery
};