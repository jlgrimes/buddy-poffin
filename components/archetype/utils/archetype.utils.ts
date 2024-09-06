const pokemonToFind = [
  // tier one as of 2024
  'regidrago',
  'miraidon',
  'snorlax',
  'roaring moon',
  'raging bolt',
  'lugia',
  'chien-pao',
  'gardevoir',
  'dragapult',
  'iron thorns',
  'charizard',

  // tier two and below
  'gholdengo',
  'dialga',
  'palkia',
  'giratina',
  'arceus',
  'comfey',
  'entei',
  'great tusk',

  // secondary/rogue
  'ogerpon',
  'conkeldurr',
  'pidgeot',
  'flutter mane'
];

// Pokemon that might not indicate exactly the archetype we can use to infer the archetype
const associatedPokemon = [{
  association: 'charmander',
  deck: 'charizard'
}, {
  association: 'frigibax',
  deck: 'chien-pao'
}, {
  association: 'ralts',
  deck: 'gardevoir'
}]

const isCardsMilled = (log: string[], currentIdx: number, playerName: string) => {
  if (currentIdx < 1) return false;

  return log[currentIdx - 1].includes(`${playerName} moved ${playerName}'s`) && log[currentIdx - 1].includes('cards to the discard pile') && log[currentIdx].includes('•');
}

export const determineArchetype = (log: string[], playerName: string): string | undefined => {
  const drawnCardsLines = log.filter((line, idx) => {
    if (line.includes(`${playerName} played `) || line.includes(`${playerName} evolved `) || (line.includes(`${playerName}'s `) && line.includes(`was Knocked Out`)) || isCardsMilled(log, idx, playerName)) {
      return true;
    }

    return false;
  });
  let archetype = pokemonToFind.find((targetMon) => drawnCardsLines.some((drawnCards) => drawnCards.toLowerCase().includes(targetMon.toLowerCase())));
  const associatedArchetype = associatedPokemon.find((targetMon) => drawnCardsLines.some((drawnCards) => drawnCards.toLowerCase().includes(targetMon.association.toLowerCase())))?.deck;
  if (associatedArchetype) archetype = associatedArchetype;

  return archetype?.replace(' ', '-');
}