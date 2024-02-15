import { getAxieDetail } from "./getAxieDetail";
import { AxieGene } from "agp-npm/dist/axie-gene";

export const getAxieGenes = (axieId) => {
  return new Promise((resolve, reject) => {
    getAxieDetail(axieId).then(res => {
      const genes = res.axie.genes;
      const axieGene = new AxieGene(genes);

      resolve(axieGene.genes);
    });
  });
}
