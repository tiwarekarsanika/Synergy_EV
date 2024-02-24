import requests 
from bs4 import BeautifulSoup

r = requests.get(url)
htmlContent = r.content
# print(htmlContent)

soup = BeautifulSoup(htmlContent, 'html.parser')
# print(soup.prettify)

title = soup.title
#bs
# print(type(soup))
#tag
# print(type(title))
#navigable string
# print(type(title.string))
paras = soup.find_all('p')
# print(paras)
anchors = soup.find_all('a')
# print(anchors)

#comment
markup = "<p><!-- this is a comment --></p>"
soup2 = BeautifulSoup(markup)
# print(type(soup2.p.string))
# exit()

#first para
# print(soup.find('p'))
#get classes of any element in the html page
# print(soup.find('p')['class'])

#find all elements with class lead
# print(soup.find_all('p', class_="lead"))

#get texts from the elements/tags/soup
# print(soup.find('p').get_text())

#entire text
# print(soup.get_text())

#get all the links on the page
# print(link.get('href'))

#remove repeated links and able to visit the link
# all_links = set()
# for link in anchors:
#     if(link.get('href') != '#'):
#         linkText = "https://www.worldometers.info/coronavirus/" + link.get('href')
#         all_links.add(linkText)   
#         print(linkText)

# navbarSupportedContent = soup.find(id='navbar-main')
# for elem in navbarSupportedContent.children:
#     print(elem)
    
# .children - A tag’s children are available as a generator, this will be slower for big pages in comparison to .contents
# .contents - A tag’s children are available as a list 

# for item in navbarSupportedContent.stripped_strings:
#     print(item)
    
# print(navbarSupportedContent.parent)

# for item in navbarSupportedContent.parents:
#     print(item.name)

# print(navbarSupportedContent.next_sibling.next_sibling)
# print(navbarSupportedContent.previous_sibling.previous_sibling)

elem = soup.select('#navbar-main')
print(elem)