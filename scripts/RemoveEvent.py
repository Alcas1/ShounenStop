import os

<<<<<<< HEAD
<<<<<<< HEAD
eventId = 'c-1xqKj5UJA-c'
=======
eventId = 'c-vq3UkDleN-c'
>>>>>>> parent of b4f4d891... remove Air Comic Treasure (Current)
=======
eventId = 'c-c3dcWkXD2-c'
>>>>>>> parent of fff9bafa... remove Air Comiket Summer

comiketDir = "content/comiket"
nonEventReferencedImages = []
itemFiles = []
itemsToDelete = {}

for filename in os.listdir(comiketDir):
  if(filename.endswith(".md")):
    imageToDelete = ""
    filePath = comiketDir + "/" + filename
    file = open(filePath, encoding='utf-8')
    fileBuffer = file.read()
    lines = fileBuffer.split("\n")
    for line in lines:
      kvp = line.split(" ")
      if kvp[0] == 'image:':
        imagePath = comiketDir + "/" + kvp[1]
        if eventId in fileBuffer:
          itemsToDelete[filePath] = imagePath
        else:
          nonEventReferencedImages.append(imagePath)

for key in itemsToDelete:
  os.remove(key)

  if os.path.exists(itemsToDelete[key]):
    if itemsToDelete[key] in nonEventReferencedImages:
      print("Cant delete referenced image:", itemsToDelete[key])
    else:
      os.remove(itemsToDelete[key])
      print("Removed:", itemsToDelete[key])
  else:
    print("Could not find:", itemsToDelete[key])

