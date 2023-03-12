const express = require('express');
const router = express.Router();

const {
    getAllJobs,
    getJob,
    deleteJob,
    updateJob,
    createJob
} = require('../controllers/jobs');

router.get('/', getAllJobs);
router.post('/', createJob);
router.get('/:jobId', getJob);
router.delete('/:jobId', deleteJob);
router.patch('/:jobId', updateJob);

module.exports = router;