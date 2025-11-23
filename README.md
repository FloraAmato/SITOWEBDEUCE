# 🇪🇺 Piattaforma Procedure UE - Mappa Interattiva

Sito web completo con mappa interattiva degli Stati membri dell'Unione Europea, sistema di procedure modulari e integrazione blockchain.

## ✨ Caratteristiche Principali

### 1. 🗺️ Mappa Interattiva Stati UE
- Mappa SVG interattiva con tutti i 27 Stati membri dell'UE
- Click su ogni stato per visualizzare informazioni dettagliate
- Animazioni fluide e effetti hover
- Design responsive e moderno

### 2. 📋 Sistema di Procedure Semplificate
- **6 Moduli** completi con navigazione avanti/indietro
- Validazione in tempo reale dei campi
- Auto-save dei dati ogni 30 secondi
- Sistema di indicatori visivi per ogni step

#### Moduli Disponibili:
1. **Informazioni di Base** - Tipo di richiesta, durata, scopo
2. **Documenti** - Passaporto, nazionalità, documenti necessari
3. **Dettagli Personali** - Dati anagrafici completi
4. **Indirizzo e Contatti** - Informazioni di contatto
5. **Verifica Dati** - Riepilogo completo con conferma
6. **Conferma Finale** - Certificazione blockchain

### 3. 📊 Barra di Progresso Dinamica
- Barra di progresso **fissa** che segue l'utente durante lo scroll
- Aggiornamento in tempo reale del livello di completamento
- Visualizzazione percentuale del progresso
- Indicatori di step completati

### 4. ⛓️ Integrazione Blockchain
- Sistema blockchain semplificato per tracciabilità
- Ogni azione registrata su blockchain immutabile
- Hash crittografici per ogni transazione
- Verifica dell'integrità della catena
- Timestamp per ogni operazione
- Persistenza dei dati tramite localStorage

#### Funzionalità Blockchain:
- Registrazione inizio procedura
- Tracking di ogni passaggio tra moduli
- Certificazione finale con hash univoco
- Verifica dell'integrità della catena

## 🚀 Come Utilizzare

### Avvio Rapido
1. Apri `index.html` nel browser
2. Clicca su uno stato della mappa UE
3. Premi "Inizia Procedura"
4. Compila i 6 moduli navigando avanti/indietro
5. Verifica i dati e completa la procedura
6. Ricevi certificazione blockchain

### Navigazione
- **Avanti →** - Passa al modulo successivo (con validazione)
- **← Indietro** - Torna al modulo precedente
- Barra di progresso mostra sempre la posizione corrente
- Indicatori visivi mostrano step completati

## 📁 Struttura File

```
SITOWEBDEUCE/
├── index.html          # Pagina principale con mappa UE
├── procedura.html      # Pagina procedure modulari
├── styles.css          # Stili completi e responsive
├── script.js           # Script mappa e blockchain (index)
├── procedura.js        # Script navigazione e validazione
└── README.md           # Questo file
```

## 🎨 Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Design moderno con gradients e animazioni
- **JavaScript (Vanilla)** - Logica applicativa
- **SVG** - Mappa vettoriale interattiva
- **LocalStorage** - Persistenza dati e blockchain
- **Responsive Design** - Mobile-first approach

## 🔒 Sicurezza e Privacy

- Tutti i dati sono salvati **localmente** (localStorage)
- Nessun invio a server esterni
- Blockchain locale per tracciabilità
- Validazione lato client
- Hash crittografici per integrità dati

## 📱 Compatibilità

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers
- ✅ Tablet

## 🎯 Stati UE Supportati

Tutti i 27 Stati membri dell'Unione Europea:

- 🇵🇹 Portogallo - 🇪🇸 Spagna - 🇫🇷 Francia - 🇮🇹 Italia
- 🇩🇪 Germania - 🇵🇱 Polonia - 🇳🇱 Paesi Bassi - 🇧🇪 Belgio
- 🇱🇺 Lussemburgo - 🇦🇹 Austria - 🇨🇿 Repubblica Ceca - 🇸🇰 Slovacchia
- 🇭🇺 Ungheria - 🇸🇮 Slovenia - 🇭🇷 Croazia - 🇷🇴 Romania
- 🇧🇬 Bulgaria - 🇬🇷 Grecia - 🇸🇪 Svezia - 🇫🇮 Finlandia
- 🇩🇰 Danimarca - 🇪🇪 Estonia - 🇱🇻 Lettonia - 🇱🇹 Lituania
- 🇮🇪 Irlanda - 🇲🇹 Malta - 🇨🇾 Cipro

## 🔧 Funzionalità Avanzate

### Auto-Save
- Salvataggio automatico ogni 30 secondi
- Prevenzione perdita dati alla chiusura
- Ripristino sessione precedente

### Validazione
- Validazione in tempo reale
- Highlight campi obbligatori
- Messaggi di errore chiari

### Blockchain
- Hash SHA-256 simulato
- Catena immutabile
- Verifica integrità
- Timestamp preciso

## 📄 Licenza

© 2025 Piattaforma Procedure UE. Tutti i diritti riservati.

## 🤝 Supporto

Per domande o supporto, contattare l'amministratore del sistema.

---

**Versione**: 1.0.0
**Data**: Gennaio 2025
**Sviluppato per**: Piattaforma UE Procedure Semplificate
