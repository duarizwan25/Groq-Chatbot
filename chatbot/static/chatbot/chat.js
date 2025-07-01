// Function to send the message to the backend and display the bot response
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Show user message in the chat
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = userMessage;
    chatBox.appendChild(userDiv);

    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bot-message loading';
    loadingDiv.textContent = '...';
    chatBox.appendChild(loadingDiv);

    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('/api/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        chatBox.removeChild(loadingDiv);

        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';

        if (data.reply) {
            botDiv.textContent = data.reply;
        } else {
            botDiv.textContent = "⚠️ Undefined reply: " + JSON.stringify(data);
            console.warn("Unexpected response:", data);
        }

        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error sending message:", error);
        chatBox.removeChild(loadingDiv);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bot-message error';
        errorDiv.textContent = 'Oops! Something went wrong.';
        chatBox.appendChild(errorDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');

    if (!sendBtn || !userInput) return;

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
