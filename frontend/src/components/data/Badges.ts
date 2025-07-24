export const badgeMap: Record<string, string> = {
  /* ---------- Premier League ---------- */
  "Arsenal":           "/logos/England - Premier League/Arsenal FC.png",
  "Aston Villa":       "/logos/England - Premier League/Aston Villa.png",
  "Bournemouth":       "/logos/England - Premier League/AFC Bournemouth.png",
  "Brentford":         "/logos/England - Premier League/Brentford FC.png",
  "Brighton":          "/logos/England - Premier League/Brighton & Hove Albion.png",
  "Burnley":           "/logos/England - Premier League/Burnley FC.png",
  "Chelsea":           "/logos/England - Premier League/Chelsea FC.png",
  "Crystal Palace":    "/logos/England - Premier League/Crystal Palace.png",
  "Everton":           "/logos/England - Premier League/Everton FC.png",
  "Fulham":            "/logos/England - Premier League/Fulham FC.png",
  "Leeds":             "/logos/England - Premier League/Leeds United.png",
  "Liverpool":         "/logos/England - Premier League/Liverpool FC.png",
  "Manchester City":   "/logos/England - Premier League/Manchester City.png",
  "Manchester United": "/logos/England - Premier League/Manchester United.png",
  "Newcastle":         "/logos/England - Premier League/Newcastle United.png",
  "Nottingham Forest": "/logos/England - Premier League/Nottingham Forest.png",
  "Sunderland":        "/logos/England - Premier League/Sunderland AFC.png",
  "Tottenham":         "/logos/England - Premier League/Tottenham Hotspur.png",
  "West Ham":          "/logos/England - Premier League/West Ham United.png",
  "Wolves":            "/logos/England - Premier League/Wolverhampton Wanderers.png",

  /* ---------- La Liga ---------- */
  "Athletic Club":     "/logos/Spain - LaLiga/Athletic Bilbao.png",
  "Atletico Madrid":   "/logos/Spain - LaLiga/Atlético de Madrid.png",
  "Osasuna":           "/logos/Spain - LaLiga/CA Osasuna.png",
  "Celta Vigo":        "/logos/Spain - LaLiga/Celta de Vigo.png",
  "Alaves":            "/logos/Spain - LaLiga/Deportivo Alavés.png",
  "Elche":             "/logos/Spain - LaLiga/Elche CF.png",
  "Barcelona":         "/logos/Spain - LaLiga/FC Barcelona.png",
  "Getafe":            "/logos/Spain - LaLiga/Getafe CF.png",
  "Girona":            "/logos/Spain - LaLiga/Girona FC.png",
  "Levante":           "/logos/Spain - LaLiga/Levante UD.png",
  "Rayo Vallecano":    "/logos/Spain - LaLiga/Rayo Vallecano.png",
  "Espanyol":          "/logos/Spain - LaLiga/RCD Espanyol Barcelona.png",
  "Mallorca":          "/logos/Spain - LaLiga/RCD Mallorca.png",
  "Real Betis":        "/logos/Spain - LaLiga/Real Betis Balompié.png",
  "Real Madrid":       "/logos/Spain - LaLiga/Real Madrid.png",
  "Real Oviedo":       "/logos/Spain - LaLiga/Real Oviedo.png",
  "Real Sociedad":     "/logos/Spain - LaLiga/Real Sociedad.png",
  "Sevilla":           "/logos/Spain - LaLiga/Sevilla FC.png",
  "Valencia":          "/logos/Spain - LaLiga/Valencia CF.png",
  "Villarreal":        "/logos/Spain - LaLiga/Villarreal CF.png"
};

/** Henter logo-URL eller tom streng */
export const localBadge = (team: string) => badgeMap[team] ?? "";
