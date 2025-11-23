// Dati degli Stati UE
const euCountries = {
    'PT': { name: 'Portogallo', capital: 'Lisbona', description: 'Repubblica situata nella penisola iberica.' },
    'ES': { name: 'Spagna', capital: 'Madrid', description: 'Paese situato nella penisola iberica con ricca storia e cultura.' },
    'FR': { name: 'Francia', capital: 'Parigi', description: 'Una delle maggiori economie europee con grande influenza culturale.' },
    'IT': { name: 'Italia', capital: 'Roma', description: 'Patria del Rinascimento con patrimonio culturale straordinario.' },
    'DE': { name: 'Germania', capital: 'Berlino', description: 'La più grande economia europea, centro dell\'innovazione.' },
    'PL': { name: 'Polonia', capital: 'Varsavia', description: 'Grande paese dell\'Europa centrale con economia in crescita.' },
    'NL': { name: 'Paesi Bassi', capital: 'Amsterdam', description: 'Conosciuto per i tulipani, mulini a vento e innovazione.' },
    'BE': { name: 'Belgio', capital: 'Bruxelles', description: 'Sede delle principali istituzioni dell\'Unione Europea.' },
    'LU': { name: 'Lussemburgo', capital: 'Lussemburgo', description: 'Piccolo stato con grande importanza finanziaria.' },
    'AT': { name: 'Austria', capital: 'Vienna', description: 'Paese alpino con forte tradizione musicale e culturale.' },
    'CZ': { name: 'Repubblica Ceca', capital: 'Praga', description: 'Famosa per la sua architettura medievale.' },
    'SK': { name: 'Slovacchia', capital: 'Bratislava', description: 'Paese montuoso con economia dinamica.' },
    'HU': { name: 'Ungheria', capital: 'Budapest', description: 'Ricca di storia e cultura mitteleuropea.' },
    'SI': { name: 'Slovenia', capital: 'Lubiana', description: 'Piccolo paese tra Alpi e Adriatico.' },
    'HR': { name: 'Croazia', capital: 'Zagabria', description: 'Conosciuta per la splendida costa adriatica.' },
    'RO': { name: 'Romania', capital: 'Bucarest', description: 'Paese con ricco patrimonio culturale e naturale.' },
    'BG': { name: 'Bulgaria', capital: 'Sofia', description: 'Tra i paesi più antichi d\'Europa.' },
    'GR': { name: 'Grecia', capital: 'Atene', description: 'Culla della civiltà occidentale e della democrazia.' },
    'SE': { name: 'Svezia', capital: 'Stoccolma', description: 'Paese scandinavo con alto tenore di vita.' },
    'FI': { name: 'Finlandia', capital: 'Helsinki', description: 'Paese delle mille laghi e dell\'innovazione tecnologica.' },
    'DK': { name: 'Danimarca', capital: 'Copenaghen', description: 'Regno scandinavo con alta qualità della vita.' },
    'EE': { name: 'Estonia', capital: 'Tallinn', description: 'Leader nella digitalizzazione e e-government.' },
    'LV': { name: 'Lettonia', capital: 'Riga', description: 'Paese baltico con architettura Art Nouveau.' },
    'LT': { name: 'Lituania', capital: 'Vilnius', description: 'Il più grande dei paesi baltici.' },
    'IE': { name: 'Irlanda', capital: 'Dublino', description: 'L\'isola di smeraldo con forte tradizione letteraria.' },
    'MT': { name: 'Malta', capital: 'La Valletta', description: 'Arcipelago nel Mediterraneo con storia millenaria.' },
    'CY': { name: 'Cipro', capital: 'Nicosia', description: 'Isola nel Mediterraneo orientale.' }
};

// Stato dell'applicazione
let currentCountry = null;
let currentStep = 0;
let completedSteps = 0;
let formData = {};

// Blockchain semplificato
class SimpleBlockchain {
    constructor() {
        this.chain = [];
        this.createGenesisBlock();
    }

    createGenesisBlock() {
        const genesisBlock = {
            index: 0,
            timestamp: new Date().toISOString(),
            data: 'Genesis Block',
            previousHash: '0',
            hash: this.calculateHash(0, new Date().toISOString(), 'Genesis Block', '0')
        };
        this.chain.push(genesisBlock);
        this.updateBlockchainUI();
    }

    calculateHash(index, timestamp, data, previousHash) {
        const str = index + timestamp + JSON.stringify(data) + previousHash;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return '0x' + Math.abs(hash).toString(16).padStart(40, '0');
    }

    addBlock(data) {
        const previousBlock = this.chain[this.chain.length - 1];
        const newBlock = {
            index: this.chain.length,
            timestamp: new Date().toISOString(),
            data: data,
            previousHash: previousBlock.hash,
            hash: ''
        };
        newBlock.hash = this.calculateHash(
            newBlock.index,
            newBlock.timestamp,
            newBlock.data,
            newBlock.previousHash
        );
        this.chain.push(newBlock);
        this.updateBlockchainUI();
        return newBlock;
    }

    verifyChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            const calculatedHash = this.calculateHash(
                currentBlock.index,
                currentBlock.timestamp,
                currentBlock.data,
                currentBlock.previousHash
            );

            if (currentBlock.hash !== calculatedHash) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    updateBlockchainUI() {
        const latestBlock = this.chain[this.chain.length - 1];
        document.getElementById('currentHash').textContent = latestBlock.hash;
        document.getElementById('blockNumber').textContent = `#${latestBlock.index}`;
        document.getElementById('timestamp').textContent = new Date(latestBlock.timestamp).toLocaleString('it-IT');
    }
}

// Inizializza blockchain
const blockchain = new SimpleBlockchain();

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initBlockchain();
    updateProgress();
});

// Inizializza mappa interattiva
function initMap() {
    const countries = document.querySelectorAll('.country');

    countries.forEach(country => {
        country.addEventListener('click', function() {
            const countryId = this.id;
            selectCountry(countryId);
        });

        country.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.opacity = '1';
            }
        });

        country.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.opacity = '0.8';
            }
        });
    });
}

// Seleziona uno stato
function selectCountry(countryId) {
    // Rimuovi selezione precedente
    document.querySelectorAll('.country').forEach(c => {
        c.classList.remove('selected');
    });

    // Seleziona nuovo stato
    const country = document.getElementById(countryId);
    country.classList.add('selected');
    currentCountry = countryId;

    // Mostra info stato
    const countryData = euCountries[countryId];
    const countryInfo = document.getElementById('countryInfo');
    const countryName = document.getElementById('countryName');
    const countryDescription = document.getElementById('countryDescription');

    countryName.textContent = `${countryData.name} - ${countryData.capital}`;
    countryDescription.textContent = countryData.description;
    countryInfo.style.display = 'block';

    // Aggiungi evento al pulsante
    const startBtn = document.getElementById('startProcedure');
    startBtn.onclick = () => startProcedure(countryId);

    // Scroll smooth verso le info
    countryInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Inizia procedura
function startProcedure(countryId) {
    const countryData = euCountries[countryId];

    // Registra su blockchain
    blockchain.addBlock({
        action: 'Procedura Iniziata',
        country: countryData.name,
        timestamp: new Date().toISOString()
    });

    // Salva nel localStorage
    localStorage.setItem('selectedCountry', countryId);
    localStorage.setItem('selectedCountryName', countryData.name);

    // Redirect alla pagina procedura
    window.location.href = 'procedura.html';
}

// Inizializza blockchain
function initBlockchain() {
    const verifyBtn = document.getElementById('verifyBlockchain');

    verifyBtn.addEventListener('click', function() {
        const isValid = blockchain.verifyChain();

        if (isValid) {
            alert('✅ Blockchain verificata! Tutti i blocchi sono validi e integri.');
        } else {
            alert('❌ Attenzione! La blockchain è stata compromessa.');
        }
    });
}

// Aggiorna progresso
function updateProgress() {
    const totalSteps = 6;
    const progress = (completedSteps / totalSteps) * 100;

    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `Livello: ${Math.round(progress)}%`;
    document.getElementById('completedSteps').textContent = completedSteps;
}

// Gestione scroll per barra di progresso
window.addEventListener('scroll', function() {
    const progressContainer = document.getElementById('progressBar');

    if (window.scrollY > 100) {
        progressContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        progressContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Animazioni al caricamento
window.addEventListener('load', function() {
    const countries = document.querySelectorAll('.country');
    countries.forEach((country, index) => {
        setTimeout(() => {
            country.style.opacity = '0.8';
        }, index * 20);
    });
});

// Export per uso in altre pagine
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { blockchain, euCountries };
}
