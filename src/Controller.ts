function doGet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const numRows = 10; // Number of rows to fill
  const numCols = 10; // Number of columns to fill
  
  // Create a 2D array to hold all the values
  const values: string[][] = [];
  
  // Fill the array with values representing column and row positions
  for (let row = 1; row <= numRows; row++) {
    const rowValues: string[] = [];
    for (let col = 1; col <= numCols; col++) {
      rowValues.push(`R${row}C${col}`);
    }
    values.push(rowValues);
  }
  
  // Set all values at once for better performance
  sheet.getRange(1, 1, numRows, numCols).setValues(values);
  
  return ContentService.createTextOutput('Spreadsheet updated successfully');
}