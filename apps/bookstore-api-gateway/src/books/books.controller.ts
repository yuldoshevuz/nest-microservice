import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from '@app/contracts/books/create-book.dto';
import { UpdateBookDto } from '@app/contracts/books/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id)
    return this.booksService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.booksService.update(parseInt(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.booksService.delete(parseInt(id));
  }
}
