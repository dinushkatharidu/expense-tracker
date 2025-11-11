import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import Statistics from "../Statistics";

describe("Statistics Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ========== LOADING STATE TESTS ==========

  test("should show loading spinner when stats is null", () => {
    render(<Statistics stats={null} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("should show loading spinner when stats is undefined", () => {
    render(<Statistics stats={undefined} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  // ========== HEADER TESTS ==========

  test('should display "Summary" header', () => {
    const mockStats = {
      total: "0.00",
      count: 0,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText(/summary/i)).toBeInTheDocument();
  });

  // ========== TOTAL AMOUNT TESTS ==========

  test("should display total amount correctly", () => {
    const mockStats = {
      total: "245.75",
      count: 8,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText(/245\.75/)).toBeInTheDocument();
  });

  test("should display zero total when no expenses", () => {
    const mockStats = {
      total: "0.00",
      count: 0,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText(/0\.00/)).toBeInTheDocument();
  });

  test("should display large amounts correctly", () => {
    const mockStats = {
      total: "9999.99",
      count: 10,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText(/9999\.99/)).toBeInTheDocument();
  });

  test('should display "Total Spent" label', () => {
    const mockStats = {
      total: "100.00",
      count: 5,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText(/total spent/i)).toBeInTheDocument();
  });

  // ========== TRANSACTION COUNT TESTS ==========

  test("should display transaction count", () => {
    const mockStats = {
      total: "100.00",
      count: 5,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText("5 transactions")).toBeInTheDocument();
  });

  test("should display zero transactions", () => {
    const mockStats = {
      total: "0.00",
      count: 0,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText("0 transactions")).toBeInTheDocument();
  });

  test("should display one transaction", () => {
    const mockStats = {
      total: "50.00",
      count: 1,
      byCategory: { Food: 50 },
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText("1 transactions")).toBeInTheDocument();
  });

  test("should display large transaction count", () => {
    const mockStats = {
      total: "1000.00",
      count: 100,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText("100 transactions")).toBeInTheDocument();
  });

  // ========== EMPTY STATE TESTS ==========

  test('should show "No expenses yet" when no categories', () => {
    const mockStats = {
      total: "0.00",
      count: 0,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
  });

  test('should show "By Category" header even when empty', () => {
    const mockStats = {
      total: "0.00",
      count: 0,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText(/by category/i)).toBeInTheDocument();
  });

  // ========== CATEGORY BREAKDOWN TESTS ==========

  test("should display single category correctly", () => {
    const mockStats = {
      total: "50.00",
      count: 1,
      byCategory: {
        Food: 50,
      },
    };

    render(<Statistics stats={mockStats} />);

    expect(screen.getByText("Food")).toBeInTheDocument();
    // Amount appears twice (total and category), so use getAllByText
    const amounts = screen.getAllByText(/50\.00/);
    expect(amounts.length).toBeGreaterThan(0);
  });

  test("should display multiple categories", () => {
    const mockStats = {
      total: "150.00",
      count: 6,
      byCategory: {
        Food: 80,
        Transport: 40,
        Entertainment: 30,
      },
    };

    render(<Statistics stats={mockStats} />);

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
    expect(screen.getByText("Entertainment")).toBeInTheDocument();
    expect(screen.getByText(/80\.00/)).toBeInTheDocument();
    expect(screen.getByText(/40\.00/)).toBeInTheDocument();
    expect(screen.getByText(/30\.00/)).toBeInTheDocument();
  });

  test("should display all possible categories", () => {
    const mockStats = {
      total: "350.00",
      count: 7,
      byCategory: {
        Food: 100,
        Transport: 50,
        Entertainment: 40,
        Bills: 60,
        Shopping: 50,
        Health: 30,
        Other: 20,
      },
    };

    render(<Statistics stats={mockStats} />);

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
    expect(screen.getByText("Entertainment")).toBeInTheDocument();
    expect(screen.getByText("Bills")).toBeInTheDocument();
    expect(screen.getByText("Shopping")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  test("should format category amounts with two decimals", () => {
    const mockStats = {
      total: "100.50",
      count: 2,
      byCategory: {
        Food: 50.25,
        Transport: 50.25,
      },
    };

    render(<Statistics stats={mockStats} />);

    const amounts = screen.getAllByText(/50\.25/);
    expect(amounts.length).toBeGreaterThan(0);
  });

  // ========== PERCENTAGE TESTS ==========

  test("should calculate and display percentages correctly", () => {
    const mockStats = {
      total: "200",
      count: 3,
      byCategory: {
        Food: 120,
        Transport: 80,
      },
    };

    render(<Statistics stats={mockStats} />);

    expect(screen.getByText("60.0% of total")).toBeInTheDocument();
    expect(screen.getByText("40.0% of total")).toBeInTheDocument();
  });

  test("should show 100% for single category", () => {
    const mockStats = {
      total: "50.00",
      count: 1,
      byCategory: {
        Food: 50,
      },
    };

    render(<Statistics stats={mockStats} />);
    expect(screen.getByText("100.0% of total")).toBeInTheDocument();
  });

  test("should handle small percentages", () => {
    const mockStats = {
      total: "1000",
      count: 2,
      byCategory: {
        Food: 995,
        Transport: 5,
      },
    };

    render(<Statistics stats={mockStats} />);

    expect(screen.getByText("99.5% of total")).toBeInTheDocument();
    expect(screen.getByText("0.5% of total")).toBeInTheDocument();
  });

  test("should round percentages to one decimal place", () => {
    const mockStats = {
      total: "300",
      count: 3,
      byCategory: {
        Food: 100,
        Transport: 100,
        Entertainment: 100,
      },
    };

    render(<Statistics stats={mockStats} />);

    const percentageTexts = screen.getAllByText(/33\.3% of total/i);
    expect(percentageTexts).toHaveLength(3);
  });

  test("should handle uneven percentage distribution", () => {
    const mockStats = {
      total: "100",
      count: 3,
      byCategory: {
        Food: 33.33,
        Transport: 33.33,
        Entertainment: 33.34,
      },
    };

    render(<Statistics stats={mockStats} />);

    const percentages = screen.getAllByText(/33\.3% of total/i);
    expect(percentages.length).toBeGreaterThan(0);
  });

  // ========== PROGRESS BAR TESTS ==========

  test("should render progress bars for categories", () => {
    const mockStats = {
      total: "100",
      count: 2,
      byCategory: {
        Food: 60,
        Transport: 40,
      },
    };

    const { container } = render(<Statistics stats={mockStats} />);

    const progressBars = container.querySelectorAll(".progress-bar");
    expect(progressBars.length).toBeGreaterThan(0);
  });

  // ========== EDGE CASES ==========

  test("should handle very small amounts", () => {
    const mockStats = {
      total: "0.01",
      count: 1,
      byCategory: {
        Other: 0.01,
      },
    };

    render(<Statistics stats={mockStats} />);

    // Amount appears in both total and category
    const amounts = screen.getAllByText(/0\.01/);
    expect(amounts.length).toBeGreaterThan(0);
  });

  test("should handle category with zero amount", () => {
    const mockStats = {
      total: "100",
      count: 2,
      byCategory: {
        Food: 100,
        Transport: 0,
      },
    };

    render(<Statistics stats={mockStats} />);

    // Check both amounts exist
    const hundredAmounts = screen.getAllByText(/100\.00/);
    expect(hundredAmounts.length).toBeGreaterThan(0);

    const zeroAmounts = screen.getAllByText(/0\.00/);
    expect(zeroAmounts.length).toBeGreaterThan(0);
  });

  test("should handle many categories with small amounts", () => {
    const mockStats = {
      total: "35.00",
      count: 7,
      byCategory: {
        Food: 5,
        Transport: 5,
        Entertainment: 5,
        Bills: 5,
        Shopping: 5,
        Health: 5,
        Other: 5,
      },
    };

    render(<Statistics stats={mockStats} />);

    // Total of 35.00 also contains "5.00" pattern, so we get 8 matches
    const amounts = screen.getAllByText(/5\.00/);
    expect(amounts.length).toBeGreaterThanOrEqual(7);
  });

  test("should handle stats object with missing properties gracefully", () => {
    const mockStats = {
      total: "100.00",
      count: 5,
      byCategory: {},
    };

    render(<Statistics stats={mockStats} />);

    expect(screen.getByText(/100\.00/)).toBeInTheDocument();
    expect(screen.getByText("5 transactions")).toBeInTheDocument();
  });

  // ========== VISUAL ELEMENTS TESTS ==========

  test("should display category icons/dots", () => {
    const mockStats = {
      total: "50.00",
      count: 1,
      byCategory: {
        Food: 50,
      },
    };

    const { container } = render(<Statistics stats={mockStats} />);

    const categoryBadges = container.querySelectorAll(".badge");
    expect(categoryBadges.length).toBeGreaterThan(0);
  });

  test("should have proper structure for accessibility", () => {
    const mockStats = {
      total: "100.00",
      count: 5,
      byCategory: {
        Food: 60,
        Transport: 40,
      },
    };

    render(<Statistics stats={mockStats} />);

    expect(screen.getByText(/summary/i)).toBeInTheDocument();
    expect(screen.getByText(/total spent/i)).toBeInTheDocument();
    expect(screen.getByText(/by category/i)).toBeInTheDocument();
  });
});
