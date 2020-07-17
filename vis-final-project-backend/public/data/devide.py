import json
import jieba
import jieba.analyse
f = open("DXYNews-TimeSeries.json", encoding='utf-8')
setting = json.load(f)
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        pass
    try:
        import unicodedata
        unicodedata.numeric(s)
        return True
    except (TypeError, ValueError):
        pass
    return False
for item in setting:
  seg_list = jieba.analyse.extract_tags(item['title'], topK=20)
  wordlist = list(seg_list)
  word_list = []
  for j in wordlist:
    if j != '。' and j != '，' and j != '“' and j != '”' and j != '《' and j != '》' and j != '（' and j != 'coronavirus' and j != '）' and j != '、'and '新冠' not in j and '疫情'not in j and '病例'not in j and '确诊'not in j and '肺炎'not in j and '新增'not in j and '累计'not in j and is_number(j) != True and '%' not in j:
      word_list.append(j)
  item['wordList'] = word_list
with open("News_Time.json","w") as f1:
    json.dump(setting,f1)
    print("加载入文件完成...")
