import { Request, Response } from "express";
import { Pet, pets } from "../data/pets.js";

type ApiNotFoundResponse = {
  message: string;
};

type ApiDataResponse<T> = {
  data: T;
  count?: number;
  message?: string;
};

type PetQueryParams = {
  species?: string;
  adopted?: "true" | "false";
  minAge?: string;
  maxAge?: string;
};

export const getPets = async (
  req: Request<{}, unknown, {}, PetQueryParams>,
  res: Response<ApiDataResponse<Pet[]>>,
) => {
  const { species, adopted, minAge, maxAge } = req.query;

  let filteredPets: Pet[] = pets;

  if (species) {
    filteredPets = filteredPets.filter(
      (pet: Pet): boolean =>
        pet.species.toLowerCase() === species.toLowerCase(),
    );
  }

  if (adopted) {
    filteredPets = filteredPets.filter(
      (pet: Pet): boolean => pet.adopted === JSON.parse(adopted),
    );
  }

  if (minAge) {
    filteredPets = filteredPets.filter(
      (pet: Pet): boolean => pet.age >= JSON.parse(minAge),
    );
  }

  if (maxAge) {
    filteredPets = filteredPets.filter(
      (pet: Pet): boolean => pet.age <= JSON.parse(maxAge),
    );
  }

  return res.json({
    message: "Fetching successful!",
    count: filteredPets.length,
    data: filteredPets,
  });
};

export const getPetByID = async (
  req: Request<{ id: string }>,
  res: Response<Pet | ApiNotFoundResponse>,
) => {
  const { id } = req.params;
  const specificPet: Pet | undefined = pets.find(
    (pet) => String(pet.id) === id,
  );

  if (!specificPet) {
    return res.status(404).json({ message: "Not Found" });
  }

  return res.json(specificPet);
};
