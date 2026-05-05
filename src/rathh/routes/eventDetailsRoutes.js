import { Router } from 'express';
import {
  getAllEventDetails,
  getEventDetailsById,
  createEventDetails,
  updateEventDetails,
  deleteEventDetails
} from '../controllers/eventDetailsController.js';

const router = Router();

router.get('/', getAllEventDetails);
router.get('/:id', getEventDetailsById);
router.post('/', createEventDetails);
router.put('/:id', updateEventDetails);
router.delete('/:id', deleteEventDetails);

export default router;
