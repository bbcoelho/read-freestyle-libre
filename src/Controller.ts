function doGet() {
	const spreadSheet = SpreadsheetApp.openById('1NRH4u6tyr5RJPwq1tkvKXuRAnLPAMSTVC8T2YVRCsHY');
	const sheet = spreadSheet.getSheetByName('Sheet1');
	try {
		const response = UrlFetchApp.fetch('https://global.awxbio.cool/remote/glycemic/api/107462?start_time=1746153818834&end_time=1746240218834&openid=e24d053ec64449a2ee4b75f9e55d1987');
		console.log(JSON.parse(response.getContentText()).data);
	} catch (error) {
		console.log(error);
	}
}