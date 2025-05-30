"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [experience, setExperience] = useState("");
  const [interest, setInterest] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Use Tailwind's recommended way to persist dark mode
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    // On mount, check for saved theme or system preference
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem("theme") : null;
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  function handleToggleTheme() {
    setDarkMode((prev) => !prev);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Simple logic for recommendation
    if (experience === "beginner") {
      if (interest === "web") setRecommendation("Introduction to Web Development");
      else if (interest === "python") setRecommendation("Introduction to Python Programming");
      else setRecommendation("Introduction to Programming");
    } else if (experience === "intermediate") {
      if (interest === "web") setRecommendation("Advanced Web Development");
      else if (interest === "python") setRecommendation("Intermediate Python Programming");
      else setRecommendation("Data Structures and Algorithms");
    } else {
      setRecommendation("Please select your experience level.");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-6 bg-gray-100 dark:bg-gray-900 transition-colors">
      <button
        onClick={handleToggleTheme}
        className="absolute top-4 right-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <h1 className="text-gray-900 dark:text-gray-100">Welcome to MCP server</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded shadow w-80">
        <label className="text-gray-800 dark:text-gray-200">
          Experience Level:{""}
          <select value={experience} onChange={e => setExperience(e.target.value)} className="ml-2 border rounded p-1 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
            <option value="">Select...</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>
        </label>
        <label className="text-gray-800 dark:text-gray-200">
          Interest:{""}
          <select value={interest} onChange={e => setInterest(e.target.value)} className="ml-2 border rounded p-1 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
            <option value="">Select...</option>
            <option value="web">Web Development</option>
            <option value="python">Python</option>
            <option value="other">Other</option>
          </select>
        </label>
        <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Get Recommendation</button>
      </form>
      {recommendation && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 dark:text-green-100 rounded shadow">
          <strong>Recommended Course:</strong> {recommendation}
        </div>
      )}
    </div>
  );
}
