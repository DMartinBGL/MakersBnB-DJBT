class SpaceRequest {
  constructor(id, requestingUser, startDate, endDate, owner, available) {

    this.id = id;
    this.requestingUser = requestingUser;
    this.startDate = startDate;
    this.endDate = endDate;
    this.owner = owner;
    this.available = available;
  }


  static async createRequest(id, requestingUser, checkIn, CheckOut, owner, available) {
    return new SpaceRequest(id, requestingUser, checkIn, CheckOut, owner, available)
  };


}

module.exports = SpaceRequest;