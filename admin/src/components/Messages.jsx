import useFetchData from "../hooks/useFetchData.js";
import Loader from "./Loading.jsx";
import Error from "./Error.jsx";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { authContext } from "../context/authContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  
  const { data: messageData, loading, error } = useFetchData(`${BASE_URL}/messages/getall`);

  useEffect(() => {
    if (messageData) {
      setMessages(messageData);
    }
  }, [messageData]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/`);
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
        <section className="page">
        <h1 className="text-[#3939d9f2] mb-[30px] text-[2.3rem] mt-4">MESSAGES</h1>
        <div className="flex flex-col gap-[20px]">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && messages && messages.length > 0 ? (
            messages.map((element) => {
              return (
                <div className="bg-[#fff] rounded-[12px] p-[20px]" key={element._id}>
                  <div className="text-[16px] sm:text-[18px]">
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
            <h2 className="text-black text-[24px]">No Messages yet!</h2>
          )}
        </div>
    </section>
    </div>
  );
};

export default Messages;