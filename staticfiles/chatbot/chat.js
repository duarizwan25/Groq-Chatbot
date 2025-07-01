// Function to send the message to the backend and display the bot response
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const userMessage = input.value.trim();
    if (!userMessage) return;

    console.log("Sending message:", userMessage);

    // Show user message in the chat
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = userMessage;
    chatBox.appendChild(userDiv);

    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bot-message loading';
    loadingDiv.textContent = '...';
    chatBox.appendChild(loadingDiv);

    // Clear input
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('/api/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        console.log("📦 Raw response from server:", data);
        chatBox.removeChild(loadingDiv);

        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';

        if (data.reply) {
            botDiv.textContent = data.reply;
        } else {
            botDiv.textContent = "❌ Bot reply undefined. Raw response: " + JSON.stringify(data);
        }

        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error sending message:", error);
        chatBox.removeChild(loadingDiv);

        const errorDiv = document.createElement('div');
        errorDiv.className = 'bot-message error';
        errorDiv.textContent = '❌ Oops! Something went wrong.';
        chatBox.appendChild(errorDiv);
    }
}

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ chat.js loaded");

    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');

    if (!sendBtn || !userInput) {
        console.log("❌ Could not find sendBtn or userInput");
        return;
    }

    // Click send button
    sendBtn.addEventListener('click', () => {
        console.log("🖱️ Send button clicked");
        sendMessage();
    });

    // Press Enter in input
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log("⌨️ Enter key pressed");
            sendMessage();
        }
    });
});
