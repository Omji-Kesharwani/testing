import { describe, expect, it, beforeAll } from "vitest";
import { app } from "../index";
import request from "supertest";

// Wait for database to be ready
const waitForDatabase = async (maxAttempts = 10, delay = 1000) => {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            const response = await request(app).get('/health');
            if (response.status === 200 && response.body.status === "healthy") {
                console.log('✅ Database is ready for testing');
                return;
            }
        } catch (error) {
            console.log(`⏳ Waiting for database... attempt ${i + 1}/${maxAttempts}`);
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    throw new Error('Database not ready after maximum attempts');
};

describe("Test Setup", () => {
    beforeAll(async () => {
        await waitForDatabase();
    });
});

describe("Health Check", () => {
    it("should return healthy status", async () => {
        const { status, body } = await request(app).get('/health');
        expect(status).toBe(200);
        expect(body.status).toBe("healthy");
        expect(body.database).toBe("connected");
    });
});

describe("POST /sum", () => {
    it("should sum add 2 numbers", async () => {
        const { status, body } = await request(app).post('/sum').send({
            a: 1,
            b: 2
        })
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 3, id: expect.any(Number) });
    });
})

describe("POST /sum", () => {
    it("should sum add 2 negative numbers", async () => {
        const { status, body } = await request(app).post('/sum').send({
            a: -1,
            b: -2
        })
        expect(status).toBe(200);
        expect(body).toEqual({ answer: -3, id: expect.any(Number) });
    });
})