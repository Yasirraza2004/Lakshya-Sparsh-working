import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Gallery.css";

function Gallery() {
    const images = [
        "/media/images/IMG-20260902-WA0023.jpg.jpeg",
        "/media/images/IMG-20260902-WA0001.jpg.jpeg",
        "/media/images/IMG-20260902-WA0004.jpg.jpeg",
        "/media/images/IMG-20260902-WA0000.jpg.jpeg",
        "/media/images/IMG-20260902-WA0005.jpg.jpeg",
        "/media/images/IMG-20260902-WA0020.jpg.jpeg",
        "/media/images/IMG-20260902-WA0021.jpg.jpeg",
        "/media/images/IMG-20260902-WA0022.jpg.jpeg",
        "/media/images/IMG-20260902-WA0024.jpg.jpeg",
        "/media/images/IMG-20260902-WA0025.jpg.jpeg",
        "/media/images/IMG-20260902-WA0026.jpg.jpeg",
        "/media/images/IMG-20260902-WA0027.jpg.jpeg",
        "/media/images/IMG-20260902-WA0030.jpg.jpeg",
        "/media/images/IMG-20260902-WA0032.jpg.jpeg",
        "/media/images/IMG-20260902-WA0034.jpg.jpeg",
        "/media/images/IMG-20260902-WA0035.jpg.jpeg",
        "/media/images/IMG-20260902-WA0037.jpg.jpeg",
        "/media/images/IMG-20260902-WA0038.jpg.jpeg",
    ];

    return (
        <section className="gallery-section">

            {/* Title */}
            <h2 className="gallery-title">
                Our Gallery
            </h2>

            <div className="gallery-container">

                <Swiper
                    modules={[
                        Navigation,
                        Pagination,
                        Autoplay
                    ]}
                    slidesPerView={1}
                    spaceBetween={0}

                    navigation={{
                        nextEl: ".gallery-next",
                        prevEl: ".gallery-prev",
                    }}

                    pagination={{
                        clickable: true,
                    }}

                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}

                    loop={true}
                    speed={700}
                    watchOverflow={true}
                    className="gallery-swiper"
                >

                    {images.map((image, index) => (
                        <SwiperSlide key={index}>

                            <div className="gallery-slide">

                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                />

                            </div>

                        </SwiperSlide>
                    ))}

                </Swiper>


                {/* Previous Button */}
                <button
                    className="gallery-prev"
                    aria-label="Previous image"
                >
                    ❮
                </button>


                {/* Next Button */}
                <button
                    className="gallery-next"
                    aria-label="Next image"
                >
                    ❯
                </button>

            </div>

        </section>
    );
}

export default Gallery;