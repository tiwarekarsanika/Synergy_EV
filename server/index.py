import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

url = 'https://www.google.com/search?sa=X&sca_esv=83157c45af858ae4&rlz=1C1CHBF_enIN990IN990&sxsrf=ACQVn0_N-nu_9MSibiz4GMIMV9wPl5BXAw:1708774435578&q=ev+charging+station+near+me&ved=2ahUKEwjsiu_p8MOEAxUas1YBHdrrA1gQuzF6BAgZEAI&biw=1280&bih=632&dpr=1.5'

response = requests.get(url)

soup = BeautifulSoup(response.text, 'html.parser')
print(soup.prettify)

# population_entries = soup.select('tr')
# print(len(population_entries))

# client = MongoClient('mongodb://localhost:27017/')

# db = client['population_database']

# collection = db['indian_population']

# year = ""
# population = ""

# for entry in population_entries:
#     year_element = entry.find('td')
#     population_element = entry.find('strong')
    
#     if year_element is not None and population_element is not None:
#         year = year_element.get_text()
#         population = population_element.get_text()
#         print(year, population)
    
    
#     data_to_insert = {
#         'year': year,
#         'population': population
#     }
    
#     collection.insert_one(data_to_insert)
    
# for document in collection.find():
#     print(document)

client.close()

