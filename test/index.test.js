const { capitalizeWords, filterActiveUsers, logAction } = require('../index')

// Tests for capitalizeWords()
describe("capitalizeWords()", () => {
  test("capitalizes the first letter of each word", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  test("handles a single word", () => {
    expect(capitalizeWords("javascript")).toBe("Javascript");
  });

  test("handles words that are already capitalized", () => {
    expect(capitalizeWords("Hello World")).toBe("Hello World");
  });

  test("capitalizes words that start with lowercase letters", () => {
    expect(capitalizeWords("hELLO wORLD")).toBe("HELLO WORLD");
  });

  test("returns an empty string when given an empty string", () => {
    expect(capitalizeWords("")).toBe("");
  });

  test("capitalizes every word in a sentence", () => {
    expect(
      capitalizeWords("welcome to my javascript project")
    ).toBe("Welcome To My Javascript Project");
  });
});


// Tests for filterActiveUsers()
describe("filterActiveUsers()", () => {
  const users = [
    { name: "Alice", isActive: true },
    { name: "Bob", isActive: false },
    { name: "Charlie", isActive: true },
    { name: "Diana", isActive: false },
  ];

  test("returns only active users", () => {
    expect(filterActiveUsers(users)).toEqual([
      { name: "Alice", isActive: true },
      { name: "Charlie", isActive: true },
    ]);
  });

  test("returns an empty array when there are no users", () => {
    expect(filterActiveUsers([])).toEqual([]);
  });

  test("returns an empty array when all users are inactive", () => {
    const inactiveUsers = [
      { name: "Bob", isActive: false },
      { name: "Diana", isActive: false },
    ];

    expect(filterActiveUsers(inactiveUsers)).toEqual([]);
  });

  test("returns all users when every user is active", () => {
    const activeUsers = [
      { name: "Alice", isActive: true },
      { name: "Charlie", isActive: true },
    ];

    expect(filterActiveUsers(activeUsers)).toEqual(activeUsers);
  });

  test("does not modify the original users array", () => {
    const input = [...users];
    filterActiveUsers(input);

    expect(input).toEqual(users);
  });

  test("preserves the original order of active users", () => {
    expect(filterActiveUsers(users).map(user => user.name))
      .toEqual(["Alice", "Charlie"]);
  });
});


// Tests for logAction()
describe("logAction()", () => {
  beforeEach(() => {
    // Use a predictable date for each test.
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-11-27T12:00:00.000Z"));
  });

  afterEach(() => {
    // Restore the real clock after each test.
    jest.useRealTimers();
  });

  test("returns the correct login message", () => {
    expect(logAction("login", "Alice")).toBe(
      "User Alice performed login at 2024-11-27T12:00:00.000Z"
    );
  });

  test("includes the correct username and action", () => {
    expect(logAction("logout", "Bob")).toBe(
      "User Bob performed logout at 2024-11-27T12:00:00.000Z"
    );
  });

  test("uses the current timestamp", () => {
    jest.setSystemTime(new Date("2025-01-01T08:30:00.000Z"));

    expect(logAction("purchase", "Charlie")).toBe(
      "User Charlie performed purchase at 2025-01-01T08:30:00.000Z"
    );
  });

  test("supports different action names", () => {
    expect(logAction("password_change", "Diana")).toBe(
      "User Diana performed password_change at 2024-11-27T12:00:00.000Z"
    );
  });
});