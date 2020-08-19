const ReportService = require('../../services/report.service');


class ReportController {

  general(req, res) {
    const query = req.query;

    ReportService.general()
      .then(report => {
        if(report) {
          res.send(report)
        }
      }).catch(err => {
          res.status(500).send(err);
      });
  }


}

module.exports = new ReportController();