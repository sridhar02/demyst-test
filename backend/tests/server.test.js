const request = require("supertest");
const axios = require("axios");

const app = require("../server");

jest.mock("axios");

describe("GET /api/reports/balancesheet", () => {
  it("should return balance sheet data", async () => {
    const mockData = { Reports: [{ ReportID: "BalanceSheet" }] };
    axios.get.mockResolvedValue({ data: mockData });

    const response = await request(app).get("/api/reports/balancesheet");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("should handle errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    const response = await request(app).get("/api/reports/balancesheet");
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to fetch data from Docker API",
    });
  });

  it("should handle 404 errors", async () => {
    axios.get.mockRejectedValue({ response: { status: 404 } });

    const response = await request(app).get("/api/reports/balancesheet");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "API endpoint not found" });
  });
});
