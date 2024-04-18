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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto/cats.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  //CatsService is injected through the class constructor
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(@Req() request: Request): Promise<Cat[]> {
    // console.log(request.path, request.hostname);
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
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
