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
        let range = sheet.getRange(2, 1, dataPoints.length, 17);
        range.setValues(dataPoints.map(item => [item.time, item.time, item.glycemic, '', '', '', '', '', '', '', '', '', '', '', '', 70, 190]));
        // render chart
        range = sheet.getRange(2, 2, dataPoints.length, 2);
        insertChart(sheet, range);
        updateCharts(sheet);
    }

    function insertChart(sheet: GoogleAppsScript.Spreadsheet.Sheet, range: GoogleAppsScript.Spreadsheet.Range): void {
        const chart = sheet.newChart()
            .setChartType(Charts.ChartType.LINE)
            .addRange(range)
            .setPosition(3, 7, 0, 0)
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

    function updateCharts(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
        const map = mapChartRanges(sheet);
    
        const charts = sheet.getCharts();
        for (let chart of charts) {
            const chartId = chart.getChartId();
            if (chartId != null) {
                const ranges = map.get(chartId.toString());
                if (ranges) {
                    const glycemicRange = ranges[0];
                    const hypoThresholdRange = ranges[1];
                    const hyperThresholdRange = ranges[2];

                    chart = chart.modify()
                        .clearRanges()
                        .addRange(glycemicRange)
                        .addRange(hypoThresholdRange)
                        .addRange(hyperThresholdRange)
                        .setOption('legend', { position: 'none' })
                        .build();

                    sheet.updateChart(chart);
                }
            }
        }
    }
    
    function mapChartRanges(sheet: GoogleAppsScript.Spreadsheet.Sheet): Map<string, GoogleAppsScript.Spreadsheet.Range[]> {
        const map = new Map<string, GoogleAppsScript.Spreadsheet.Range[]>();
        
        const charts = sheet.getCharts().reverse();
        let chartIds: string[] = [];
        for (const chart of charts) {
            const chartId = chart.getChartId();
            if (chartId != null) {
                chartIds.push(chartId.toString());
            }
        }
        
        const dataRows = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
        let row = 1;
        let firstRangeRow = row + 1;
        let lastRangeRow = row + 1;
    
        for (const chartId of chartIds) {
            const ranges: GoogleAppsScript.Spreadsheet.Range[] = [];
            while (row < dataRows.length && dataRows[row][0] != '') {
                row++;
            }
            lastRangeRow = row;

            const glycemicDataRange = sheet.getRange(firstRangeRow, 2, lastRangeRow - firstRangeRow + 1, 2);
            const hypoThresholdDataRange = sheet.getRange(firstRangeRow, 16, lastRangeRow - firstRangeRow + 1, 1);
            const hyperThresholdDataRange = sheet.getRange(firstRangeRow, 17, lastRangeRow - firstRangeRow + 1, 1);
            ranges.push(glycemicDataRange, hypoThresholdDataRange, hyperThresholdDataRange);

            map.set(chartId, ranges);

            row = row + 2;
            firstRangeRow = row + 1;
        }
    
        return map;
    }
}