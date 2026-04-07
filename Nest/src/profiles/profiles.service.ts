import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import type { Profile } from 'src/types';
import { CreateProfileDTO } from './dto/create-profile-dto';
import { UpdateProfileDTO } from './dto/update-profile-dto';
import { profile } from 'console';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'LeBron',
      description: 'GOAT',
    },
    {
      id: randomUUID(),
      name: 'Kyrie',
      description: '2NDGOAT',
    },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    const profile = this.profiles.find((profile) => profile.id === id);

    if (!profile) {
      throw new Error(`Profile with id: ${id} not found.`);
    }

    return profile;
  }

  create(createProfileDTO: CreateProfileDTO) {
    const newProfile = { id: randomUUID(), ...createProfileDTO };

    this.profiles.push(newProfile);

    return newProfile;
  }

  update(id: string, updateProfileDTO: UpdateProfileDTO) {
    const profileIndex = this.profiles.findIndex(
      (profile) => profile.id === id,
    );

    const profile = this.profiles[profileIndex];

    const { id: _ignoredId, ...rest } = profile;

    const updatedProfile = {
      id: id as UUID,
      ...rest,
      ...updateProfileDTO,
    };

    this.profiles[profileIndex] = updatedProfile;

    return updatedProfile;
  }

  delete(id: string) {
    const newList = this.profiles.filter((profile) => profile.id !== id);

    this.profiles = newList;

    return {
      profiles: newList,
    };
  }
}
