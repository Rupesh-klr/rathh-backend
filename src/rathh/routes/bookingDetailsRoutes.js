import { Router } from 'express';
import {
  getAllBookingDetails,
  getBookingDetailsById,
  createBookingDetails,
  updateBookingDetails,
  deleteBookingDetails
} from '../controllers/bookingDetailsController.js';

const router = Router();

router.get('/', getAllBookingDetails);
router.get('/:id', getBookingDetailsById);
router.post('/', createBookingDetails);
router.put('/:id', updateBookingDetails);
router.delete('/:id', deleteBookingDetails);

export default router;
