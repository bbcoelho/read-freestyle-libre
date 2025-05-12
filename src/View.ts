namespace View {

    export function getSheet(spreadSheetId: string, sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
        const spreadSheet = SpreadsheetApp.openById(spreadSheetId);
        const sheet = spreadSheet.getSheetByName(sheetName);
        if (!sheet) {
            throw new Error('Sheet not found');
        }

        return sheet;
    }

    export function render(dataPoints: Model.dataPoint[], sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
        // render values
        sheet.insertRowsAfter(2, dataPoints.length + 1);
        let range = sheet.getRange(2, 2, dataPoints.length, 3);
        range.setValues(dataPoints.map(item => [item.time, item.time, item.glycemic]));
        // render chart
        range = sheet.getRange(2, 2, dataPoints.length, 2);
        insertChart(sheet, range);
    }

    function insertChart(sheet: GoogleAppsScript.Spreadsheet.Sheet, range: GoogleAppsScript.Spreadsheet.Range): void {
        const charts = sheet.getCharts();

        const chart = sheet.newChart()
            .setChartType(Charts.ChartType.LINE)
            .addRange(range)
            .setPosition(2, 7, 0, 0)
            .setOption('height', 660)
            .setOption('width', 1000)
            .setOption('title', `${new Date(Date.now()).toLocaleDateString('pt-BR')}`)
            .setOption('curveType', 'function')
            .setOption('pointSize', 2)
            .setOption('titleTextStyle', {
                color: 'black',
                bold: true,
                alignment: 'center'
            })
            .setOption('vAxis', {
                minValue: 40,
                maxValue: 400,
                gridlines: { color: 'black', count: 10 },
                minorGridlines: { color: '#CCC', count: 1 }
            })
            .setOption('hAxis', {
                gridlines: { color: 'black', count: 6 },
                minorGridlines: { color: '#CCC', count: 3 }
            })
            .build();
        sheet.insertChart(chart);
    }

}