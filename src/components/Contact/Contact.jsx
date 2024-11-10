import { useState } from "react";
import Head from "next/head";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Replace this with actual form submission logic (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating async submission
      alert("Your message has been sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="container mx-auto px-4 py-8 min-h-screen"
      style={{
        backgroundColor: "var(--theme-color)",
        color: "var(--text-color)",
      }}
    >
      <Head>
        <title>Contact Us</title>
      </Head>

      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{ color: "var(--gray-100)" }}
      >
        Contact Us
      </h1>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium"
              style={{ color: "var(--gray-300)" }}
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--element-bg-color)",
                color: "var(--text-color)",
                borderColor: "var(--gray-600)",
                placeholder: "var(--gray-400)",
                "--tw-ring-color": "var(--gray-400)",
              }}
              placeholder="Your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "var(--gray-300)" }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--element-bg-color)",
                color: "var(--text-color)",
                borderColor: "var(--gray-600)",
                placeholder: "var(--gray-400)",
                "--tw-ring-color": "var(--gray-400)",
              }}
              placeholder="Your email"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium"
              style={{ color: "var(--gray-300)" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--element-bg-color)",
                color: "var(--text-color)",
                borderColor: "var(--gray-600)",
                placeholder: "var(--gray-400)",
                "--tw-ring-color": "var(--gray-400)",
              }}
              placeholder="Your message"
            ></textarea>
          </div>

          {/* Error Message */}
          {error && <p style={{ color: "var(--gray-400)" }}>{error}</p>}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-md focus:outline-none transition-colors"
              style={{
                backgroundColor: isSubmitting
                  ? "var(--gray-500)"
                  : "var(--gray-700)",
                color: isSubmitting ? "var(--gray-300)" : "var(--text-color)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
