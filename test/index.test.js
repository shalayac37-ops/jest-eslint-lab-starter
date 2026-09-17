const {
    capitalizeWords,
    filterActiveUsers,
    logAction,
} = require("../index");

describe("capitalizeWords", () => {
    test("capitalizes the first letter of each word", () => {
        expect(capitalizeWords("hello world")).toBe("Hello World");
    });

    test("handles multiple words", () => {
        expect(capitalizeWords("the quick brown fox")).toBe(
            "The Quick Brown Fox"
        );
    });

    test("handles an empty string", () => {
        expect(capitalizeWords("")).toBe("");
    });

    test("handles a single word", () => {
        expect(capitalizeWords("javascript")).toBe("Javascript");
    });
});

describe("filterActiveUsers", () => {
    test("returns only active users", () => {
        const users = [
            { name: "Alice", isActive: true },
            { name: "Bob", isActive: false },
        ];

        expect(filterActiveUsers(users)).toEqual([
            { name: "Alice", isActive: true },
        ]);
    });

    test("returns an empty array when there are no active users", () => {
        const users = [
            { name: "Alice", isActive: false },
            { name: "Bob", isActive: false },
        ];

        expect(filterActiveUsers(users)).toEqual([]);
    });

    test("returns all users when all users are active", () => {
        const users = [
            { name: "Alice", isActive: true },
            { name: "Bob", isActive: true },
        ];

        expect(filterActiveUsers(users)).toEqual(users);
    });

    test("handles an empty array", () => {
        expect(filterActiveUsers([])).toEqual([]);
    });
});

describe("logAction", () => {
    test("returns the correct log message with a timestamp", () => {
        const result = logAction("login", "Alice");

        expect(result).toMatch(
            /^User Alice performed login at \d{4}-\d{2}-\d{2}T.*Z$/
        );
    });

    test("includes the action and username", () => {
        const result = logAction("logout", "Bob");

        expect(result).toContain("User Bob performed logout at");
    });

    test("returns a timestamp in ISO format", () => {
        const result = logAction("post", "Charlie");
        const timestamp = result.split(" at ")[1];

        expect(() => new Date(timestamp)).not.toThrow();
        expect(timestamp).toBe(new Date(timestamp).toISOString());
    });
});