import csv
from random import randint, choice, sample 
from random import randrange
from datetime import timedelta
from datetime import datetime

#Constants
menuDict = {
    0: ("Apple Cinammon Creme Brulee","1250"),
    1: ("Berry Agave (Vegan)","1250"),
    2: ("Bonne Maman","925"),
    3: ("Dulce de Leche","925"),
    4: ("Cookie Butter","1125"),
    5: ("Lemon & Sugar","825"),
    6: ("Nutella Strawberries","1050"),
    7: ("Oreo Cookies n' Cream","1150"),
    8: ("S'mores","1195"),
    9: ("Chicken Alfredo","1325"),
    10: ("Chicken Carbonara","1395"),
    11: ("Le California","1395"),
    12: ("Chicken Enchilada","1295"),
    13: ("Chicken Florentine","1295"),
    14: ("Philly Cheesesteak","1395"),
    15: ("Ham & Gruyere","1195"),
    16: ("Nordic","1395"),
    17: ("The Vegan","1150"),
    18: ("Truffled Caprese","1250"),
    19: ("Turkey, Grapes & Brie","1295")
}

ruleSet = {
    "start": "2022/10/28 5:00",
    "end": "2023/10/28 17:00",
    "filename": "restaurant_orders.txt",
    "tip": [.10, .20, .30],
    "maxItems": 3,
    "menu": menuDict,
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

#gets a random price based off of the number of items and prices of menuDict Items
def getPrice(maxItems, menuDict):
    items = randint(1,maxItems)
    price = 0
    itemList = []
    for i in range(items):
        item = list(menuDict)
        price+= choice(list(menuDict))
    return price

def generateData(file_name, dictColValues, amount):
    with open(file_name,"w") as file:
        csvwriter = csv.writer(file)
        headers = ["id"] + dictColValues
        csvwriter.writerow(headers)
        for i in range(1,amount):
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
    #in hindsight since everything is dependent on something else there's not much of a need to use a function that can generate random csv's that are unrelated based on a generic template

    entries = 20000

    #order
    order_rules = ['date','total','employee']
    generateData('orders.csv',order_rules,entries) 

    #order_item
    with open('order_item.csv',"w") as file:
        csvwriter = csv.writer(file)
        headers = ["id", "order_id", "menu_item_id"]
        csvwriter.writerow(headers)
        order_item_id = 1
        for i in range(1,entries):
            for j in range(randint(1,ruleSet["maxItems"])):
                menu_item = choice(list(menuDict.keys()))
                csvwriter.writerow([order_item_id,i,menu_item])
                order_item_id+=1
    file.close()

    #order_item_ingredient
    with open("order_item.csv","r") as order_items_file:
        with open('order_item_ingredient.csv',"w") as file:
            csvwriter = csv.writer(file)
            headers = ["id", "order_item_id", "inventory_item_id","quantity"]
            csvwriter.writerow(headers)
            for row in order_items_file:
                


if __name__ == "__main__":
    main()
