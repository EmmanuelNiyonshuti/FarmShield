import pestReport from "../models/pestReport.js";

export default class PestReportsController {
    static createReport = async (req, res) => {
        const user = req.user;
        const req_fields = ['pestName', 'location', 'address', 'description', 'severity', 'reportDate'];
        for (let field of req_fields){
            if (!req.body[field]){
                return res.status(400).json({error: `Missing ${field} of the pest`});
            }
        }
        const { pestName, location,
            address, description,
            severity, reportDate } = req.body;
        if (!pestName || !location || !address || !description || !severity || !reportDate ){
            return res.status(400).json({msg: 'Missing required fields'});
        }
        const newReport = new pestReport({
            userId: user._id,
            pestName,
            location,
            address,
            description,
            severity,
            reportDate,
        });
        await newReport.save();
        return res.status(201).json(newReport);
    }
}
