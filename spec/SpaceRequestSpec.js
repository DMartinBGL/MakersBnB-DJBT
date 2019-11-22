const SpaceRequest = require('../src/backend/SpaceRequest')

describe('SpaceRequest', () => {

  let spaceRequest;
  const date = new Date().toISOString().split("T")[0].toString();
  const id = 1;
  const requestingUser = 2;
  const startDate = date;
  const endDate = date;
  const owner = 3; 
  const status = "pending";
  const spaceId = 4;

  beforeEach(() => {
    spaceRequest = new SpaceRequest(id, requestingUser, startDate, endDate, owner, status, spaceId);
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
      const request = await SpaceRequest.add(requestingUser, startDate, endDate, owner, status, spaceId);
      expect(request).toEqual(spaceRequest);
    });

    it('lists any added requests', async () => {
      const request = await SpaceRequest.add(requestingUser, startDate, endDate, owner, status, spaceId);
      const list = await SpaceRequest.listAll();
      expect(list[0]).toEqual(request);
    });

    it('lists by requester', async () => {
      const request1 = await SpaceRequest.add(requestingUser, startDate, endDate, owner, status, spaceId);
      const request2 = await SpaceRequest.add(67, startDate, endDate, owner, status, spaceId);
      expect(await SpaceRequest.listByRequester(67)).toEqual([request2])
    });

    it('list by owner', async () => {
      const request1 = await SpaceRequest.add(requestingUser, startDate, endDate, owner, status, spaceId);
      const request2 = await SpaceRequest.add(67, startDate, endDate, 89, status, spaceId);
      expect(await SpaceRequest.listByOwner(89)).toEqual([request2])
    });

    it('sets a the status of a property', async () => {
      const request = await SpaceRequest.add(requestingUser, startDate, endDate, owner, status, spaceId);
      await SpaceRequest.setStatus(request.id, "declined");
      request.status = "declined";
      expect(await SpaceRequest.listAll()).toEqual([request]);
    });

    // it('creates a request', async () => {
    //   expect(await SpaceRequest.createRequest()).toEqual(spaceRequest);
    // })
  });
});