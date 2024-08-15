type ClaimCategory = 'TOP_ROW' | 'MIDDLE_ROW' | 'BOTTOM_ROW' | 'FULL_HOUSE' | 'EARLY_FIVE'

type Result = 'ACCEPTED' | 'REJECTED'

export class Game {
  numbersAccounced: number[]
  completedClaims: Set<ClaimCategory>

  constructor() {
    this.numbersAccounced = []
    this.completedClaims = new Set();
  }

  announceNumber(number: number) {
    this.numbersAccounced.push(number)
  }

  claim(ticket: Ticket, claimCategory: ClaimCategory): Result {
    if (this.completedClaims.has(claimCategory)) return 'REJECTED'

    let claimType: Claim | null = null;
    if (claimCategory === 'TOP_ROW') {
      claimType = new TopRowClaim(this.numbersAccounced, ticket)
    }
    if (claimCategory === 'MIDDLE_ROW') {
      claimType = new MiddleRowClaim(this.numbersAccounced, ticket)
    }
    if (claimCategory === 'BOTTOM_ROW') {
      claimType = new BottomRowClaim(this.numbersAccounced, ticket)
    }
    if (claimCategory === 'FULL_HOUSE') {
      claimType = new FullHouseClaim(this.numbersAccounced, ticket)
    }
    if (claimCategory === 'EARLY_FIVE') {
      claimType = new EarlyFiveClaim(this.numbersAccounced, ticket)
    }
    if (!claimType) throw new Error('No claim found')
    const result = claimType.evaluate()
    if (result === 'ACCEPTED') {
      this.completedClaims.add(claimCategory)
    }
    return result
  }
}

export class Ticket {
  constructor(private readonly numbers: Array<Array<number | "_">>) {
    if (numbers.length !== 3) throw new Error("Invalid ticket")
  }
  get topRow() {
    const removeUnderscore = (char: "_" | number) => (char !== '_')
    return new Set(this.numbers[0].filter(removeUnderscore));
  }
  get middleRow() {
    const removeUnderscore = (char: "_" | number) => (char !== '_')
    return new Set(this.numbers[1].filter(removeUnderscore));
  }
  get bottomRow() {
    const removeUnderscore = (char: "_" | number) => (char !== '_')
    return new Set(this.numbers[2].filter(removeUnderscore));
  }
  get allRows() {
    const removeUnderscore = (char: "_" | number) => (char !== '_')
    const topRowNumbers = this.numbers[0].filter(removeUnderscore);
    const middleRowNumbers = this.numbers[1].filter(removeUnderscore)
    const bottomRowNumbers = this.numbers[2].filter(removeUnderscore)
    const allNumbers = [...topRowNumbers, ...middleRowNumbers, ...bottomRowNumbers]
    return new Set(allNumbers);
  }
}

interface Claim {
  evaluate: () => Result
}

class TopRowClaim implements Claim {
  constructor(
    private readonly numbersAccounced: Array<number>,
    private readonly ticket: Ticket) { }

  evaluate() {
    const numbersToCheck = this.ticket.topRow
    const lastAnnouncedNumber = this.numbersAccounced[this.numbersAccounced.length - 1]
    if (!numbersToCheck.has(lastAnnouncedNumber)) return 'REJECTED'
    this.numbersAccounced.forEach(num => numbersToCheck.delete(num))
    return numbersToCheck.size === 0 ? 'ACCEPTED' : 'REJECTED'
  }
}

class MiddleRowClaim implements Claim {
  constructor(
    private readonly numbersAccounced: Array<number>,
    private readonly ticket: Ticket) { }

  evaluate() {
    const numbersToCheck = this.ticket.middleRow
    const lastAnnouncedNumber = this.numbersAccounced[this.numbersAccounced.length - 1]
    if (!numbersToCheck.has(lastAnnouncedNumber)) return 'REJECTED'
    this.numbersAccounced.forEach(num => numbersToCheck.delete(num))
    return numbersToCheck.size === 0 ? 'ACCEPTED' : 'REJECTED'
  }
}

class BottomRowClaim implements Claim {
  constructor(
    private readonly numbersAccounced: Array<number>,
    private readonly ticket: Ticket) { }

  evaluate() {
    const numbersToCheck = this.ticket.bottomRow
    const lastAnnouncedNumber = this.numbersAccounced[this.numbersAccounced.length - 1]
    if (!numbersToCheck.has(lastAnnouncedNumber)) return 'REJECTED'
    this.numbersAccounced.forEach(num => numbersToCheck.delete(num))
    return numbersToCheck.size === 0 ? 'ACCEPTED' : 'REJECTED'
  }
}

class FullHouseClaim implements Claim {
  constructor(
    private readonly numbersAccounced: Array<number>,
    private readonly ticket: Ticket) { }

  evaluate() {
    const numbersToCheck = this.ticket.allRows
    const lastAnnouncedNumber = this.numbersAccounced[this.numbersAccounced.length - 1]
    if (!numbersToCheck.has(lastAnnouncedNumber)) return 'REJECTED'
    this.numbersAccounced.forEach(num => numbersToCheck.delete(num))
    return numbersToCheck.size === 0 ? 'ACCEPTED' : 'REJECTED'
  }
}


class EarlyFiveClaim implements Claim {
  constructor(
    private readonly numbersAccounced: Array<number>,
    private readonly ticket: Ticket) { }
  evaluate() {
    const numbersToCheck = this.ticket.allRows;
    const lastAnnouncedNumber = this.numbersAccounced[this.numbersAccounced.length - 1]
    if (!numbersToCheck.has(lastAnnouncedNumber)) return 'REJECTED'

    let numbersMatched = 0;
    for (let number of this.numbersAccounced) {
      if (numbersToCheck.has(number)) numbersMatched++
    }
    return numbersMatched === 5 ? 'ACCEPTED' : 'REJECTED'
  }
}