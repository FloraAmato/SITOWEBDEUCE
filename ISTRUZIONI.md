# 📖 Istruzioni per l'Uso

## 🚀 Avvio del Sito

### Metodo 1: Apertura Diretta
1. Apri il file `index.html` con il tuo browser preferito
2. Il sito funzionerà immediatamente senza server!

### Metodo 2: Server Locale (Opzionale)
Se preferisci usare un server locale:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

Poi apri `http://localhost:8000` nel browser.

## 📱 Come Utilizzare la Piattaforma

### Passo 1: Seleziona uno Stato UE
1. Nella homepage, vedrai la mappa interattiva dell'Europa
2. **Passa il mouse** sugli stati per vederli illuminarsi
3. **Clicca su uno stato** per selezionarlo
4. Appariranno le informazioni dello stato selezionato

### Passo 2: Inizia la Procedura
1. Dopo aver selezionato uno stato, clicca su **"Inizia Procedura"**
2. Verrai reindirizzato alla pagina delle procedure
3. La tua selezione sarà registrata sulla blockchain

### Passo 3: Compila i Moduli
Compila i **6 moduli** seguendo l'ordine:

#### Modulo 1: Informazioni di Base
- Tipo di richiesta (Visto, Permesso, ecc.)
- Durata prevista
- Scopo della richiesta

#### Modulo 2: Documenti
- Numero passaporto
- Data di scadenza
- Nazionalità

#### Modulo 3: Dettagli Personali
- Nome e cognome
- Data e luogo di nascita
- Sesso

#### Modulo 4: Indirizzo e Contatti
- Indirizzo completo
- Email e telefono

#### Modulo 5: Verifica Dati
- Controlla tutti i dati inseriti
- Accetta i termini e condizioni

#### Modulo 6: Conferma
- Visualizza la certificazione blockchain
- Ricevi il numero di transazione

### Passo 4: Navigazione
- Usa **"Avanti →"** per passare al modulo successivo
- Usa **"← Indietro"** per tornare indietro
- La **barra di progresso in alto** mostra sempre la tua posizione
- Ogni passaggio è salvato automaticamente

## ⛓️ Funzionalità Blockchain

### Visualizzazione Stato Blockchain
- **Hash Blocco Corrente**: Identificativo univoco dell'ultimo blocco
- **Numero Blocco**: Posizione nella catena
- **Timestamp**: Data e ora dell'operazione

### Verifica Integrità
Nella homepage, clicca su **"Verifica Integrità"** per:
- Controllare che la blockchain non sia stata manomessa
- Validare tutti gli hash
- Confermare la correttezza della catena

### Cosa Viene Registrato
Ogni azione viene tracciata:
- ✅ Inizio procedura
- ✅ Navigazione tra moduli
- ✅ Completamento procedura
- ✅ Tutti i dati inseriti (hash crittografico)

## 💾 Salvataggio Dati

### Auto-Save
- I dati vengono salvati **automaticamente ogni 30 secondi**
- Puoi chiudere e riaprire il browser
- I tuoi progressi saranno mantenuti

### Dove Sono i Dati?
- Tutti i dati sono salvati **localmente** nel tuo browser (localStorage)
- Nessun dato viene inviato a server esterni
- Hai il pieno controllo dei tuoi dati

### Cancellare i Dati
Per ricominciare da capo:
1. Apri la Console del browser (F12)
2. Digita: `localStorage.clear()`
3. Aggiorna la pagina

## 🎨 Caratteristiche Visive

### Barra di Progresso
- **Sempre visibile** in alto
- Si aggiorna in tempo reale
- Mostra la percentuale di completamento

### Indicatori Step
- Pallini numerati per ogni modulo
- ✓ Verde = Completato
- 🔵 Blu = In corso
- ⚪ Grigio = Da fare

### Animazioni
- Transizioni fluide tra moduli
- Effetti hover sulla mappa
- Animazioni di successo

## 🔒 Privacy e Sicurezza

- ✅ Tutti i dati rimangono sul tuo dispositivo
- ✅ Nessuna connessione a server esterni
- ✅ Blockchain locale per tracciabilità
- ✅ Hash crittografici per integrità

## 📱 Compatibilità

### Browser Supportati
- ✅ Google Chrome / Edge
- ✅ Mozilla Firefox
- ✅ Apple Safari
- ✅ Opera
- ✅ Browser mobile

### Dispositivi
- ✅ Desktop
- ✅ Tablet
- ✅ Smartphone

## ❓ Risoluzione Problemi

### La mappa non si vede?
- Assicurati di aprire `index.html` con un browser moderno
- Controlla la console (F12) per eventuali errori

### I dati non si salvano?
- Verifica che il localStorage del browser sia abilitato
- Alcuni browser in modalità incognito potrebbero limitare il localStorage

### La validazione non funziona?
- Assicurati che JavaScript sia abilitato
- Compila tutti i campi obbligatori (contrassegnati con *)

### Errore al passaggio successivo?
- Controlla di aver compilato **tutti i campi obbligatori**
- Cerca i campi con bordo rosso
- Leggi l'alert che appare

## 🎯 Consigli Utili

1. **Compila con calma** - Hai tutto il tempo che vuoi
2. **Usa l'auto-save** - I dati vengono salvati automaticamente
3. **Torna indietro** - Puoi sempre modificare i moduli precedenti
4. **Verifica prima di confermare** - Il modulo 5 mostra un riepilogo completo
5. **Salva il numero di transazione** - Al completamento, copia l'hash blockchain

## 📞 Supporto

Per domande o problemi:
- Consulta il file `README.md` per dettagli tecnici
- Verifica la console del browser per errori
- Controlla che tutti i file siano nella stessa cartella

---

**Buon lavoro con la Piattaforma Procedure UE!** 🇪🇺
