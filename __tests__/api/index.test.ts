import { hello } from "../../src/api";

describe("hello", () => {
    it("returns the value of HELLO", () => {
        process.env.HELLO = "world";
        expect(hello()).toEqual("world");
    });

    it("returns undefined if HELLO is not set", () => {
        delete process.env.HELLO;
        expect(hello()).toBeUndefined();
    });
});
