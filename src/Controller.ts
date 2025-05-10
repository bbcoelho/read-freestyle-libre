function doGet() {
	const SPREAD_SHEET_ID = '1NRH4u6tyr5RJPwq1tkvKXuRAnLPAMSTVC8T2YVRCsHY';
	const SHEET_NAME = 'Leituras';

	const sheet = View.getSheet(SPREAD_SHEET_ID, SHEET_NAME);

	sheet.clearContents();

	const startTime = new Date('2025-05-10T00:00:00Z').getTime();
	const endTime = new Date('2025-05-11T00:00:00Z').getTime();

	const dataPoints = Model.fetchData(startTime, endTime);
	if (dataPoints) {
		for (const dataPoint of dataPoints) {
			View.render(dataPoint, sheet);
		}
	}
}