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

#dict of menu_items, and the default qty used per menu item
menu_item_ingredients_defaults =  { 
    0: [(0, 1), (1, 1), (2, 1), (4, 1), (5, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    1: [(6, 1), (7, 1), (8, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    2: [(19, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    3: [(9, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    4: [(10, 1), (4, 1), (1, 2), (2, 1), (3, 1), (32, 1), (43, 2), (14, 2), (12, 2)],
    5: [(2, 1), (15, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    6: [(16, 1), (17, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    7: [(18, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    8: [(10, 1), (21, 1), (22, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    9: [(23, 1), (24, 1), (25, 1), (5, 1), (3, 1), (32, 1), (43, 2), (14, 2), (12, 2)],
    10: [(29, 1), (11, 1), (27, 1), (20, 1), (5, 1), (23, 1), (24, 1), (40, 1), (25, 1), (15, 1), (3, 2), (32, 1), (43, 2), (14, 2), (12, 1)],
    11: [(24, 1), (23, 1), (27, 1), (28, 1), (30, 1), (29, 1), (3, 1), (32, 1), (43, 1), (14, 1), (26, 1), (12, 1)],
    12: [(23, 1), (24, 1), (31, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    13: [(23, 1), (20, 1), (11, 1), (34, 1), (24, 1), (33, 1), (5, 1), (3, 1), (32, 2), (43, 1), (14, 2), (12, 2)],
    14: [(35, 1), (36, 1), (37, 1), (28, 1), (23, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    15: [(38, 1), (23, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    16: [(44, 1), (36, 1), (15, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    17: [(26, 1), (33, 1), (39, 1), (36, 1), (28, 1), (37, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    18: [(39, 1), (40, 1), (37, 1), (11, 1), (25, 1), (3, 1), (32, 1), (43, 1), (14, 1), (12, 1)],
    19: [(41, 1), (42, 1), (43, 1)]
}


ruleSet = {
    "start": "2022/10/28 5:00",
    "end": "2023/10/28 17:00",
    "filename": "restaurant_orders.txt",
    "tip": [.10, .20, .30],
    "maxItems": 3,
    "menu": menuDict,
    "employees": [1, 2, 3, None],
    "entries": 20000
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

def main():
    #in hindsight since everything is dependent on something else there's not much of a need to use a function that can generate random csv's that are unrelated based on a generic template
    with open('orders.csv',"w") as orders_outfile, open('order_item.csv',"w") as order_item_outfile, open('order_item_ingredient.csv',"w") as order_item_ingredient_outfile:
        orders_csvwriter = csv.writer(orders_outfile)
        orders_headers = ["id", "create_time", "subtotal_cents","tip_cents","employee_id"]
        orders_csvwriter.writerow(orders_headers)

        order_item_csvwriter = csv.writer(order_item_outfile)
        order_item_headers = ["id", "order_id", "menu_item_id"]
        order_item_csvwriter.writerow(order_item_headers)

        order_item_ingredient_csvwriter = csv.writer(order_item_ingredient_outfile)
        order_item_ingredient_headers = ["id", "order_item_id", "inventory_item_id","quantity","is_extra"]
        order_item_ingredient_csvwriter.writerow(order_item_ingredient_headers)
        
        #initialize ids
        order_item_ingredient_id = 1
        order_items_id = 1       
        order_item_ingredient_id = 1
        
        for i in range(1,ruleSet["entries"]):
            
            #get a list of random menu items
            random_menu_items = []
            for j in range(randint(1,ruleSet["maxItems"])):
                randomItem = choice(list(menuDict.keys()))
                random_menu_items.append(randomItem)
            
            
            #get price of the random menu items
            subtotal_cents = 0
            for item in random_menu_items:
                subtotal_cents += int(menuDict[item][1])

            #get tip
            tip = int(subtotal_cents * choice(ruleSet["tip"]))  
            
            #get employee
            employee = choice(ruleSet["employees"])
            
            #create order row
            orders_csvwriter.writerow([i,random_date(ruleSet["start"],ruleSet["end"]),subtotal_cents,tip,employee])
            
            #write the list of menu items
            for menu_item in random_menu_items:
                #create orders_item row
             
                order_item_csvwriter.writerow([order_items_id,i,menu_item])
                order_items_id+=1
                #write the ingredients for each menu item
                for ingredient in menu_item_ingredients_defaults[menu_item]:
                    #create orders_item_ingredient row
                    order_item_ingredient_csvwriter.writerow([order_item_ingredient_id, menu_item, ingredient[0], ingredient[1],False])
                    order_item_ingredient_id+=1
            

    

if __name__ == "__main__":
    main()
