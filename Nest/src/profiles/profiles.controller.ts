import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import type { Profile } from 'src/types';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { UpdateProfileDTO } from './dto/update-profile-dto';

interface IQuery {
    location: string,
    name: string,
}

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}
   
    @Get()
    findAll() {
        return this.profilesService.findAll()
    }

    @Get(':id') 
    findOne(@Param('id') id: string){
        return this.profilesService.findOne(id)
    }

    @Post() 
    create(@Body() createProfileDTO: CreateProfileDTO) {
     return this.profilesService.create(createProfileDTO)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProfileDTO: UpdateProfileDTO) {
     return this.profilesService.update(id, updateProfileDTO)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id')id: string) {
        return this.profilesService.delete(id)
    }
}
