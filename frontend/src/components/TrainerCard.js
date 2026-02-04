export default function TrainerCard({
  image,
  name,
  role,
  description,
  socials,
  index = {}
}) {
  return (
    <div className="col-lg-4 col-md-6 d-flex mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="member w-100">
        <img src={image} className="img-fluid" alt={name} />

        <div className="member-content p-3">
          <h4>{name}</h4>
          <span className="text-muted">{role}</span>

          <p className="mt-2">{description}</p>

          <div className="social d-flex justify-content-center gap-3">
            {socials.twitter && (
              <a href={socials.twitter}><i className="bi bi-twitter-x"></i></a>
            )}
            {socials.facebook && (
              <a href={socials.facebook}><i className="bi bi-facebook"></i></a>
            )}
            {socials.instagram && (
              <a href={socials.instagram}><i className="bi bi-instagram"></i></a>
            )}
            {socials.linkedin && (
              <a href={socials.linkedin}><i className="bi bi-linkedin"></i></a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
