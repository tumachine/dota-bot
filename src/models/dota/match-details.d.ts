export interface MatchDetails {
  players:               Player[];
  radiantWin:            boolean;
  duration:              number;
  preGameDuration:       number;
  startTime:             number;
  matchID:               number;
  matchSeqNum:           number;
  towerStatusRadiant:    number;
  towerStatusDire:       number;
  barracksStatusRadiant: number;
  barracksStatusDire:    number;
  cluster:               number;
  firstBloodTime:        number;
  lobbyType:             number;
  humanPlayers:          number;
  leagueid:              number;
  positiveVotes:         number;
  negativeVotes:         number;
  gameMode:              number;
  flags:                 number;
  engine:                number;
  radiantScore:          number;
  direScore:             number;
  radiantTeamID:         number;
  radiantName:           string;
  radiantLogo:           number;
  radiantTeamComplete:   number;
  direTeamID:            number;
  direName:              string;
  direLogo:              number;
  direTeamComplete:      number;
  radiantCaptain:        number;
  direCaptain:           number;
  picksBans:             PickBan[];
}

export interface PickBan {
  isPick: boolean;
  heroID: number;
  team:   number;
  order:  number;
}

export interface Player {
  accountID:         number;
  playerSlot:        number;
  heroID:            number;
  item0:             number;
  item1:             number;
  item2:             number;
  item3:             number;
  item4:             number;
  item5:             number;
  backpack0:         number;
  backpack1:         number;
  backpack2:         number;
  itemNeutral:       number;
  kills:             number;
  deaths:            number;
  assists:           number;
  leaverStatus:      number;
  lastHits:          number;
  denies:            number;
  goldPerMin:        number;
  xpPerMin:          number;
  level:             number;
  heroDamage:        number;
  towerDamage:       number;
  heroHealing:       number;
  gold:              number;
  goldSpent:         number;
  scaledHeroDamage:  number;
  scaledTowerDamage: number;
  scaledHeroHealing: number;
  abilityUpgrades:   AbilityUpgrade[];
}

export interface AbilityUpgrade {
  ability: number;
  time:    number;
  level:   number;
}
