### Aplikacja zbudowana w NestJS z podstawowym CRUD'em.

# **Instalacja**

## 1. wymagany zainstalowany Node.js w wersji min. v16.13.2
## 2. wykorzystywana baza danych to PostgreSQL
## 3. należy skonfigurować pliki konfiguracyjne do korzystania z nowo stworzonej bazy danych
  - plik development.yml i test.yml na podstawie enviroment.yml.example

# **Zadanie rekrutacyjne**

## 1. Rozszerz obiekt kontaktu o nowe pola
  - dodaj nowe pole "phoneNumber" typu intiger o długości 9 cyfr
  - dodaj walidację do "email"
  - uaktualnij istniejący test e2e oraz stwórz nowy sprawdzający czy walidacja działa prawidłowo (jeden request ze złym "phoneNumber" i "email")

## 2. Dodaj informacje na temat adresów w kontakcie
  - stwórz nowy endpoint dzięki któremu można dodać wiele adresów do kontaktu
  - adres powinien składać się z pól "city", "address", "postalCode"
  - adresy powinny być zapisywane w nowej tabeli w bazie danych, przy pobieraniu kontaktu od razu powinny być pobrane adresy przypisane do niego
  - stwórz nowy test e2e sprawdzający dodawanie kilku adresów do istniejącego kontaktu

## 3. Optymalizacja aplikacji
  - stwórz nowy test dodający 10000 kontaktów w jednym zapytaniu za pomocą "ContactsController.createMany"
  - znajdź problemy i zoptymalizuj aktualne rozwiązanie aby zapytanie wykonywało się szybciej
