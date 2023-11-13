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
    price_cents INT
);

------------------
-- Relation Tables
------------------

CREATE TABLE IF NOT EXISTS menu_item_ingredients(
    id SERIAL PRIMARY KEY,
    item_id INT REFERENCES inventory_item(id),
    qty_used INT
    valid_extra BOOLEAN
    -- Unsure what is normal ingredient means and /is valid extra?
);

CREATE TABLE IF NOT EXISTS menu_item_tag(
    id SERIAL PRIMARY KEY,
    menu_item_id INT REFERENCES menu_item(id),
    tag_name VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    create_time TIMESTAMP,
    subtotal_cents INT,
    tip_cents INT,
    employee_id INT REFERENCES employee(id)
);

CREATE TABLE IF NOT EXISTS order_item (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    menu_item_id INT REFERENCES menu_item(id)
);

CREATE TABLE IF NOT EXISTS order_item_ingredient (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES order_item(id),
    inventory_item_id INT REFERENCES inventory_item(id),
    quantity INT,
    valid_extra BOOLEAN
    -- Unsure what is normal ingredient means and /is valid extra?
);

