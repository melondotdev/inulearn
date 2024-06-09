import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import * as FaIcons from "react-icons/fa";

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const validateForm = (form) => {
    const errors = {};
    if (!form.first_name.value.trim()) errors.first_name = "First name is required.";
    if (!form.last_name.value.trim()) errors.last_name = "Last name is required.";
    if (!form.user_email.value.trim()) errors.user_email = "Email is required.";
    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const formErrors = validateForm(e.target);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then((result) => {
        console.log(result.text);
        alert('Message sent!');
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong!');
        setIsSubmitting(false);
      });
    
    // Clears the form after sending the email
    e.target.reset();
  };

  return (
    <div className="footer bg-black bg-cover text-white bottom-0 flex flex-col px-8">
      <div className="footer-content flex items-start justify-between pb-4 w-full">
        <div className="pt-8 sm:text-5xl w-full">
          <span className="flex"><FaIcons.FaPaw className='mr-4'/>Contact Us For a Free Consultation!</span>
          <form onSubmit={sendEmail} className="flex flex-col text-xl mt-8 font-sans font-light">
            <input type="text" name="first_name" className="text-black p-1 mb-1 w-full" placeholder="First Name*" />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
            <input type="text" name="last_name" className="text-black p-1 mb-1 w-full" placeholder="Last Name*" />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
            <input type="email" name="user_email" className="text-black p-1 mb-1 w-full" placeholder="Email*" />
            {errors.user_email && <p className="text-red-500 text-sm">{errors.user_email}</p>}
            <input type="text" name="user_phone" className="text-black p-1 mb-1 w-full" placeholder="Phone Number" />
            <textarea name="message" className="text-black mb-4 p-1 w-full" placeholder="Message" />
            <div className="flex items-center justify-end mb-4">
              <input 
                type="submit" 
                value="Send" 
                className="mt-4 border-white border-2 rounded-3xl border-inu_orange py-1 px-4 text-inu_orange" 
                disabled={isSubmitting} 
                />
            </div>
          </form>
        </div>
      </div>
      <div className="copyright text-left border-t-2 border-solid border-fadedwhite pb-4">
        <p className='text-base opacity-70'>
          &copy; 2024 Inutech. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
