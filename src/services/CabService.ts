import CabModel from "../models/cab";
export default class CabService {
    async getNearbyCabs(request: {
        coordinates: number[], maxDistanceInMeters: number,
        pageOptions: { page: number, limit: number }
    }) {
        return await CabModel.find()
            .where('currentLocation')
            .near({
                center: {
                    type: "Point",
                    coordinates: request.coordinates
                },
                maxDistance: request.maxDistanceInMeters
            })
            .skip(request.pageOptions.page * request.pageOptions.limit)
            .limit(request.pageOptions.limit);;
    }
}