function doGet() {
	const SPREAD_SHEET_ID = '1NRH4u6tyr5RJPwq1tkvKXuRAnLPAMSTVC8T2YVRCsHY';
	const SHEET_NAME = 'Leituras';

	const sheet = View.getSheet(SPREAD_SHEET_ID, SHEET_NAME);

	// get last 24 hours in milliseconds
	let startTime: number;
	let endTime: number;

	let lastEndTime = PropertiesService.getScriptProperties().getProperty('lastEndTime');
	if (!lastEndTime) {
		endTime = Date.now();
		startTime = endTime - (1000 * 60 * 60 * 24);
	} else {
		startTime = parseInt(lastEndTime);
		endTime = startTime + (1000 * 60 * 60 * 24);
	}

	const dataPoints = Model.fetchData(startTime, endTime);
	if (dataPoints) {
		View.render(dataPoints, sheet);
		updateCharts();
	}

	// stores the last endTime
	PropertiesService.getScriptProperties().setProperty('lastEndTime', endTime.toString());

	sheet.copyTo(SpreadsheetApp.openById(SPREAD_SHEET_ID));
}

function updateCharts() {
	const SPREAD_SHEET_ID = '1NRH4u6tyr5RJPwq1tkvKXuRAnLPAMSTVC8T2YVRCsHY';
	const SHEET_NAME = 'Leituras';

	const sheet = View.getSheet(SPREAD_SHEET_ID, SHEET_NAME);

	const map = mapChartRanges(sheet);

	const charts = sheet.getCharts();
	for (let chart of charts) {
		const chartId = chart.getChartId();
		console.log("chartId: ", chartId);
		if (chartId != null) {
			const range = map.get(chartId.toString());
			if (range) {
				console.log("range: ", range.getValues().length);
				chart = chart.modify().clearRanges().addRange(range).build();
				sheet.updateChart(chart);
			}
		}
	}
}

function mapChartRanges(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
	const map = new Map<string, GoogleAppsScript.Spreadsheet.Range>();
	
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
		while (row < dataRows.length && dataRows[row][0] != '') {
			row++;
		}
		lastRangeRow = row;
		map.set(chartId, sheet.getRange(firstRangeRow, 2, lastRangeRow - firstRangeRow + 1, 2));
		row = row + 2;
		firstRangeRow = row + 1;
	}

	return map;
}