class CampaignsController {
  async index(req, res) {
    return res.json({ msg: 'Página Inicial da API.' });
  }
}

module.exports = new CampaignsController();
