
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../Frontend/src/config";
import { authContext } from "../context/authContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/messages/getall`);
        if(!response.ok){
          throw Error("Some occur occured");
        }
        const data = await response.json();
        setMessages(data.data);
      } catch (error) {
        console.log('Error fetching messages:', error.message);
      }
    };
    fetchMessages();
  }, []);

  const { user } = useContext(authContext); 
  const { role } = useContext(authContext);

  if (!user || role !== "admin") {
    return null;  
  }

  return (
    <div className="bg-[#0067FF]">
        <section className="page messages">
        <h1>MESSAGES</h1>
        <div className="banner">
          {messages && messages.length > 0 ? (
            messages.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div className="details text-[16px] sm:text-[18px]">
                    <p>
                    <span className="text-primaryColor">Name:</span> <span><b>{element.name}</b></span>
                    </p>
                    <p>
                    <span className="text-primaryColor"> Email:</span> <span>{element.email}</span>
                    </p>
                    <p>
                    <span className="text-primaryColor">Subject:</span> <span>{element.subject}</span>
                    </p>
                    <p>
                    <span className="text-primaryColor">Message:</span> <span>{element.message}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h2 className="text-black text-[20px]">No Messages yet!</h2>
          )}
        </div>
    </section>
    </div>
  );
};

export default Messages;