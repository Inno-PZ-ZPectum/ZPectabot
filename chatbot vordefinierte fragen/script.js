// Globale Variable zur Speicherung der Kategorien
let categories = null;

// Funktion zum Laden der Daten aus der JSON-Datei
async function loadChatbotData() {
    const response = await fetch('website_data.json');
    const data = await response.json();
    return data;
}

// Funktion zum Starten des Chatbots
async function startChatbot() {
    const data = await loadChatbotData();
    categories = data.categories; // Speichern der Kategorien

    document.getElementById('enterButton').addEventListener('click', () => handleUserInput());
    document.getElementById('userInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });
}

// Funktion zur Verarbeitung der Benutzereingabe
function handleUserInput() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput) {
        displayGreetingAndOptions();
    }
}

// Funktion zur Begrüßung und Anzeige der Hauptkategorien
function displayGreetingAndOptions() {
    const container = document.getElementById('chatbot-content');
    container.innerHTML = '<h2>Hallo, Willkommen bei Innovationstechnologie PZ-ZPectum!</h2>' +
                          '<p>Ich bin der ZPecta Bot und freue mich, Ihnen bei Ihren Fragen und Anliegen behilflich zu sein.</p>' +
                          '<p>Bitte wählen Sie eines unserer Themen aus, um gezielte Unterstützung und Informationen zu erhalten.</p>';

    // Anzeige der Hauptkategorien
    for (const category in categories) {
        const button = document.createElement('button');
        button.innerText = category;
        button.onclick = () => displayCategoryDetails(categories[category], category);
        container.appendChild(button);
    }
}

// Funktion zur Anzeige der Details einer Kategorie
function displayCategoryDetails(category, categoryName) {
    const container = document.getElementById('chatbot-content');
    container.innerHTML = `<h2>${categoryName}</h2>`;

    if (categoryName === 'Dienstleistungen') {
        category.forEach(subCategory => {
            const button = document.createElement('button');
            button.innerText = subCategory.title;
            button.onclick = () => displayServiceDescription(subCategory);
            container.appendChild(button);
        });
    } else if (categoryName === 'Kontakt') {
        container.innerHTML = '<h2>Kontakt</h2>' +
                              '<p>Kontaktieren Sie uns per E-Mail an <a href="mailto:office@innopz-zpectum.tech">office@innopz-zpectum.tech</a> oder nutzen Sie unser <a href="http://www.innopz-zpectum.tech/kontakt" target="_blank">Kontaktformular</a>.</p>';
    } else if (categoryName === 'Referenzprojekte') {
        container.innerHTML = '<p>Besuchen Sie unsere <a href="http://www.innopz-zpectum.tech/referenzen" target="_blank">Referenzprojekte</a> für eine Übersicht unserer bisherigen Arbeiten.</p>';
    } else {
        category.forEach(item => {
            const heading = document.createElement('h3');
            heading.innerText = item.title || '';
            const description = document.createElement('p');
            description.innerText = item.description;
            container.appendChild(heading);
            container.appendChild(description);
        });
    }

    // Rückkehr zur Hauptkategorie
    const backButton = document.createElement('button');
    backButton.innerText = 'Zurück';
    backButton.onclick = () => displayGreetingAndOptions();
    container.appendChild(backButton);
}

// Funktion zur Anzeige der Dienstleistungsbeschreibung
function displayServiceDescription(subCategory) {
    const container = document.getElementById('chatbot-content');
    container.innerHTML = `<h2>${subCategory.title}</h2><p>${subCategory.description}</p>`;
    
    const backButton = document.createElement('button');
    backButton.innerText = 'Zurück';
    backButton.onclick = () => displayCategoryDetails(categories['Dienstleistungen'], 'Dienstleistungen');
    container.appendChild(backButton);
}

// Initialisieren des Chatbots beim Laden der Seite
document.addEventListener('DOMContentLoaded', startChatbot);