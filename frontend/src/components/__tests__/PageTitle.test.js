import { render, screen } from "@testing-library/react";
import PageTitle from "../PageTitle";

/* Mock next/link */
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("PageTitle Component", () => {
  test("renders default title and description", () => {
    render(<PageTitle />);

    expect(screen.getByRole("heading", { name: "About Us" }))
      .toBeInTheDocument();

    expect(
      screen.getByText(
        /Learn more about our mission, values, and the team dedicated/i
      )
    ).toBeInTheDocument();
  });

  test("renders custom title and description", () => {
    render(
      <PageTitle
        title="Courses"
        description="Browse our courses"
      />
    );

    expect(screen.getByRole("heading", { name: "Courses" }))
      .toBeInTheDocument();

    expect(screen.getByText("Browse our courses"))
      .toBeInTheDocument();
  });

  test("renders breadcrumb links correctly", () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Courses", href: "/courses" },
      { label: "React" }
    ];

    render(<PageTitle breadcrumbs={breadcrumbs} />);

    // linked breadcrumb
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");

    const coursesLink = screen.getByRole("link", { name: "Courses" });
    expect(coursesLink).toHaveAttribute("href", "/courses");

    // current page (no link)
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("last breadcrumb has current class", () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "About Us" }
    ];

    const { container } = render(<PageTitle breadcrumbs={breadcrumbs} />);

    const items = container.querySelectorAll("ol li");

    expect(items[items.length - 1]).toHaveClass("current");
  });

  test("non-last breadcrumb does not have current class", () => {
    const breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Team" }
    ];

    const { container } = render(<PageTitle breadcrumbs={breadcrumbs} />);

    const items = container.querySelectorAll("ol li");

    expect(items[0]).not.toHaveClass("current");
    expect(items[1]).not.toHaveClass("current");
    expect(items[2]).toHaveClass("current");
  });
});
