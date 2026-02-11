const MAX_STAT_CHOICES: number = 5;
const MAX_APTITUDE_CHOICES: number = 12;

const SKILL_PROBS = [0.2, 0.25, 0.4];
const NORM_WHITE_SKILL_SPRK_PROB: number[] = [0.5, 0.45, 0.05];
const SS_WHITE_SKILL_SPRK_PROB: number[] = [0.2, 0.7, 0.1];

const STAT_THRESHOLDS_PROB: number[][] = [
    [0.9, 0.1, 0],
    [0.5, 0.45, 0.06],
    [0.2, 0.7, 0.1]
];

class UmaParent {
    isRankSS: boolean = false;
    aptChoices: number = 0;
    maxAptChoices: number = MAX_APTITUDE_CHOICES;
    minAptSpark: number = 1;

    statThreshold: number = 0;
    statChoices: number = 0;
    minStatSpark: number = 0;
    maxStatSpark: number = 2;


    upgrdSkillChoices: number = 0;
    goldSkillChoices: number = 0;
    whiteSkillChoices: number = 0;
    minSkillSpark: number = 0;
    maxSkillSpark: number = 2;

    calcOdds(): number {
        // Getting Pink sparks is completely random, 
        // so its (number of choices / max choices of three).
        let aptProb = (this.aptChoices / this.maxAptChoices) * (this.minAptSpark / 3);

        // Determine which stat thresholds we are calculating on.
        let thrshldProbs = STAT_THRESHOLDS_PROB[this.statThreshold];
        let thrshldProb;
        if (this.minStatSpark == 0 && this.maxStatSpark == 2) { 
            thrshldProb = 1; 
        } else {
            thrshldProb = thrshldProbs[this.minStatSpark] + thrshldProbs[this.maxStatSpark];
        }

        let statProb = (this.statChoices / MAX_STAT_CHOICES) * thrshldProb;

        // Determing which skill threshold the parent is in.
        //  If the parent is an SS Rank, we'll have to switch our calculations.
        let skillThrshldProbs = this.isRankSS ? NORM_WHITE_SKILL_SPRK_PROB : SS_WHITE_SKILL_SPRK_PROB;
        if (this.minSkillSpark == 0 && this.maxSkillSpark == 2) { 
            thrshldProb = 1; 
        } else if (this.minSkillSpark == this.maxSkillSpark) {
            thrshldProb = skillThrshldProbs[this.minSkillSpark];
        } else {
            thrshldProb = skillThrshldProbs[this.minSkillSpark] + skillThrshldProbs[this.maxSkillSpark];
        }

        // Check if there are skills we want to inherit, otherwise probability will be 0.
        let skillProb = 1;
        if (this.whiteSkillChoices > 0) { skillProb *= this.whiteSkillChoices * SKILL_PROBS[0]; }
        if (this.upgrdSkillChoices > 0) { skillProb *= this.upgrdSkillChoices * SKILL_PROBS[1]; }
        if (this.goldSkillChoices > 0) { skillProb *= this.goldSkillChoices * SKILL_PROBS[2]; }

        if (skillProb != 1) { skillProb = skillProb * thrshldProb; }

        return aptProb * statProb * skillProb;

    }
}

export function calcParentOdds(parent: UmaParent, attempts: number) {
    return 1 - ((1 - parent.calcOdds()) ** attempts);
}