// 'use client';
// import { useState } from 'react';
// import axios from 'axios';

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const sendMessage = async (event) => {
//     event.preventDefault();
//     setMessages([...messages, { text: input, user: 'You' }]);
//     const response = await axios.post('http://localhost:5000/chat', { message: input });
//     setMessages(prevMessages => [...prevMessages, { text: response.data.response, user: 'AI' }]);
//     setInput('');
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 p-4 text-white">
//       <h1 className="text-3xl font-bold mb-4">Chat</h1>
//       <div className="flex-grow overflow-auto mb-4">
//         {messages.map((message, index) => (
//           <div key={index} className={`p-2 rounded-lg my-2 w-max max-w-md mx-2 ${message.user === 'You' ? 'bg-blue-500' : 'bg-gray-700'}`}>
//             <p className="font-bold">{message.user}</p>
//             <p>{message.text}</p>
//           </div>
//         ))}
//       </div>
//       <div className="p-2 bg-gray-800 border-t border-gray-700 fixed bottom-0 w-full">
//         <form onSubmit={sendMessage} className="flex">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             type="text"
//             className="rounded-l-full py-2 px-4 w-full bg-gray-700 text-white placeholder-gray-400"
//             placeholder="Type a message"
//           />
//           <button type="submit" className="bg-blue-500 text-white rounded-r-full px-4">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// }
















'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const sendMessage = async (event) => {
    event.preventDefault();
    setMessages([...messages, { text: input, user: 'You' }]);
    setIsLoading(true); // Set loading to true when request starts
    const response = await axios.post('http://localhost:5000/chat', { message: input });
    setMessages(prevMessages => [...prevMessages, { text: response.data.response, user: 'AI' }]);
    setInput('');
    setIsLoading(false); // Set loading to false when request completes
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Chat</h1>
      <div className="flex-grow overflow-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 rounded-lg my-2 w-max max-w-md mx-2 ${message.user === 'You' ? 'bg-blue-500' : 'bg-gray-700'}`}>
            <p className="font-bold">{message.user}</p>
            <p>{message.text}</p>
          </div>
        ))}
        {isLoading && <div className="loader">Loading...</div>} {/* Render loading animation when isLoading is true */}
      </div>
      <div className="p-2 bg-gray-800 border-t border-gray-700 fixed bottom-0 w-full">
        <form onSubmit={sendMessage} className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="rounded-l-full py-2 px-4 w-full bg-gray-700 text-white placeholder-gray-400"
            placeholder="Type a message"
          />
          <button type="submit" className="bg-blue-500 text-white rounded-r-full px-4">Send</button>
        </form>
      </div>
    </div>
  );
}