import knex from '../services/knexjs';
import validator from 'validator';
import parse from 'telefone/parse';

class Model {
  async delete(table, id) {
    try {
      return await knex
        .delete()
        .where({ id })
        .table(table)
        .then((result) => {
          if (result) return { status: true, result };
          return { status: false, result };
        })
        .catch((error) => {
          return { status: false, error };
        });
    } catch (error) {
      return error;
    }
  }

  async update(table, { ...columnNames }, id) {
    try {
      return knex
        .update({ ...columnNames })
        .where({ id })
        .table(table)
        .then((result) => {
          return { status: true, result };
        })
        .catch((error) => {
          return { status: false, error };
        });
    } catch (error) {
      return error;
    }
  }

  async findAll(table, [...columnNames] = '*') {
    try {
      const result = await knex.select([...columnNames]).from(table);
      return result.length > 0 ? result : false;
    } catch (error) {
      return error;
    }
  }

  async findById(table, [...columnNames] = '*', id) {
    try {
      const result = await knex
        .select([...columnNames])
        .from(table)
        .where({ id });
      return result.length > 0 ? result[0] : false;
    } catch (error) {
      return error;
    }
  }

  async new(table, { ...dataColumns }) {
    try {
      return knex(table)
        .insert({ ...dataColumns })
        .then((result) => {
          return { status: true, result };
        })
        .catch((error) => {
          return { status: false, error };
        });
    } catch (error) {
      return error;
    }
  }

  async findValue(table, [...column_name], value) {
    try {
      const search = await knex
        .select([...column_name])
        .from(table)
        .where({ [column_name]: value });
      return search.length > 0 ? { status: true, result: search } : false;
    } catch (error) {
      return error;
    }
  }

  async isValidDoc(doc) {
    doc = doc.replace(/[^\d]/g, ''); // Remove caracteres não numéricos do CPF
    if (doc.length === 11) return this.isValidCPF(doc); // É um CPF
    if (doc.length === 14) return this.isValidCNPJ(doc); // É um CNPJ
    return { status: false }; // Tamanho inválido, retorne false
  }

  async isValidCPF(cpf) {
    try {
      // Calcula o primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let firstDigit = 11 - (sum % 11);
      if (firstDigit > 9) {
        firstDigit = 0;
      }

      // Verifica se o primeiro dígito verificador está correto
      if (parseInt(cpf.charAt(9)) !== firstDigit) {
        return { status: false, type: 'cpf', err: 'Step1' };
      }

      // Calcula o segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      let secondDigit = 11 - (sum % 11);
      if (secondDigit > 9) {
        secondDigit = 0;
      }

      // Verifica se o segundo dígito verificador está correto
      if (parseInt(cpf.charAt(10)) !== secondDigit) {
        return { status: false, type: 'cpf', err: 'Step2' };
      }

      return { status: true };
    } catch (error) {
      return error;
    }
  }

  async isValidCNPJ(cnpj) {
    try {
      // Validação do CNPJ
      let size = cnpj.length - 2;
      let numbers = cnpj.substring(0, size);
      let digits = cnpj.substring(size);
      let sum = 0;
      let position = size - 7;

      for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * position--;
        if (position < 2) {
          position = 9;
        }
      }

      let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

      if (result !== parseInt(digits.charAt(0))) {
        return { status: false, type: 'cnpj', err: 'Step1' };
      }

      size = size + 1;
      numbers = cnpj.substring(0, size);
      sum = 0;
      position = size - 7;

      for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * position--;
        if (position < 2) {
          position = 9;
        }
      }

      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

      if (result !== parseInt(digits.charAt(1))) {
        return { status: false, type: 'cnpj', err: 'Step2' };
      }

      return { status: true };
    } catch (error) {
      return error;
    }
  }

  async isEmail(email) {
    try {
      return await validator.isEmail(email);
    } catch (error) {
      return error;
    }
  }

  async formatPhoneNumber(phone) {
    return parse(phone);
  }

  async debug({ ...obj }) {
    console.log(obj);
  }
}

module.exports = new Model();
