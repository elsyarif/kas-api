import { Request, Response } from "express";
import moment from "moment";
import { getRepository } from "typeorm";
import { Attende } from "../../entity/Attende";
import { v4 as uuidv4 } from "uuid";
import { io } from "../../index";

export const createAttende = async (req: Request, res: Response) => {
  const attendcRepository = getRepository(Attende);
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

    await attendcRepository.save(attende);

    const attendec = await attendcRepository.find();
    io.emit("create-attendc", attendec);

    res.status(201).json({
      message: "create attende success",
      data: attende,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAttende = async (req: Request, res: Response) => {
  try {
    const attendcRepository = getRepository(Attende);
    const attend = await attendcRepository.find();

    res.status(200).json({
      message: "Get attendc succes",
      data: attend,
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeAttende = async (req: Request, res: Response) => {
  const attendcRepository = getRepository(Attende);
  try {
    const id = req.params.id;
    const attend = await attendcRepository.delete(id);

    const attendec = await attendcRepository.find();
    io.emit("delete-attendc", attendec);

    res.status(200).json({
      message: "Delete attendc success",
      data: attend,
    });
  } catch (error) {
    console.error(error);
  }
};
