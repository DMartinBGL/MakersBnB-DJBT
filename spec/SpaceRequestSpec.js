const SpaceRequest = require('../src/backend/SpaceRequest')

describe('SpaceRequest', () => {

  let spaceRequest;
  const id = 1;
  const requestingUser = 2;
  const startDate = '01/01/20';
  const endDate = '08/01/20';
  const owner = 3; 
  const status = true;
  const dateCreated = "27/07/2001";

  beforeEach(() => {
    spaceRequest = new SpaceRequest(id, requestingUser, startDate, endDate, owner, status, dateCreated);
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
  });

  describe('Database methods', () => {
  
    beforeEach(() => {
      SpaceRequest.clear();
      SpaceRequest.init();
    });

    it('list initially empty', async () => {
      const list = await SpaceRequest.listAll();
      expect(list.length).toBe(0)
    });

    it('adds a request', async () => {
      const request = await SpaceRequest.add(requestingUser, startDate, endDate, owner, status, dateCreated);
      expect(request).toEqual(spaceRequest);
    });

    // it('lists any added requests', async () => {

    //   const list = await SpaceRequest.listAll();
    // });
  });
});