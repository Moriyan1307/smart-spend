import React, { useState } from "react";

// InputField Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  handleChange,
  error,
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
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// SelectField Component
const SelectField = ({ label, name, options, value, handleChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-base font-normal mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// Main SettingsForm Component
const SettingsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phoneNumber: "123 456 7890",
    role: "Student",
    interests: "Front - end Dev",
    major: "Computer Science",
    graduationYear: "2025",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() ? "" : "This field is required";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
      case "phoneNumber":
        return /^\d{3} \d{3} \d{4}$/.test(value)
          ? ""
          : "Invalid phone number format (e.g., 123 456 7890)";
      case "graduationYear":
        return /^\d{4}$/.test(value) &&
          parseInt(value) > 2000 &&
          parseInt(value) < 2100
          ? ""
          : "Invalid year (should be between 2001 and 2099)";
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
      // Here you would typically send the data to an API
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-normal mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            handleChange={handleChange}
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            handleChange={handleChange}
            error={errors.lastName}
          />
        </div>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            handleChange={handleChange}
            error={errors.phoneNumber}
          />
          <SelectField
            label="Role"
            name="role"
            value={formData.role}
            options={["Student", "Teacher", "Administrator"]}
            handleChange={handleChange}
            error={errors.role}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Interests"
            name="interests"
            value={formData.interests}
            options={["Front - end Dev", "Back - end Dev", "Full - stack Dev"]}
            handleChange={handleChange}
            error={errors.interests}
          />
          <InputField
            label="Major"
            name="major"
            value={formData.major}
            handleChange={handleChange}
            error={errors.major}
          />
        </div>
        <InputField
          label="Graduation Year"
          name="graduationYear"
          value={formData.graduationYear}
          handleChange={handleChange}
          error={errors.graduationYear}
        />
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
