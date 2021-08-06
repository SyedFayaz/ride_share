import CabService from "../services/CabService";
export default class CabController {

    async getNearbyCabs(param: any) {
        let options = {
            coordinates: [parseFloat(param.longitude), parseFloat(param.latitude)],
            maxDistanceInMeters: parseFloat(param.maxDistance),
            pageOptions: {
                page: 0, limit: 0
            }
        }
        let cabService = new CabService();
        return cabService.getNearbyCabs(options);
    }
}