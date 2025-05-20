import React from "react";

const HeroSectionDefaults = {
  heading: "Connect. Learn. Grow.",
  description:
    "Join our community platform to network, find jobs, share resources, and collaborate with tech leaders across Africa.",
  buttons: [
    { title: "Get Started", variant: "primary", href: "/join" },
    { title: "Learn More", variant: "secondary", href: "/about" },
  ],
  image: {
    src: "https://via.placeholder.com/600x400",
    alt: "Community Illustration",
  },
};

export default function HeroSection(props) {
  const { heading, description, buttons, image } = { ...HeroSectionDefaults, ...props };

  return (
    <section
      id="hero"
      className="relative bg-white dark:bg-gray-900 overflow-hidden py-16 md:py-24 lg:py-32"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-10 dark:opacity-20" />

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {heading}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              {description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-start gap-4">
              {buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={
                    button.variant === "secondary"
                      ? "px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900"
                      : "px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                  }
                >
                  {button.title}
                </a>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full max-w-md rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
