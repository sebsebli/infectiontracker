<p align="center">
  <img width="300" height="300" src="https://github.com/sebsebli/infectiontracker/blob/master/logo_mit_text.png">
</p>

# infectiontracker
**InfectionTracker** soll es ermöglichen, Infektionsketten aufzudecken und so zur schnellen Information von potenziell-betroffenen BürgerInnen beizutragen. Nicht zu vermeidende Kontakte (z.B. durch Umzüge, Arbeit, familiäre Betreuung) können so über einen QR-Code aufgenommen werden. Sollten eine Kontaktperson innerhalb von zwei Wochen Symptome zeigen oder positiv auf Corona getestet werden, so werden alle Kontakte der vergangenen zwei Wochen automatisiert über die potenzielle Gefährdung informiert. Weiterhin bieten wir in diesem Fall Informationen und Handlungsanweisungen, um eine weitere Verbreitung des Virus zu verhindern. Wir verfolgen einen Ansatz, der die Anonymität und den Datenschutz der Nutzer im Fokus hat, ohne die notwendigen Informationen gefährdeten Kontakten vorzuenthalten. Wir hoffen mit unserem Beitrag einen Teil zur Reduzierung der Ausbreitung beitragen zu können.

InfectionTracker wurde innerhalb von 48 während des [#WirVsVirusHackathon](https://wirvsvirushackathon.org/ "WirVsVirusHacka thon") entwickelt. 
Wir sind gerne zum Austausch und zur Kooperation bereit. 

Meldet euch bei Interesse per E-Mail: [sebastian@lindner.me](mailto:sebastin@lindner.me "sebastin@lindner.me")

## Demo

Introduction video (german): https://www.youtube.com/watch?v=fzUSl38vk_I&feature=youtu.be

Die App kann über https://exp.host/@sebsebli/infectiontracker getestet werden, sofern der Expo-Client (Android, iOS) installiert ist. Die API abfragen werden durch den Prototypen im Intervall von 20 Sekunden abgefragt, weshalb es zu Verzögerungen beim Aktualisieren der Daten kommen kann. Eine Android-APK liegt ist ebenfalls verfügbar. Ein Test auf iOS (über Testflight) kann ebenfalls ermöglicht werden. Schreibt mir dazu eine E-Mail.

## Development Requirements

Running instance of https://github.com/kai-raschke/seb_vs_virus_api or use current dev hosting (if available) on https://seb-vs-virus-api.herokuapp.com

## Features

- View your code, check your connections and their health status
- Change your health status
- Scan code of someone else to connect to each other
- Use a group code to connect to several people at once (eg. in a meeting)
- Multilanguage interface (usual online translation quality) - English, German, Spanish, French, Portuguese, Italian, Hindi, Arabic

<a href="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-01.jpg"><img src="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-01.jpg" width="200"/></a>
<a href="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-02.jpg"><img src="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-02.jpg" width="200"/></a>
<a href="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-03.jpg"><img src="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-03.jpg" width="200"/></a>
<a href="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-04.jpg"><img src="https://raw.githubusercontent.com/sebsebli/infectiontracker/master/docs/screen-04.jpg" width="200"/></a>

## Install

``` npm install expo-cli --global ```

``` npm install ```

## Start

``` npm start ```
## Team
* [Sebastian Lindner](https://lindner.me/ "Sebastian Lindner") 
* [Kai Raschke]( https://github.com/kai-raschke/ "Kai Raschke") 
* Fabian Glück
* Tim Eberhardt

## License
[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
