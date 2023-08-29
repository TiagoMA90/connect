import React from 'react';
import appStyles from "../../App.module.css";

const ContactSuccessForm = () => {
  return (
  <div className={`${appStyles.Content} p-4 mt-2`}>
    <h1 className="text-center">Thank you for reaching out to us!</h1>
    <p className="text-center">One of our staff members will get back to you soon.</p>
    </div>
  );
};

export default ContactSuccessForm;