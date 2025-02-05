import {
  Slot,
  SlotAttributes,
  SlotCreationAttributes,
} from "../../../entities/slot/model/slot";
import { Op } from "sequelize";

export class SlotService {
  public async getSlots(): Promise<Slot[]> {
    return await Slot.findAll();
  }

  public async getSlotById(id: number): Promise<Slot> {
    const slot = await Slot.findByPk(id);
    if (!slot) {
      throw new Error("Slot not found");
    }
    return slot;
  }

  public async createSlot(slot: SlotCreationAttributes): Promise<Slot> {
    return await Slot.create(slot);
  }

  public async updateSlot(slot: Slot): Promise<Slot> {
    await Slot.update(slot, { where: { id: slot.id } });
    const updatedSlot = await Slot.findByPk(slot.id);
    if (!updatedSlot) {
      throw new Error("Slot not found");
    }
    return updatedSlot;
  }

  public async deleteSlot(id: number): Promise<void> {
    await Slot.destroy({ where: { id } });
  }

  public async getSlotsByDoctorId(doctorId: number): Promise<Slot[]> {
    return await Slot.findAll({ where: { doctorId } });
  }

  public async getSlotsByHospitalId(hospitalId: number): Promise<Slot[]> {
    return await Slot.findAll({ where: { hospitalId } });
  }

  public async getSlotsByDoctorIdAndDate(
    doctorId: number,
    date: string
  ): Promise<Slot[]> {
    const startDate = new Date(date);

    return await Slot.findAll({
      where: {
        doctorId: doctorId,
        slotDate: {
            [Op.eq]: startDate
        },
      },
    });
  }
}
