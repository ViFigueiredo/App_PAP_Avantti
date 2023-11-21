const knex = require('../../../consulta_cnpj_pap_api/src/configs/knex');

const batchSize = 100000; // Tamanho do lote
let offset = 0; // Deslocamento inicial

async function encontraCNPJ(cnpj) {
  try {
    const rows = await knex
      .select('CNPJ_072022', 'RAZAO_SOCIAL', 'CNAE_PRINCIPAL', 'CEP')
      .from('sis_avantti_pe')
      .where('CNPJ_072022', cnpj)
      .limit(batchSize)
      .offset(offset)
      .first();

    // Verificar se há mais registros para buscar
    if (rows.length === batchSize) {
      offset += batchSize;
      return encontraCNPJ(); // Recursivamente buscar o próximo lote
    }

    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = encontraCNPJ;
