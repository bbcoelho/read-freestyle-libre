function doGet() {
	const spreadSheet = SpreadsheetApp.openById('1NRH4u6tyr5RJPwq1tkvKXuRAnLPAMSTVC8T2YVRCsHY');

	const sheet = spreadSheet.getSheetByName('Sheet1');
	if (!sheet) {
		throw new Error('Sheet not found');
	}

	sheet.clearContents();

	try {
		const response = UrlFetchApp.fetch('https://global.awxbio.cool/remote/glycemic/api/110012?start_time=1746807176845&end_time=1746893576845&openid=c65d3d607944ed92f4e4f4893cfe4a12');
		const data = JSON.parse(response.getContentText()).data.glycemic_list;
		for (const item of data) {
			const dataPoint = new Model.DataPoint(item).getData();
			sheet.appendRow([dataPoint.time, dataPoint.glycemic]);
		}
	} catch (error) {
		console.log(error);
	}
}