import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./HomeHero.css";
import { Link } from "react-router-dom";

const slides = [
    {
        title: "To travel is to live",
        description: "We help you save for meaningful travel experiences",
        image: "/media/images/slide1.png",
        link: "/wealth"
    },
    {
        title: "Buying your first car?",
        description: "We will help you buy your first car",
        image: "/media/images/slide2.jpeg",
        link: "/wealth"
    },
    {
        title: "Fund your dream home",
        description: "We love that smile when you talk about your dream home",
        image: "/media/images/slide3.jpeg",
        link: "/wealth"
    },
    {
        title: "Secure your child's future",
        description: "Let us help you shape your child’s brighter future",
        image: "/media/images/slide4.jpeg",
        link: "/wealth"
    },
    {
        title: "Make your child's marriage memorable",
        description: "We help you save for the eternal occasion",
        image: "/media/images/slide5.jpeg",
        link: "/wealth"
    },
    {
        title: "Spend quality time with family",
        description: "Retire Comfortably",
        image: "/media/images/slide6.jpeg",
        link: "/wealth"
    },
];

function HomeHero() {
    return (
        <section className="hero-carousel">

            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>

                        <div className="hero-slide">

                            {/* Background image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className={`hero-bg slide${index + 1}`}
                            />

                            {/* Dark overlay */}
                            <div className="hero-overlay"></div>

                            {/* Content */}
                            <div className="hero-content">

                                <div className="hero-text">

                                    <h1>
                                        {slide.title}
                                    </h1>

                                    <div className="orange-line"></div>

                                    <p>
                                        {slide.description}
                                    </p>

                                    <div className="hero-buttons">
                                        <Link to={slide.link} className="read-more">
                                            READ MORE
                                        </Link>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
}

export default HomeHero;