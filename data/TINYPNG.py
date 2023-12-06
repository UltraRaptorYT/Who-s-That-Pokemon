import tinify

tinify.key = "" # Add tinify API KEY

for i in range(2,500):
    source = tinify.from_file(f"../src/{i}.png")
    source.to_file(f"../src/pokemon/{i}.png")

print("Done")
