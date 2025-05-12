function doGet() {
	const SPREAD_SHEET_ID = '1NRH4u6tyr5RJPwq1tkvKXuRAnLPAMSTVC8T2YVRCsHY';
	const SHEET_NAME = 'TESTE';

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
	}

	// stores the last endTime
	PropertiesService.getScriptProperties().setProperty('lastEndTime', endTime.toString());
}