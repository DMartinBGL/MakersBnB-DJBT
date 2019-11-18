class Space {
  constructor(id, name, address, startDate, endDate, owner, available, dateCreated, price) {

    this.id = id;
    this.name = name;
    this.address = address;
    this.startDate = startDate;
    this.endDate = endDate;
    this.owner = owner;
    this.available = available;
    this.dateCreated = dateCreated;
    this.price = price;
  }
}

module.exports = Space;