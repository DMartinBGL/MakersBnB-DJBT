const Space = require('../src/backend/Space')

describe('Space', () => {

  let space;
  const id = 1;
  const name = 'Paradise Cottage';
  const address = "10, Downsyndrome Street, Bumpkinham, Bullshire, C0 NT";
  const startDate = '01/01/20';
  const endDate = '08/01/20';
  const owner = 'sunny villas'; 
  const available = true;
  const dateCreated = "27/07/2001";
  const price = 84;

  beforeEach(() => {
    space = new Space(id, name, address, startDate, endDate, owner, available, dateCreated, price);
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

    it('shows price per night', () => {
      expect(space.price).toBe(price);
    });
  });
});