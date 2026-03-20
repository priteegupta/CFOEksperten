'use client';

import { useState, useEffect } from 'react';

type HeroSliderProps = {
    title: string;
    subtitle: string;
};

export function HeroSlider({ title, subtitle }: HeroSliderProps) {
    // Split the title into two slides if there is a comma
    const titleParts = title.split(',').map(part => part.trim());

    // Create an array of slides
    const slides = [
        {
            title: titleParts[0] || title,
            subtitle: subtitle
        },
        {
            title: titleParts.length > 1 ? titleParts[1] : title,
            subtitle: "Expert CFO Services tailored to scale your modern enterprise."
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000); // Change slide every 8 seconds

        return () => clearInterval(timer);
    }, [slides.length]);

    // Highlight "at fixed prices" (English) and "til faste priser" (Norwegian)
    const renderHighlightedText = (text: string) => {
        const targetPhrases = ["at fixed prices", "til faste priser"];
        let result: React.ReactNode = text;

        targetPhrases.forEach(phrase => {
            if (text.toLowerCase().includes(phrase.toLowerCase())) {
                const parts = text.split(new RegExp(`(${phrase})`, 'gi'));
                result = parts.map((part, i) =>
                    part.toLowerCase() === phrase.toLowerCase() ? (
                        <span key={i} className="font-bold text-accent drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                );
            }
        });

        return result;
    };

    return (
        <div className="grid w-full items-start">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`col-start-1 row-start-1 flex flex-col items-start w-full text-left transition-opacity duration-1000 ease-in-out group ${index === currentSlide
                        ? 'opacity-100 z-10'
                        : 'opacity-0 z-0 pointer-events-none'
                        }`}
                >
                    <div
                        className={`transition-all duration-[1000ms] ease-out delay-100 w-full transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                    >
                        <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-serif font-medium mb-4 sm:mb-6 tracking-[-0.02em] text-white/90 leading-[1.1] hover-glow-dark text-left break-words">
                            {renderHighlightedText(slide.title)}
                        </h1>
                    </div>

                    <div
                        className={`transition-all duration-[1000ms] ease-out delay-300 w-full transform ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                    >
                        <p className="text-base sm:text-xl md:text-2xl mb-8 text-zinc-300 font-sans font-light leading-relaxed max-w-xl hover-glow-dark text-left pr-4 break-words">
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
