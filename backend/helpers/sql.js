const { BadRequestError } = require("../expressError");

/**
 * Helper for making selective update queries
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE statement.
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} maps js-style data fields to database co;umn names.
 * like { fisrtName: "first_name", }
 *
 */

const sqlForPartialUpdate = (dataToUpdate, jsToSql) => {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError("No data");

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map(
		(colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
	);

	return {
		setCols: cols.join(", "),
		values: Object.values(dataToUpdate),
	};
};

module.exports = { sqlForPartialUpdate };
