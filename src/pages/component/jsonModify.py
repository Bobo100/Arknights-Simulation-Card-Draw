import json
# python 原生套件
import codecs
import opencc

file_path = './../../json/filteredData.json'

with codecs.open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)    
    
# 簡體字轉繁體字
cc = opencc.OpenCC('s2t.json')  # convert from Traditional Chinese to Simplified Chinese
for item in data:
    for key in item.keys():
        if(type(item[key]) == list):
            for i in range(len(item[key])):
                item[key][i] = cc.convert(item[key][i])
        else:
            item[key] = cc.convert(item[key])

# 創建一個新的字典，其中包含更改過的 key 名稱
# output = {}
# for item in data:
#     new_item = {}
#     for key, value in item.items():
#         # 對 key 名稱進行更改
#         if key == "rarity":
#             new_key = "稀有度"
#         elif key == "en":
#             new_key = "english"
#         else:
#             new_key = key
#         new_item[new_key] = value
#     output.append(new_item)



# 更改 value
for item in data:
    item["rarity"] = str(int(item["rarity"]) + 1)
    item["image_path"] = "./../image/" + item["cn"] + "/" +  item["cn"] + ".jpg"
    item['weight'] = 1
    
print(data)

rarity_6 = []
rarity_5 = []
rarity_4 = []
rarity_3 = []
rarity_2 = []
rarity_1 = []

for item in data:
    if item['rarity'] == '6':
        rarity_6.append(item)
    elif item['rarity'] == '5':
        rarity_5.append(item)
    elif item['rarity'] == '4':
        rarity_4.append(item)
    elif item['rarity'] == '3':
        rarity_3.append(item)
    elif item['rarity'] == '2':
        rarity_2.append(item)
    elif item['rarity'] == '1':
        rarity_1.append(item)
        
with open('rarity_6.json', 'w', encoding='utf-8') as f:
    json.dump(rarity_6, f, ensure_ascii=False)

with open('rarity_5.json', 'w', encoding='utf-8') as f:
    json.dump(rarity_5, f, ensure_ascii=False)

with open('rarity_4.json', 'w', encoding='utf-8') as f:
    json.dump(rarity_4, f, ensure_ascii=False)

with open('rarity_3.json', 'w', encoding='utf-8') as f:
    json.dump(rarity_3, f, ensure_ascii=False)

with open('rarity_2.json', 'w', encoding='utf-8') as f:
    json.dump(rarity_2, f, ensure_ascii=False)

with open('rarity_1.json', 'w', encoding='utf-8') as f:
    json.dump(rarity_1, f, ensure_ascii=False)