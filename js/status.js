const statusElements = document.querySelectorAll(".statusc");

const USER_ID = "1117432537220923452";

async function updateDiscordStatus() {

    try {

        const response = await fetch(
            `https://api.lanyard.rest/v1/users/${USER_ID}`
        );

        const data = await response.json();

        const status = data.data.discord_status;

        let className = "offline";
        let text = "Offline";

        if (status === "online") {

            className = "online";
            text = "Online";

        } else if (status === "idle") {

            className = "idle";
            text = "Idle";

        } else if (status === "dnd") {

            className = "dnd";
            text = "Do Not Disturb";
        }

        statusElements.forEach(statusElement => {

            statusElement.className = `statusc ${className}`;

            statusElement.innerHTML = `
                <span class="dotc"></span>
                ${text}
            `;

        });

    } catch(err) {

        console.error("LANYARD ERROR:", err);

    }

}

updateDiscordStatus();

setInterval(updateDiscordStatus, 15000);