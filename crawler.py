
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time
import json

driver = webdriver.Chrome('/Users/ihor.herasymchuk/chromedriver')
driver.get('https://unicode.org/emoji/charts/full-emoji-list.html')
trs = driver.find_element_by_tag_name('table').find_elements_by_tag_name('tr')
data = {}
code = ''
img = ''

def isExist(elem):
  try:
    elem.find_element_by_class_name('andr')
    elem.find_element_by_class_name('andr').find_element_by_tag_name('img')
  except NoSuchElementException:
    return False
  return True

for x in trs[3:]:
  if isExist(x):
    img = x.find_element_by_class_name('andr').find_element_by_tag_name('img').get_attribute('src')

  for t in x.find_elements_by_css_selector('.code a'):
    code = t.text.split()
    if len(code) > 1:
      for c in code:
        data[c] = img
    else:
      data[code[0]] = img  
driver.quit()

with open('data.json', 'w') as f:
     json.dump(data, f)