const { query } = require('./dbHelper');

function makeDate(date) {
  return new Date(date).toISOString().split("T")[0].toString();
}

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

  static async clear() {
    const result = await query('DROP TABLE Space');
  }

  static async init() {
    const result = await query('CREATE TABLE Space(id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), owner VARCHAR(255), available VARCHAR(255), startdate DATE, enddate DATE, datecreated DATE, price DOUBLE)');
  }

  static async list() {
    let list = [];
    const result = await query('SELECT * FROM Space'); 
    result.forEach(data => {
      list.push(new Space(data.id, data.name, data.address, makeDate(data.startdate), makeDate(data.enddate), data.owner, data.available, makeDate(data.datecreated), data.price));
    });
    return list;
  }

  static async add(name, address, startDate, endDate, owner, available, dateCreated, price) {
    const result = await query(`INSERT INTO Space(name, address, owner, available, startdate, enddate, datecreated, price) 
                        VALUES('${name}', '${address}', '${owner}', '${available}', '${startDate}', '${endDate}', '${dateCreated}', ${price})`);
    return new Space(result.insertId, name, address, startDate, endDate, owner, available, dateCreated, price);                    
  }

  static async getOne(id) {
    const result = await query(`SELECT * FROM Space WHERE id = ${id}`);
    const data = result[0];
    return new Space(data.id, data.name, data.address, makeDate(data.startdate), makeDate(data.enddate), data.owner, data.available, makeDate(data.datecreated), data.price);

  }

  static async delete() {
    const result = await query();
  }
}

module.exports = Space;