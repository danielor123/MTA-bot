let selectedTag = null; // Declare selectedTag in the global scope

document.addEventListener('DOMContentLoaded', function() {
    addBotMessage("ברוכים הבאים לבוט של המככלה האקדמית תל אביב-יפו! אנא בחר נושא כדי שנוכל לעזור לך בצורה המיטבית :)");
    loadTopicButtons();
});
function addBotMessage(message) {
    const messageContainer = document.querySelector('.message-container');

    const existingIndicator = messageContainer.querySelector('.typing-indicator');
    if (existingIndicator) {
        messageContainer.removeChild(existingIndicator);
    }
    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('bot-message');
    
    // Add the bot's logo
    const botLogo = document.createElement('img');
    botLogo.src = 'Academit-logo-square.jpg'; // Specify the path to your bot's logo
    botLogo.alt = 'Bot Logo';
    botLogo.classList.add('bot-logo');
    
    botMessageDiv.appendChild(botLogo);
    botMessageDiv.appendChild(document.createTextNode(message));
    messageContainer.appendChild(botMessageDiv);
}
function addUserMessage(message) {
    const messageContainer = document.querySelector('.message-container');
    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('user-message');
    
    // Add the bot's logo
    const botLogo = document.createElement('img');
    botLogo.src = 'daniel.jpeg'; // Specify the path to your bot's logo
    botLogo.alt = 'Bot Logo';
    botLogo.classList.add('bot-logo');
    
    botMessageDiv.appendChild(botLogo);
    botMessageDiv.appendChild(document.createTextNode(message));
    messageContainer.appendChild(botMessageDiv);
}
function loadTopicButtons() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_tags.php', true); 
    xhr.onload = function() {
        if (this.status === 200) {
            console.log(this.responseText);
            const topics = JSON.parse(this.responseText);
            topics.forEach(function(topic) {
                addButtonToMessageArea(topic.TagName); // Assuming 'tagname' is the field name
            });
        } else {
            console.error('Error fetching topics:', this.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Request error...');
    };
    xhr.send();
}
function addButtonToMessageArea(tagname) {
    const messageContainer = document.querySelector('.message-container');
    const button = document.createElement('button');
    button.textContent = tagname;
    button.onclick = () => selectTopic(button, tagname);
    messageContainer.appendChild(button);
}
function selectTopic(button, tagname) {
    // Check if a tag is already selected
    if (selectedTag) {
        return;
    }

    // Disable all buttons except the selected one
    const buttons = document.querySelectorAll('.message-container button');
    buttons.forEach(function(btn) {
        if (btn !== button) {
            btn.disabled = true;
        }
    });

    // Set the selected tag
    selectedTag = tagname;

    // Update the button style for the selected button
    button.classList.add('selected');

    // Bot sends a message with the selection
    addBotMessage("רשום לנו כיצד נוכל לעזור לך בתחום ה" + selectedTag);

    // Enable the text input
    const userInput = document.getElementById('user-input');
    userInput.disabled = false;

    // Add logic to handle the selected tag if needed
}
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;
    addUserMessage(message);
    if (message.trim()) {
        // TODO: Send the message to the PHP backend and display the bot's response
        userInput.value = '';
    }
    showTypingIndicator()
    getTagId(selectedTag, function(error, tagId) {
        if (error) {
            console.error('Error:', error);
        } else {
            const fileId=tagId;
            // Make an AJAX call to the PHP backend
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "chattest.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log('Response from PHP:', this.responseText);
                    var response = JSON.parse(this.responseText);

                    // Check if the response is successful and contains a message
                    if (response.success && response.response) {
                        addBotMessage(response.response); // Display the response message
                    } else {
                        // Handle error or no message case
                        addBotMessage("מצטערים, לא הצלחנו למצוא תשובה לשאלתך ...");
                    }

                }
            };
            xhr.send("fileId=" + encodeURIComponent(fileId) + "&message=" + encodeURIComponent(message));
        }
    });
}
function showTypingIndicator() {
    const messageContainer = document.querySelector('.message-container');

    // Create typing indicator container
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');

    // Add the bot's logo to the typing indicator
    const botLogo = document.createElement('img');
    botLogo.src = 'Academit-logo-square.jpg'; // Specify the path to your bot's logo
    botLogo.alt = 'Bot Logo';
    botLogo.classList.add('bot-logo-ind');

    // Add the animated dots
    const dots = document.createElement('div');
    dots.innerHTML = '<span></span><span></span><span></span>';
    dots.classList.add('dots');

    // Append logo and dots to the typing indicator
    typingIndicator.appendChild(botLogo);
    typingIndicator.appendChild(dots);

    messageContainer.appendChild(typingIndicator);
}
function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.parentNode.removeChild(typingIndicator);
    }
}
function getTagId(tagName, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'get_tag_id.php', true); 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {
        if (this.status === 200) {
            console.log('Response for tag ID:', this.responseText); // For debugging
            callback(null, this.responseText); // Pass the tag ID to the callback
        } else {
            console.error('Error fetching tag ID:', this.statusText);
            callback(new Error(this.statusText));
        }
    };

    xhr.onerror = function() {
        console.error('Request error...');
        callback(new Error('Request error'));
    };

    xhr.send('tagName=' + encodeURIComponent(tagName));
}

