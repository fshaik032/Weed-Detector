import numpy as np
import pandas as pd
import torch
from torch.utils.data import Dataset,DataLoader,random_split
from PIL import Image
import torchvision
import cv2
import matplotlib.pyplot as plt

model=torchvision.models.detection.fasterrcnn_resnet50_fpn(num_classes=3)
model.load_state_dict(torch.load("model.pt", map_location=torch.device('cpu')))
model.eval()
names = {'0': 'crop', '1': 'weed'}
pic = plt.imread(r"./ok.jpeg")
img = cv2.cvtColor(pic, cv2.COLOR_BGR2RGB)

vector = torch.from_numpy(img/255.).permute(2,0,1).float()

output = model(torch.unsqueeze(vector,dim=0))
first = output[0] 
square = first['boxes'].cpu().detach().numpy().astype(int)
classes = first['labels'].cpu().detach().numpy()
scores = first['scores'].cpu().detach().numpy()
for idx in range(square.shape[0]):
    if scores[idx] >= 0.8:
        x1, y1, x2, y2 = square[idx][0], square[idx][1], square[idx][2], square[idx][3]
        name = names.get(str(classes[idx].item()))
        cv2.rectangle(pic,(x1,y1),(x2,y2),(255,0,0),thickness=2)
        cv2.putText(pic, text=name, org=(x1, y1+10), fontFace=cv2.FONT_HERSHEY_SIMPLEX,
            fontScale=0.5, thickness=1, lineType=cv2.LINE_AA, color=(0, 0, 255))

im = Image.fromarray(pic)
print("we have finished")
im.save("tada.jpeg")