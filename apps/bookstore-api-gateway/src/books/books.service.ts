import { BookDto as ClientBookDto } from '@app/contracts/books/book.dto';
import { BOOKS_PATTERNS } from '@app/contracts/books/books.patterns';
import { CreateBookDto as ClientCreateBookDto, CreateBookDto } from '@app/contracts/books/create-book.dto';
import { UpdateBookDto as ClientUpdateBookDto } from '@app/contracts/books/update-book.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { BOOKS_CLIENT } from './constants';

@Injectable()
export class BooksService {
  constructor(@Inject(BOOKS_CLIENT) private booksClient: ClientProxy) {}

  private mapBookDto(bookDto: ClientBookDto) {
    return {
      id: bookDto.id,
      title: bookDto.title,
    }
  };

  findAll() {
    return this.booksClient.send(BOOKS_PATTERNS.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.booksClient.send(BOOKS_PATTERNS.FIND_ONE, id);
  }

  create(createBookDto: CreateBookDto) {
    return this.booksClient.send<ClientBookDto, ClientCreateBookDto>(
      BOOKS_PATTERNS.CREATE,
      createBookDto
    ).pipe(map(this.mapBookDto));
  }

  update(id: number, dto: ClientUpdateBookDto) {
    return this.booksClient.send(BOOKS_PATTERNS.UPDATE, { id, dto });
  }

  delete (id: number) {
    return this.booksClient.send(BOOKS_PATTERNS.DELETE, id);
  }
}
