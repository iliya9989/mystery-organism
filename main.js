// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
//creates a speciment object
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna, //changes one base of the dna
    mutate: function () {
      const randNum = Math.floor(Math.random() * 15);
      const randBase = this.dna[randNum];
      this.dna[randNum] = returnRandBase();
      if (this.dna === randBase) {
        this.mutate();
      }
    }, //compares dna of two objects
    compareDna: function (obj) {
      let sameBase = 0;
      for (let i = 0; i <= obj.dna.length; i++) {
        if (obj.dna[i] === this.dna[i]) {
          sameBase++;
        }
      }
      console.log(
        `Specimen ${this.specimenNum} and specimen ${obj.specimenNum} have ${
          (15 / sameBase) * 10
        }% DNA in common`,
      );
    }, //if it has at least 60% of C or G then will likely survive
    willLikelySurvive: function () {
      let cAndGCount = 0;
      this.dna.forEach((iter) => {
        if (iter === "C" || iter === "G") {
          cAndGCount++;
        }
      });
      return 15 / cAndGCount < 6;
    },
  };
};

//making an array of survivable specimens
let survivableSpecimens = [];
for (let i = 0; i < 30; i++) {
  const survivableSpecimen = pAequorFactory(i, mockUpStrand());
  if (survivableSpecimen.willLikelySurvive()) {
    survivableSpecimens.push(survivableSpecimen);
  } else {
    i--;
  }
}
console.log(survivableSpecimens.length);
console.log(survivableSpecimens);
