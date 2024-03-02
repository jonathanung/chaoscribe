import requests
import os
import sys
import json

Levels: list[dict] = [
    {
        "level": 0,
        "level_name": "No Chaos",
        "keywords": {
            "en": ["Peace", "Harmony", "Stability", "Order", "Calm", "Tranquility", "Serene", "Quiet", "Restful", "Balanced"],
            "fr": ["Paix", "Harmonie", "Stabilité", "Ordre", "Calme", "Tranquillité", "Serein", "Silencieux", "Reposant", "Équilibré"],
            "es": ["Paz", "Armonía", "Estabilidad", "Orden", "Calmado", "Tranquilidad", "Sereno", "Silencioso", "Tranquilo", "Equilibrado"]
        }
    },
    {
        "level": 1,
        "level_name": "Minimal Chaos",
        "keywords": {
            "en": ["Tension", "Disagreement", "Uncertainty", "Discontent", "Dispute", "Friction", "Unease", "Dissent", "Mild", "Discomfort"],
            "fr": ["Tension", "Désaccord", "Incertitude", "Mécontentement", "Différend", "Frottement", "Malaise", "Dissidence", "Léger", "Inconfort"],
            "es": ["Tensión", "Desacuerdo", "Incertidumbre", "Descontento", "Disputa", "Fricción", "Malestar", "Disensión", "Leve", "Malestar"]
        }
    },
    {
        "level": 2,
        "level_name": "Mild Chaos",
        "keywords": {
            "en": ["Conflict", "Unrest", "Disruption", "Clashes", "Turmoil", "Struggle", "Disturbance", "Quarrel", "Rift", "Upset"],
            "fr": ["Conflit", "Agitation", "Perturbation", "Affrontements", "Tumulte", "Lutte", "Perturbation", "Querelle", "Fissure", "Contrarié"],
            "es": ["Conflicto", "Inquietud", "Disrupción", "Choques", "Turbulencia", "Lucha", "Disturbio", "Pelea", "Ruptura", "Trastorno"]
        }
    },
    {
        "level": 3,
        "level_name": "Moderate Chaos",
        "keywords": {
            "en": ["Crisis", "Riot", "Strife", "Rebellion", "Controversy", "Protest", "Disorder", "Confrontation", "Tumult", "Agitation"],
            "fr": ["Crise", "Émeute", "Conflit", "Rébellion", "Controverse", "Protestation", "Désordre", "Confrontation", "Tumulte", "Agitation"],
            "es": ["Crisis", "Disturbios", "Lucha", "Rebelión", "Controversia", "Protesta", "Desorden", "Confrontación", "Tumulto", "Agitación"]
        }
    },
    {
        "level": 4,
        "level_name": "High Chaos",
        "keywords": {
            "en": ["Revolt", "Uprising", "Insurrection", "Anarchy", "Mayhem", "Chaos", "Mutiny", "Frenzy", "Turmoil", "Disarray"],
            "fr": ["Révolte", "Soulèvement", "Insurrection", "Anarchie", "Chaos", "Mutinerie", "Frénésie", "Turbulence", "Tumulte", "Désordre"],
            "es": ["Revolución", "Levantamiento", "Insurrección", "Anarquía", "Caos", "Motín", "Frenesí", "Turbulencia", "Tumulto", "Desorden"]
        }
    },
    {
        "level": 5,
        "level_name": "Very High Chaos",
        "keywords": {
            "en": ["War", "Revolution", "Catastrophe", "Collapse", "Pandemonium", "Havoc", "Destruction", "Crisis", "Outbreak", "Calamity"],
            "fr": ["Guerre", "Révolution", "Catastrophe", "Effondrement", "Pandémonium", "Désastre", "Destruction", "Crise", "Épidémie", "Calamité"],
            "es": ["Guerra", "Revolución", "Catástrofe", "Colapso", "Pandemonio", "Devastación", "Destrucción", "Crisis", "Brote", "Calamidad"]
        }
    },
    {
        "level": 6,
        "level_name": "Extreme Chaos",
        "keywords": {
            "en": ["Apocalypse", "Armageddon", "Devastation", "Annihilation", "Ruin", "Disaster", "Holocaust", "Inferno", "Carnage", "Doom"],
            "fr": ["Apocalypse", "Armageddon", "Dévastation", "Anéantissement", "Ruine", "Désastre", "Holocauste", "Enfer", "Carnage", "Destin"],
            "es": ["Apocalipsis", "Armagedón", "Devastación", "Aniquilación", "Ruina", "Desastre", "Holocausto", "Infierno", "Carnicería", "Fatalidad"]
        }
    }
]


APIKey: str = os.getenv("NEWS_KEY")

print(f"Key: {APIKey}")

APIUrl: str = "https://newsapi.org/v2/everything?q={}&language={}"

FetchedNews: list[dict] = []

Languages: list[str] = ["en", "fr", "es"]

Failed: list[str] = []

def FetchNews():
    for level in Levels:
        FetchedNews.append({
            "level": level,
            "news": {"en": [], "fr": [], "es": []}
        })

        print(f"Fetching Level {level['level']}: {level['level_name']}") 

        levelNum = int(level["level"]) 
        print(level["keywords"])

        for key in level["keywords"].keys():
            for word in level["keywords"][key]:
                try:
                    print(key)
                    print(f"Fetching keyword \"{word}\"")
                    resp = requests.get(APIUrl.format(word, key), headers={"X-Api-Key": APIKey}).json()

                    FetchedNews[levelNum]["news"][key] = list[dict](resp["articles"])
                    
                    print(f"Fetched {len(FetchedNews[levelNum]['news'][key])} articles")
                except:
                    print(f"Failed to fetch \"{word}\"")

            with open("dump.json", 'w') as fp:
                json.dump(FetchedNews, fp, indent=2)
                print("Wrote fetched files to dump.json")

FetchNews()

print(f"Failed: {Failed}")
