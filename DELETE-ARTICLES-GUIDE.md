# Artikelen Verwijderen - Handleiding

## Te Verwijderen Artikelen

De volgende 10 artikelen moeten worden verwijderd omdat ze:
- Oude versies zijn (betere versie met SEO bestaat)
- Te kort zijn (< 500 karakters)
- Geen SEO metadata hebben

---

## Lijst van Te Verwijderen Artikelen

### 1. **Dit is een testartikel** 
- **Reden**: Test artikel, geen echte content
- **ID**: `8793b048-a98e-4bf1-9a79-d954bf1bb84d`

### 2. **Budget inrichten zonder concessies: waar investeer je in?** (134 chars)
- **Reden**: DUPLICAAT - Er bestaat een betere versie met 4381 karakters en volledige SEO
- **ID**: `8sLbU849Ngr6bwLlc7nKYe`
- ✅ Bewaar de lange versie met SEO

### 3. **Kleur kiezen voor je woonkamer** (911 chars)
- **Reden**: Geen SEO metadata, korte content
- **ID**: `HPyi3RetijOhyCWtAhOzru`

### 4. **Vloeren kiezen: hout, tegel, vinyl of beton?** (120 chars)
- **Reden**: DUPLICAAT - Er bestaat een betere versie met 3502 karakters en volledige SEO
- **ID**: `j3EW81XnW2YRbriXMIXN3s`
- ✅ Bewaar: "Vloeren vergelijken: hout, tegel, vinyl of beton?"

### 5. **Je eerste woning inrichten: waar begin je?** (149 chars)
- **Reden**: DUPLICAAT - Er bestaat een betere versie met 4305 karakters en volledige SEO
- **ID**: `j3EW81XnW2YRbriXMIXOic`
- ✅ Bewaar de lange versie

### 6. **Kleine ruimtes groter laten lijken: wat werkt écht** (157 chars)
- **Reden**: DUPLICAAT - Er bestaat een betere versie met 4556 karakters en volledige SEO
- **ID**: `j3EW81XnW2YRbriXMIXPTa`
- ✅ Bewaar de lange versie

### 7. **Verlichting als basis van je interieur** (915 chars)
- **Reden**: Geen SEO metadata, relatief korte content
- **ID**: `qFjCUm0cQ7VYPPtd3LLsEp`

### 8. **Kleine ruimtes groter laten lijken** (885 chars)
- **Reden**: DUPLICAAT - Er bestaat een betere versie
- **ID**: `qFjCUm0cQ7VYPPtd3LLsQN`
- ✅ Bewaar: "Kleine ruimtes groter laten lijken: wat werkt écht"

### 9. **De kracht van natuurlijke materialen in moderne interieurs** (989 chars)
- **Reden**: DUPLICAAT - Er bestaat een betere versie met 4446 karakters en volledige SEO
- **ID**: `uLnZjZPchgZxzAUHwxQVzy`
- ✅ Bewaar de lange versie

### 10. **De comeback van ambachtelijk meubelwerk** (922 chars)
- **Reden**: Geen SEO metadata, relatief korte content
- **ID**: `uLnZjZPchgZxzAUHwxQX4E`

---

## Hoe Verwijderen in Sanity Studio?

### Methode 1: Via Content Overzicht (Aanbevolen)

1. **Open Sanity Studio**: https://interieurexpert.vercel.app/studio
2. Ga naar **"Content"** → **"Article"**
3. Zoek het artikel in de lijst (gebruik de titel)
4. Klik op het artikel om het te openen
5. Klik rechtsboven op de **drie puntjes** (⋮)
6. Klik op **"Delete"**
7. Bevestig de verwijdering

**Herhaal voor alle 10 artikelen in de lijst hierboven.**

### Methode 2: Via Vision Tool (Bulk Delete)

Als je technisch bent, kun je meerdere artikelen tegelijk verwijderen:

1. Ga naar **"Vision"** in Sanity Studio
2. Plak deze query:
```groq
*[_type == "article" && _id in [
  "8793b048-a98e-4bf1-9a79-d954bf1bb84d",
  "8sLbU849Ngr6bwLlc7nKYe",
  "HPyi3RetijOhyCWtAhOzru",
  "j3EW81XnW2YRbriXMIXN3s",
  "j3EW81XnW2YRbriXMIXOic",
  "j3EW81XnW2YRbriXMIXPTa",
  "qFjCUm0cQ7VYPPtd3LLsEp",
  "qFjCUm0cQ7VYPPtd3LLsQN",
  "uLnZjZPchgZxzAUHwxQVzy",
  "uLnZjZPchgZxzAUHwxQX4E"
]] { _id, title }
```
3. Dit toont de 10 te verwijderen artikelen
4. Verwijder ze vervolgens handmatig één voor één via Content

---

## Checklist

Na verwijdering, controleer:

- [ ] Alle 10 artikelen zijn verwijderd
- [ ] Er zijn geen gebroken links op de website
- [ ] De betere versies (met SEO) zijn nog aanwezig
- [ ] Homepage toont alleen de goede artikelen

---

## Overzicht Na Verwijdering

**Voor**: 24 artikelen (waarvan 10 zonder goede SEO)  
**Na**: 14 artikelen (allemaal met volledige SEO en 600-800 woorden)

**Voordelen**:
- ✅ Geen duplicaten meer
- ✅ Alle artikelen hebben goede SEO
- ✅ Alle artikelen hebben substantiële content (1000+ karakters)
- ✅ Betere gebruikerservaring
- ✅ Betere SEO voor de hele website

---

## Waarom Deze Artikelen Verwijderen?

**SEO Problemen**:
- Google straft duplicaat content af
- Korte artikelen hebben lagere rankings
- Artikelen zonder metadata zijn slecht vindbaar

**Gebruikerservaring**:
- Verwarrend om meerdere artikelen met dezelfde titel te hebben
- Korte artikelen geven geen waarde
- Inconsistente kwaliteit

**Onderhoud**:
- Makkelijker om overzicht te houden
- Alleen kwaliteit content behouden
- Duidelijke content strategie

---

## Na Verwijdering

**Verplicht**:
1. Controleer de homepage → Alleen goede artikelen tonen
2. Test een paar interne links → Controleer of ze niet naar verwijderde artikelen verwijzen
3. Check Google Search Console → Monitor voor 404 errors

**Optioneel**:
1. Maak een backup van de verwijderde artikel-titels (voor het geval je ze later nodig hebt)
2. Update je content kalender
3. Plan nieuwe artikelen voor lege onderwerpen

---

**Klaar om te verwijderen?** Start bij artikel 1 en werk de lijst af! 🗑️
