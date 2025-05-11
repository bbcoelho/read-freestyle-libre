function doGet() {
	const SPREAD_SHEET_ID = '1NRH4u6tyr5RJPwq1tkvKXuRAnLPAMSTVC8T2YVRCsHY';
	const SHEET_NAME = 'Leituras';

	const sheet = View.getSheet(SPREAD_SHEET_ID, SHEET_NAME);

	// get last 24 hours in milliseconds
	const endTime = Date.now();
	const startTime = endTime - (1000 * 60 * 60 * 24);

	const dataPoints = Model.fetchData(startTime, endTime);
	if (dataPoints) {
		View.render(dataPoints, sheet);
	}
}