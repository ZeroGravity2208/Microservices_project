# Microservices_project
Projekt, który realizujemy dla przedmiotu Środowisko oprogramowania komponontowego II

# Microservice Policemen
[Plik app.js z endpointami](https://github.com/ZeroGravity2208/Microservices_project/blob/first-microservice-adamczyk/Lukasz/ms1-policemen/app.js)
[Plik controller.js (na razie nic nie robi i jest pusty)](https://github.com/ZeroGravity2208/Microservices_project/blob/first-microservice-adamczyk/Lukasz/ms1-policemen/controller.js)
[Plik service.js (na tę chwilę sprawdza tylko proces pobierania jednego policjanta - sprawdza czy istnieje takie id)](https://github.com/ZeroGravity2208/Microservices_project/blob/first-microservice-adamczyk/Lukasz/ms1-policemen/service.js)
[Plik DAL.js (proste zapytania do bazy danych)](https://github.com/ZeroGravity2208/Microservices_project/blob/first-microservice-adamczyk/Lukasz/ms1-policemen/DAL.js)

Docelowo ma to wyglądać tak: plik app.js wystawia endpointy. Załóżmy, że użytkownik chce dostać dane konkretnego policjanta:
  app.js kieruje pytanie do controller.js, jeśli podany argument w postaci nr id ma sens (id jest w postaci ciągu liter i liczb), zapytanie idzie dalej do service.js. Jeśli service.js uzna, że istnieje policjant o takim id zwróci się do DAL.js, który zwróci mu dane o policjancie, service zwróci te dane do controllera, który przekaże je do app.js. App.js wyśle użytkownikowi status zapytania (303, 404 itd), a dane zwróci w postaci json'a.
