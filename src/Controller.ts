function doGet() {
	const sheet = View.getSheet();

	sheet.clearContents();

	const dataPoints = Model.fetchData();
	if (dataPoints) {
		for (const dataPoint of dataPoints) {
			View.render(dataPoint, sheet);
		}
	}
}