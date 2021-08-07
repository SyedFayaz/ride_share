interface PingResponse {
  data: string;
}

export default class PingController {
  public async getMessage(): Promise<PingResponse> {
    return {
      data: "ok",
    };
  }
}