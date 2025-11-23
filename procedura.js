// Blockchain semplificato (stesso del file principale)
class SimpleBlockchain {
    constructor() {
        this.chain = this.loadChain() || [];
        if (this.chain.length === 0) {
            this.createGenesisBlock();
        }
        this.updateBlockchainUI();
    }

    loadChain() {
        const saved = localStorage.getItem('blockchain');
        return saved ? JSON.parse(saved) : null;
    }

    saveChain() {
        localStorage.setItem('blockchain', JSON.stringify(this.chain));
    }

    createGenesisBlock() {
        const genesisBlock = {
            index: 0,
            timestamp: new Date().toISOString(),
            data: 'Genesis Block - Piattaforma UE',
            previousHash: '0',
            hash: this.calculateHash(0, new Date().toISOString(), 'Genesis Block - Piattaforma UE', '0')
        };
        this.chain.push(genesisBlock);
        this.saveChain();
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
        this.saveChain();
        this.updateBlockchainUI();
        return newBlock;
    }

    updateBlockchainUI() {
        const latestBlock = this.chain[this.chain.length - 1];
        const currentHashEl = document.getElementById('currentBlockHash');
        const currentBlockEl = document.getElementById('currentBlockNumber');
        const lastUpdateEl = document.getElementById('lastUpdate');

        if (currentHashEl) {
            currentHashEl.textContent = latestBlock.hash;
        }
        if (currentBlockEl) {
            currentBlockEl.textContent = `#${latestBlock.index}`;
        }
        if (lastUpdateEl) {
            lastUpdateEl.textContent = new Date(latestBlock.timestamp).toLocaleString('it-IT');
        }
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
}

// Stato dell'applicazione
let currentStep = 0;
const totalSteps = 6;
let formData = {};
const blockchain = new SimpleBlockchain();

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    loadSelectedCountry();
    showStep(currentStep);
    updateProgress();
    updateNavigationButtons();

    // Registra inizio procedura su blockchain
    const countryName = localStorage.getItem('selectedCountryName') || 'Non specificato';
    blockchain.addBlock({
        action: 'Procedura Iniziata',
        country: countryName,
        step: 'Step 1',
        timestamp: new Date().toISOString()
    });
});

// Carica stato selezionato
function loadSelectedCountry() {
    const countryName = localStorage.getItem('selectedCountryName');
    const selectedCountryEl = document.getElementById('selectedCountry');

    if (countryName) {
        selectedCountryEl.textContent = `Stato Selezionato: ${countryName}`;
    } else {
        selectedCountryEl.textContent = 'Nessuno stato selezionato';
    }
}

// Mostra step specifico
function showStep(stepNumber) {
    // Nascondi tutti gli step
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
    });

    // Mostra step corrente
    const currentStepEl = document.getElementById(`step${stepNumber}`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }

    // Aggiorna indicatore step
    updateStepIndicator(stepNumber);

    // Se siamo allo step di verifica, mostra il riepilogo
    if (stepNumber === 4) {
        showSummary();
    }

    // Scroll all'inizio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Aggiorna indicatore step
function updateStepIndicator(stepNumber) {
    const indicators = document.querySelectorAll('.step-indicator-item');

    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');

        if (index < stepNumber) {
            indicator.classList.add('completed');
            const dot = indicator.querySelector('.step-dot');
            dot.innerHTML = '✓';
        } else if (index === stepNumber) {
            indicator.classList.add('active');
            const dot = indicator.querySelector('.step-dot');
            dot.innerHTML = index + 1;
        } else {
            const dot = indicator.querySelector('.step-dot');
            dot.innerHTML = index + 1;
        }
    });
}

// Cambia step
function changeStep(direction) {
    // Valida step corrente prima di procedere
    if (direction > 0 && !validateCurrentStep()) {
        return;
    }

    // Salva dati dello step corrente
    saveCurrentStepData();

    // Calcola nuovo step
    const newStep = currentStep + direction;

    // Verifica limiti
    if (newStep < 0 || newStep >= totalSteps) {
        return;
    }

    // Registra su blockchain
    const countryName = localStorage.getItem('selectedCountryName') || 'Non specificato';
    blockchain.addBlock({
        action: direction > 0 ? 'Step Avanti' : 'Step Indietro',
        country: countryName,
        fromStep: currentStep + 1,
        toStep: newStep + 1,
        timestamp: new Date().toISOString()
    });

    // Aggiorna step corrente
    currentStep = newStep;

    // Mostra nuovo step
    showStep(currentStep);

    // Aggiorna progresso
    updateProgress();

    // Aggiorna pulsanti navigazione
    updateNavigationButtons();

    // Se siamo all'ultimo step, completa la procedura
    if (currentStep === totalSteps - 1) {
        completeProcedure();
    }
}

// Valida step corrente
function validateCurrentStep() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const requiredFields = currentStepEl.querySelectorAll('[required]');

    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach(field => {
        if (!field.value || (field.type === 'checkbox' && !field.checked)) {
            isValid = false;
            field.style.borderColor = '#dc3545';

            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });

    if (!isValid) {
        alert('⚠️ Completa tutti i campi obbligatori prima di procedere.');
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }

    return isValid;
}

// Salva dati step corrente
function saveCurrentStepData() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const inputs = currentStepEl.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.id] = input.checked;
        } else {
            formData[input.id] = input.value;
        }
    });

    // Salva in localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Aggiorna progresso
function updateProgress() {
    const progress = (currentStep / (totalSteps - 1)) * 100;

    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    progressFill.style.width = progress + '%';
    progressText.textContent = `Livello: ${Math.round(progress)}%`;
}

// Aggiorna pulsanti navigazione
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Disabilita "Indietro" al primo step
    if (currentStep === 0) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.5';
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
    }

    // Nascondi pulsanti all'ultimo step
    if (currentStep === totalSteps - 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }

    // Cambia testo dell'ultimo pulsante prima della conferma
    if (currentStep === totalSteps - 2) {
        nextBtn.textContent = 'Conferma e Completa ✓';
        nextBtn.style.background = '#28a745';
    } else {
        nextBtn.textContent = 'Avanti →';
        nextBtn.style.background = '';
    }
}

// Mostra riepilogo
function showSummary() {
    const summaryContent = document.getElementById('summaryContent');

    // Carica dati salvati
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        formData = JSON.parse(savedData);
    }

    const labels = {
        requestType: 'Tipo di Richiesta',
        duration: 'Durata',
        purpose: 'Scopo',
        passport: 'Passaporto',
        passportExpiry: 'Scadenza Passaporto',
        nationality: 'Nazionalità',
        firstName: 'Nome',
        lastName: 'Cognome',
        birthDate: 'Data di Nascita',
        birthPlace: 'Luogo di Nascita',
        gender: 'Sesso',
        address: 'Indirizzo',
        city: 'Città',
        postalCode: 'CAP',
        country: 'Paese',
        email: 'Email',
        phone: 'Telefono'
    };

    let summaryHTML = '<h3 style="color: #003399; margin-bottom: 20px;">📋 Riepilogo Dati</h3>';

    for (const [key, value] of Object.entries(formData)) {
        if (labels[key] && value) {
            summaryHTML += `
                <div style="margin-bottom: 15px; padding: 10px; background: white; border-radius: 8px;">
                    <strong style="color: #6c757d;">${labels[key]}:</strong><br>
                    <span style="color: #212529; font-size: 1.1rem;">${value}</span>
                </div>
            `;
        }
    }

    summaryContent.innerHTML = summaryHTML;
}

// Completa procedura
function completeProcedure() {
    // Salva dati finali
    saveCurrentStepData();

    // Registra completamento su blockchain
    const countryName = localStorage.getItem('selectedCountryName') || 'Non specificato';
    const finalBlock = blockchain.addBlock({
        action: 'Procedura Completata',
        country: countryName,
        formData: formData,
        timestamp: new Date().toISOString(),
        status: 'SUCCESS'
    });

    // Mostra dettagli transazione
    document.getElementById('txHash').textContent = finalBlock.hash;
    document.getElementById('blockNum').textContent = `#${finalBlock.index}`;
    document.getElementById('txTimestamp').textContent = new Date(finalBlock.timestamp).toLocaleString('it-IT');

    // Animazione di successo
    const successMsg = document.querySelector('.success-message');
    if (successMsg) {
        successMsg.classList.add('pulse');
    }

    // Salva completamento
    localStorage.setItem('procedureCompleted', 'true');
    localStorage.setItem('completionDate', new Date().toISOString());
}

// Gestione scroll per barra di progresso
window.addEventListener('scroll', function() {
    const progressContainer = document.getElementById('progressBar');

    if (window.scrollY > 50) {
        progressContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        progressContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Auto-save ogni 30 secondi
setInterval(() => {
    if (currentStep < totalSteps - 1) {
        saveCurrentStepData();
        console.log('Auto-save eseguito');
    }
}, 30000);

// Previeni perdita dati su chiusura pagina
window.addEventListener('beforeunload', function(e) {
    if (currentStep < totalSteps - 1 && Object.keys(formData).length > 0) {
        saveCurrentStepData();
        e.preventDefault();
        e.returnValue = '';
        return 'Hai modifiche non salvate. Sei sicuro di voler uscire?';
    }
});
