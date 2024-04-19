import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  Put,
  Delete,
  Header,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

class CustomError extends Error {
  statusCode: number;
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

@Controller('cats')
export class CatsController {
  //CatsService is injected through the class constructor
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    // console.log(request.path, request.hostname);
    return this.catsService.findAll();
  }

  @Get('error')
  error(@Res() response: Response) {
    // response.status(401).send({ data: 'nothiong' });
    // throw new CustomError('Unauthorized');
    // throw new Error('test');
    // throw new HttpException(
    //   { message: 'Forbidden', reason: 'Test' },
    //   HttpStatus.FORBIDDEN,
    // );
    throw new HttpException('Test', 403);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Query('price', ParseIntPipe) price: number,
  ): string {
    console.log('inside');
    return `This action returns a #${id} cat`;
  }

  // This is platform specific (express)
  @Post()
  async create(
    @Res() response: Response,
    @Body() createCatDto: CreateCatDto,
  ): Promise<object> {
    this.catsService.create(createCatDto);
    return (
      response
        .status(201)
        // .header({ 'Content-Type': 'application/text' })
        .json({ msg: 'Success', data: createCatDto })
    );
  }

  @Get('redirect')
  @Redirect('https://docs.nestjs.com', 302)
  rediret() {
    return { url: 'https://docs.nestjs.com/v5/' };
  }

  @Put(':id')
  @Header('Content-Type', 'application/text')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return { message: 'updated', data: updateCatDto };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Get('*')
  notFound(): string {
    return "Route doesn't exist!";
  }
}
