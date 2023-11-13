import csv
from random import randint, choice, sample 
from random import randrange
from datetime import timedelta
from datetime import datetime

#Constants
menuList = [
    {"Apple Cinammon Creme Brulee": 1250},
    {"Berry Agave (Vegan)": 1250},
    {"Bonne Maman": 925},
    {"Dulce de Leche": 925},
    {"Cookie Butter": 1125},
    {"Lemon & Sugar": 825},
    {"Nutella Strawberries": 1050},
    {"Oreo Cookies n' Cream": 1150},
    {"S'mores": 1195},
    {"Chicken Alfredo": 1325},
    {"Chicken Carbonara": 1395},
    {"Le California": 1395},
    {"Chicken Enchilada": 1295},
    {"Chicken Florentine": 1295},
    {"Philly Cheesesteak": 1395},
    {"Ham & Gruyere": 1195},
    {"Nordic": 1395},
    {"The Vegan": 1150},
    {"Truffled Caprese": 1250},
    {"Turkey, Grapes & Brie": 1295}]

ruleSet = {
    "start": "2022/10/28 5:00",
    "end": "2023/10/28 17:00",
    "filename": "restaurant_orders.txt",
    "tip": [.10, .20, .30],
    "maxItems": 1,
    "menu": menuList,
    "employees": [1, 2, 3, None]
}

#gets a random date between timestamps
def random_date(start, end):
    #turn start and date into datetime values
    dt_start = datetime.strptime(start, '%Y/%m/%d %H:%M')
    dt_end = datetime.strptime(end, '%Y/%m/%d %H:%M')
    #yes this is a bad way of doing it but using arithmetic on datetime means I dont have to manually account for leap years and different numbers of days on different months
    delta = dt_end - dt_start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return dt_start + timedelta(seconds=random_second)

#gets a random price based off of the number of items and prices of menuList Items
def getPrice(maxItems, menuList):
    items = randint(1,maxItems)
    price = 0
    itemList = []
    for i in range(items):
        item = list(menuList)
        price+= choice(list(menuList))
    return price

def generateData(file_name, dictColValues, amount):
    with open(file_name,"w") as file:
        csvwriter = csv.writer(file)
        headers = ["id"] + dictColValues
        csvwriter.writerow(headers)
        for i in range(1,amount+1):
            row = [i]
            hold_price = 0
            for col in dictColValues:
                if(col=='date'):
                    row.append(random_date(ruleSet["start"],ruleSet["end"]))
                #elif(item=='total'):
                #    row.append(getPrice(ruleSet["maxItems"],ruleSet["menuList"]))
                elif(col=='employee'):
                    #row.append(randint(1,ruleset["employees"]))
                    row.append(choice(ruleSet["employees"]))
                elif(col=='menu_item'):
                    item = choice(list(menuList.keys()))
                    hold_price = menuList[item]
                    row.append(item)
                elif(col=="total"):
                    row.append(hold_price)
            #go through ruleset to add stuff to row
            csvwriter.writerow(row)


def main():
    #TODO add functionality for command line defining of variables
    
    #order
    order_rules = ['date','total','employee']
    generateData('orders.csv',order_rules,100) 

if __name__ == "__main__":
    main()
