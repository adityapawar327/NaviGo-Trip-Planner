import React from "react";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white p-5 md:p-10 lg:p-20">
      {/* Main Content */}
      <div className="text-center max-w-4xl bg-white p-8 rounded-2xl shadow-lg border border-[#A91D3A]">
        {/* Header with Typewriter */}
        <h1 className="font-extrabold text-[32px] md:text-[48px] lg:text-[60px] leading-tight text-[#151515] mb-6">
          <Typewriter
            options={{
              strings: [
                "Explore Your Next Adventure.",
                "Travel Smart with AI Assistance.",
                "Your Dream Trip, Simplified.",
                "From Plans to Reality, We’re Here.",
                "Get Ready for Your Perfect Getaway.",
              ],
              autoStart: true,
              loop: true,
              delay: 60,
              deleteSpeed: 30,
              pauseFor: 2500,
            }}
          />
        </h1>
        <p className="text-md md:text-lg lg:text-xl text-[#151515] font-light mb-6">
          Discover the ease of travel planning with our AI-powered advisory
          platform. Tailored itineraries, top destination insights, and seamless
          recommendations—designed for your unique travel style.
        </p>
        <Link to={"/create-trip"}>
          <Button className="px-6 py-3 bg-[#A91D3A] text-white font-semibold rounded-lg hover:bg-[#C73659] transition duration-300">
            Start Planning
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-12 w-full max-w-4xl text-center">
        <h2 className="font-bold text-[28px] md:text-[36px] text-[#151515] mb-8">
          Why Choose Our Travel Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#F8F1F1] p-6 rounded-lg shadow-lg border border-[#C73659]">
            <h3 className="font-semibold text-[#151515] text-[20px] mb-3">
              Personalized Itineraries
            </h3>
            <p className="text-[#151515]">
              Receive customized travel plans based on your preferences,
              interests, and travel history.
            </p>
          </div>
          <div className="bg-[#F8F1F1] p-6 rounded-lg shadow-lg border border-[#C73659]">
            <h3 className="font-semibold text-[#151515] text-[20px] mb-3">
              Smart Recommendations
            </h3>
            <p className="text-[#151515]">
              Get suggestions for top destinations, accommodations, and
              activities that suit your style.
            </p>
          </div>
          <div className="bg-[#F8F1F1] p-6 rounded-lg shadow-lg border border-[#C73659]">
            <h3 className="font-semibold text-[#151515] text-[20px] mb-3">
              Hassle-Free Planning
            </h3>
            <p className="text-[#151515]">
              Plan your trip seamlessly with our intuitive and easy-to-use
              platform.
            </p>
          </div>
          <div className="bg-[#F8F1F1] p-6 rounded-lg shadow-lg border border-[#C73659]">
            <h3 className="font-semibold text-[#151515] text-[20px] mb-3">
              24/7 Support
            </h3>
            <p className="text-[#151515]">
              Access expert assistance and support anytime during your trip
              planning process.
            </p>
          </div>
          <div className="bg-[#F8F1F1] p-6 rounded-lg shadow-lg border border-[#C73659]">
            <h3 className="font-semibold text-[#151515] text-[20px] mb-3">
              Real-Time Updates
            </h3>
            <p className="text-[#151515]">
              Stay informed with real-time travel alerts and updates to make
              adjustments as needed.
            </p>
          </div>
          <div className="bg-[#F8F1F1] p-6 rounded-lg shadow-lg border border-[#C73659]">
            <h3 className="font-semibold text-[#151515] text-[20px] mb-3">
              Easy Customization
            </h3>
            <p className="text-[#151515]">
              Edit and personalize your itinerary whenever you want, right from
              your dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="mt-12 w-full max-w-4xl text-center">
        <Accordion
          type="single"
          collapsible
          className="bg-white rounded-lg shadow-lg border border-[#C73659]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold bg-[#151515] px-4 py-2 text-white hover:bg-[#C73659] transition duration-300">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-[#F8F1F1] p-4 bg-[#151515]">
              Yes, our platform follows WAI-ARIA guidelines to ensure
              accessibility for everyone.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold bg-[#151515] px-4 py-2 text-white hover:bg-[#C73659] transition duration-300">
              How does the AI work?
            </AccordionTrigger>
            <AccordionContent className="text-[#F8F1F1] p-4 bg-[#151515]">
              Our AI uses your travel history and preferences to suggest the
              best destinations, accommodations, and activities.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold bg-[#151515] px-4 py-2 text-white hover:bg-[#C73659] transition duration-300">
              Can I customize my trip?
            </AccordionTrigger>
            <AccordionContent className="text-[#F8F1F1] p-4 bg-[#151515]">
              Yes, modify your itinerary as you wish with our intuitive planning
              tool to match your travel needs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12 w-full max-w-4xl text-center">
        <h2 className="font-bold text-[28px] md:text-[36px] text-[#151515] mb-8">
          What Our Users Are Saying
        </h2>
        <div className="testimonial-container flex flex-wrap justify-center gap-6 pb-4">
          {/* Individual Testimonial Cards */}
          {[
            {
              text: "The app made my trip planning so easy! I loved how the AI suggested unique activities I would have never thought of.",
              author: "– Sarah L.",
            },
            {
              text: "Excellent platform with top-notch support. The real-time updates were a game-changer for my last vacation.",
              author: "– John D.",
            },
            {
              text: "I was able to find the perfect activities and make adjustments seamlessly, making my trip unforgettable.",
              author: "– Emily R.",
            },
            {
              text: "Fantastic user experience! The support team was always there to help, and I felt confident in planning my entire trip.",
              author: "– Mark T.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-item w-[300px] h-[300px] bg-[#F8F1F1] p-4 rounded-lg shadow-lg border border-[#C73659] flex flex-col justify-between"
            >
              <p className="text-[#151515] font-light text-xs md:text-sm">
                {testimonial.text}
              </p>
              <p className="mt-4 text-[#A91D3A] font-semibold text-xs md:text-sm">
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Images Section */}
      <div className="mt-12 w-full max-w-4xl text-center">
        <h2 className="font-bold text-[28px] md:text-[36px] text-[#151515] mb-8">
          Sample Travel Images
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={`/images/img-${index}.jpg`} // Dynamically load images from the public/images folder
                alt={`Travel Destination ${index}`}
                className="w-full h-60 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
