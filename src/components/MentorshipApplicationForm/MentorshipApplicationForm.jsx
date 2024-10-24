import React, { useState } from "react";

// InputField Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  handleChange,
  error,
  placeholder,
}) => (
  <div>
    <label htmlFor={name} className="block text-base font-normal mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const MentorshipForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    major: "",
    graduationYear: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const nameRegex = /^[A-Za-z]+$/;
    switch (name) {
      case "firstName":
        return nameRegex.test(value) ? "" : "First name cannot contain digits";
      case "lastName":
        return nameRegex.test(value) ? "" : "Last name cannot contain digits";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
      case "phone":
        return /^\d+$/.test(value) ? "" : "Phone number is required";
      case "major":
        return value.trim() ? "" : "Major is required";
      case "graduationYear":
        return /^\d{4}$/.test(value) &&
          parseInt(value) > 2000 &&
          parseInt(value) < 2100
          ? ""
          : "Invalid graduation year (between 2001 and 2099)";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        course: "",
        major: "",
        graduationYear: "",
      });
      // Trigger the onBack function
      onBack();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-normal mb-6">Mentorship Program Application</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Section */}
        <div>
          <label className="block text-base font-normal mb-2">Name</label>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="firstName"
              value={formData.firstName}
              handleChange={handleChange}
              error={errors.firstName}
              placeholder="Enter your first name"
            />
            <InputField
              name="lastName"
              value={formData.lastName}
              handleChange={handleChange}
              error={errors.lastName}
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          handleChange={handleChange}
          error={errors.email}
          placeholder="Enter your email address"
        />
        <InputField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          handleChange={handleChange}
          error={errors.phone}
          placeholder="Enter your phone number"
        />
        <InputField
          label="Major"
          name="major"
          value={formData.major}
          handleChange={handleChange}
          error={errors.major}
          placeholder="Enter your major"
        />
        <InputField
          label="Graduation Year"
          name="graduationYear"
          value={formData.graduationYear}
          handleChange={handleChange}
          error={errors.graduationYear}
          placeholder="Enter your graduation year"
        />
        {/* Submit Button Section */}
        <div className="flex justify-end mt-8 space-x-2">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MentorshipForm;