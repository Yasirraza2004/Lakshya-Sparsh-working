import { useEffect, useRef, useState } from "react";
import "./FinancialWorkout.css";

function FinancialWorkout() {

    const [currentSlide, setCurrentSlide] = useState(0);

    const isScrolling = useRef(false);

    const iframeRefs = useRef([]);

    const slides = [
        {
            id: 1,
            page: "/financial-workout/slide-1.html"
        },
        {
            id: 2,
            page: "/financial-workout/slide-2.html"
        },
        {
            id: 3,
            page: "/financial-workout/slide-3.html"
        },
        {
            id: 4,
            page: "/financial-workout/slide-4.html"
        },
        {
            id: 5,
            page: "/financial-workout/slide-5.html"
        },
        {
            id: 6,
            page: "/financial-workout/slide-6.html"
        },
        {
            id: 7,
            page: "/financial-workout/slide-7.html"
        }
    ];


    /* =========================
       NEXT SLIDE
    ========================= */

    const nextSlide = () => {

        setCurrentSlide((previousSlide) => {

            if (previousSlide >= slides.length - 1) {
                return previousSlide;
            }

            return previousSlide + 1;

        });

    };


    /* =========================
       PREVIOUS SLIDE
    ========================= */

    const previousSlide = () => {

        setCurrentSlide((previousSlide) => {

            if (previousSlide <= 0) {
                return previousSlide;
            }

            return previousSlide - 1;

        });

    };


    /* =========================
       HANDLE SLIDE CHANGE
    ========================= */

    const handleSlideChange = (deltaY) => {

        if (Math.abs(deltaY) < 20) {
            return;
        }

        if (isScrolling.current) {
            return;
        }

        isScrolling.current = true;

        if (deltaY > 0) {
            nextSlide();
        } else {
            previousSlide();
        }

        setTimeout(() => {
            isScrolling.current = false;
        }, 1100);
    };


    /* =========================
       IFRAME WHEEL
    ========================= */

    const handleIframeLoad = (index) => {

        const iframe = iframeRefs.current[index];

        if (!iframe) {
            return;
        }

        try {

            const iframeWindow = iframe.contentWindow;

            iframeWindow.addEventListener(
                "wheel",
                (e) => {

                    e.preventDefault();

                    handleSlideChange(e.deltaY);

                },
                { passive: false }
            );

        } catch (error) {

            console.log(
                "Could not attach wheel event to iframe:",
                error
            );

        }
    };


    /* =========================
       KEYBOARD NAVIGATION
    ========================= */

    useEffect(() => {

        const handleKeyboard = (e) => {

            if (e.key === "ArrowDown") {

                if (isScrolling.current) {
                    return;
                }

                isScrolling.current = true;

                nextSlide();

                setTimeout(() => {
                    isScrolling.current = false;
                }, 1100);

            }


            if (e.key === "ArrowUp") {

                if (isScrolling.current) {
                    return;
                }

                isScrolling.current = true;

                previousSlide();

                setTimeout(() => {
                    isScrolling.current = false;
                }, 1100);

            }

        };


        window.addEventListener(
            "keydown",
            handleKeyboard
        );


        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyboard
            );

        };

    });


    /* =========================
       GO TO SPECIFIC SLIDE
    ========================= */

    const goToSlide = (index) => {

        if (isScrolling.current) {
            return;
        }

        setCurrentSlide(index);

    };


    return (

        <div className="financial-workout-page">


            {/* =========================
                VERTICAL SLIDER
            ========================= */}

            <section className="financial-workout-slider">


                {/* =========================
                    SLIDE TRACK
                ========================= */}

                <div
                    className="financial-workout-track"
                    style={{
                        transform:
                            `translateY(-${currentSlide * 100}%)`
                    }}
                >

                    {slides.map((slide, index) => (

                        <div
                            className="financial-workout-slide"
                            key={slide.id}
                        >

                            <div className="financial-workout-html-container">

                                <iframe
                                    ref={(element) => {
                                        iframeRefs.current[index] = element;
                                    }}
                                    src={slide.page}
                                    title={`Financial Workout Slide ${slide.id}`}
                                    className="financial-workout-iframe"
                                    scrolling="no"
                                    onLoad={() => handleIframeLoad(index)}
                                />

                            </div>

                        </div>

                    ))}

                </div>


                {/* =========================
                    RIGHT SIDE DOTS
                ========================= */}

                <div className="financial-workout-dots">

                    {slides.map((slide, index) => (

                        <button
                            key={slide.id}
                            className={
                                currentSlide === index
                                    ? "financial-workout-dot active"
                                    : "financial-workout-dot"
                            }
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />

                    ))}

                </div>


            </section>

        </div>

    );
}

export default FinancialWorkout;