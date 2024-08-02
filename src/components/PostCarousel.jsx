export default function PostCarousel({ carouselData, carouselId }) {
  return (
    <div key={carouselId} id={carouselId} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {carouselData?.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner carousel-inner-post-slider">
        {carouselData?.map(({ url }, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval="3000">
            <img src={url} className="d-block w-100" alt={`Slide ${index + 1}`} />
            <div className="overlay-carousel-shadow"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
