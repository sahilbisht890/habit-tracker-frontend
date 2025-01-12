import React, { useEffect } from "react";

const About = () => {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition duration-300 ease-in-out">
      <section className="p-8 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-3xl font-semibold mb-4 text-pink-700 dark:text-pink-400 pacifico-regular">
          Welcome to Habit Tracker!
        </h2>
        <p className="mb-4 leading-relaxed">
          Habit Tracker is a simple yet powerful tool designed to help you
          cultivate positive habits and track your progress effectively. Whether
          you’re forming new habits or breaking old ones, this app is here to
          support you every step of the way.
        </p>

        <ul className="list-disc ml-8 space-y-3">
          <li>
            <span className="font-semibold">Add Habits:</span> Create habits
            that matter to you, tailored to your personal goals and
            aspirations.
          </li>
          <li>
            <span className="font-semibold">Track Progress:</span> Log your
            activities daily and stay consistent on your habit-building
            journey.
          </li>
          <li>
            <span className="font-semibold">Visualize Trends:</span> Use
            intuitive charts and graphs to analyze your progress over time and
            stay motivated.
          </li>
          <li>
            <span className="font-semibold">Dark Mode:</span> Enjoy a visually
            optimized experience for both light and dark environments.
          </li>
        </ul>

        <p className="mt-6">
          Start building habits that last and take control of your productivity
          with Habit Tracker!
        </p>
      </section>
    </div>
  );
};

export default About;
