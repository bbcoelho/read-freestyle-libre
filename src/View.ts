namespace View {

    export function getSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        const SPREAD_SHEET_ID = '1NRH4u6tyr5RJPwq1tkvKXuRAnLPAMSTVC8T2YVRCsHY';
        const SHEET_NAME = 'Sheet1';

        const spreadSheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);
        const sheet = spreadSheet.getSheetByName(SHEET_NAME);
        if (!sheet) {
            throw new Error('Sheet not found');
        }

        return sheet;
    }

    export function render(dataPoint: Model.dataPoint, sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
        sheet.appendRow([dataPoint.time, dataPoint.glycemic]);
    }

}