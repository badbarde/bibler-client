# BIBer - A small library management app
## Entities
### Book
 - Titel
 - Author
 - Publisher
 - Number
 - Shorthand
 - ISBN
 - Media
    - Cover
 - lended to
    - user
        - lending period

### User
 - Fistname
 - Lastname
 - Meta
    - Class
 - lended lendables
    - Book

## Usecases
 - Borrow book (lendable)
 - give back book (lendable)
 - extend book (lendable)
 - view books whos lendig period is expried / about to expire
 - View books on index 
 - add book
 - remove book
 - View users on index
 - add user
 - remove user
 - export users
 - import users
 - export books
 - import books

 ### Category colors
  - blue: Bilderbücher
  - gelb: Erstleser
  - rot: Fortgeschrittene
  - grün: Sachbuch
  - schwarz: Krimmi