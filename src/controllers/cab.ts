import CabService from "../services/cabService";
export default class CabController {

    async getNearbyCabs(param) {
        let sanitisedParam = this.sanitise(param);
        let request = this.prepareRequest(sanitisedParam);
        let cabService = new CabService();
        return await cabService.getNearbyCabs(request);
    }

    private sanitise(param) {
        return {
            longitude: parseFloat(param.longitude),
            latitude: parseFloat(param.latitude),
            maxDistance: parseFloat(param.maxDistance),
            page: parseInt(param.page) || 0,
            limit: parseInt(param.limit) || 0
        }
    }

    private prepareRequest(request) {
        return {
            coordinates: [request.longitude, request.latitude],
            maxDistanceInMeters: request.maxDistance,
            pageOptions: {
                page: request.page, limit: request.limit
            }
        }
    }
}