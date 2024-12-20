import { BookDto } from "@app/contracts/books/book.dto";
import { CreateBookDto } from "@app/contracts/books/create-book.dto";
import { UpdateBookDto } from "@app/contracts/books/update-book.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    {
      id: 1,
      title: 'Don Quixote',
      author: 'Miguel de Cervantes',
      rating: 5
    },
    {
      id: 2,
      title: 'Alice\'s Adventures in Wonderland',
      author: 'Lewis Carroll',
      rating: 4
    },
    {
      id: 3,
      title: 'The Adventures of Huckleberry Finn',
      author: 'Mark Twain',
      rating: 5
    },
    {
      id: 4,
      title: 'Treasure Island',
      author: 'Robert Louis Stevenson',
      rating: 3
    },
  ];

  findAll(): BookDto[] {
    return this.books;
  }

  findOne(id: number): BookDto {
    return this.books.find((book) => book.id === id);
  }

  create(dto: CreateBookDto): BookDto {
    const newBook: BookDto = {
      id: this.books.length + 1,
      ...dto
    };

    this.books.push(newBook);
    return newBook;
  }

  update(id: number, dto: UpdateBookDto): BookDto {
    this.books[ id - 1 ] = { id, ...dto };
    return this.findOne(id);
  }

  delete(id: number): BookDto[] {    
    this.books = this.books.filter((book) => book.id !== id);
    return this.books;
  }

}