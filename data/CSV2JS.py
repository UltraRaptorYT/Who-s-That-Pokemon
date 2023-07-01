import pandas as pd
import numpy as np

df = pd.read_csv("./pokemon.csv")

pokeArr = []

for dex in np.unique(df["No"]):
    output = "{:04d}".format(dex)
    pokeArr.append({
        "id": dex,
        "name": df[df["Branch_Code"] == str(dex) + "_0"]["Original_Name"].values[0],
        "gen": df[df["Branch_Code"] == str(dex) + "_0"]["Generation"].values[0]
    })

print(pokeArr)
with open("../js/pokemon.js", "w") as f:
    f.write("const POKEDEX = ")
    f.write(str(pokeArr))
