const { wrapperApi } = require('./wrapperApi');

describe("wrapperApi", () => {

 describe("should execute", () => {
  it("successfully", async () => {
   const apiHandler = wrapperApi(jest.fn());
   await expect(apiHandler).not.toThrow();
  });

  it("handler", async () => {
   const mock = jest.fn();
   const apiHandler = wrapperApi(mock);
   await apiHandler();
   expect(mock).toBeCalled();
  });

  it("handler with arguments", async () => {
   const mock = jest.fn();
   const apiHandler = wrapperApi(mock);
   const req = jest.fn(), res = jest.fn();
   await apiHandler(req, res);
   expect(mock).toBeCalledWith(req, res);
  });
 });

 describe("should return when handler throw error", () => {
  it("500 status code", async () => {
   const mock = jest.fn()
    .mockRejectedValue(new Error());
   // .mockImplementation(async () => { throw new Error(); });
   const apiHandler = wrapperApi(mock);
   const req = jest.fn();
   const res = {
    status: jest.fn()
     .mockImplementation(() => res),
    send: jest.fn(),
   };
   await apiHandler(req, res);
   expect(res.status).toBeCalledWith(500);
  });


  it("correct response", async () => {
   const err = new Error("PLACEHOLDER");
   const mock = jest.fn()
    .mockRejectedValue(err);
   const apiHandler = wrapperApi(mock);
   const req = jest.fn();
   const res = {
    status: jest.fn()
     .mockImplementation(() => res),
    send: jest.fn(),
   };
   await apiHandler(req, res);
   expect(res.send).toBeCalledWith({
    message: `Internal server error:${err.toString()}`
   });
  });
 });
});