<p align="center">
  <img width="300" height="300" src="https://github.com/sebsebli/infectiontracker/blob/master/logo_mit_text.png">
</p>

# InfectionTracker
**InfectionTracker** soll es ermöglichen, Infektionsketten aufzudecken und so zur schnellen Information von potenziell-betroffenen Bürger:innen beizutragen. Nicht zu vermeidende Kontakte (z.B. durch Umzüge, Arbeit, familiäre Betreuung) können so über einen QR-Code in den eigenen Kontaktverlauf aufgenommen werden. Sollte eine Kontaktperson innerhalb von zwei Wochen Symptome zeigen oder positiv auf COVID-19 getestet werden, so werden alle Kontakte der vergangenen zwei Wochen automatisiert über die potenzielle Gefährdung informiert. Weiterhin bieten wir in diesem Fall hilfreiche Informationen und Handlungsanweisungen, um eine Verbreitung des Virus zu verhindern und Behörden zu entlasten. Wir verfolgen einen Ansatz, der die Anonymität und den Datenschutz der Nutzer im Fokus hat, ohne die notwendigen Informationen gefährdeten Kontakten vorzuenthalten. Wir hoffen mit unserem Beitrag einen Teil zur Reduzierung der Ausbreitung beitragen zu können.

InfectionTracker wurde innerhalb von 48 Stunden während des [#WirVsVirusHackathon](https://wirvsvirushackathon.org/ "WirVsVirusHacka thon") entwickelt. 
Wir sind gerne zum Austausch und zur Kooperation bereit. 

Meldet euch bei Interesse per E-Mail: [sebastian@lindner.me](mailto:sebastian@lindner.me "sebastian@lindner.me")

## Inspiration
Aufgrund der aktuellen Situation wird eine Minimierung der sozialen Kontakte bzw. eine gänzliche soziale Isolation empfohlen, um Neuinfektionen zu vermeiden. Dies ist jedoch nicht für alle Personengruppen vollumfänglich möglich (z.B. durch Krankheit, berufliche oder familiäre Verpflichtungen). Daraus ggf. entstehende Infektionsketten lassen sich nur schwer nachvollziehen - mögliche Kontaktpersonen können nicht schnell genug identifiziert werden.

## Was uns abhebt
* Bei uns bleiben die **Nutzer anonym**. Wir bieten damit eine Möglichkeit, sich auch mit unbekannten Personen zu vernetzen, um zwar informiert und gewarnt zu bleiben, aber ohne den eigenen Gesundheitszustand allen Personen zugänglich zu machen. Wir kennen zu jedem Nutzer nur eine zufallsgenerierte Zeichenkette.
* Der Infektionsstatus muss von Behördern autorisiert werden, um **keine Falschinformationen** zu verbreiten.
* Wir legen größten Wert auf **Datenschutz**. Unsere erhobenen Daten können keiner Person zugeordnet werden. Wir verzichten auf das aufzeichnen von Standortdaten.
* Unsere freien Schnittstellen ermöglichen die **statistische Auswertung** von Infektionsdaten und -verläufen.
* InfectionTracker ist sofort **multilingual** einsetzbar. 

**Prototype release (Android)**

https://github.com/sebsebli/infectiontracker/releases/tag/v1.3.0

## Development Requirements

Running instance of https://github.com/kai-raschke/seb_vs_virus_api or use current dev hosting (if available) on https://seb-vs-virus-api.herokuapp.com

## Features

- View your code, check your connections and their health status
- Change your health status
- Scan code of someone else to connect to each other
- Use a group code to connect to several people at once (eg. in a meeting)
- Multilanguage interface (usual online translation quality) - English, German, Spanish, French, Portuguese, Italian, Hindi, Arabic

## Install

``` npm install expo-cli --global ```

``` npm install ```

## Start

``` npm start ```

## Demo
Die App kann über https://exp.host/@sebsebli/infectiontracker getestet werden, sofern der Expo-Client (Android, iOS) installiert ist. Die API abfragen werden durch die prototypische Implementierung im Intervall von 60 Sekunden abgefragt, weshalb es zu Verzögerungen beim Aktualisieren der Daten kommen kann. Eine Android-APK steht im GitHub-Repository zum Download bereit. Ein Test auf iOS (über Testflight) kann ebenfalls ermöglicht werden. Schreibt mir dazu eine E-Mail.

Android: https://github.com/sebsebli/infectiontracker/releases/tag/v1.5.0

## Screenshots

<a href="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-01.jpg"><img src="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-01.jpg" width="200"/></a>
<a href="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-02.jpg"><img src="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-02.jpg" width="200"/></a>
<a href="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-03.jpg"><img src="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-03.jpg" width="200"/></a>
<a href="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-04.jpg"><img src="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-04.jpg" width="200"/></a>

## Team
* [Sebastian Lindner](https://lindner.me/ "Sebastian Lindner") 
* [Kai Raschke]( https://github.com/kai-raschke/ "Kai Raschke") 
* Fabian Glück
* Tim Eberhardt

## License
[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
