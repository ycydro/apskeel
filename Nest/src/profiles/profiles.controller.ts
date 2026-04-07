import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import type { Profile } from 'src/types';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { UpdateProfileDTO } from './dto/update-profile-dto';
import type { UUID } from 'crypto';
import { ProfilesGuard } from './profiles.guard';

interface IQuery {
  location: string;
  name: string;
}

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get('name')
  getName() {
    return 'hi from name';
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    try {
      return this.profilesService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) createProfileDTO: CreateProfileDTO) {
    return this.profilesService.create(createProfileDTO);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDTO: UpdateProfileDTO) {
    return this.profilesService.update(id, updateProfileDTO);
  }

  @Delete(':id')
  @UseGuards(ProfilesGuard) // pass this first before continuing to the method
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.profilesService.delete(id);
  }
}
