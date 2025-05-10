namespace View {

    export function getSheet(spreadSheetId: string, sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
        const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
        const sheet = spreadSheet.getSheetByName(sheetName);
        if (!sheet) {
            throw new Error('Sheet not found');
        }

        return sheet;
    }

    export function render(dataPoint: Model.dataPoint, sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
        sheet.appendRow([dataPoint.time, dataPoint.glycemic]);
    }

}