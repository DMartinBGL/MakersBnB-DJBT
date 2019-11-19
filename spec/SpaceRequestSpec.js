const SpaceRequest = require('../src/backend/SpaceRequest')

describe('SpaceRequest', () => {

  let spaceRequest;
  const id = 1;
  const requestingUser = 2;
  const startDate = '01/01/20';
  const endDate = '08/01/20';
  const owner = 3; 
  const available = true;
  const dateCreated = "27/07/2001";

  beforeEach(() => {
    spaceRequest = new SpaceRequest(id, requestingUser, startDate, endDate, owner, available, dateCreated);
  });

  it('Can be an instance of Space', () => {
    expect(spaceRequest).toBeInstanceOf(SpaceRequest);
  });

  describe('properties', () => {
    it('has an id', () => {
      expect(spaceRequest.id).toBe(id);
    });

    it('allows you to select a start date', () => {
      expect(spaceRequest.startDate).toBe(startDate);
    });

    it('allows you to select and end date', () => {
      expect(spaceRequest.endDate).toBe(endDate);
    });

    it('shows you who the owner is', () => {
      expect(spaceRequest.owner).toBe(owner);
    });

    it('tells you if the location is available', () => {
      expect(spaceRequest.available).toBe(available);
    });

    it('shows when the advert was created', () => {
      expect(spaceRequest.dateCreated).toBe(dateCreated);
    });
  });
});