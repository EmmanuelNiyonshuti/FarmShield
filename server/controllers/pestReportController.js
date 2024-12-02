import pestReport from "../models/pestReport";

export default class PestReportsController {
    static createReport = async (req, res) => {
        const user = req.user;
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
        return res.status(201).json(newReport);
    }
}
