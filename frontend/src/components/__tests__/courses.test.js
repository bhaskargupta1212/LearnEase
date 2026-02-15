import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Courses from "../courses";

global.fetch = jest.fn();

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }) =>
    React.createElement("a", { href }, children),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));


beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();

  fetch.mockImplementation((url) => {
  if (url.includes("/courses") && !url.includes("my-courses")) {
    return Promise.resolve({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: "Full Stack Web Development (MERN Stack)",
          category: "Web Development",
          price: 4999.0,
          description: "Learn MERN stack",
          thumbnail: "https://i.postimg.cc/7ZCNTrP8/course-1.jpg",
        },
        {
          id: 2,
          title: "AI & Machine Learning Fundamental",
          category: "Artificial Intelligence",
          price: 2499.0,
          description: "AI course",
          thumbnail:
            "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1",
        },
        {
          id: 3,
          title: "Python Programming Masterclass",
          category: "Programming",
          price: 1499.0,
          description: "Python course",
          thumbnail:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        },
      ],
    });
  }

  if (url.includes("my-courses")) {
    return Promise.resolve({
      ok: true,
      json: async () => [],
    });
  }

  return Promise.resolve({
    ok: true,
    json: async () => [],
  });
});

});


describe("Courses Component", () => {

  test("renders courses section title", async () => {
  render(<Courses />);

  await waitFor(() =>
    expect(screen.getByText("Courses")).toBeInTheDocument()
  );

  expect(screen.getByText("Popular Courses")).toBeInTheDocument();
});



  test("renders all course titles", async () => {
  render(<Courses />);

  await waitFor(() =>
    expect(
      screen.getByText("Full Stack Web Development (MERN Stack)")
    ).toBeInTheDocument()
  );

  expect(
    screen.getByText("AI & Machine Learning Fundamental")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Python Programming Masterclass")
  ).toBeInTheDocument();
});



  test("renders categories and prices", async () => {
  render(<Courses />);

  await waitFor(() =>
    expect(screen.getByText("Web Development")).toBeInTheDocument()
  );

  expect(screen.getByText("Artificial Intelligence")).toBeInTheDocument();
  expect(screen.getByText("Programming")).toBeInTheDocument();

  expect(screen.getByText("₹4999")).toBeInTheDocument();
  expect(screen.getByText("₹2499")).toBeInTheDocument();
  expect(screen.getByText("₹1499")).toBeInTheDocument();
}); 

  test("renders course images", async () => {
  render(<Courses />);

  await waitFor(() =>
    expect(
      screen.getByAltText("Full Stack Web Development (MERN Stack)")
    ).toBeInTheDocument()
  );
});


  test("course links point to correct details page", async () => {
  render(<Courses />);

  const links = await screen.findAllByRole("link");

  expect(links[0]).toHaveAttribute("href", "/courses/1");
  expect(links[1]).toHaveAttribute("href", "/courses/2");
  expect(links[2]).toHaveAttribute("href", "/courses/3");
});


  test("renders correct number of courses", async () => {
  render(<Courses />);

  await waitFor(() =>
    expect(screen.getAllByRole("link").length).toBe(3)
  );
});


});
