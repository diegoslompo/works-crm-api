const uuidv4 = require('uuid/v4');

module.exports = app => {
  const contributorsDB = app.data.contributors; // consign help here
  // const contributorsDB = require('../data/contributors.json');
  const controller = {};

  const {
    contributors: contributorsMock, // faz mock com destruction do post
  } = contributorsDB;

  controller.listContributors = (req, res) => res.status(200).json(contributorsDB);

  controller.saveContributor = (req, res) => {
    contributorsMock.data.push({
      id: uuidv4(),
      parentId: uuidv4(),
      name: req.body.name,
      birthDate: req.body.birthDate,
      cellphone: req.body.cellphone,
      phone: req.body.phone,
      email: req.body.email,
      occupation: req.body.occupation,
      state: req.body.state,
    });

    res.status(201).json(contributorsMock);
  };

  controller.removeContributor = (req, res) => {
    const {
      contributorId,
    } = req.params;

    // Encontra o id vindo do parametro
    const foundContributorsIndex = contributorsMock.data.findIndex(contributor => contributor.id === contributorId);

    // id deve ser igual a 1
    if (foundContributorsIndex === -1) {
      res.status(404).json({
        message: 'Cliente não encontrado na base.',
        success: false,
        contributors: contributorsMock,
      });
    } else {
      // splice no array pra remover o objeto com id e segundo parametro da quantidade a ser deletado
      // splice vai atualizar o mock pra aplicação
      contributorsMock.data.splice(foundContributorsIndex, 1);

      res.status(200).json({
        message: 'Cliente encontrado e deletado com sucesso!',
        success: true,
        contributors: contributorsMock,
      });
    }
  };

  controller.updateContributor = (req, res) => {
    const { 
      contributorId,
    } = req.params;

    const foundContributorsIndex = contributorsMock.data.findIndex(contributor => contributor.id === contributorId);

    if (foundContributorsIndex === -1) {
      res.status(404).json({
        message: 'Cliente não encontrado na base.',
        success: false,
        contributors: contributorsMock,
      });
    } else {
      const newContributors = {
        id: contributorId ,
        parentId: req.body.parentId,
        name: req.body.name,
        birthDate: req.body.birthDate,
        cellphone: req.body.cellphone,
        phone: req.body.phone,
        email: req.body.email,
        occupation: req.body.occupation,
        state: req.body.state,
        createdAt: new Date()
      };
      
      // splice no array pra remover o objeto com id, segundo parametro da quantidade a ser atualizado, terceiro atuliza o objeto
      // splice vai atualizar o mock pra aplicação
      contributorsMock.data.splice(foundContributorsIndex, 1, newContributors);
      
      res.status(200).json({
        message: 'Cliente encontrado e atualizado com sucesso!',
        success: true,
        contributors: contributorsMock,
      });
    }
  }

  return controller;
}