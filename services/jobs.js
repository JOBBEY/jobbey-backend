const MongoLib = require('../lib/mongo')

class JobsService {
    constructor(){
        this.collection = 'jobs'
        this.mongoDB = new MongoLib()
    }

    async getJobs() {
        const Jobs = await this.mongoDB.getAll(this.collection)
        console.log('Sending Jobs list...');
        
        return Jobs || []
    }

    async getJob(jobId) {
        const job = await this.mongoDB.get(this.collection, jobId)
        console.log(`Sending ${jobId} data...`);
        return job || {}
    }

    async getJobBy(data) {
        const job = await this.mongoDB.getBy(this.collection, data)
        console.log(`Returning data...`);
        return job || {}
    }

    async getOpens(){
        const Jobs = await this.mongoDB.getAll(this.collection, {state: "OPEN"})
        console.log('Sending Jobs list...');
        
        return Jobs || []
    }
    
    async createJob({ job }) {
        const createJobId = this.mongoDB.create(this.collection, job)
        console.log(`${job.jobname} created.`);
        return createJobId
    }
    
    async updateJob(jobname, job) {
        const updateJobId = this.mongoDB.update(this.collection, jobname, job)
        console.log(`${jobname} updated.`);
        return updateJobId
    }
    
    async deleteJob({jobname}) {
        const deletedJobId = this.mongoDB.delete(this.collection, jobname)
        console.log(`${jobname} deleted.`);
        return deletedJobId
    }   
    
}

module.exports = JobsService