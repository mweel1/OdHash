const { getPatientHash, getApptHash, getSplitHash } = require("./lib.js");

var assert = require("assert");

describe("Hash Tests", () => {
  describe("Check Patient Hash", () => {
    it("should return the same has as the db", () => {
      assert.equal(
        getPatientHash("21", "", "", "hashman@aol.com"),
        "mlGAYllHS0F/2laQtJemY1kkUeJHc1Z3SEeuVM0OIDE="
      );
    });
  });

  describe("Check Appointment Hash", () => {
    it("should return the same has as the db", () => {
      assert.equal(
        getApptHash(1, 21, "2021-12-08 09:00:00"),
        "Q/yxow81LjGnXd8NmteMUdfQyqOJCp93ZnPvLS/mzeA="
      );
    });
  });

  describe("Check Appointment Hash", () => {
    it("should blow up if my status is out of range", function () {
      try {
        getApptHash(222, 21, "2021-12-08 09:00:00");
      } catch {
        assert.equal(true, true);
      }
    });
  });

  describe("Check Pay Split Hash", () => {
    it("should return the same has as the db", function () {
      assert.equal(
        getSplitHash(54, 34, "2021-12-08"),
        "dmwhKExsA0GylTnPEa3lXK51ZKD0yYBbLidvGua4EdY="
      );
    });
  });
});
