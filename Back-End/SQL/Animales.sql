DROP DATABASE IF EXISTS DB_ANIMALES;
CREATE DATABASE IF NOT EXISTS DB_ANIMALES;
USE DB_ANIMALES;

CREATE TABLE IF NOT EXISTS USERS (
    ID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(50),
    SURNAME VARCHAR(255),
    PASSWORD VARCHAR(50),
    EMAIL VARCHAR(255),
    TELEPHONE INT,
    PLACE VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS ANIMAL (
    ID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL DEFAULT 1,
    NAME VARCHAR(50),
    ANIMAL VARCHAR(50),
    AGE VARCHAR(20),
    SEX VARCHAR(20),
    IMAGE_URL LONGBLOB,
    RACE VARCHAR(50),
    PROTECTORA VARCHAR(255),
    PLACE VARCHAR(255),
    URGENCY INT,
    DESCRIPTION VARCHAR(255),
    PREFERENCES VARCHAR(255),
    NEEDS VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES USERS(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS animal_users (
    animal_id BIGINT UNSIGNED NOT NULL,
    users_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (animal_id, users_id),
    FOREIGN KEY (animal_id) REFERENCES ANIMAL(ID),
    FOREIGN KEY (users_id) REFERENCES USERS(ID)
);

CREATE TABLE IF NOT EXISTS PETICIONES (
    ID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(255),
    SURNAME VARCHAR(255),
    EMAIL VARCHAR(255),
    TELEPHONE INT,
    PLACE VARCHAR(255),
    MESSAGE VARCHAR(255),
    reciver_id BIGINT UNSIGNED NOT NULL,
    emitter_id BIGINT UNSIGNED NOT NULL,
    animal_id BIGINT UNSIGNED NOT NULL,
    status VARCHAR(50),
    FOREIGN KEY (reciver_id) REFERENCES USERS(ID) ON DELETE CASCADE,
    FOREIGN KEY (emitter_id) REFERENCES USERS(ID) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES ANIMAL(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS DONACIONES (
    ID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    AMOUNT INT,
    FULLNAME VARCHAR(255),
	EMAIL VARCHAR(255),
    MESSAGE VARCHAR(255),
    reciver_id BIGINT UNSIGNED NOT NULL,
    emitter_id BIGINT UNSIGNED NOT NULL,
    animal_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (reciver_id) REFERENCES USERS(ID) ON DELETE CASCADE,
    FOREIGN KEY (emitter_id) REFERENCES USERS(ID) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES ANIMAL(ID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS CROWFUNDING (
    ID BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(255),
    IMAGES LONGBLOB,
    TYPE VARCHAR(50),
    CAMPAIGNTITLE VARCHAR(255),
    DESCRIPTION VARCHAR(255),
    RAISED INT,
	TARGET INT,
    REMAININGTIME DATE
);


INSERT INTO USERS (NAME, SURNAME, PASSWORD, EMAIL, TELEPHONE, PLACE) VALUES
('Carlos', 'García López', 'password123', 'wigap15868@kelenson.com', '612345678', 'Barcelona'),
('Marta', 'Pérez Martínez', 'password456', 'marta.perez@gmail.com', '623456789', 'Madrid'),
('Laura', 'Sánchez Fernández', 'password789', 'laura.sanchez@gmail.com', '634567890', 'Valencia'),
('Javier', 'Rodríguez Gómez', 'password101', 'javier.rodriguez@gmail.com', '645678901', 'Sevilla');


INSERT INTO ANIMAL (user_id, NAME, ANIMAL, AGE, SEX, IMAGE_URL, RACE, PROTECTORA, PLACE, URGENCY, DESCRIPTION, PREFERENCES, NEEDS) 
VALUES 
(1, 'Jorge', 'Gos', 'Jove', 'Intersex', 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg', 'Pastor Alemán', 'Usuari', 'Girona', 5, 'Es un gos molt sociable i amable ', 'Disfruta molt de jugar amb una pilota', 'Cap'),
(1, 'Luna', 'Gat', 'Vell', 'Femella', 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Siames', 'PROTECTORA 1', 'Barcelona', 4, 'Es una gata muy cariñosa', 'comida enlatada', 'necesita compañía'),
(3, 'Rocky', 'Gos', 'Jove', 'Mascle', 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Bulldog', 'PROTECTORA 2', 'Valencia', 3, 'Perro activo y juguetón', 'caminar', 'juguetes'),
(1, 'Mia', 'Conill', 'Vell', 'Femella', 'https://images.pexels.com/photos/1228439/pexels-photo-1228439.jpeg', 'Rex', 'Usuari', 'Sevilla', 2, 'Conejita tranquila', 'hierba fresca', 'espacio para saltar'),
(1, 'Max', 'Gos', 'Adult', 'Mascle', 'https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Pastor Alemán', 'Usuari', 'Madrid', 4, 'Gos territoria i protector', 'Joguines', 'Corre pel bosc'),
(3, 'Bella', 'Gat', 'Vell', 'Femella', 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Persa', 'PROTECTORA 1', 'Girona', 1, 'Gata tranquila i carinyosa', 'Sortir a passegar', 'Cap'),
(3, 'Simba', 'Gat', 'Jove', 'Mascle', 'https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Abisinio', 'Usuari', 'Barcelona', 5, 'Gato muy energético', 'juguetes interactivos', 'mucho espacio'),
(2, 'Bobby', 'Gos', 'Adult', 'Mascle', 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Beagle', 'Usuari', 'Valencia', 3, 'Perro muy leal', 'huesos', 'actividades al aire libre'),
(2, 'Yue', 'Conill', 'Adult', 'Mascle', 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/colt-the-black-otter-dwarf-rabbit-bright-eyes-studio.jpg', 'Rex', 'PROTECTORA 3', 'Cadiz', 2, 'Conejito hamburguesa', 'hierba fresca', 'espacio para saltar');

-- Para el usuario Carlos (ID 1)
INSERT INTO PETICIONES (NAME, SURNAME, EMAIL, TELEPHONE, PLACE, MESSAGE, reciver_id, emitter_id, animal_id, status)
VALUES
('Carlos', 'García López', 'carlos.garcia@gmail.com', '612345678', 'Barcelona', 'Vull adoptar un gos de tamany mitjà.', 1, 1, 1, 'Pendent'),
('Carlos', 'García López', 'carlos.garcia@gmail.com', '612345678', 'Barcelona', 'Estic interessat en adoptar un gat.', 2, 1, 2, 'Pendent'),
('Carlos', 'García López', 'carlos.garcia@gmail.com', '612345678', 'Barcelona', 'Busco una mascota per la meva familia.', 3, 1, 3, 'Pendent');

-- Para el usuario Marta (ID 2)
INSERT INTO PETICIONES (NAME, SURNAME, EMAIL, TELEPHONE, PLACE, MESSAGE, reciver_id, emitter_id, animal_id, status)
VALUES
('Marta', 'Pérez Martínez', 'marta.perez@gmail.com', '623456789', 'Madrid', 'Voldria adoptar un gos adult.', 1, 2, 1, 'Pendent'),
('Marta', 'Pérez Martínez', 'marta.perez@gmail.com', '623456789', 'Madrid', 'Estic buscant un gos petit i juganer.', 2, 2, 2, 'Pendent'),
('Marta', 'Pérez Martínez', 'marta.perez@gmail.com', '623456789', 'Madrid', 'Hi ha algun animal amb necessitats especials?', 4, 2, 4, 'Pendent');

-- Para el usuario Laura (ID 3)
INSERT INTO PETICIONES (NAME, SURNAME, EMAIL, TELEPHONE, PLACE, MESSAGE, reciver_id, emitter_id, animal_id, status)
VALUES
('Laura', 'Sánchez Fernández', 'laura.sanchez@gmail.com', '634567890', 'Valencia', 'Voldria adoptar un gos de companyia.', 3, 3, 5, 'Pendent'),
('Laura', 'Sánchez Fernández', 'laura.sanchez@gmail.com', '634567890', 'Valencia', 'Estic interessat en adoptar un animal tranquil.', 2, 3, 6, 'Pendent'),
('Laura', 'Sánchez Fernández', 'laura.sanchez@gmail.com', '634567890', 'Valencia', 'Vull adoptar un conill.', 1, 3, 7, 'Pendent');

-- Para el usuario Javier (ID 4)
INSERT INTO PETICIONES (NAME, SURNAME, EMAIL, TELEPHONE, PLACE, MESSAGE, reciver_id, emitter_id, animal_id, status)
VALUES
('Javier', 'Rodríguez Gómez', 'javier.rodriguez@gmail.com', '645678901', 'Sevilla', 'Voldria adoptar un gatet petit.', 2, 4, 8, 'Pendent'),
('Javier', 'Rodríguez Gómez', 'javier.rodriguez@gmail.com', '645678901', 'Sevilla', 'Estic buscant un gos de raça petita.', 1, 4, 9, 'Pendent'),
('Javier', 'Rodríguez Gómez', 'javier.rodriguez@gmail.com', '645678901', 'Sevilla', 'Busco un animal molt sociable amb la canalla petita.', 2, 4, 4, 'Pendent');

-- Para el usuario Carlos (ID 1)
INSERT INTO DONACIONES (AMOUNT, FULLNAME, EMAIL, MESSAGE, reciver_id, emitter_id, animal_id)
VALUES
(20, 'Carlos García López', 'carlos.garcia@gmail.com', 'Donació per ajudar a cuidar al Jorge.', 1, 1, 1);

-- Para el usuario Marta (ID 2)
INSERT INTO DONACIONES (AMOUNT, FULLNAME, EMAIL, MESSAGE, reciver_id, emitter_id, animal_id)
VALUES
(15, 'Marta Pérez Martínez', 'marta.perez@gmail.com', 'Contribución para ayudar a un gato en adopción.', 2, 2, 2),
(25, 'Marta Pérez Martínez', 'marta.perez@gmail.com', 'Apoyo para los animales en adopción.', 3, 2, 3);

-- Para el usuario Laura (ID 3)
INSERT INTO DONACIONES (AMOUNT, FULLNAME, EMAIL, MESSAGE, reciver_id, emitter_id, animal_id)
VALUES
(50, 'Laura Sánchez Fernández', 'laura.sanchez@gmail.com', 'Aportación para ayudar a la adopción de mascotas.', 4, 3, 4);

-- Para el usuario Javier (ID 4)
INSERT INTO DONACIONES (AMOUNT, FULLNAME, EMAIL, MESSAGE, reciver_id, emitter_id, animal_id)
VALUES
(30, 'Javier Rodríguez Gómez', 'javier.rodriguez@gmail.com', 'Donación para apoyar la adopción de animales.', 2, 4, 5),
(10, 'Javier Rodríguez Gómez', 'javier.rodriguez@gmail.com', 'Aportación para la causa de la adopción.', 1, 4, 6);



INSERT INTO CROWFUNDING (NAME, IMAGES, TYPE, CAMPAIGNTITLE, DESCRIPTION, RAISED, TARGET, REMAININGTIME)
VALUES 
('Juan Pérez', 
 'https://images.pexels.com/photos/4580783/pexels-photo-4580783.jpeg', 
 'Usuario', 
 'Campanya per ajudar a un refugi', 
 'Ajuda a en Juan a millorar la qualitat dels cuidats dels animals del refugi.',
 1200, 
 5000, 
 CURDATE() + INTERVAL 15 DAY),
 
('Protectora de Animales Los Amigos', 
 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg', 
 'Protectora', 
 'Campanya per pagar la operació de un dels nostres més estimats gossos', 
 'Necessitem pagar la operació del nostre gos Pèsol que encara espera per trobar una bona familia.',
 3500, 
 8000, 
 CURDATE() + INTERVAL 8 DAY),
 
('María López', 
 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
 'Usuari', 
 'Campanya per cuidar gats', 
 'Amb la teva ajuda la Maria podrà cuidar dels gats abandonats del seu barri.',
 500, 
 2000, 
 CURDATE() + INTERVAL 30 DAY);


SELECT * FROM ANIMAL;
SELECT * FROM USERS;
SELECT * FROM DONACIONES;
SELECT * FROM PETICIONES;
SELECT * FROM animal_users;
SELECT * FROM CROWFUNDING;