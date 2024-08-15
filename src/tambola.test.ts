import { Game, Ticket } from './tambola';

const TICKET: Ticket = new Ticket([
  [4, 16, "_", "_", 48, "_", 63, 76, "_"],
  [7, "_", 23, 38, "_", 52, "_", "_", 80],
  [9, "_", 25, "_", "_", 56, 64, "_", 83]
])

describe('Game', () => {
  it('should not accept invalid ticket', () => {
    expect(() => new Ticket([])).toThrow()
  })
  it('should reject non existent claim', () => {
    const game = new Game();
    [1, 2, 3].forEach(number => game.announceNumber(number))
    //@ts-ignore
    expect(() => game.claim(TICKET, 'BLAH')).toThrow()
  })
})

describe('top row claim', () => {
  const EXPECTED_NUMBER_SEQUENCE = [90, 4, 46, 63, 89, 16, 76, 48]
  test('should be ACCEPTED in last announcement', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'TOP_ROW')
    expect(claimResult).toEqual('ACCEPTED')
  })
  test('should be REJECTED for partial claim', () => {
    const game = new Game();
    [4].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'TOP_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if not last announcement', () => {
    const game = new Game();
    [...EXPECTED_NUMBER_SEQUENCE, 23].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'TOP_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if already claimed', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const firstClaim = game.claim(TICKET, 'TOP_ROW')
    expect(firstClaim).toEqual('ACCEPTED')
    const claimResult = game.claim(TICKET, 'TOP_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
})

describe('middle row claim', () => {
  const EXPECTED_NUMBER_SEQUENCE = [90, 7, 46, 63, 38, 23, 76, 48, 80, 52]
  test('should be ACCEPTED in last announcement', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'MIDDLE_ROW')
    expect(claimResult).toEqual('ACCEPTED')
  })
  test('should be REJECTED for partial claim', () => {
    const game = new Game();
    [7].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'MIDDLE_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if not last announcement', () => {
    const game = new Game();
    [...EXPECTED_NUMBER_SEQUENCE, 45].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'MIDDLE_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if already claimed', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const firstClaim = game.claim(TICKET, 'MIDDLE_ROW')
    expect(firstClaim).toEqual('ACCEPTED')
    const claimResult = game.claim(TICKET, 'MIDDLE_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
})

describe('bottom row claim', () => {
  const EXPECTED_NUMBER_SEQUENCE = [25, 9, 56, 64, 23, 38, 83];
  test('should be ACCEPTED in last announcement', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'BOTTOM_ROW')
    expect(claimResult).toEqual('ACCEPTED')
  })
  test('should be REJECTED for partial claim', () => {
    const game = new Game();
    [9].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'BOTTOM_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if not last announcement', () => {
    const game = new Game();
    [...EXPECTED_NUMBER_SEQUENCE, 90].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'BOTTOM_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if already claimed', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const firstClaim = game.claim(TICKET, 'BOTTOM_ROW')
    expect(firstClaim).toEqual('ACCEPTED')
    const claimResult = game.claim(TICKET, 'BOTTOM_ROW')
    expect(claimResult).toEqual('REJECTED')
  })
})

describe('full house claim', () => {
  const EXPECTED_NUMBER_SEQUENCE = [4, 7, 9, 16, 23, 25, 48, 38, 52, 56, 63, 64, 76, 80, 83];
  test('should be ACCEPTED in last announcement', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'FULL_HOUSE')
    expect(claimResult).toEqual('ACCEPTED')
  })
  test('should be REJECTED for partial claim', () => {
    const game = new Game();
    [7].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'FULL_HOUSE')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if not last announcement', () => {
    const game = new Game();
    [...EXPECTED_NUMBER_SEQUENCE, 90].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'FULL_HOUSE')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if already claimed', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const firstClaim = game.claim(TICKET, 'FULL_HOUSE')
    expect(firstClaim).toEqual('ACCEPTED')
    const claimResult = game.claim(TICKET, 'FULL_HOUSE')
    expect(claimResult).toEqual('REJECTED')
  })
})

describe('Early 5 claim', () => {
  const EXPECTED_NUMBER_SEQUENCE = [16, 23, 38, 25, 76];
  test('should be ACCEPTED in last announcement', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'EARLY_FIVE')
    expect(claimResult).toEqual('ACCEPTED')
  })
  test('should be REJECTED if more than 5 numbers are matched', () => {
    const game = new Game();
    [...EXPECTED_NUMBER_SEQUENCE, 80].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'EARLY_FIVE')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if not last announcement', () => {
    const game = new Game();
    [...EXPECTED_NUMBER_SEQUENCE, 90].forEach(number => game.announceNumber(number))
    const claimResult = game.claim(TICKET, 'EARLY_FIVE')
    expect(claimResult).toEqual('REJECTED')
  })
  test('should be REJECTED if already claimed', () => {
    const game = new Game();
    EXPECTED_NUMBER_SEQUENCE.forEach(number => game.announceNumber(number))
    const firstClaim = game.claim(TICKET, 'EARLY_FIVE')
    expect(firstClaim).toEqual('ACCEPTED')
    const claimResult = game.claim(TICKET, 'EARLY_FIVE')
    expect(claimResult).toEqual('REJECTED')
  })
})