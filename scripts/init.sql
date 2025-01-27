-- init.sql
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS item_details CASCADE;
DROP TABLE IF EXISTS buying CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS item_model CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS newsletter CASCADE;

DROP TYPE IF EXISTS detail_type CASCADE;
DROP TYPE IF EXISTS item_type CASCADE;
DROP TYPE IF EXISTS buying_status CASCADE;
CREATE TYPE detail_type AS ENUM ('details',  'compo', 'care', 'traceability', 'engagements');
CREATE TYPE item_type AS ENUM ('dress', 'miniature', 'paint');
CREATE TYPE buying_status AS ENUM ( 'pending', 'paid', 'delivered', 'shipped', 'cancelled');


CREATE TABLE newsletter(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer la table des items
CREATE TABLE items (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
type item_type NOT NULL, -- dress, miniatures, paint
stock INT NOT NULL,
description TEXT,
abstract_description TEXT,
main_image VARCHAR(255) NOT NULL,
discount INT,
price DECIMAL(10, 2) NOT NULL
);



CREATE TABLE customers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(200) NOT NULL,
    address VARCHAR(200) NOT NULL,
    zipCode VARCHAR(200) NOT NULL,
    city VARCHAR(200) NOT NULL
);



-- Créer la table des achats
CREATE TABLE buying (
id SERIAL PRIMARY KEY,
item_id INT NOT NULL,
stripe_id VARCHAR(255),
customer_id INT,
size VARCHAR(3) NOT NULL,
message TEXT,
status buying_status NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
tracking VARCHAR(255),
buying_at TIMESTAMP,
FOREIGN KEY (item_id) REFERENCES items(id),
FOREIGN KEY (customer_id) REFERENCES customers(id)
);
-- Créer la table des détails des items
CREATE TABLE item_details (
id SERIAL PRIMARY KEY,
item_id INT NOT NULL,
content TEXT[] NOT NULL,
title VARCHAR(200), 
type detail_type NOT NULL, -- details, coupe , compo & care, engagements
FOREIGN KEY (item_id) REFERENCES items(id)
);



CREATE TABLE item_model(
    id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    regular BOOLEAN NOT NULL,  -- true si taille normalement, false si taille petite
    size INT NOT NULL,
    tall INT NOT NULL,
    dimension INT NOT NULL,
    centimeters_by_size INT NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items(id)
);




CREATE TABLE gallery(
id SERIAL PRIMARY KEY,
item_id INT NOT NULL,
image VARCHAR(255) NOT NULL,
FOREIGN KEY (item_id) REFERENCES items(id)
);



-- Insérer des données initiales (optionnel)
INSERT INTO items (name,stock, type, description, abstract_description, main_image, discount, price) VALUES
(
'Kimono',
6,
'dress',
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eum reiciendis accusamus veniam dolore rerum voluptatem beatae illo laudantium officiis? Illo exercitationem eligendi tenetur similique hic maiores pariatur nulla sed.',
'Robe longue en coton crinkle lacée dans le dos',
'/model/1.jpg',
6,
125
),
(
'Kimono 1',
6,
'dress',
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eum reiciendis accusamus veniam dolore rerum voluptatem beatae illo laudantium officiis? Illo exercitationem eligendi tenetur similique hic maiores pariatur nulla sed.',
'Robe longue en coton crinkle lacée dans le dos',
'/model/1.jpg',
6,
125
),
(
'Kimono 2',
6,
'dress',
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eum reiciendis accusamus veniam dolore rerum voluptatem beatae illo laudantium officiis? Illo exercitationem eligendi tenetur similique hic maiores pariatur nulla sed.',
'Robe longue en coton crinkle lacée dans le dos',
'/model/1.jpg',
6,
125
),
(
'Kimono',
6,
'miniature',
'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eum reiciendis accusamus veniam dolore rerum voluptatem beatae illo laudantium officiis? Illo exercitationem eligendi tenetur similique hic maiores pariatur nulla sed.',
'Robe longue en coton crinkle lacée dans le dos',
'/model/1.jpg',
6,
125
);


INSERT INTO item_model(item_id, name, regular, dimension, tall, size, centimeters_by_size) VALUES
(1, 'Henriette', true, 113, 170, 36, 1),
(2, 'Henriette', true, 113, 170, 36, 1),
(3, 'Henriette', true, 113, 170, 36, 1),
(4, 'Henriette', true, 113, 170, 36, 1);


INSERT INTO item_details(item_id, content, title, type) VALUES
(
    1,
    ARRAY['Coloris vert', 'Coupe cintrée', 'Laçage dans le dos', 'Manches longues', 'Fabriquée en France'],
    'Robe longue',
    'details'
),
(
    1,
    ARRAY['67% coton', '32% polyamide', '1% élasthanne'],
    null,
    'compo'
),
(
    1,
    ARRAY['Lavage à 30°C max avec coloris similaire', 'Eau de javel interdite', 'Séchage en tambour interdit', 'Nettoyage à sec autorisé',  'Repassage à fer doux'],
    null,
    'care'
),
(
    1,
    ARRAY['Fabrication en France (Ile de France)', 'Transport routier', '67% de coton contenu dans la matière principale de cette pièce est biologique'],
    null,
    'engagements'
),
(
    1,
    ARRAY['Filature: polyamide en Chine, élastanne en Turquie, coton en Turquie', 'Tricotage: Turquie', 'Teinture: Turquie', 'Finition: Turquie', 'Assemblage: France (Ile de France)'],
    null,
    'traceability'
),
(
2,
    ARRAY['Coloris vert', 'Coupe cintrée', 'Laçage dans le dos', 'Manches longues', 'Fabriquée en France'],
    'Robe longue',
    'details'
),
(
    2,
    ARRAY['67% coton', '32% polyamide', '1% élasthanne'],
    null,
    'compo'
),
(
    2,
    ARRAY['Lavage à 30°C max avec coloris similaire', 'Eau de javel interdite', 'Séchage en tambour interdit', 'Nettoyage à sec autorisé',  'Repassage à fer doux'],
    null,
    'care'
),
(
    2,
    ARRAY['Fabrication en France (Ile de France)', 'Transport routier', '67% de coton contenu dans la matière principale de cette pièce est biologique'],
    null,
    'engagements'
),
(
    2,
    ARRAY['Filature: polyamide en Chine, élastanne en Turquie, coton en Turquie', 'Tricotage: Turquie', 'Teinture: Turquie', 'Finition: Turquie', 'Assemblage: France (Ile de France)'],
    null,
    'traceability'
),
(
3,
    ARRAY['Coloris vert', 'Coupe cintrée', 'Laçage dans le dos', 'Manches longues', 'Fabriquée en France'],
    'Robe longue',
    'details'
),
(
    3,
    ARRAY['67% coton', '32% polyamide', '1% élasthanne'],
    null,
    'compo'
),
(
    3,
    ARRAY['Lavage à 30°C max avec coloris similaire', 'Eau de javel interdite', 'Séchage en tambour interdit', 'Nettoyage à sec autorisé',  'Repassage à fer doux'],
    null,
    'care'
),
(
   3,
    ARRAY['Fabrication en France (Ile de France)', 'Transport routier', '67% de coton contenu dans la matière principale de cette pièce est biologique'],
    null,
    'engagements'
),
(
 3,
    ARRAY['Filature: polyamide en Chine, élastanne en Turquie, coton en Turquie', 'Tricotage: Turquie', 'Teinture: Turquie', 'Finition: Turquie', 'Assemblage: France (Ile de France)'],
    null,
    'traceability'
),
(
4,
    ARRAY['Coloris vert', 'Coupe cintrée', 'Laçage dans le dos', 'Manches longues', 'Fabriquée en France'],
    'Robe longue',
    'details'
),
(
    4,
    ARRAY['67% coton', '32% polyamide', '1% élasthanne'],
    null,
    'compo'
),
(
    4,
    ARRAY['Lavage à 30°C max avec coloris similaire', 'Eau de javel interdite', 'Séchage en tambour interdit', 'Nettoyage à sec autorisé',  'Repassage à fer doux'],
    null,
    'care'
),
(
   4,
    ARRAY['Fabrication en France (Ile de France)', 'Transport routier', '67% de coton contenu dans la matière principale de cette pièce est biologique'],
    null,
    'engagements'
),
(
 4,
    ARRAY['Filature: polyamide en Chine, élastanne en Turquie, coton en Turquie', 'Tricotage: Turquie', 'Teinture: Turquie', 'Finition: Turquie', 'Assemblage: France (Ile de France)'],
    null,
    'traceability'
);