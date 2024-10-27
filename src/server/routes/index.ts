// src/server/routes/index.ts
import { Router } from 'express';
import multer from 'multer';
import { validateRequest } from '../middleware/validation';
import { voteSchema, commentSchema } from '../schemas';
import * as pdfController from '../controllers/pdfController';

export const router = Router();

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// PDF routes
router.get('/pdfs', pdfController.listPDFs);
router.post('/pdfs', upload.single('pdf'), pdfController.uploadPDF);
router.post('/pdfs/:id/vote', validateRequest(voteSchema), pdfController.votePDF);
router.post('/pdfs/:id/comments', validateRequest(commentSchema), pdfController.addComment);
router.get('/pdfs/:id/comments', pdfController.getComments);
router.get('/pdfs/:id/download', pdfController.downloadPDF);