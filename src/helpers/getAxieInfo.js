import { getAxieGenes } from '../helpers/getAxieGenes';
import { getAxieDetail } from '../helpers/getAxieDetail';

export async function getAxieInfo(axieId) {
  const genes = await getAxieGenes(axieId);
  const detailsRes = await getAxieDetail(axieId);
  const details = detailsRes.axie;

  return { genes, details };
};
