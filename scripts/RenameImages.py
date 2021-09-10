import os
import sys

imageListDir = "scripts/content/p2comictreasure.txt"
imageListSet = set()

comiketDir = "content/comiket"
with open(imageListDir, "r+") as file:

  for line in file:
    line = line.rstrip()
    imagePath = line.split(".")
    imageListSet.add(imagePath[0].lower())


for filename in os.listdir(comiketDir):
  replaceImage = False
  fileContents = ""
  imageBaseName = ""
  if(filename.endswith(".md")):
    filePath = comiketDir + "/" + filename
    with open(filePath, "r") as file:
      for line in file:
        fileContents = fileContents + line
        line = line.rstrip()
        imagePath = line.split(" ")
        if imagePath[0] == 'image:':
          imageToRename = imagePath[1].split("/")[1]
          imageBaseName = imageToRename.split(".")[0]
          if imageBaseName in imageListSet:
            replaceImage = True

            fileContents = fileContents.replace(imageToRename, imageBaseName+".jpg")
  if replaceImage:
    print(fileContents)
    with open(filePath, "w") as file:
      file.write(fileContents)

