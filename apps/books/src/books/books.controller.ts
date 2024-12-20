import { Controller } from "@nestjs/common";
import { BooksService } from "./books.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateBookDto } from "@app/contracts/books/create-book.dto";
import { UpdateBookDto } from "@app/contracts/books/update-book.dto";
import { BOOKS_PATTERNS } from "@app/contracts/books/books.patterns";

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern(BOOKS_PATTERNS.FIND_ALL)
  findAll() {
    return this.booksService.findAll();
  }

  @MessagePattern(BOOKS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.booksService.findOne(id);
  }

  @MessagePattern(BOOKS_PATTERNS.CREATE)
  create(@Payload() payload: CreateBookDto) {
    return this.booksService.create(payload);
  }

  @MessagePattern(BOOKS_PATTERNS.UPDATE)
  update(@Payload() payload: { id: number, dto: UpdateBookDto}) {
    return this.booksService.update(payload.id, payload.dto);
  }

  @MessagePattern(BOOKS_PATTERNS.DELETE)
  delete(@Payload() id: number) {
    return this.booksService.delete(id);
  }
}