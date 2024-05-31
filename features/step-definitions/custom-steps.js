import { Given, When, Then } from '@wdio/cucumber-framework';

function checkFiltering(column, value, logicalOperator, rows, dateFrom, dateTo) {
  const leftDate = dateFrom ? Date.parse(dateFrom) : MIN_DATE;
  const rightDate = dateTo ? Date.parse(dateTo) : MAX_DATE;
  switch (logicalOperator) {
    case "is from": {
      for (const row of rows) {
        assert.isTrue(Date.parse(row) > leftDate, `Date "${row}" in column "${column}" isn't from "${dateFrom}"`); // line breaks 'Go to Definition'
      }
      break;
    }
    case "is to": {
      for (const row of rows) {
        assert.isTrue(Date.parse(row) < rightDate, `Date "${row}" in column "${column}" isn't to "${dateTo}"`); // line breaks 'Go to Definition'
      }
      break;
    }
    case "is from or equal to": {
      for (const row of rows) {
        assert.isTrue(
          Date.parse(row) >= leftDate,
          `Date "${row}" in column "${column}" isn't from or equal to "${dateFrom}"`, // line breaks 'Go to Definition'
        );
      }
      break;
    }
    case "is to or equal to": {
      for (const row of rows) {
        assert.isTrue(
          Date.parse(row) <= rightDate,
          `Date "${row}" in column "${column}" isn't to or equal to "${dateTo}"`, // line breaks 'Go to Definition'
        );
      }
      break;
    }
    default:
      throw new Error(`"${logicalOperator}" is not correct`);
  }
}

Then(/^the user checks filtering$/, async function (column, value, logicalOperator) {
  const rows = [];
  checkFiltering(column, value, logicalOperator, rows);
},
);
