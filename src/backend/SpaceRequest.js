class SpaceRequest {
  constructor(id, requestingUser, startDate, endDate, owner, available, dateCreated,) {

    this.id = id;
    this.requestingUser = requestingUser;
    this.startDate = startDate;
    this.endDate = endDate;
    this.owner = owner;
    this.available = available;
    this.dateCreated = dateCreated;
  }
}

module.exports = SpaceRequest;