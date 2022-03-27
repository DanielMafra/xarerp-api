import { Request, Response } from 'express';
import { updateCarrierService } from '../services/updateCarrierService';
import { getCarrierService } from '../services/getCarrierService';

export const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, region } = req.body;

  if (!name && !region) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const carrier = await getCarrierService.findOne(id);

  if (!carrier) {
    return res.status(404).json({ error: 'Not found' });
  }

  if (name && (name !== carrier.name)) {
    const hasCarrier = await getCarrierService.findByName(name);

  if (hasCarrier.length > 0) {
    return res.status(400).json({ error: 'Carrier already exists' });
  }
  }

  const time = new Date().toISOString();

  const carrierUpdated = await updateCarrierService.update({
    id,
    data: {name, region},
    time
  });

  if (!carrierUpdated) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(200).json({ carrier: carrierUpdated });
}
