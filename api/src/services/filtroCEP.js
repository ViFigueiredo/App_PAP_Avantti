const knex = require('../../../consulta_cnpj_pap_api/src/configs/knex');

const batchSize = 100000; // Tamanho do lote
let offset = 0; // Deslocamento inicial

async function filtroCEP(menorCEP, maiorCEP) {
  try {
    const rows = await knex
      .select(
        'CNPJ_072022',
        'RAZAO_SOCIAL',
        'CNAE_PRINCIPAL',
        'ENDERECO',
        'NUMERO',
        'BAIRRO',
        'CEP',
        'UF',
        'CIDADE_AJUS',
        'TEL_9_DIGITO',
        'NATUREZA_AJUS',
        'Oper_original',
        'Oper_final',
        'CLASS_TEL',
        'MESES_PORTABILIDADE',
      )
      .from('sis_avantti_pe')
      .where('CEP', '>=', menorCEP)
      .andWhere('CEP', '<=', maiorCEP)
      .limit(batchSize)
      .offset(offset);
    // .first();

    // Verificar se há mais registros para buscar
    if (rows.length === batchSize) {
      offset += batchSize;
      return filtroCEP(); // Recursivamente buscar o próximo lote
    }

    // Todos os registros foram buscados
    console.log('Consulta concluída');
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = filtroCEP;
