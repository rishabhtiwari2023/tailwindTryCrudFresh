// myscript.js

// document.getElementById("clickMeButton").addEventListener("click", function() {
//   alert("Button was clicked!");
// });
(function() {
  // Injecting the CSS styles dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    #chatbot-container {
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 300px;
      height: 400px;
      background-color: #f1f1f1;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      z-index: 9999;
    }

    #chatbot-header {
      background-color: #007bff;
      padding: 10px;
      color: white;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
    }

    #chatbot-messages {
      flex-grow: 1;
      padding: 10px;
      overflow-y: auto;
      font-size: 14px;
    }

    #chatbot-input-container {
      display: flex;
      padding: 10px;
    }

    #chatbot-input {
      flex-grow: 1;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
    }

    #chatbot-send {
      background-color: #007bff;
      color: white;
      padding: 10px;
      margin-left: 5px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .chat-message {
      margin-bottom: 10px;
    }

    .user-message {
      text-align: right;
      color: #007bff;
    }

    .bot-message {
      text-align: left;
      color: #333;
    }
  `;
  document.head.appendChild(style);

  // Create the chatbot HTML structure and inject it into the body
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'chatbot-container';
  chatbotContainer.innerHTML = `
    <div id="chatbot-header" onclick="toggleChatbot()">Chatbot</div>
    <div id="chatbot-messages"></div>
    <div id="chatbot-input-container">
      <input type="text" id="chatbot-input" placeholder="Type a message..." />
      <button id="chatbot-send" onclick="sendMessage()">Send</button>
    </div>
  `;
  document.body.appendChild(chatbotContainer);

  // Initialize the chatbot visibility
  let isChatbotVisible = false;
  function toggleChatbot() {
    isChatbotVisible = !isChatbotVisible;
    chatbotContainer.style.display = isChatbotVisible ? 'flex' : 'none';
  }

  // Append messages to the chat window
  function appendMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to bottom
  }

  // Handle sending a message
  function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message) {
      appendMessage(message, 'user');
      input.value = ''; // Clear input field

      // Simulate a response from the chatbot
      setTimeout(() => {
        appendMessage(`You said: ${message}`, 'bot');
      }, 1000);
    }
  }

  // Show the chatbot by default after 1 second
  setTimeout(() => {
    toggleChatbot(); // Show chatbot after 1 second
  }, 1000);
})();

