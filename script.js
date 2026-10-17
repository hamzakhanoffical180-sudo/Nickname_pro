document.addEventListener("DOMContentLoaded", function () {
    const baseName = document.getElementById("baseName");
    const platformSelect = document.getElementById("platformSelect");
    const generateBtn = document.getElementById("generateBtn");
    const results = document.getElementById("results");

    if (!baseName || !platformSelect || !generateBtn || !results) {
        console.error("Generator elements missing from HTML.");
        return;
    }

    // Stylish symbols for gaming names
    const gamingPrefixes = [
        "亗", "乂", "么", "彡", "꧁", "༒", "『", "♛", "☠",
        "⚡", "♚", "⫷", "◥", "乄", "ツ", "★彡", "༺", "☬"
    ];

    const gamingSuffixes = [
        "亗", "乂", "么", "彡", "꧂", "༒", "』", "♛", "☠",
        "⚡", "♚", "⫸", "◤", "乄", "ツ", "彡★", "༻", "☬"
    ];

    // Username ideas for different platforms
    const usernameFormats = {
        "TikTok": [
            "{n}.official", "its.{n}", "real.{n}", "{n}.vibes",
            "{n}.x", "hey.{n}", "{n}.daily", "the.{n}",
            "{n}_world", "{n}.clips", "{n}.editz", "not.{n}",
            "{n}._.x", "i_am_{n}", "{n}.live", "only.{n}",
            "{n}.zone", "{n}.here", "{n}._official", "x.{n}.x"
        ],

        "Facebook": [
            "{n} Official", "Real {n}", "Mr {n}", "Its {n}",
            "{n} Khan", "{n} Malik", "The {n}", "{n} Ahmed",
            "{n} Writes", "{n} World", "{n} Ali", "King {n}",
            "{n} Creator", "Hello {n}", "{n} Life",
            "Official {n}", "{n} Studio", "{n} Vlogs",
            "{n} Diary", "Simply {n}"
        ],

        "Instagram": [
            "{n}.official", "its.{n}", "the.{n}", "{n}.jpg",
            "{n}.diary", "{n}.vibes", "{n}._.x", "hey.{n}",
            "{n}.gram", "{n}.aesthetic", "not.{n}",
            "{n}.world", "{n}.captures", "{n}.visuals",
            "{n}.editz", "{n}.studio", "real.{n}",
            "{n}.daily", "{n}_xo", "i_am_{n}"
        ],

        "PUBG Mobile": [
            "亗{n}亗", "乂{n}乂", "么{n}么", "彡{n}彡",
            "꧁༒{n}༒꧂", "『{n}』", "♛{n}♛", "☠{n}☠",
            "⚡{n}⚡", "乄{n}乄", "ツ{n}ツ", "亗『{n}』亗",
            "꧁{n}꧂", "༺{n}༻", "♚{n}♚", "☬{n}☬",
            "『亗』{n}", "{n}々", "么『{n}』么", "彡★{n}★彡"
        ],

        "Free Fire": [
            "꧁༒{n}༒꧂", "亗{n}亗", "乂{n}乂", "★{n}★",
            "么{n}么", "꧁{n}꧂", "『{n}』", "♛{n}♛",
            "☠{n}☠", "⚡{n}⚡", "ツ{n}ツ", "༺{n}༻",
            "♚{n}♚", "☬{n}☬", "彡{n}彡", "乄{n}乄",
            "亗『{n}』亗", "꧁☠{n}☠꧂", "★彡{n}彡★",
            "『么』{n}『么』"
        ],

        "YouTube": [
            "{n} Gaming", "{n} Plays", "{n} TV", "{n} Studio",
            "{n} Official", "The {n} Show", "{n} World",
            "{n} Live", "{n} Shorts", "{n} Creates",
            "{n} Channel", "{n} Zone", "Its {n}",
            "{n} Vlogs", "{n} Clips", "{n} Universe",
            "{n} Central", "{n} Hub", "{n} Productions",
            "Real {n}"
        ],

        "WhatsApp": [
            "♡ {n} ♡", "꧁{n}꧂", "✿ {n} ✿", "★ {n} ★",
            "ღ {n} ღ", "♛ {n} ♛", "『{n}』", "ツ {n} ツ",
            "✨ {n} ✨", "🌸 {n} 🌸", "Its {n}",
            "Mr {n}", "The {n}", "❣ {n} ❣",
            "☯ {n} ☯", "✧ {n} ✧", "♡︎{n}♡︎",
            "• {n} •", "❀ {n} ❀", "♕ {n} ♕"
        ],

        "Gaming": [
            "亗{n}亗", "xX_{n}_Xx", "{n}OP", "Pro{n}",
            "{n}YT", "{n}Plays", "Dark{n}", "Ghost{n}",
            "Shadow{n}", "Sniper{n}", "King{n}", "Legend{n}",
            "Killer{n}", "NoMercy{n}", "Clutch{n}",
            "Venom{n}", "Toxic{n}", "Alpha{n}",
            "Rogue{n}", "Beast{n}"
        ],

        "Cool Names": [
            "Mr {n}", "King {n}", "Legend {n}", "The {n}",
            "Its {n}", "Real {n}", "Dark {n}", "Royal {n}",
            "Silent {n}", "Magic {n}", "Crazy {n}",
            "Epic {n}", "Alpha {n}", "Urban {n}",
            "Nova {n}", "Shadow {n}", "Mystic {n}",
            "Wild {n}", "Unique {n}", "Super {n}"
        ],

        "Stylish Names": [
            "꧁༒{n}༒꧂", "♛『{n}』♛", "★彡{n}彡★",
            "𓆩{n}𓆪", "༺{n}༻", "✧{n}✧",
            "♡{n}♡", "♕{n}♕", "☬{n}☬",
            "꧁ঔৣ{n}ঔৣ꧂", "『★{n}★』", "⫷{n}⫸",
            "✿{n}✿", "☾{n}☽", "♚{n}♚",
            "༒{n}༒", "ღ{n}ღ", "⚡{n}⚡",
            "ꕥ{n}ꕥ", "❖{n}❖"
        ]
    };

    // Generate lots of different gaming combinations
    function createGamingNames(name, prefixes, suffixes) {
        const names = [];

        for (const prefix of prefixes) {
            for (const suffix of suffixes) {
                names.push(`${prefix}${name}${suffix}`);
            }
        }

        return names;
    }

    function makeNames(name, platform) {
        const output = new Set();
        const formats = usernameFormats[platform] || usernameFormats["Cool Names"];

        // Platform-specific username formats
        formats.forEach(format => {
            output.add(format.replaceAll("{n}", name));
        });

        // Gaming platforms receive gaming-symbol combinations
        if (platform === "PUBG Mobile" || platform === "Free Fire" ||
            platform === "Gaming") {
            createGamingNames(name, gamingPrefixes, gamingSuffixes)
                .forEach(item => output.add(item));
        }

        // Add different text forms
        output.add(name.toUpperCase());
        output.add(name.toLowerCase());
        output.add(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

        return Array.from(output);
    }

    let currentNames = [];
    let visibleCount = 50;

    function renderNames() {
        results.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent =
            `${platformSelect.value} — ${currentNames.length} Designs`;

        results.appendChild(heading);

        const list = document.createElement("div");
        list.className = "nickname-list";

        currentNames.slice(0, visibleCount).forEach(nickname => {
            const item = document.createElement("div");
            item.className = "nickname-item";

            const text = document.createElement("span");
            text.className = "nickname-text";
            text.textContent = nickname;

            const copyBtn = document.createElement("button");
            copyBtn.type = "button";
            copyBtn.className = "copy-btn";
            copyBtn.textContent = "Copy";

            copyBtn.addEventListener("click", async function () {
                try {
                    await navigator.clipboard.writeText(nickname);
                    copyBtn.textContent = "Copied!";

                    setTimeout(() => {
                        copyBtn.textContent = "Copy";
                    }, 1200);
                } catch (error) {
                    alert("Copy failed. Please select and copy the name manually.");
                }
            });

            item.appendChild(text);
            item.appendChild(copyBtn);
            list.appendChild(item);
        });

        results.appendChild(list);

        if (visibleCount < currentNames.length) {
            const moreBtn = document.createElement("button");
            moreBtn.type = "button";
            moreBtn.className = "primary-button";
            moreBtn.textContent = "Load More Designs";

            moreBtn.addEventListener("click", function () {
                visibleCount += 50;
                renderNames();
            });

            results.appendChild(moreBtn);
        }
    }

    generateBtn.addEventListener("click", function () {
        const name = baseName.value.trim();

        if (!name) {
            alert("Please enter your name first!");
            baseName.focus();
            return;
        }

        currentNames = makeNames(name, platformSelect.value);
        visibleCount = 50;
        renderNames();
    });

    // Clicking a platform card automatically selects it
    document.querySelectorAll(".platform-card").forEach(card => {
        card.addEventListener("click", function () {
            const platform = card.dataset.platform;

            if (platformSelect.querySelector(`option[value="${platform}"]`)) {
                platformSelect.value = platform;
            }

            document.getElementById("generator")?.scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});