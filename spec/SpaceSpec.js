const Space = require('../src/backend/Space')

describe('Space', () => {

  let space;
  const date = new Date().toISOString().split("T")[0].toString();
  const id = 1;
  const name = 'Paradise Cottage';
  const address = "10, Big Street, Little Town, Mediumshire, CE1 NT";
  const startDate = date;
  const endDate = date;
  const owner = 'sunny villas'; 
  const available = true;
  const dateCreated = date;
  const description = "lorem epsom";
  const price = 84;

  beforeEach(() => {
    space = new Space(id, name, address, startDate, endDate, owner, available, dateCreated, description, price);
  });

  it('Can be an instance of Space', () => {
    expect(space).toBeInstanceOf(Space);
  });

  describe('properties', () => {
    it('has an id', () => {
      expect(space.id).toBe(id);
    });

    it('has a property name', () => {
      expect(space.name).toBe(name);
    });

    it('displays location of property', () => {
      expect(space.address).toBe(address);
    });

    it('allows you to select a start date', () => {
      expect(space.startDate).toBe(startDate);
    });

    it('allows you to select and end date', () => {
      expect(space.endDate).toBe(endDate);
    });

    it('shows you who the owner is', () => {
      expect(space.owner).toBe(owner);
    });

    it('tells you if the location is available', () => {
      expect(space.available).toBe(available);
    });

    it('shows when the advert was created', () => {
      expect(space.dateCreated).toBe(dateCreated);
    });

    it('has a description', () => {
      expect(space.description).toBe(description);
    });

    it('shows price per night', () => {
      expect(space.price).toBe(price);
    });
  });

  describe('database methods', () => {
    beforeEach(async () => {
      await Space.clear();
      await Space.init();
    });

    it('is initially empty', async () => {
      const list = await Space.list();
      expect(list.length).toBe(0);
    });

    it('allow us to add listing to space table', async () => {
      const space = await Space.add(name, address, startDate, endDate, owner, available, dateCreated, description, price);
      //console.log(space);
      expect(space).toBeInstanceOf(Space);
    });

    it('gets one', async () => {
      const savedSpace = await Space.add(name, address, startDate, endDate, owner, available, dateCreated, description, price);
      expect(await Space.getOne(savedSpace.id)).toEqual(savedSpace);
    });

    it('removes a space', async () => {
      const savedSpace = await Space.add(name, address, startDate, endDate, owner, available, dateCreated, description, price); 
      await Space.removeOne(savedSpace.id);
      expect(await Space.getOne(savedSpace.id)).toBe(null);
    });
  });
});