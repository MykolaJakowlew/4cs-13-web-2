const { createDish } = require('./create');

const DishesMock = {};

jest.mock('../../../models', () => {
 DishesMock.save = jest.fn();
 return {
  Dishes: jest.fn()
   .mockImplementation(() => {
    return { save: DishesMock.save };
   }),
 };
});

describe("createDish", () => {
 it('successful', async () => {
  const req = {
   body: { price: 45, isAvailable: false }
  };

  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  const mockDoc = { price: 45, isAvailable: false };
  DishesMock.save.mockReturnValueOnce(mockDoc);

  await createDish(req, res);

  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledWith(req.body);
 });

 it("default value isAvailable is true", async () => {
  const req = { body: { price: 45 } };
  const res = {
   status: jest.fn().mockImplementation(() => res),
   send: jest.fn()
  };

  const mockDoc = { price: 45, isAvailable: false };
  DishesMock.save.mockReturnValueOnce(mockDoc);

  await createDish(req, res);

  expect(res.send).toBeCalledWith({
   ...req.body,
   isAvailable: true
  });
 });
});