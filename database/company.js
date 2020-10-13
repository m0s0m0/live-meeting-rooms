let connection = require('./connect');
let runQuery = connection.runQuery;



async function getCompanyById(company_id){
	let query = `select * from public.company where id='${company_id}'`;
	console.log("before run query");
	let result = await runQuery(query);

	console.log("after run query");
	console.log("result", result);
	return result;
}

async function getAllCompanies(){
	let query = ` select * from public.company`
	console.log("query for get all company")
}

module.exports = {
  getCompanyById: getCompanyById
};
