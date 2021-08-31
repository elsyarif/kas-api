import { getRepository } from "typeorm";
import { Attende } from "../../entity/Attende";

const attendcRepository = getRepository(Attende);

export class AttendeService {
  constructor() {}

  createAttende() {
    return "Create Attende";
  }

  getAttende = async () => {
    return "Create Attende";
  };
}
