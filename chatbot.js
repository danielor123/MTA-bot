document.addEventListener("DOMContentLoaded", function () {
    var chatBox = document.getElementById("chatBox");
    var userInput = document.getElementById("userInput");

    var isOptionSelected = false; // Flag to track if an option is selected
    var selectedOption = null; // To store the selected option

    // Start the conversation with a welcome message
    function displayMessage(sender, message) {
        var messageDiv = document.createElement("div");
        messageDiv.className = "message " + sender + "-message direction-rtl";
    
        var logoSrc = sender === "bot" ? "Academit-logo-square.jpg" : "Academit-logo-square.jpg";
        messageDiv.innerHTML = `<img src="${logoSrc}" alt="${sender} logo" class="message-logo"> <strong>${sender}:</strong> ${message}`;
    
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Display clickable options
    displayOptions(["Dorms", "Courses", "Activity time"]);

    function sendMessage() {
        var userMessage = userInput.value;
        
        if (userMessage.trim() !== "") {
            displayMessage("user", userMessage);

            // If an option is selected, don't allow further input
            if (isOptionSelected) {
                displayMessage("bot", "You've already made a selection. If you need assistance, please refresh the page.");
            } else {
                // Simulate bot response based on user's input (you can replace this with actual backend logic)
                setTimeout(function () {
                    var botResponse;
                    if (userMessage.toLowerCase().includes("Dorms")) {
                        selectedOption = "Dorms";
                        botResponse = "You selected: Dorms. Thank you!";
                        isOptionSelected = true; // Set the flag to true
                    } else if (userMessage.toLowerCase().includes("Courses")) {
                        selectedOption = "Courses";
                        botResponse = "You selected: Courses. Thank you!";
                        isOptionSelected = true;
                    } else if (userMessage.toLowerCase().includes("Activity time")) {
                        selectedOption = "Activity time";
                        botResponse = "You selected: Activity time. Thank you!";
                        isOptionSelected = true;
                    } else {
                        botResponse = "I'm sorry, I didn't understand. Please choose a field from the provided options.";
                    }

                    displayMessage("bot", botResponse);
                    updateSelectedOptionStyle();
                }, 500);

                userInput.value = "";
            }
        }
    }

    function displayMessage(sender, message) {
        var messageDiv = document.createElement("div");
        messageDiv.className = "message " + sender + "-message direction-rtl";
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function displayOptions(options) {
        var optionsDiv = document.createElement("div");
        optionsDiv.className = "options direction-rtl";

        options.forEach(function (option) {
            var button = document.createElement("button");
            button.textContent = option;
            button.onclick = function () {
                if (!isOptionSelected) {
                    selectField(option);
                }
            };

            optionsDiv.appendChild(button);
        });

        chatBox.appendChild(optionsDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function selectField(selectedField) {
        selectedOption = selectedField;
        displayMessage("user", `Selected field: ${selectedField}`);

        // Simulate bot response based on user's selection (you can replace this with actual backend logic)
        setTimeout(function () {
            var botResponse = `You selected: ${selectedField}. Thank you!`;
            displayMessage("bot", botResponse);
            isOptionSelected = true;
            updateSelectedOptionStyle();
        }, 500);
    }

    function updateSelectedOptionStyle() {
        var options = document.querySelectorAll(".options button");
        options.forEach(function (button) {
            if (button.textContent === selectedOption) {
                button.style.backgroundColor = "#3498db";
                button.style.color = "#fff";
            } else {
                button.disabled = true;
            }
        });
    }

    // Uncomment the line below if you want the bot to initiate the conversation on page load
    // sendMessage();
    window.sendMessage = sendMessage;
    window.selectField = selectField;
});
