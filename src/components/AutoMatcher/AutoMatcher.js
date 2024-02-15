import React, { Component } from 'react';
import BreedInspector from './BreedInspector';
import LeftSidebar from './LeftSidebar';
import { getAxiesFromWallet } from '../../helpers/getAxiesFromWallet';
import { getMultipleAxieGenes } from '../../helpers/getMultipleAxieGenes';
import { getTokenPrices } from '../../helpers/getTokenPrices';
import { breedingCosts } from '../../helpers/breedingCosts';
import { AxieGene } from "agp-npm/dist/axie-gene";

import '../../styles/Universal.scss';


class AutoMatcher extends Component {
  constructor(props){
    super(props);

    this.state = {
       newUserWallets: '',
       userWallets: [],
       userAxies: [],
       userAxiesWithGenes: [],
       syncedWallets: [],
       targetBodyParts: [],
       possibleBreeds: [],
       availableBreeds: true,
       axieBreedingCosts: null,
       axieListItems: [],
    }
  }

  setAvailableBreeds = (input) => { this.setState({ availableBreeds: input }) }
  setPossibleBreeds = (input) => { this.setState({ possibleBreeds: input }) }
  setTargetBodyParts = (input) => { this.setState({ targetBodyParts: input }) }
  setNewUserWallets = (input) => { this.setState({ newUserWallets: input }) }
  setUserWallets = (input, callback = () => true) => { this.setState({ userWallets: input }, () => callback()) }
  setUserAxies = (input, callback = () => true) => { this.setState({ userAxies: input }, () => callback()) }
  setUserAxiesWithGenes = (input, callback = () => true) => { this.setState({ userAxiesWithGenes: input }, () => callback()) }
  setSyncedWallets = (input) => { this.setState({ syncedWallets: input }) }
  setAxieBreedingCosts = (input) => { this.setState({ axieBreedingCosts: input }) }
  setAxieListItems = (input) => { this.setState({ axieListItems: input }) }

  render() {
    const {
      newUserWallets,
      userWallets,
      userAxies,
      userAxiesWithGenes,
      syncedWallets,
      targetBodyParts,
      possibleBreeds,
      availableBreeds,
      axieBreedingCosts,
      axieListItems,
    } = this.state;

    const syncMultipleGenes = () => {
      let commaAxieIds = '';
      userAxies.filter(axie => !axie.genes).forEach((axie, i) => {
        if (i > 0) {
          commaAxieIds += ',';
        }

        commaAxieIds += axie.id;
      });

      getMultipleAxieGenes(commaAxieIds).then(res => {
        const newUserAxiesWithGenes = userAxiesWithGenes;

        if (res.data) {
          res.data.forEach(axie => {
            if (axie.genes !== '0x0') {
              const currentAxie = userAxies.filter(userAxie => userAxie.id === axie.id)[0];

              newUserAxiesWithGenes.push({ ...axie, image: currentAxie.image, genesHex: axie.genes, genes: new AxieGene(axie.genes).genes, parents: [axie.sireId, axie.matronId] });
            }
          });

          this.setUserAxiesWithGenes(newUserAxiesWithGenes);
        }
      });
    }

    const syncWallets = () => {
      const unsyncedWallets = userWallets.filter(wallet => syncedWallets.indexOf(wallet) === -1);

      unsyncedWallets.forEach((wallet, i) => {
        getAxiesFromWallet(wallet).then(newAxies => {
          const updatedUserAxies = userAxies;

          newAxies.forEach(axie => {
            if (userAxies.findIndex(o => o.id === axie.id) === -1 && axie.stage === 4) {
              updatedUserAxies.push({ ...axie, wallet: wallet });
            }
          });

          this.setUserAxies(updatedUserAxies, () => {
            if (i === unsyncedWallets.length - 1) {
              syncMultipleGenes();
            }
          });
        });
      });

      this.setSyncedWallets(userWallets); // Hacky. Wallets should be added to the syncedWallets list one at a time, after successfully getting the axies. This will say a wallet is synced even if the API call fails to get the axies, which is a bug.
    }

    const updateAxieBreedingCosts = () => {
      return new Promise((resolve, reject) => {
        getTokenPrices().then(res => {
          let newAxieBreedingCosts = {};

          Object.keys(breedingCosts).forEach(breedNum => {
            newAxieBreedingCosts[breedNum] = { ...breedingCosts[breedNum], usd: (breedingCosts[breedNum].slp * res.slp) + (breedingCosts[breedNum].axs * res.axs) };
          });

          this.setAxieBreedingCosts(newAxieBreedingCosts);

          resolve(newAxieBreedingCosts);
        });
      });
    }

    return (
      <main>
        <LeftSidebar
          setAvailableBreeds={this.setAvailableBreeds}
          availableBreeds={availableBreeds}
          updateAxieBreedingCosts={updateAxieBreedingCosts}
          setPossibleBreeds={this.setPossibleBreeds}
          possibleBreeds={possibleBreeds}
          setTargetBodyParts={this.setTargetBodyParts}
          targetBodyParts={targetBodyParts}
          setNewUserWallets={this.setNewUserWallets}
          newUserWallets={newUserWallets}
          setUserWallets={this.setUserWallets}
          userWallets={userWallets}
          setUserAxies={this.setUserAxies}
          userAxies={userAxies}
          userAxiesWithGenes={userAxiesWithGenes}
          setSyncedWallets={this.setSyncedWallets}
          syncedWallets={syncedWallets}
          syncWallets={syncWallets}
          setAxieListItems={this.setAxieListItems}
        />
        <BreedInspector
          axieBreedingCosts={axieBreedingCosts}
          availableBreeds={availableBreeds}
          possibleBreeds={possibleBreeds}
          userAxies={userAxies}
          userAxiesWithGenes={userAxiesWithGenes}
          setAxieListItems={this.setAxieListItems}
          axieListItems={axieListItems}
        />
      </main>
    );
  }
}

export default AutoMatcher;
