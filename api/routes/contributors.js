module.exports = app => {
  const controller = app.controllers.contributors; // consign help here
  // const controller = require('../controllers/contributors')();

  // json -> function
  // controller.listcontributors = (req, res) => res.status(200).json(contributorsDB);
  // get
  app.route('/api/v1/contributors')
    .get(controller.listContributors)
    .post(controller.saveContributor);

  app.route('/api/v1/contributors/:contributorId')
    .delete(controller.removeContributor)
    .put(controller.updateContributor);
}