"use client"

import toast from "react-hot-toast";

export default function Contact() {

  const handleSubmit = (e) => {

    e.preventDefault()
  
    toast.success("Message sent successfully!")

  }

  return (
    <div>
      <h1>Contact Us</h1>
      <p>
        Have questions? Reach out to us at{" "}
        <a href="mailto:jvictorfranca@yahoo.com.br">jvictorfranca@yahoo.com.br</a>
      </p>
      <form className="space-y-4"  onSubmit={handleSubmit}>
        <input type="text" placeholder="Your name" className="border px-3 py-2 w-full rounded-md dark:placeholder-white/70" required/>
        <input type="email" placeholder="Your email" className="border px-3 py-2 w-full rounded-md dark:placeholder-white/70" required/>
        <textarea placeholder="Your message" className="border px-3 py-2 w-full rounded-md dark:placeholder-white/70" required rows="4"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Send
        </button>
      </form>
    </div>
  );
}
