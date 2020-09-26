let connection = require('./connect');
let runQuery = connection.runQuery;

async function getAllCompanyUser(company_id){
	let query = `select full_name from comapany_users where company_id='${company_id}'`;
	let result = await runQuery(query);
	return result;
}


async function getUserByEmail(email){
	let query = `select * from public.users where email='${email}'`
	let result = await runQuery(query)
	return result
}

async function getAllPermissions(user_id){
	let query = `select permissions from user_permissions where user_id='${user_id}'`;
	let result = await runQuery(query);
}

async function createUser(user_data){
	let query = `insert in to public.users 	`
}

module.exports = {
  getAllCompanyUser: getAllCompanyUser,
  getAllPermissions: getAllPermissions,
  getUserByEmail: getUserByEmail
};