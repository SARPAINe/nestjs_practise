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
import { CreateCatDto, UpdateCatDto } from './cats.dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    console.log(request.path, request.hostname);
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  // This is platform specific (express)
  @Post()
  create(
    @Res() response: Response,
    @Body() createCatDto: CreateCatDto,
  ): object {
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
