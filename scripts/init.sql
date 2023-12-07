---------------------
-- Main Entity Tables
---------------------

CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(64),
    last_name VARCHAR(128),
    is_manager BOOLEAN
);

CREATE TABLE IF NOT EXISTS inventory_item (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255),
    stock INT,
    reorder_threshold INT 
);

CREATE TABLE IF NOT EXISTS menu_item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    price_cents INT,
    img_uri VARCHAR(9001),
    description VARCHAR(9001)
);

------------------
-- Relation Tables
------------------

CREATE TABLE IF NOT EXISTS menu_item_ingredients(
    id SERIAL PRIMARY KEY,
    item_id INT REFERENCES inventory_item(id),
    menu_item_id INT REFERENCES menu_item(id),
    qty_used INT,
    valid_extra BOOLEAN
);

CREATE TABLE IF NOT EXISTS menu_item_tag( 
    id SERIAL PRIMARY KEY,
    FOREIGN KEY menu_item_id REFERENCES menu_item(id) ON DELETE CASCADE,
    tag_name VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    create_time TIMESTAMP,
    subtotal_cents INT,
    tip_cents INT,
    employee_id INT REFERENCES employee(id), 
    is_finished BOOLEAN
);

CREATE TABLE IF NOT EXISTS order_item (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    FOREIGN KEY menu_item_id REFERENCES menu_item(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_item_ingredient (
    id SERIAL PRIMARY KEY,
    order_item_id INT REFERENCES menu_item(id),
    FOREIGN KEY inventory_item_id REFERENCES inventory_item(id) ON DELETE CASCADE,
    quantity INT,
    is_extra BOOLEAN
);

