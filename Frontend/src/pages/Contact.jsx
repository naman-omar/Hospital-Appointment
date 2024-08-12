import { toast } from "react-toastify";

const Contact = () => {

  const handleButtonSubmit = (event) => {
    event.preventDefault(); 

    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!email || !subject || !message) {
      toast.error("Please fill out all the fields."); 
      return;
    }

    toast.success("Message sent successfully");
    
  };

  return (
    <section className="pt-[30px] sm:pt-[45px]">
      <div className="px-4 mx-auto max-w-[570px] md:max-w-[692px]">
        <h2 className="text-headingColor font-bold text-center text-[36px]">
          Contact Us
        </h2>
        <p className="mb-8 lf:mb-12 font-400 text-center text-[16px] md:text-[17px] text-textColor">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
        <form onSubmit={handleButtonSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="form_label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form_input mt-1"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="subject" className="form_label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how can we help you*"
              className="form_input mt-1"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="form_label">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Leave a comment..."
              className="form_input mt-1"
              rows="6"
              required
            ></textarea>
          </div>
          <button className="bg-primaryColor text-white text-[600] text-[18px] md:text-[20px] px-6 md:px-8 py-3 rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
