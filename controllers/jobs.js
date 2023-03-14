const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs, count: jobs.length});
};

const getJob = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.userId;

    const job = await Job.findOne({createdBy: userId, _id: jobId});

    if(!job){
        throw new NotFoundError('Job not found');
    }

    res.status(StatusCodes.OK).json({job});
}

const createJob = async (req, res) => {
    req.body.createdBy = req.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
};

const updateJob = (req, res) => {
    res.send('update job');
};

const deleteJob = (req, res) => {
    res.send('delete job');
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
