import pandas as pd
import numpy as np
import re
from bs4 import BeautifulSoup
import requests
import warnings

warnings.filterwarnings("ignore")

df = pd.read_csv("./pokemon.csv")

# Gen 1 red-blue
# Gen 2 silver
# Gen 3 ruby-sapphire
# Gen 4 diamond-pearl
# Gen 5 black-white
# Gen 6 x-y
# Gen 7 sun-moon
# Gen 8 sword-shield
# Gen 9 scarlet-violet
# Home home

pokeDex = [1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025]

invalidDex = [29, 32, 83, 122, 439, 669, 772, 865]

for dex in pokeDex:
    # for dex in np.unique(df["No"]):
    if dex in invalidDex:
        continue
    name = df[df["Branch_Code"] == str(dex) + "_0"]["Original_Name"].values[0]
    print(f"{name} - {dex}")
    # searchName = name.lower().replace(' ', '-').replace(".","").replace("\'", "").replace(":", "")
    searchName = name.replace(' ', '_')
    # page = requests.get(
    #     f"https://img.pokemondb.net/sprites/home/normal/{searchName}.png", verify=False)
    page = requests.get(f"https://bulbapedia.bulbagarden.net/wiki/{searchName}_(Pokémon)", verify=False)
    if page.status_code == 404:
        print(name)
        continue
    soup = BeautifulSoup(page.text, "html.parser")
    aTag = soup.find("a", {"href": re.compile(rf"/wiki/File:{dex:04d}{searchName}")})
    imgTag = aTag.find("img")
    imgURL = imgTag["srcset"].split("//")[2].replace(" 2x", "")
    imgPage = requests.get(f"https://{imgURL}", verify=False)
    with open(f"../src/{dex}.png", 'wb') as f:
        f.write(imgPage.content)
