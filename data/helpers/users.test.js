const db = require("./users");

describe("user database helpers", () => {
  it("should get users", async () => {
    const getTest = await db.getByUserName();
    expect(getTest).toBe(null);
  });
});
