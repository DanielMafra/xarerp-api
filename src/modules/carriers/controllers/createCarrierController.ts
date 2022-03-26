import { Request, Response } from 'express';
import { createCarrierService } from '../services/createCarrierService';
import { getCarrierService } from '../services/getCarrierService';
import { v4 as uuidV4 } from 'uuid';

export const create = async (req: Request, res: Response) => {
  const { name, region } = req.body;

  if (!name || !region) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  const hasCarrier = await getCarrierService.findByName(name);

  if (hasCarrier.length > 0) {
    return res.status(400).json({ error: 'Carrier already exists' });
  }

  const carrier = await createCarrierService.create({
    id: uuidV4(),
    name,
    region
  });

  if (!carrier) {
    return res.status(500).json({ error: 'Internal server error' });
  }

  return res.status(201).json({ carrier });
}
