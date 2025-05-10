namespace Model {

    type rawData = {
        glycemic: number;
        time: number;
        range: number;
    }

    export type dataPoint = {
        time: Date;
        glycemic: number;
    }

    export class DataPoint {

        private data: dataPoint;


        constructor(data: rawData) {
            this.data = this.parseData(data);
        }


        getData(): dataPoint {
            return this.data;
        }

        private parseData(data: rawData): dataPoint {
            return {
                time: new Date(data.time),
                glycemic: data.glycemic * 18.018
            }
        }

    }

    export function fetchData(): dataPoint[] | null {
        const dataPoints: dataPoint[] = [];
        try {
            const response = UrlFetchApp.fetch(`https://global.awxbio.cool/remote/glycemic/api/110012?start_time=1746807176845&end_time=1746893576845&openid=c65d3d607944ed92f4e4f4893cfe4a12`);
            const data = JSON.parse(response.getContentText()).data.glycemic_list;
            for (const item of data) {
                const dataPoint = new Model.DataPoint(item).getData();
                dataPoints.push(dataPoint);
            }
            return dataPoints;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}