const request = require("supertest");
const app = require("../server");

describe("API tests", () => {
    test("GET / should return welcome message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toContain("Welcome to PromptTrack API");
    });
});