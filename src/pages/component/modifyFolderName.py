import os
import opencc

base_path = os.path.dirname(os.path.abspath(__file__))

image_path = os.path.join(base_path, '.\..\..\image - 複製')

print(image_path)
cc = opencc.OpenCC('s2t.json')  # convert from Traditional Chinese to Simplified Chinese

for root, dirs, files in list(os.walk(image_path))[1:]:
    dirname = root.split(os.path.sep)[-1]
    for filename in files:
        newfilename = cc.convert(filename)        
        os.rename(os.path.join(image_path, dirname, filename), os.path.join(image_path, dirname, newfilename))
    
    newdirname = cc.convert(dirname)    
    os.rename(os.path.join(image_path, dirname), os.path.join(image_path, newdirname))
      
        
        
    # print(os.path.abspath(root))
    
    
    
# old_folder_name = 'old_folder_name'
# new_folder_name = 'new_folder_name'

# os.rename(old_folder_name, new_folder_name)
