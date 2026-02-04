export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-sm-8 col-lg-6 col-xl-4"> 
        <div className="rounded bg-white shadow p-5">
          <h3 className="fw-bolder fs-4 mb-2">{title}</h3>
          {subtitle && <p className="text-muted mb-4">{subtitle}</p>}

          {children}
        </div>
      </div>
    </div>
  );
}
