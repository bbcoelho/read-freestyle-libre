namespace Model {

    type rawData = {
        glycemic: number;
        time: number;
        range: number;
    }

    type dataPoint = {
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

}