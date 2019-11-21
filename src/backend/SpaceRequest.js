const { query } = require('./dbHelper');

class SpaceRequest {
  constructor(id, requestingUser, startDate, endDate, owner, status, spaceId) {

    this.id = id;
    this.requestingUser = requestingUser;
    this.startDate = startDate;
    this.endDate = endDate;
    this.owner = owner;
    this.status = status;
    this.spaceId = spaceId;
  }

  static async listAll() {
    let list = [];
    const result = await query('SELECT * FROM SpaceRequest');
    result.forEach(data => {
      list.push(new SpaceRequest(data.id, data.requestinguser, data.startdate, data.enddate, data.owner, data.status, data.spaceid));
    });
    return list;
  }

  static async add(requestingUser, startDate, endDate, owner, status, spaceId) {
    const result = await query(`INSERT INTO SpaceRequest( requestinguser, startdate, enddate, owner, status, spaceid) 
                        VALUES('${requestingUser}','${startDate}', '${endDate}', '${owner}', '${status}', ${spaceId})`);
    return new SpaceRequest(result.insertId, requestingUser, startDate, endDate, owner, status, spaceId);
  }

  static async listByRequester(requestingUser) {
    let list = [];
    const result = await query(`SELECT * FROM SpaceRequest WHERE requestinguser = '${requestingUser}'`);
    result.forEach(data => {
      list.push(new SpaceRequest(data.id, data.requestinguser, data.startdate, data.enddate, data.owner, data.status, data.spaceid));
    });
    return list;
  }

  static async listByOwner(owner) {
    let list = [];
    const result = await query(`SELECT * FROM SpaceRequest WHERE owner = '${owner}'`);
    result.forEach(data => {
      list.push(new SpaceRequest(data.id, data.requestinguser, data.startdate, data.enddate, data.owner, data.status, data.spaceid));
    });
    return list;
  }

  static async setStatus(id, newStatus) {
    await query(`UPDATE SpaceRequest SET status = '${newStatus}' WHERE id = ${id}`);
  }

  static async createRequest(id, requestingUser, checkIn, CheckOut, owner, available) {
    return new SpaceRequest(id, requestingUser, checkIn, CheckOut, owner, available)
  };
}

module.exports = SpaceRequest;