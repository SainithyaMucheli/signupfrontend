import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.js';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
    mobileNumber: '',
    dob: '',
    address: '',
    qualification: '',
    skills: [],
    shift: [],
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        shift: checked
          ? [...prev.shift, value]
          : prev.shift.filter(item => item !== value)
      }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, resume: files[0] }));
    } else if (type === 'select-multiple') {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, skills: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const submission = new FormData();
    for (let key in formData) {
      if (Array.isArray(formData[key])) {
        submission.append(key, formData[key].join(','));
      } else {
        submission.append(key, formData[key]);
      }
    }

    try {
      await axios.post("http://localhost:2027/api/signup", submission, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Signup successful!");
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <div className="App">
      <h2 style={{ color: 'red', textAlign: 'center' }}>Please signup here!!!</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <table border="1" cellPadding="10" style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>Enter UserName:</td>
              <td><input type="text" name="username" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Enter Password:</td>
              <td><input type="password" name="password" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Confirm Password:</td>
              <td><input type="password" name="confirmPassword" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Select Gender:</td>
              <td>
                <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
              </td>
            </tr>
            <tr>
              <td>Enter MobileNumber:</td>
              <td><input type="text" name="mobileNumber" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Enter DOB:</td>
              <td><input type="date" name="dob" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Enter Address:</td>
              <td><textarea name="address" rows="4" cols="30" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td>Select Qualification:</td>
              <td>
                <select name="qualification" onChange={handleChange}>
                  <option>Select</option>
                  <option>B.E</option>
                  <option>B.Sc</option>
                  <option>MCA</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Choose your Skills:</td>
              <td>
                <select name="skills" multiple size="4" onChange={handleChange}>
                  <option>Java</option>
                  <option>HTML5</option>
                  <option>CSS3</option>
                  <option>JavaScript</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Preferred Shift:</td>
              <td>
                <input type="checkbox" name="shift" value="DayShift" onChange={handleChange} /> DayShift
                <input type="checkbox" name="shift" value="NightShift" onChange={handleChange} /> NightShift
                <input type="checkbox" name="shift" value="Both" onChange={handleChange} /> DayShift/NightSHIFT
              </td>
            </tr>
            <tr>
              <td>Upload your resume:</td>
              <td><input type="file" name="resume" onChange={handleChange} /></td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <button type="submit">Register</button>
                <button type="reset">Reset</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default SignupForm;
