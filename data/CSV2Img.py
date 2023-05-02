import pandas as pd
import numpy as np
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

pokeDex = [772,785,786,787,788]

# for dex in pokeDex:
for dex in np.unique(df["No"]):
    name = df[df["Branch_Code"] == str(
        dex) + "_0"]["Original_Name"].values[0]
    print(name)
    searchName = name.lower().replace(' ', '-').replace(".","").replace("\'", "").replace(":", "")
    page = requests.get(
        f"https://img.pokemondb.net/sprites/home/normal/{searchName}.png", verify=False)
    if page.status_code == 404:
      print(name)
      continue
    with open(f"../src/{dex}.png", 'wb') as f:
      f.write(page.content)

