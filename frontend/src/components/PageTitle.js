import Link from "next/link";

export default function PageTitle({
  title = "About Us",
  description = "Learn more about our mission, values, and the team dedicated to delivering high-quality, industry-ready education.",
  breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ],
}) {
  return (
    <div className="page-title" data-aos="fade">
      {/* Heading */}
      <div className="heading">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1>{title}</h1>
              <p className="mb-0">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <div className="container">
          <ol>
            {breadcrumbs.map((item, index) => (
              <li
                key={index}
                className={index === breadcrumbs.length - 1 ? "current" : ""}
              >
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  );
}
