const { query } = require('./dbHelper');

function makeDate(date) {
  return new Date(date).toISOString().split("T")[0].toString();
}

class Space {
  constructor(id, name, address, startDate, endDate, owner, available, dateCreated, description, price) {

    this.id = id;
    this.name = name;
    this.address = address;
    this.startDate = startDate;
    this.endDate = endDate;
    this.owner = owner;
    this.available = available;
    this.dateCreated = dateCreated;
    this.description = description;
    this.price = price;
  }

  static async clear() {
    const result = await query('DROP TABLE Space');
  }

  static async init() {
    const result = await query('CREATE TABLE Space(id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), owner VARCHAR(255), available VARCHAR(255), startdate DATE, enddate DATE, datecreated DATE, description TEXT, price DOUBLE)');
  }

  static async list() {
    let list = [];
    const result = await query('SELECT * FROM Space'); 
    result.forEach(data => {
      list.push(new Space(data.id, data.name, data.address, makeDate(data.startdate), makeDate(data.enddate), data.owner, data.available, makeDate(data.datecreated), data.description, data.price));
    });
    return list;
  }

  static async add(name, address, startDate, endDate, owner, available, dateCreated, description, price) {
    const result = await query(`INSERT INTO Space(name, address, owner, available, startdate, enddate, datecreated, description, price) 
                        VALUES('${name}', '${address}', '${owner}', '${available}', '${startDate}', '${endDate}', '${dateCreated}', '${description}', ${price})`);
    return new Space(result.insertId, name, address, startDate, endDate, owner, available, dateCreated, description, price);                    
  }

  static async getOne(id) {
    const result = await query(`SELECT * FROM Space WHERE id = ${id}`);
    if (result[0] === undefined) return null;
    const data = result[0];
    return new Space(data.id, data.name, data.address, makeDate(data.startdate), makeDate(data.enddate), data.owner, data.available == 'true', makeDate(data.datecreated), data.description, data.price);

  }

  static async removeOne(id) {
    await query(`DELETE FROM Space WHERE id = ${id}`);
  }
}

module.exports = Space;