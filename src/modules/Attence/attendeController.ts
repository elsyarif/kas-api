import { Request, Response } from "express";
import moment from "moment";
import { getRepository } from "typeorm";
import { Attende } from "../../entity/Attende";
import { v4 as uuidv4 } from "uuid";
export const createAttende = async (req: Request, res: Response) => {
  const userRepository = getRepository(Attende);
  try {
    const { no_akun, nip, name, status, image } = req.body;
    const datetime = moment().format();
    const date = moment().format();

    const attende = new Attende();
    attende.id = uuidv4();
    attende.waktu = datetime;
    attende.date = date;
    attende.no_akun = Number(no_akun);
    attende.nip = Number(nip);
    attende.name = name;
    attende.status = Number(status);
    attende.image = image;
    attende.kondisi = "C/in";

    await userRepository.save(attende);

    res.status(201).json({
      message: "create attende success",
      data: attende,
    });
  } catch (error) {
    console.error(error);
  }
};
