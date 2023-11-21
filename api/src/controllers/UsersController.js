import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import send from '../services/nodemailer';

import User from '../models/Users';
import Model from '../models/Model';

const secret = process.env.JWTSECRET;

class UsersController {
  async sendEmail(req, res) {
    const { to, subject, body } = req.body;

    if (to != undefined && subject != undefined && body != undefined) {
      return res.status(406).json({ err: 'Falha na requisição.' });
    }

    send(to, subject, body);
    return res.json('E-mail enviado com sucesso!');
  }

  async changePwd(req, res) {
    const { token, password } = req.body;

    if (token != undefined && password != undefined) {
      return res.status(406).json({ err: 'Falha na requisição.' });
    }

    const isTokenValid = await User.validateTk(token);

    if (isTokenValid.status) {
      await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
      return res.send('Senha alterada!');
    }

    return res.status(406).send(isTokenValid.err);
  }

  async recoverTkPwd(req, res) {
    const { email } = req.body;

    if (email != undefined) {
      return res.status(406).json({ err: 'Falha na requisição.' });
    }
    const result = await User.createTk(email);

    if (result.status) {
      return res.send(result.token.toString());
      // return sendEmail(result.token.toString());
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (email == undefined && password == undefined) {
      return res.status(406).json({ err: 'Falha na requisição.' });
    }

    const userSearch = await Model.findValue(email, 'email');

    if (userSearch.length > 0) {
      const comparePassword = await bcrypt.compare(password, userSearch[0].password);

      if (comparePassword) {
        const token = jwt.sign(
          {
            email: userSearch[0].email,
            role: userSearch[0].role,
          },
          secret
        );

        return res.status(200).json({ token });
      }
      return res.status(406).json({ msg: 'Senha incorreta.' });
    }
    return res.status(406).json({ msg: 'Usuário inválido.' });
  }

  async remove(req, res) {
    const { id } = req.params;
    const validations = [];

    /* dado é valido? */
    if (id == undefined) return res.status(406).json({ msg: 'Falha na requisição.' });

    /* existe no banco? */
    const userExists = await Model.findValue('users', ['id'], id);
    if (!userExists.status) validations.push('Usuário não existe.');

    /* debug */
    if (validations.length > 0) {
      Model.debug({
        action: 'remove',
        dataIn: { id },
        validations,
      });
      return res.status(406).json({ status: false, msg: 'Dados inválidos.' });
    }

    /* remove */
    const result = await Model.delete('users', id);
    return res.json({ status: result.status, msg: 'Removido com sucesso.' });
  }

  async edit(req, res) {
    const { id, fullname, num_doc, email, role, status } = req.body;
    const validations = [];

    /* dado é valido? */
    if (
      id == undefined ||
      fullname == undefined ||
      num_doc == undefined ||
      email == undefined ||
      role == undefined ||
      status == undefined
    )
      return res.status(406).json({ err: 'Falha na requisição.' });
    const docValid = await Model.isValidDoc(num_doc);
    const emailValid = await Model.isEmail(email);
    if (!docValid) validations.push('CPF inválido.');
    if (!emailValid) validations.push('E-mail inválido.');

    /* existe no banco? */
    const user = await Model.findById('users', ['id', 'num_doc', 'email'], id);
    const fullnameExists = await Model.findValue('users', ['fullname'], fullname);
    const docExists = await Model.findValue('users', ['num_doc'], num_doc);
    const emailExists = await Model.findValue('users', ['email'], email);

    if (fullnameExists.status && fullname !== user.fullname) validations.push('Nome de usuário já existe.');
    if (docExists.status && num_doc !== user.num_doc) validations.push('CPF já cadastrado.');
    if (emailExists.status && email !== user.email) validations.push('E-mail já cadastrado.');

    /* debug */
    if (validations.length > 0) {
      Model.debug({
        dataIn: { id, fullname, num_doc, email, role, status },
        user,
        fullnameExists,
        docExists,
        emailExists,
        docValid,
        emailValid,
        validations,
      });
      return res.status(406).json({ status: false, msg: 'Dados inválidos.' });
    }

    /* update */
    const dataColumns = { id_campaign, fullname, num_doc, email, role, status };
    const result = await Model.update('users', dataColumns, id);
    return res.json({ status: result.status, msg: 'Editado com sucesso.' });
  }

  async byId(req, res) {
    const { id } = req.params;
    const validations = [];

    if (id == undefined) return res.json({ msg: 'Falha na requisição.' });

    const dataColumns = [
      'id',
      'fullname',
      'num_doc',
      'email',
      'password',
      'role',
      'status',
      'created_at',
      'updated_at',
    ];

    const result = await Model.findById('users', dataColumns, id);
    if (!result) {
      validations.push('Usuário não existe.');
      Model.debug({
        action: 'byID',
        dataIn: { id },
        validations,
      });
      return res.status(404).json({ status: result.status, err: 'Dados inválidos.' });
    }
    return res.json(result);
  }

  async index(req, res) {
    const dataColumns = [
      'id',
      'fullname',
      'num_doc',
      'email',
      'password',
      'role',
      'status',
      'created_at',
      'updated_at',
    ];

    const searchAll = await Model.findAll('users', dataColumns);
    if (searchAll) return res.json(searchAll);
    return res.status(404).json({ status: true, msg: 'Não cadastrados.' });
  }

  async create(req, res) {
    const { fullname, num_doc, email, password, role = 0, status = 1 } = req.body;
    const validations = [];

    /* dado é valido? */
    if (
      num_doc == undefined ||
      fullname == undefined ||
      email == undefined ||
      password == undefined ||
      role == undefined ||
      status == undefined
    )
      return res.json({ err: 'Falha na requisição.' });
    const docValid = await Model.isValidDoc(num_doc);
    const emailValid = await Model.isEmail(email);
    if (!docValid.status) validations.push('CPF inválido.');
    if (!emailValid) validations.push('E-mail inválido.');

    /* existe no banco? */
    const fullnameExists = await Model.findValue('users', ['fullname'], fullname);
    const docExists = await Model.findValue('users', ['num_doc'], num_doc);
    const emailExists = await Model.findValue('users', ['email'], email);

    if (fullnameExists.status) validations.push('Nome de usuário já existe.');
    if (docExists.status) validations.push('CPF já cadastrado.');
    if (emailExists.status) validations.push('E-mail já cadastrado.');

    /* debug */
    if (validations.length > 0) {
      Model.debug({
        action: 'create',
        dataIn: { fullname, num_doc, email, password, role, status },
        fullnameExists,
        docExists,
        emailExists,
        docValid,
        emailValid,
        validations,
      });
      return res.status(406).json({ status: false, msg: 'Dados inválidos.' });
    }

    /* create */
    const dataColumns = { fullname, num_doc, email, password, role, status };
    const result = await Model.new('users', dataColumns);
    return res.json({ status: result.status, msg: 'Criado com sucesso.' });
  }
}

module.exports = new UsersController();
