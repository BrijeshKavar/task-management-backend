import express from 'express';
import Auth from './Auth';
import Project from './Projects'

const router = express.Router();
router.use('/api/auth', Auth);
router.use('/api/projects',Project)

// This one has to be the last route at any point
router.use('*', (req, res) => {
  res.withError('NOT_AVAILABLE', 404);
});

export default router;
