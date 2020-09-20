export interface PlayerSummaries {
  players: PlayerSummary[];
}

export interface PlayerSummary {
  steamid:                  string;
  communityvisibilitystate: number;
  profilestate:             number;
  personaname:              string;
  commentpermission:        number;
  profileurl:               string;
  avatar:                   string;
  avatarmedium:             string;
  avatarfull:               string;
  avatarhash:               string;
  personastate:             number;
  realname:                 string;
  primaryclanid:            string;
  timecreated:              number;
  personastateflags:        number;
  loccountrycode:           string;
  locstatecode:             string;
  loccityid:                number;
}
