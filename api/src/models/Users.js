import bcrypt from 'bcrypt';
import knex from '../services/knexjs';

class PasswordToken {
  async changePassword(newPassword, id, token) {
    try {
      const hash = await bcrypt.hash(newPassword, 10);
      await knex.update({ password: hash }).where({ id }).table('users');
      return await this.setUsed(token);
    } catch (error) {
      return error;
    }
  }

  async createToken(email) {
    try {
      const user = await this.findByEmail(email);

      if (user) {
        const token = Date.now();
        await knex
          .insert({
            user_id: user[0].id,
            used: 0,
            token,
          })
          .table('passwordtokens');
        return {
          status: true,
          token,
        };
      }
      return {
        status: false,
        err: 'E-mail inexistente!',
      };
    } catch (err) {
      return {
        status: false,
        err,
      };
    }
  }

  async validateToken(token) {
    try {
      const result = await knex.select().where({ token }).table('passwordtokens');
      if (result.length > 0) {
        const tk = result[0];
        if (tk.used) {
          return {
            status: false,
            err: 'Token já utilizado!',
          };
        }
        return { status: true, token: tk };
      }
      return {
        status: false,
        err: 'Token inválido!',
      };
    } catch (err) {
      return {
        status: false,
        err,
      };
    }
  }

  async setUsedToken(token) {
    try {
      return await knex.update({ used: 1 }).where({ token }).table('pwd_tokens');
    } catch (err) {
      return {
        status: false,
        err,
      };
    }
  }
}

module.exports = new PasswordToken();
