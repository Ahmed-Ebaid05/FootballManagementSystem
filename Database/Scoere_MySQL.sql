 USE scorers;

CREATE TABLE teams (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR (50) NOT NULL,
stadium  VARCHAR (50) NOT NULL,
coach VARCHAR(50) NOT  NULL,
foundation_year INT NOT NULL,
slogan VARCHAR(100) NOT NULL,
points INT,
wins INT,
loses INT,
ties INT,
ranking INT,
in_league INT,
logo LONGBLOB
);

CREATE TABLE players (
id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(50) NOT NULL,
birthdate DATE,
natio VARCHAR(50),
team_id BIGINT,
pos VARCHAR(50),
num INT,

FOREIGN KEY (team_id) REFERENCES teams(id)
);

CREATE TABLE matches (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
home_id BIGINT NOT NULL,
away_id BIGINT NOT NULL,
match_date DATE NOT NULL,
match_status INT NOT NULL,
match_round INT,
match_time TIME NOT NULL,
rehandle BOOLEAN,

FOREIGN KEY (home_id) REFERENCES teams(id),
FOREIGN KEY (away_id) REFERENCES teams(id)
);

CREATE TABLE goals (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
match_id BIGINT NOT NULL,
player_id BIGINT NOT NULL,
team_id BIGINT NOT NULL,
goal_time_min INT NOT NULL,
goal_time_sec INT NOT NULL,

FOREIGN KEY (match_id) REFERENCES matches (id),
FOREIGN KEY (team_id) REFERENCES teams (id),
FOREIGN KEY (player_id) REFERENCES players (id)
);

CREATE TABLE penalties (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
match_id BIGINT NOT NULL,
player_id BIGINT NOT NULL,
team_id BIGINT NOT NULL,
scored BOOLEAN NOT NULL,
num INT,

FOREIGN KEY (match_id) REFERENCES matches (id),
FOREIGN KEY (team_id) REFERENCES teams (id),
FOREIGN KEY (player_id) REFERENCES players (id)
);

CREATE TABLE points (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
team_id BIGINT NOT NULL,
match_id BIGINT,

FOREIGN KEY (team_id) REFERENCES teams (id),
FOREIGN KEY (match_id) REFERENCES matches (id)
);

CREATE TABLE wins (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
team_id BIGINT NOT NULL,
match_id BIGINT,

FOREIGN KEY (team_id) REFERENCES teams (id),
FOREIGN KEY (match_id) REFERENCES matches (id)
);

CREATE TABLE loses (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
team_id BIGINT NOT NULL,
match_id BIGINT,

FOREIGN KEY (team_id) REFERENCES teams (id),
FOREIGN KEY (match_id) REFERENCES matches (id)
);

CREATE TABLE ties (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
team_id BIGINT NOT NULL,
match_id BIGINT,

FOREIGN KEY (team_id) REFERENCES teams (id),
FOREIGN KEY (match_id) REFERENCES matches (id)
);

CREATE TABLE users (
id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
birthdate DATE NOT NULL,
profile_pic LONGBLOB
);

CREATE TABLE roles (
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR (50) NOT NULL
); 

CREATE TABLE user_role (
user_id BIGINT NOT NULL,
role_id BIGINT NOT NULL,

FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (role_id) REFERENCES roles (id)
);

SELECT * FROM teams;
SELECT * FROM players;
SELECT * FROM matches;
SELECT * FROM goals;
SELECT * FROM penalties;

DROP TABLE user_role;
DROP TABLE roles;
DROP TABLE users;
DROP TABLE ties;
DROP TABLE loses;
DROP TABLE wins;
DROP TABLE points;
DROP TABLE penalties;
DROP TABLE goals;
DROP TABLE matches;
DROP TABLE players;
DROP TABLE teams;

INSERT INTO users (first_name, last_name, username, email, password, birthdate, profile_pic) VALUES
('Ahmed', 'Ebaid', 'Ahmed_Ebaid', 'ahmed_ebaid@gmail.com', '$2a$12$aLESJHUpGYRbzep99oG1nusY8z.g0zSZznQZxMcMWGnCiW1D8.ALy', '2005-12-02', null);

UPDATE users
SET profile_pic = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/images.png')
WHERE id = 1;

INSERT INTO roles (name) VALUES
('admin'),
('user');

INSERT INTO user_role (user_id, role_id) VALUES
(1, 1);

INSERT INTO teams (name, stadium, coach, foundation_year, slogan, points, wins, loses, ties, ranking, in_league, logo) VALUES
('Arsenal', 'Emirates Stadium', 'Mikel Arteta', 1886, 'Victoria Concordia Crescit', 0, 0, 0, 0, 1, 1, null),
('Aston Villa', 'Villa Park', 'Unai Emery', 1874, 'Prepared and willing to meet every challenge', 0, 0, 0, 0, 1, 1, null),
('Bournemouth', 'Vitality Stadium', 'Andoni Iraola', 1992, 'Pulchritudo et Salubritas', 0, 0, 0, 0, 1, 1, null),
('Brentford', 'Gtech community', 'Thomas Frank', 1889, 'We Make Our Own Way', 0, 0, 0, 0, 1, 1, null),
('Brighton Hove Albion', 'Falmer Stadium', 'Fabian Hürzeler', 1901, 'INTER UNDAS ET COLLES FLOREMUS', 0, 0, 0, 0, 1, 1, null),
('Chelsea', 'Stamford Bridge', 'Enzo Maresca', 1905, 'Keep the Blue Flag Flying High', 0, 0, 0, 0, 1, 1, null),
('Crystal Palace', 'Selhurst Park', 'Oliver Glasner', 1861, 'South London and Proud', 0, 0, 0, 0, 1, 1, null),
('Everton', 'Bramley-Moore Dock', 'David Moyes', 1878, 'Nil Satis, Nisi Optimum', 0, 0, 0, 0, 1, 1, null),
('Fulham', 'Craven Cottage', 'Marco Silva', 1879, 'Football is For Everyone', 0, 0, 0, 0, 1, 1, null),
('Ipswich Town', 'Portman Road Stadium', 'Kieran McKenna', 1878, 'Running Towards Adversity', 0, 0, 0, 0, 1, 1, null),
('Leicester City', 'King Power', 'Ruud Van Nistelrooy', 1884, 'Foxes Never Quit', 0, 0, 0, 0, 1, 1, null),
('Liverpool', 'Anfield', 'Arne Slot', 1892, 'You will Never Walk Alone', 0, 0, 0, 0, 1, 1, null),
('Manchester City', 'Etihad Stadium', 'Pep Guardiola', 1880, 'Superbia in Proelio', 0, 0, 0, 0, 1, 1, null),
('Manchester United', 'Old Trafford', 'Ruben Amorim', 1878, 'Glory, Glory Man United!', 0, 0, 0, 0, 1, 1, null),
('Newcastle United', 'St James Park', 'Eddie Howe', 1895, 'Fortiter Defendit Triumphans', 0, 0, 0, 0, 1, 1, null),
('Nottingham Forest', 'City Ground', 'Nuno Espírito Santo', 1865, 'Vivit post funera virtus', 0, 0, 0, 0, 1, 1, null),
('Southampton', 'St Marys', 'Ivan Juric', 1885, 'The Saints: it is not just a name, it iss who we are.', 0, 0, 0, 0, 1, 1, null),
('Tottenham Hotspurs', 'Tottenham Hotspur', 'Ange Postecoglou', 1882, 'Audere est Facere', 0, 0, 0, 0, 1, 1, null),
('West Ham United', 'London Stadium', 'Graham Stephen Potter', 1895, 'I am Forever Blowing Bubbles', 0, 0, 0, 0, 1, 1, null),
('Wolves', 'Molineux Stadium', 'Nuno Espírito Santo', 1877, 'Bring the Nice', 0, 0, 0, 0, 1, 1, null),
('Coventry City', 'CBS Arena', 'Frank Lampard', 1883, 'Play Up Sky Blues', 0, 0, 0, 0, 1, 2, null);

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Arsenal.png')
WHERE id = 1;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Aston Villa.png')
WHERE id = 2;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Bournemouth.png')
WHERE id = 3;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Brentford.png')
WHERE id = 4;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Brighton Hove Albion.png')
WHERE id = 5;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Chelsea.png')
WHERE id = 6;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Crystal Palace.png')
WHERE id = 7;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Everton.png')
WHERE id = 8;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Fulham.png')
WHERE id = 9;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Ipswich Town.png')
WHERE id = 10;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Leicester City.png')
WHERE id = 11;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Liverpool.png')
WHERE id = 12;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Manchester City.png')
WHERE id = 13;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Manchester United.png')
WHERE id = 14;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Newcastle United.png')
WHERE id = 15;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Nottingham Forest.png')
WHERE id = 16;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Southampton.png')
WHERE id = 17;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Tottenham Hotspurs.png')
WHERE id = 18;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/West Ham United.png')
WHERE id = 19;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/wolves.png')
WHERE id = 20;

UPDATE teams
SET logo = LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Coventry City.png')
WHERE id = 21;

INSERT INTO players (name, birthdate, natio, team_id, pos, num) VALUES
('William Saliba', '2001-03-24', 'France', 1, 'Defender', 2),
('Kieran Tierney', '1997-06-05', 'Scotland', 1, 'Defender', 3),
('Ben White', '1997-10-08', 'England', 1, 'Defender', 4),
('Thomas Partey', '1993-06-13', 'Ghana', 1, 'Midfielder', 5),
('Gabriel Magalhães', '1997-12-19', 'Brazil', 1, 'Defender', 6),
('Bukayo Saka', '2001-09-05', 'England', 1, 'Forward', 7),
('Martin Odegaard', '1998-12-17', 'Norway', 1, 'Midfielder', 8),
('Gabriel Jesus', '1997-04-03', 'Brazil', 1, 'Forward', 9),
('Emile Smith Rowe', '2001-06-18', 'England', 1, 'Midfielder', 10),
('Gabriel Martinelli', '2001-06-17', 'Brazil', 1, 'Forward', 11),
('Jurrien Timber', '2000-02-15', 'Netherlands', 1, 'Defender', 12),
('Jakub Kiwior', '1996-12-15', 'Poland', 1, 'Defender', 15),
('Cedric Soares', '1998-11-05', 'Portugal', 1, 'Defender', 17),
('Takehiro Tomiyasu', '1994-12-04', 'Japan', 1, 'Defender', 18),
('Leandro Trossard', '1991-12-20', 'Belgium', 1, 'Forward', 19),
('Nuno Tavares', '1995-09-15', 'Portugal', 1, 'Defender', 20),
('Fábio Vieira', '1996-06-22', 'Portugal', 1, 'Midfielder', 21),
('David Raya', '1999-06-11', 'Spain', 1, 'Goalkeeper', 22),
('Albert Sambi Lokonga', '1994-12-08', 'Belgium', 1, 'Midfielder', 23),
('Reiss Nelson', '1989-07-19', 'England', 1, 'Forward', 24),
('Mohamed Elneny', '2002-05-19', 'Egypt', 1, 'Midfielder', 25),
('Marquinhos', '1999-01-14', 'Brazil', 1, 'Forward', 27),
('Kai Havertz', NULL, 'Germany', 1, 'Midfielder', 29),
('Oleksandr Zinchenko', '2005-05-16', 'Ukraine', 1, 'Defender', 35),
('Declan Rice', '2007-03-21', 'England', 1, 'Midfielder', 41),
('Ethan Nwaneri', '2003-10-17', 'England', 1, 'Midfielder', 63),
('Charlie Patino', '2003-04-07', 'England', 1, 'Midfielder', 65),
('Reuell Walters', '2000-05-30', 'England', 1, 'Defender', 76),

('Matty Cash', '1992-09-02', 'Argentina', 2, 'Defender', 2),
('Axel Disasi', '1997-08-07', 'Poland', 2, 'Defender', 3),
('Ezri Konsa', '1997-10-23', 'England', 2, 'Defender', 4),
('Tyrone Mings', '1997-01-16', 'Spain', 2, 'Defender', 5),
('John McGinn', '1993-07-25', 'France', 2, 'Midfielder', 7),
('Youri Tielemans', '1999-11-23', 'France', 2, 'Midfielder', 8),
('Marcus Rashford', '1994-10-18', 'Scotland', 2, 'Forward', 9),
('Ollie Watkins', '1998-05-09', 'Brazil', 2, 'Forward', 11),
('Lucas Digne', '1997-08-09', 'Jamaica', 2, 'Defender', 12),
('Pau Torres', '1996-01-21', 'Spain', 2, 'Defender', 14),
('Donyell Malen', '1995-12-30', 'England', 2, 'Forward', 17),
('Marco Asensio', '1990-01-08', 'Sweden', 2, 'Forward', 21),
('Emiliano Martínez', '1993-03-13', 'England', 2, 'Goalkeeper', 23),
('Amadou Onana', '1998-03-11', 'France', 2, 'Midfielder', 24),
('Robin Olsen', '1997-05-07', 'Belgium', 2, 'Goalkeeper', 25),
('Morgan Rogers', '2001-05-28', 'England', 2, 'Forward', 27),
('Leon Bailey', '2002-07-26', 'England', 2, 'Forward', 31),
('Jacob Ramsey', '2001-08-16', 'Belgium', 2, 'Midfielder', 41),
('Boubacar Kamara', '2002-02-08', 'England', 2, 'Midfielder', 44),
('Ben Broggio', '1999-01-19', 'Netherlands', 2, 'Defender', 79),


('Neto', '1989-07-19', 'Brazil', 3, 'Goalkeeper', 1),
('Illia Zabarnyi', '2002-09-01', 'Ukraine', 3, 'Defender', 27),
('Chris Mepham', '1997-11-05', 'Wales', 3, 'Defender', 6),
('Lloyd Kelly', '1998-10-06', 'England', 3, 'Defender', 5),
('Milos Kerkez', '2003-11-07', 'Hungary', 3, 'Defender', 3),
('Lewis Cook', '1997-02-03', 'England', 3, 'Midfielder', 4),
('Ryan Christie', '1995-02-22', 'Scotland', 3, 'Midfielder', 10),
('Marcus Tavernier', '1999-03-22', 'England', 3, 'Midfielder', 16),
('Justin Kluivert', '1999-05-05', 'Netherlands', 3, 'Forward', 19),
('Dominic Solanke', '1997-09-14', 'England', 3, 'Forward', 9),
('Antoine Semenyo', '2000-01-07', 'Ghana', 3, 'Forward', 24),
('Mark Travers', '1999-05-18', 'Ireland', 3, 'Goalkeeper', 42),

('Darren Randolph', '1987-05-12', 'Ireland', 3, 'Goalkeeper', 13),
('Adam Smith', '1991-04-29', 'England', 3, 'Defender', 15),
('Max Aarons', '2000-01-04', 'England', 3, 'Defender', 37),
('James Hill', '2002-01-10', 'England', 3, 'Defender', 23),
('Marcos Senesi', '1997-05-19', 'Argentina', 3, 'Defender', 5),
('Joe Rothwell', '1995-01-11', 'England', 3, 'Midfielder', 18),
('Gavin Kilkenny', '2000-02-02', 'Ireland', 3, 'Midfielder', 19),
('David Brooks', '1997-07-08', 'Wales', 3, 'Midfielder', 7),
('Philip Billing', '1996-06-11', 'Denmark', 3, 'Midfielder', 29),
('Dango Ouattara', '2002-02-11', 'Burkina Faso', 3, 'Forward', 11),
('Jaidon Anthony', '1999-12-01', 'England', 3, 'Forward', 29),
('Luis Sinisterra', '1999-04-17', 'Colombia', 3, 'Forward', 17),
('Emiliano Marcondes', '1995-03-09', 'Denmark', 3, 'Midfielder', 22),
('Kieffer Moore', '1992-08-08', 'Wales', 3, 'Forward', 21),
('Hamed Traorè', '2000-02-16', 'Ivory Coast', 3, 'Midfielder', 21),
('Enes Unal', '1997-05-10', 'Turkey', 3, 'Forward', 26),


('Mark Flekken', '1993-06-13', 'Netherlands', 4, 'Goalkeeper', 1),
('Hákon Valdimarsson', '2001-10-03', 'Iceland', 4, 'Goalkeeper', 12),
('Julian Eyestone', '2005-03-13', 'United States', 4, 'Goalkeeper', 41),
('Nathan Collins', '2001-04-30', 'Ireland', 4, 'Defender', 22),
('Aaron Hickey', '2002-06-10', 'Scotland', 4, 'Defender', 2),
('Rico Henry', '1997-07-08', 'England', 4, 'Defender', 3),
('Ethan Pinnock', '1993-05-29', 'Jamaica', 4, 'Defender', 5),
('Ben Mee', '1989-09-21', 'England', 4, 'Defender', 16),
('Kristoffer Ajer', '1998-04-17', 'Norway', 4, 'Defender', 20),
('Kim Ji-Soo', '2004-12-24', 'South Korea', 4, 'Defender', 36),
('Sepp van den Berg', '2001-12-20', 'Netherlands', 4, 'Defender', 4),
('Michael Kayode', '2004-07-10', 'Italy', 4, 'Defender', 33),
('Benjamin Arthur', '2005-02-15', 'England', 4, 'Defender', 43),
('Yehor Yarmoliuk', '2004-03-01', 'Ukraine', 4, 'Midfielder', 18),
('Christian Norgaard', '1994-03-10', 'Denmark', 4, 'Midfielder', 6),
('Mathias Jensen', '1996-01-01', 'Denmark', 4, 'Midfielder', 8),
('Kevin Schade', '2001-11-27', 'Germany', 4, 'Forward', 7),
('Josh Dasilva', '1998-04-23', 'England', 4, 'Midfielder', 10),
('Yoane Wissa', '1996-09-03', 'DR Congo', 4, 'Forward', 11),
('Bryan Mbeumo', '1999-08-07', 'Cameroon', 4, 'Forward', 19),
('Mikkel Damsgaard', '2000-07-03', 'Denmark', 4, 'Midfielder', 24),
('Vitaly Janelt', '1998-05-10', 'Germany', 4, 'Midfielder', 27),
('Yunus Konak', '2005-01-20', 'Turkey', 4, 'Midfielder', 26),
('Paris Maghoma', '2001-09-08', 'England', 4, 'Midfielder', 32),
('Fábio Carvalho', '2002-08-30', 'Portugal', 4, 'Midfielder', 14),
('Keane Lewis-Potter', '2001-02-22', 'England', 4, 'Forward', 23),
('Igor Thiago', '2001-06-26', 'Brazil', 4, 'Forward', 9),
('Iwan Morgan', '2006-01-13', 'Wales', 4, 'Forward', 40),
('Gustavo Nunes', '2005-05-05', 'Brazil', 4, 'Forward', 39),


('Bart Verbruggen', '2002-08-18', 'Netherlands', 5, 'Goalkeeper', 1),
('Tariq Lamptey', '2000-09-30', 'Ghana', 5, 'Defender', 2),
('Lewis Dunk', '1991-11-21', 'England', 5, 'Defender', 5),
('Adam Webster', '1995-01-04', 'England', 5, 'Defender', 4),
('Pervis Estupiñán', '1998-01-21', 'Ecuador', 5, 'Defender', 30),
('James Milner', '1986-01-04', 'England', 5, 'Midfielder', 6),
('Carlos Baleba', '2004-01-03', 'Cameroon', 5, 'Midfielder', 20),
('Kaoru Mitoma', '1997-05-20', 'Japan', 5, 'Forward', 22),
('Solly March', '1994-07-20', 'England', 5, 'Midfielder', 7),
('João Pedro', '2001-09-26', 'Brazil', 5, 'Forward', 9),
('Danny Welbeck', '1990-11-26', 'England', 5, 'Forward', 18),
('Jason Steele', '1990-08-18', 'England', 5, 'Goalkeeper', 23),
('Jan Paul van Hecke', '2000-06-08', 'Netherlands', 5, 'Defender', 29),
('Joël Veltman', '1992-01-15', 'Netherlands', 5, 'Defender', 34),
('Igor Julio', '1998-02-07', 'England', 5, 'Defender', 3),
('Ferdi Kadıoğlu', '1999-10-07', 'Turkey', 5, 'Defender', 24),
('Mats Wieffer', '1999-11-16', 'Netherlands', 5, 'Midfielder', 27),
('Matt O''Riley', '2000-11-21', 'England', 5, 'Midfielder', 33),
('Yasin Ayari', '2005-04-11', 'England', 5, 'Midfielder', 26),
('Jack Hinshelwood', '2002-04-20', 'France', 5, 'Midfielder', 41),
('Georginio Rutter', '2002-01-01', 'Ivory Coast', 5, 'Forward', 14),
('Simon Adingra', '2004-07-22', 'Gambia', 5, 'Forward', 11),
('Yankuba Minteh', '2004-05-31', 'Albania', 5, 'Forward', 17),
('Brajan Gruda', '2003-10-27', 'Spain', 5, 'Midfielder', 8),
('Carlos Soler', '1994-01-03', 'France', 5, 'Midfielder', 4),
('Michael Cuisance', '1999-11-17', 'England', 5, 'Midfielder', 27),
('Jack Hinshelwood', '2005-04-11', 'Australia', 5, 'Midfielder', 41),
('Cameron Peupion', '2002-09-23', 'Spain', 5, 'Midfielder', 18),
('Diego Gomez', '2003-03-27', 'England', 5, 'Midfielder', 25),
('Freddie Simmonds', '2008-03-09', 'England', 5, 'Goalkeeper', 71),
('Jacob Slater', '2004-10-05', 'England', 5, 'Defender', 53),
('Charlie Tasker', '2006-02-24', 'England', 5, 'Defender', 60),
('Imari Samuels', '2003-05-02', 'England', 5, 'Defender', 12),
('Eiran Cashin', '2001-11-09', 'England', 5, 'Defender', 16),


('Robert Sánchez', '1997-11-30', 'Spain', 6, 'Goalkeeper', 1),
('Marc Cucurella', '1998-07-22', 'Spain', 6, 'Defender', 3),
('Axel Disasi', '1998-10-11', 'France', 6, 'Defender', 6),
('Benoît Badiashile', '2001-03-26', 'France', 6, 'Defender', 2),
('Levi Colwill', '2003-02-26', 'England', 6, 'Defender', 4),
('Enzo Fernandez', '2001-01-17', 'Argentina', 6, 'Midfielder', 8),
('Moisés Caicedo', '2001-11-16', 'Ecuador', 6, 'Midfielder', 25),
('Cole Palmer', '2002-05-20', 'England', 6, 'Forward', 29),
('Mykhailo Mudryk', '2001-01-05', 'Ukraine', 6, 'Forward', 15),
('Noni Madueke', '2001-11-10', 'England', 6, 'Forward', 11),
('Nicolas Jackson', '2001-06-20', 'Senegal', 6, 'Forward', 20),
('Filip Jorgensen', '2002-08-10', 'Denmark', 6, 'Goalkeeper', 13),
('Marcus Bettinelli', '1992-01-03', 'England', 6, 'Goalkeeper', 30),
('Tosin Adarabioyo', '1997-09-23', 'England', 6, 'Defender', 26),
('Wesley Fofana', '2000-12-17', 'France', 6, 'Defender', 3),
('Malo Gusto', '2003-05-19', 'France', 6, 'Defender', 27),
('Reece James', '1999-12-08', 'England', 6, 'Defender', 24),
('Trevoh Chalobah', '1999-07-05', 'England', 6, 'Defender', 14),
('Ben Chilwell', '1996-12-21', 'England', 6, 'Defender', 21),
('João Felix', '1999-12-19', 'Portugal', 6, 'Forward', 10),
('David Datro Fofana', '1999-11-05', 'Ivory Coast', 6, 'Forward', 31),
('Thiago Silva', '2002-01-22', 'Brazil', 6, 'Defender', 6),
('Conor Gallagher', '1994-12-10', 'England', 6, 'Midfielder', 23),
('Raheem Sterling', '2000-03-10', 'Gabon', 6, 'Forward', 17),
('Carney Chukwuemeka', '2002-08-20', 'Morocco', 6, 'Midfielder', 5),
('Lewis Hall', '2002-01-20', 'USA', 6, 'Midfielder', 33),
('Kepa Arrizabalaga', '2001-09-02', 'Czech Republic', 6, 'Goalkeeper', 1),
('Hakim Ziyech', '1994-11-02', 'France', 6, 'Forward', 22),
('Aubameyang', '1992-11-18', 'USA', 6, 'Forward', 9),
('Christian Pulisic', '1992-11-03', 'USA', 6, 'Forward', 22),
('Callum Hudson-Odoi', '1997-11-22', 'Albania', 6, 'Forward', 20),
('Armando Broja', '1996-11-02', 'Netherlands', 6, 'Forward', 18),
('Ian Maatsen', '1999-11-10', 'England', 6, 'Defender', 41),


('Sam Johnstone', '1993-03-25', 'England', 7, 'Goalkeeper', 1),
('Joachim Andersen', '1996-05-31', 'Denmark', 7, 'Defender', 3),
('Marc Guehi', '2000-07-13', 'England', 7, 'Defender', 6),
('Tyrick Mitchell', '1999-09-01', 'England', 7, 'Defender', 24),
('Daniel Munoz', '1996-05-25', 'Colombia', 7, 'Defender', 15),
('Adam Wharton', '2004-02-06', 'England', 7, 'Midfielder', 23),
('Will Hughes', '1995-04-17', 'England', 7, 'Midfielder', 8),
('Michael Olise', '2001-12-12', 'France', 7, 'Midfielder', 10),
('Eberechi Eze', '1998-06-29', 'England', 7, 'Midfielder', 7),
('Jean-Philippe Mateta', '1997-06-28', 'France', 7, 'Forward', 9),
('Odsonne Edouard', '1998-01-16', 'France', 7, 'Forward', 11),
('Dean Henderson', '1997-03-12', 'England', 7, 'Goalkeeper', 13),
('Remi Matthews', '1994-02-10', 'England', 7, 'Goalkeeper', 31),
('Nathaniel Clyne', '1991-04-05', 'England', 7, 'Defender', 17),
('Joel Ward', '1989-10-29', 'England', 7, 'Defender', 2),
('Jefferson Lerma', '1994-10-25', 'Colombia', 7, 'Midfielder', 12),
('Cheick Doucoure', '2000-01-08', 'Mali', 7, 'Midfielder', 28),
('Naouirou Ahamada', '2002-03-29', 'France', 7, 'Midfielder', 29),
('Jairo Riedewald', '1996-09-09', 'Netherlands', 7, 'Midfielder', 17),
('David Ozoh', '2005-05-12', 'England', 7, 'Midfielder', 50),
('Jeffrey Schlupp', '1992-12-23', 'Ghana', 7, 'Midfielder', 4),
('Jordan Ayew', '1991-09-11', 'Ghana', 7, 'Forward', 22),
('Matheus Franca', '2004-04-01', 'Brazil', 7, 'Midfielder', 18),
('Malcolm Ebiowei', '2003-09-04', 'England', 7, 'Forward', 45),
('James Tomkins', '1989-03-29', 'England', 7, 'Defender', 6),
('Chris Richards', '2000-03-28', 'USA', 7, 'Defender', 25),
('Rob Holding', '1995-09-20', 'England', 7, 'Defender', 4),
('Luke Plange', '2002-11-04', 'England', 7, 'Forward', 32),

('Jordan Pickford', '1994-03-07', 'England', 8, 'Goalkeeper', 1),
('Nathan Patterson', '2001-10-16', 'Scotland', 8, 'Defender', 2),
('Michael Keane', '1993-01-11', 'England', 8, 'Defender', 6),
('James Tarkowski', '1992-11-19', 'England', 8, 'Defender', 5),
('Vitaliy Mykolenko', '1999-05-29', 'Ukraine', 8, 'Defender', 19),
('Idrissa Gueye', '1989-09-26', 'Senegal', 8, 'Midfielder', 27),
('Abdoulaye Doucoure', '1993-01-01', 'France', 8, 'Midfielder', 16),
('Orel Mangala', '1998-03-18', 'Belgium', 8, 'Midfielder', 8),
('Jack Harrison', '1996-11-20', 'England', 8, 'Midfielder', 40),
('Iliman Ndiaye', '2000-03-06', 'Senegal', 8, 'Forward', 45),
('Beto', '1998-01-31', 'Portugal', 8, 'Forward', 9),
('Asmir Begovic', '1987-06-20', 'Bosnia and Herzegovina', 8, 'Goalkeeper', 13),
('João Virgínia', '1999-10-10', 'Portugal', 8, 'Goalkeeper', 36),
('Zan Luk Leban', '2002-12-15', 'Slovenia', 8, 'Goalkeeper', 41),
('Seamus Coleman', '1988-10-11', 'Ireland', 8, 'Defender', 23),
('Ashley Young', '1985-07-09', 'England', 8, 'Defender', 2),
('Jarrad Branthwaite', '2002-06-27', 'England', 8, 'Defender', 32),
('Jake O''Brien', '2001-05-15', 'Ireland', 8, 'Defender', 44),
('Tim Iroegbunam', '2003-06-30', 'England', 8, 'Midfielder', 38),
('James Garner', '2001-03-13', 'England', 8, 'Midfielder', 37),
('Carlos Alcaraz', '2002-11-30', 'Argentina', 8, 'Midfielder', 24),
('Dwight McNeil', '1999-11-22', 'England', 8, 'Midfielder', 11),
('Dominic Calvert-Lewin', '1997-03-16', 'England', 8, 'Forward', 9),
('Youssef Chermiti', '2004-05-24', 'Portugal', 8, 'Forward', 19),
('Armando Broja', '2001-09-10', 'Albania', 8, 'Forward', 22),
('Jesper Lindstrom', '2000-02-29', 'Denmark', 8, 'Midfielder', 29),
('Tyler Onyango', '2003-01-04', 'England', 8, 'Midfielder', 43),
('Lewis Warrington', '2002-10-10', 'England', 8, 'Midfielder', 49),
('Stanley Mills', '2003-10-25', 'England', 8, 'Midfielder', 51),
('Tom Cannon', '2002-05-28', 'England', 8, 'Forward', 52),
('Reece Welch', '2003-09-19', 'England', 8, 'Defender', 53),
('Isaac Price', '2003-09-26', 'Northern Ireland', 8, 'Midfielder', 54),
('Ryan Astley', '2001-10-04', 'Wales', 8, 'Defender', 55),


('Bernd Leno', '1992-03-04', 'Germany', 9, 'Goalkeeper', 1),
('Steven Benda', '1998-06-01', 'Germany', 9, 'Goalkeeper', 13),
('Alex Borto', '2003-04-05', 'United States', 9, 'Goalkeeper', 36),
('Kenny Tete', '1995-10-09', 'Netherlands', 9, 'Defender', 2),
('Calvin Bassey', '1999-12-31', 'Nigeria', 9, 'Defender', 4),
('Joachim Andersen', '1996-05-31', 'Denmark', 9, 'Defender', 5),
('Jorge Cuenca', '1999-11-17', 'Spain', 9, 'Defender', 6),
('Timothy Castagne', '1995-12-05', 'Belgium', 9, 'Defender', 3),
('Issa Diop', '1997-01-09', 'France', 9, 'Defender', 12),
('Antonee Robinson', '1997-08-08', 'United States', 9, 'Defender', 33),
('Ryan Sessegnon', '2000-05-18', 'England', 9, 'Defender', 23),
('Harrison Reed', '1995-01-27', 'England', 9, 'Midfielder', 6),
('Tom Cairney', '1991-01-20', 'Scotland', 9, 'Midfielder', 10),
('Sander Berge', '1998-02-14', 'Norway', 9, 'Midfielder', 16),
('Andreas Pereira', '1996-01-01', 'Brazil', 9, 'Midfielder', 18),
('Saša Lukic', '1996-08-13', 'Serbia', 9, 'Midfielder', 20),
('Josh King', '1992-01-15', 'England', 9, 'Forward', 9),
('Emile Smith Rowe', '2000-07-28', 'England', 9, 'Midfielder', 32),
('Harry Wilson', '1997-03-22', 'Wales', 9, 'Forward', 7),
('Reiss Nelson', '1999-12-10', 'England', 9, 'Forward', 24),
('Raúl Jimenez', '1991-05-05', 'Mexico', 9, 'Forward', 21),
('Rodrigo Muniz', '2001-05-04', 'Brazil', 9, 'Forward', 22),
('Adama Traore', '1996-01-25', 'Spain', 9, 'Forward', 17),
('Alex Iwobi', '1996-03-05', 'Nigeria', 9, 'Midfielder', 7),
('Martial Godo', '2003-08-01', 'England', 9, 'Midfielder', 30),
('Willian', '1988-08-09', 'Brazil', 9, 'Forward', 11),


('Arijanet Muric', '1998-11-07', 'Kosovo', 10, 'Goalkeeper', 1),
('Ben Johnson', '2000-01-24', 'England', 10, 'Defender', 2),
('Dara O''Shea', '1999-03-04', 'Ireland', 10, 'Defender', 6),
('Luke Woolfenden', '1998-10-21', 'England', 10, 'Defender', 5),
('Leif Davis', '1999-12-31', 'England', 10, 'Defender', 3),
('Sam Morsy', '1991-09-10', 'Egypt', 10, 'Midfielder', 6),
('Kalvin Phillips', '1995-12-02', 'England', 10, 'Midfielder', 4),
('Massimo Luongo', '1992-09-25', 'Australia', 10, 'Midfielder', 8),
('Jack Clarke', '2000-11-23', 'England', 10, 'Forward', 7),
('Jaden Philogene', '2002-02-08', 'England', 10, 'Forward', 10),
('Liam Delap', '2003-02-08', 'England', 10, 'Forward', 11),
('Christian Walton', '1995-11-09', 'England', 10, 'Goalkeeper', 13),
('Cieran Slicker', '2002-09-15', 'Scotland', 10, 'Goalkeeper', 31),
('Alex Palmer', '1996-08-10', 'England', 10, 'Goalkeeper', 21),
('Conor Townsend', '1993-03-04', 'England', 10, 'Defender', 3),
('Cameron Burgess', '1995-10-21', 'Australia', 10, 'Defender', 16),
('Jacob Greaves', '2000-09-05', 'England', 10, 'Defender', 15),
('Axel Tuanzebe', '1997-11-14', 'England', 10, 'Defender', 12),
('Jens Cajuste', '1999-08-10', 'Sweden', 10, 'Midfielder', 18),
('Jack Taylor', '1998-01-01', 'Ireland', 10, 'Midfielder', 24),
('Sam Szmodics', '1995-08-16', 'England', 10, 'Forward', 9),
('Omari Hutchinson', '2003-10-29', 'Jamaica', 10, 'Forward', 22),
('Julio Enciso', '2004-01-23', 'Paraguay', 10, 'Forward', 19),
('Chiedozie Ogbene', '1997-05-01', 'Ireland', 10, 'Forward', 10),
('Conor Chaplin', '1997-02-16', 'England', 10, 'Forward', 20),
('George Hirst', '1999-02-15', 'England', 10, 'Forward', 26),
('Nathan Broadhead', '1998-04-05', 'Wales', 10, 'Forward', 28),
('Wes Burns', '1995-03-01', 'Wales', 10, 'Forward', 14),
('Idris El Mizouni', '2000-09-26', 'Tunisia', 10, 'Midfielder', 30),
('Sammie Szmodics', '1995-08-16', 'England', 10, 'Forward', 32),
('Samy Morsy', '1991-09-10', 'Egypt', 10, 'Midfielder', 6),
('Tommy Hughes', '2000-10-10', 'England', 10, 'Midfielder', 33),
('Freddie Ladapo', '1993-01-01', 'England', 10, 'Forward', 35),


('Mads Hermansen', '2000-07-11', 'Denmark', 11, 'Goalkeeper', 1),
('Ricardo Pereira', '1993-10-06', 'Portugal', 11, 'Defender', 2),
('Wout Faes', '1998-04-03', 'Belgium', 11, 'Defender', 3),
('Jannik Vestergaard', '1992-08-03', 'Denmark', 11, 'Defender', 4),
('James Justin', '1998-02-23', 'England', 11, 'Defender', 5),
('Harry Winks', '1996-02-02', 'England', 11, 'Midfielder', 6),
('Wilfred Ndidi', '1996-12-16', 'Nigeria', 11, 'Midfielder', 7),
('Kiernan Dewsbury-Hall', '1998-09-06', 'England', 11, 'Midfielder', 8),
('Stephy Mavididi', '1998-05-31', 'England', 11, 'Forward', 9),
('Jamie Vardy', '1987-01-11', 'England', 11, 'Forward', 10),
('Kelechi Iheanacho', '1996-10-03', 'Nigeria', 11, 'Forward', 11),
('Jakub Stolarczyk', '2000-05-20', 'Poland', 11, 'Goalkeeper', 12),
('Danny Ward', '1993-06-22', 'Wales', 11, 'Goalkeeper', 13),
('Conor Coady', '1993-02-25', 'England', 11, 'Defender', 14),
('Callum Doyle', '2003-10-03', 'England', 11, 'Defender', 15),
('Ben Nelson', '2004-03-19', 'England', 11, 'Defender', 16),
('Luke Thomas', '2001-06-10', 'England', 11, 'Defender', 17),
('Hamza Choudhury', '1997-10-01', 'England', 11, 'Midfielder', 18),
('Cesare Casadei', '2003-01-10', 'Italy', 11, 'Midfielder', 19),
('Dennis Praet', '1994-08-14', 'Belgium', 11, 'Midfielder', 20),
('Yunus Akgun', '2000-02-07', 'Turkey', 11, 'Forward', 21),
('Abdul Fatawu', '2005-02-08', 'Ghana', 11, 'Forward', 22),
('Marc Albrighton', '1989-11-18', 'Wales', 11, 'Forward', 23),
('Tom Cannon', '2002-12-28', 'Ireland', 11, 'Forward', 24),
('Patson Daka', '1998-10-09', 'Zambia', 11, 'Forward', 25),
('Wanya Marcal-Madivadua', '2003-01-22', 'England', 11, 'Midfielder', 26),


('Alisson Becker', '1992-10-02', 'Brazil', 12, 'Goalkeeper', 1),
('Trent Alexander-Arnold', '1998-10-07', 'England', 12, 'Defender', 66),
('Virgil van Dijk', '1991-07-08', 'Netherlands', 12, 'Defender', 4),
('Ibrahima Konate', '1999-05-25', 'France', 12, 'Defender', 5),
('Andrew Robertson', '1994-03-11', 'Scotland', 12, 'Defender', 26),
('Alexis Mac Allister', '1998-12-24', 'Argentina', 12, 'Midfielder', 10),
('Dominik Szoboszlai', '2000-10-25', 'Hungary', 12, 'Midfielder', 8),
('Wataru Endo', '1993-02-09', 'Japan', 12, 'Midfielder', 3),
('Mohamed Salah', '1992-06-15', 'Egypt', 12, 'Forward', 11),
('Darwin Nunez', '1999-06-24', 'Uruguay', 12, 'Forward', 27),
('Luis Diaz', '1997-01-13', 'Colombia', 12, 'Forward', 23),
('Caoimhin Kelleher', '1998-11-23', 'Ireland', 12, 'Goalkeeper', 13),
('Vitezslav Jaroš', '2001-07-23', 'Czech Republic', 12, 'Goalkeeper', 62),
('Jarell Quansah', '2003-01-29', 'England', 12, 'Defender', 47),
('Joe Gomez', '1997-05-23', 'England', 12, 'Defender', 12),
('Conor Bradley', '2003-10-09', 'Northern Ireland', 12, 'Defender', 76),
('Stefan Bajcetic', '2004-10-22', 'Spain', 12, 'Midfielder', 43),
('Ryan Gravenberch', '2002-05-16', 'Netherlands', 12, 'Midfielder', 38),
('Curtis Jones', '2001-01-30', 'England', 12, 'Midfielder', 17),
('Harvey Elliott', '2003-04-04', 'England', 12, 'Midfielder', 19),
('Thiago Alcântara', '1991-04-11', 'Spain', 12, 'Midfielder', 6),
('Bobby Clark', '2005-02-07', 'England', 12, 'Midfielder', 43),
('James McConnell', '2004-06-25', 'England', 12, 'Midfielder', 77),
('Cody Gakpo', '1999-05-07', 'Netherlands', 12, 'Forward', 18),
('Diogo Jota', '1996-12-04', 'Portugal', 12, 'Forward', 20),
('Ben Doak', '2005-11-11', 'Scotland', 12, 'Forward', 50),
('Jayden Danns', '2006-01-16', 'England', 12, 'Forward', 54),
('Kaide Gordon', '2004-10-05', 'England', 12, 'Forward', 49),
('Luke Chambers', '2004-02-16', 'England', 12, 'Defender', 52),
('Calum Scanlon', '2005-10-19', 'England', 12, 'Defender', 57),
('Sepp van den Berg', '2005-02-14', 'Netherlands', 12, 'Defender', 50),
('Fabio Carvalho', '2001-12-20', 'Portugal', 12, 'Midfielder', 28),
('Tyler Morton', '2002-08-30', 'England', 12, 'Midfielder', 27),
('Marcelo Pitaluga', '2002-08-31', 'Brazil', 12, 'Goalkeeper', 47),


('Ederson', '1993-08-17', 'Brazil', 13, 'Goalkeeper', 31),
('Kyle Walker', '1990-05-28', 'England', 13, 'Defender', 2),
('Rúben Dias', '1997-05-14', 'Portugal', 13, 'Defender', 3),
('Josko Gvardiol', '2002-01-23', 'Croatia', 13, 'Defender', 24),
('Nathan Ake', '1995-02-18', 'Netherlands', 13, 'Defender', 6),
('Rodri', '1996-06-22', 'Spain', 13, 'Midfielder', 16),
('Kevin De Bruyne', '1991-06-28', 'Belgium', 13, 'Midfielder', 17),
('Bernardo Silva', '1994-08-10', 'Portugal', 13, 'Midfielder', 20),
('Phil Foden', '2000-05-28', 'England', 13, 'Midfielder', 47),
('Jack Grealish', '1995-09-10', 'England', 13, 'Forward', 10),
('Erling Haaland', '2000-07-21', 'Norway', 13, 'Forward', 9),
('Stefan Ortega', '1992-11-06', 'Germany', 13, 'Goalkeeper', 13),
('Scott Carson', '1985-09-02', 'England', 13, 'Goalkeeper', 33),
('Rico Lewis', '2004-11-21', 'England', 13, 'Defender', 82),
('Manuel Akanji', '1995-07-19', 'Switzerland', 13, 'Defender', 25),
('John Stones', '1994-05-28', 'England', 13, 'Defender', 5),
('Vitor Reis', '2006-01-12', 'Brazil', 13, 'Defender', 62),
('Abdukodir Khusanov', '2004-02-29', 'Uzbekistan', 13, 'Defender', 63),
('Mateo Kovacic', '1994-05-06', 'Croatia', 13, 'Midfielder', 8),
('Matheus Nunes', '1998-08-27', 'Portugal', 13, 'Midfielder', 28),
('Jeremy Doku', '2002-05-27', 'Belgium', 13, 'Forward', 11),
('Nico Gonzalez', '2002-01-03', 'Spain', 13, 'Midfielder', 80),
('Savinho', '2004-10-10', 'Brazil', 13, 'Forward', 55),
('Oscar Bobb', '2003-07-12', 'Norway', 13, 'Forward', 70),
('James McAtee', '2002-10-18', 'England', 13, 'Midfielder', 46),
('Claudio Echeverri', '2006-01-02', 'Argentina', 13, 'Midfielder', 58),
('Nico O\'Reilly', '2005-03-21', 'England', 13, 'Midfielder', 71),
('Ilkay Gündogan', '1990-10-24', 'Germany', 13, 'Midfielder', 8),
('Omar Marmoush', '1999-02-07', 'Egypt', 13, 'Forward', 7),
('Kaden Braithwaite', '2008-02-08', 'England', 13, 'Forward', 79),
('Christian McFarlane', '2007-01-25', 'England', 13, 'Defender', 85),
('Jahmai Simpson-Pusey', '2005-11-04', 'England', 13, 'Midfielder', 82),
('Josh Wilson-Esbrand', '2002-12-26', 'England', 13, 'Defender', 48),


('Andre Onana', '1993-06-18', 'Cameroon', 14, 'Goalkeeper', 1),
('Diogo Dalot', '2002-06-10', 'Portugal', 14, 'Defender', 20),
('Lisandro Martínez', '1993-09-29', 'Argentina', 14, 'Defender', 6),
('Raphael Varane', '2001-04-30', 'France', 14, 'Defender', 19),
('Luke Shaw', '1997-07-08', 'England', 14, 'Defender', 23),
('Casemiro', '1994-03-10', 'Brazil', 14, 'Midfielder', 18),
('Bruno Fernandes', '1996-01-01', 'Portugal', 14, 'Midfielder', 8),
('Mason Mount', '2001-11-27', 'England', 14, 'Midfielder', 7),
('Marcus Rashford', '1999-08-07', 'England', 14, 'Forward', 10),
('Rasmus Hojlund', '1996-09-03', 'Denmark', 14, 'Forward', 17),
('Antony', '1996-03-16', 'Brazil', 14, 'Forward', 21),
('Altay Bayındır', '2001-10-03', 'Turkey', 14, 'Goalkeeper', 13),
('Tom Heaton', '2003-05-02', 'England', 14, 'Goalkeeper', 22),
('Victor Lindelof', '2002-08-30', 'Sweden', 14, 'Defender', 2),
('Noussair Mazraoui', '1998-01-01', 'Morocco', 14, 'Defender', 5),
('Matthijs de Ligt', '1989-09-15', 'Netherlands', 14, 'Defender', 4),
('Harry Maguire', '2001-06-26', 'England', 14, 'Defender', 6),
('Tyrell Malacia', '2004-10-03', 'Netherlands', 14, 'Defender', 12),
('Leny Yoro', '2001-02-22', 'France', 14, 'Defender', 43),
('Jonny Evans', '2000-07-03', 'Northern Ireland', 14, 'Defender', 23),
('Harry Amass', '2002-09-19', 'England', 14, 'Defender', 45),
('Christian Eriksen', '1998-01-10', 'Denmark', 14, 'Midfielder', 14),
('Manuel Ugarte', '2003-03-12', 'Uruguay', 14, 'Midfielder', 28),
('Kobbie Mainoo', '1999-01-24', 'England', 14, 'Midfielder', 46),
('Toby Collyer', '2001-07-08', 'England', 14, 'Midfielder', 47),
('Daniel Gore', '2004-12-24', 'Netherlands', 14, 'Midfielder', 48),
('Joshua Zirkzee', '1993-09-06', 'Ivory Coast', 14, 'Forward', 49),
('Amad Diallo', '2004-12-24', 'Argentina', 14, 'Forward', 34),
('Alejandro Garnacho', '1995-03-03', 'England', 14, 'Forward', 11),
('Ethan Wheatley', '1998-04-01', 'England', 14, 'Forward', 50),
('Shola Shoretire', '1994-12-23', 'Uruguay', 14, 'Forward', 51),
('Facundo Pellistri', '1999-05-09', 'Spain', 14, 'Forward', 24),
('Alvaro Fernandez', '2003-09-22', 'Spain', 14, 'Defender', 33),


('Nick Pope', '1992-04-19', 'England', 15, 'Goalkeeper', 1),
('Kieran Trippier', '1990-09-19', 'England', 15, 'Defender', 2),
('Fabian Schar', '1991-12-20', 'Switzerland', 15, 'Defender', 5),
('Sven Botman', '2000-01-12', 'Netherlands', 15, 'Defender', 4),
('Dan Burn', '1992-05-09', 'England', 15, 'Defender', 33),
('Bruno Guimaraes', '1997-11-16', 'Brazil', 15, 'Midfielder', 39),
('Joelinton', '1996-08-14', 'Brazil', 15, 'Midfielder', 7),
('Sandro Tonali', '2000-05-08', 'Italy', 15, 'Midfielder', 8),
('Miguel Almiron', '1994-02-10', 'Paraguay', 15, 'Forward', 24),
('Harvey Barnes', '1997-12-09', 'England', 15, 'Forward', 16),
('Alexander Isak', '1999-09-21', 'Sweden', 15, 'Forward', 14),
('Martin Dubravka', '1989-01-15', 'Slovakia', 15, 'Goalkeeper', 13),
('Loris Karius', '1993-06-22', 'Germany', 15, 'Goalkeeper', 18),
('Mark Gillespie', '1992-03-27', 'England', 15, 'Goalkeeper', 26),
('Tino Livramento', '2002-11-12', 'England', 15, 'Defender', 12),
('Emil Krafth', '1994-08-02', 'Sweden', 15, 'Defender', 17),
('Jamaal Lascelles', '1993-11-11', 'England', 15, 'Defender', 6),
('Matt Targett', '1995-09-18', 'England', 15, 'Defender', 3),
('Paul Dummett', '1991-09-26', 'Wales', 15, 'Defender', 20),
('Alex Murphy', '2004-06-25', 'Ireland', 15, 'Defender', 36),
('Sean Longstaff', '1997-10-30', 'England', 15, 'Midfielder', 36),
('Joe Willock', '1999-08-20', 'England', 15, 'Midfielder', 28),
('Elliot Anderson', '2002-11-06', 'Scotland', 15, 'Midfielder', 32),
('Lewis Miley', '2006-05-01', 'England', 15, 'Midfielder', 45),
('Matt Ritchie', '1989-09-10', 'Scotland', 15, 'Midfielder', 11),
('Jacob Murphy', '1995-02-24', 'England', 15, 'Forward', 23),
('Anthony Gordon', '2001-02-24', 'England', 15, 'Forward', 21),
('Callum Wilson', '1992-02-27', 'England', 15, 'Forward', 9),
('Ryan Fraser', '1994-02-24', 'Scotland', 15, 'Forward', 32),
('Yankuba Minteh', '2004-07-22', 'Gambia', 15, 'Forward', 39),
('Garang Kuol', '2004-09-15', 'Australia', 15, 'Forward', 44),
('Amadou Diallo', '2003-09-15', 'England', 15, 'Forward', 46),
('Ben Parkinson', '2005-09-24', 'England', 15, 'Forward', 47),
('Jude Smith', '2004-01-05', 'England', 15, 'Goalkeeper', 48),


('Carlos Miguel', '1999-06-03', 'Brazil', 16, 'Goalkeeper', 1),
('Neco Williams', '2001-04-11', 'Wales', 16, 'Defender', 22),
('Murillo', '2002-07-04', 'Brazil', 16, 'Defender', 5),
('Nikola Milenkovic', '1997-10-12', 'Serbia', 16, 'Defender', 4),
('Álex Moreno', '1993-06-08', 'Spain', 16, 'Defender', 3),
('James Ward-Prowse', '1994-11-01', 'England', 16, 'Midfielder', 8),
('Elliot Anderson', '2002-11-06', 'Scotland', 16, 'Midfielder', 28),
('Morgan Gibbs-White', '2000-01-27', 'England', 16, 'Midfielder', 10),
('Jota Silva', '1999-08-01', 'Portugal', 16, 'Forward', 20),
('Taiwo Awoniyi', '1997-08-12', 'Nigeria', 16, 'Forward', 9),
('Chris Wood', '1991-12-07', 'New Zealand', 16, 'Forward', 7),
('Matz Sels', '1992-02-26', 'Belgium', 16, 'Goalkeeper', 31),
('Harry Toffolo', '1995-12-19', 'England', 16, 'Defender', 14),
('Andrew Omobamidele', '2002-06-23', 'Ireland', 16, 'Defender', 34),
('Eric da Silva Moreira', '2006-05-03', 'Brazil', 16, 'Defender', 18),
('Willy Boly', '1991-02-03', 'Ivory Coast', 16, 'Defender', 6),
('Ola Aina', '1996-10-08', 'Nigeria', 16, 'Defender', 2),
('Zach Abbott', '2005-05-10', 'England', 16, 'Defender', 24),
('Ibrahim Sangare', '1997-12-13', 'Ivory Coast', 16, 'Midfielder', 32),
('Nicolás Domínguez', '1998-06-28', 'Argentina', 16, 'Midfielder', 21),
('Ryan Yates', '1997-11-21', 'England', 16, 'Midfielder', 16),
('Danilo', '2001-04-29', 'Brazil', 16, 'Midfielder', 13),
('Anthony Elanga', '2002-04-27', 'Sweden', 16, 'Forward', 11),
('Callum Hudson-Odoi', '2000-10-07', 'England', 16, 'Forward', 17),
('Emmanuel Dennis', '1997-11-15', 'Nigeria', 16, 'Forward', 25),
('Ramón Sosa', '1999-08-31', 'Paraguay', 16, 'Forward', 27),
('Hwang Ui‑jo', '1992-08-28', 'South Korea', 16, 'Forward', 19),
('Morato', '2001-06-17', 'Brazil', 16, 'Defender', 29),
('Joe Worrall', '1997-01-10', 'England', 16, 'Defender', 5),
('Omar Richards', '1998-02-15', 'England', 16, 'Defender', 12),
('Josh Bowler', '1999-03-05', 'England', 16, 'Midfielder', 30),
('Matt Turner', '1994-06-24', 'USA', 16, 'Goalkeeper', 1),
('Marko Stamenic', '2002-02-19', 'New Zealand', 16, 'Midfielder', 33),
('David Carmo', '1999-07-19', 'Portugal', 16, 'Defender', 15),


('Alex McCarthy', '1989-12-03', 'English', 17, 'Goalkeeper', 1),
('Kyle Walker-Peters', '1997-04-13', 'English', 17, 'Defender', 2),
('Taylor Harwood-Bellis', '2002-01-23', 'English', 17, 'Defender', 6),
('Jack Stephens', '1994-01-27', 'English', 17, 'Defender', 5),
('Ryan Manning', '1996-06-14', 'Irish', 17, 'Defender', 3),
('Flynn Downes', '1999-01-20', 'English', 17, 'Midfielder', 8),
('Joe Aribo', '1996-07-21', 'Nigerian', 17, 'Midfielder', 7),
('Will Smallbone', '2000-02-21', 'Irish', 17, 'Midfielder', 18),
('Adam Lallana', '1988-05-10', 'English', 17, 'Midfielder', 10),
('Ben Brereton Diaz', '1999-04-18', 'Chilean', 17, 'Forward', 9),
('Adam Armstrong', '1997-02-10', 'English', 17, 'Forward', 22),
('Ross Stewart', '1996-07-28', 'Scottish', 17, 'Forward', 17),
('Ronnie Edwards', '2003-03-28', 'English', 17, 'Defender', 23),
('Nathan Wood', '2002-05-31', 'English', 17, 'Defender', 4),
('Yukinari Sugawara', '2000-06-28', 'Japanese', 17, 'Defender', 25),
('Charlie Taylor', '1993-09-18', 'English', 17, 'Defender', 15),
('Charly Alcaraz', '2002-11-30', 'Argentine', 17, 'Midfielder', 28),
('Sam Edozie', '2003-01-28', 'English', 17, 'Forward', 27),
('Shea Charles', '2003-02-05', 'Northern Irish', 17, 'Midfielder', 30),
('Kamaldeen Sulemana', '2002-02-06', 'Ghanaian', 17, 'Forward', 21),
('Sékou Mara', '2002-07-30', 'French', 17, 'Forward', 29),
('James Bree', '1997-12-11', 'English', 17, 'Defender', 11),
('Juan Larios', '2004-03-12', 'Spanish', 17, 'Defender', 12),
('Joachim Kayi Sanda', '2006-11-29', 'French', 17, 'Midfielder', 14),
('Welington', '2001-02-19', 'Brazilian', 17, 'Defender', 19),
('Mateus Fernandes', '2004-06-30', 'Portuguese', 17, 'Midfielder', 20),
('Albert Gronbak', '2002-05-23', 'Danish', 17, 'Midfielder', 24),
('Lesley Ugochukwu', '2004-03-26', 'French', 17, 'Midfielder', 26),
('Romeo Akachukwu', '2005-01-01', 'Nigerian', 17, 'Midfielder', 31),
('Noel Buck', '2005-04-06', 'American', 17, 'Midfielder', 32),
('Maxwel Cornet', '2006-03-15', 'Ivorian', 17, 'Forward', 33),
('Rory MacLeod', '2005-01-22', 'Scottish', 17, 'Forward', 34),
('Izzet Furkan Malak', '2007-03-12', 'Turkish', 17, 'Midfielder', 35),
('Rento Takaoka', '2007-03-12', 'Japanese', 17, 'Forward', 36),


('Guglielmo Vicario', '1996-10-07', 'Italy', 18, 'Goalkeeper', 1),
('Fraser Forster', '1988-03-17', 'England', 18, 'Goalkeeper', 13),
('Antonín Kinsky', '2003-03-13', 'Czech Republic', 18, 'Goalkeeper', 42),
('Brandon Austin', '1999-01-07', 'England', 18, 'Goalkeeper', 44),
('Alfie Whiteman', '1998-10-02', 'England', 18, 'Goalkeeper', 42),
('Sergio Reguilon', '1996-12-16', 'Spain', 18, 'Defender', 3),
('Kevin Danso', '1998-09-19', 'Austria', 18, 'Defender', 25),
('Radu Dragușin', '2002-02-03', 'Romania', 18, 'Defender', 45),
('Destiny Udogie', '2002-11-28', 'Italy', 18, 'Defender', 2),
('Cristian Romero', '1998-04-27', 'Argentina', 18, 'Defender', 4),
('Pedro Porro', '1999-09-13', 'Spain', 18, 'Defender', 24),
('Djed Spence', '2000-08-09', 'England', 18, 'Defender', 15),
('Ben Davies', '1993-04-24', 'Wales', 18, 'Defender', 33),
('Micky van de Ven', '2001-04-19', 'Netherlands', 18, 'Defender', 20),
('Yves Bissouma', '1996-08-30', 'Mali', 18, 'Midfielder', 8),
('James Maddison', '1996-11-23', 'England', 18, 'Midfielder', 10),
('Archie Gray', '2006-03-12', 'England', 18, 'Midfielder', 37),
('Lucas Bergvall', '2006-02-02', 'Sweden', 18, 'Midfielder', 39),
('Dejan Kulusevski', '2000-04-25', 'Sweden', 18, 'Forward', 21),
('Pape Matar Sarr', '2002-09-14', 'Senegal', 18, 'Midfielder', 29),
('Rodrigo Bentancur', '1997-06-25', 'Uruguay', 18, 'Midfielder', 30),
('Son Heung-min', '1992-07-08', 'South Korea', 18, 'Forward', 7),
('Richarlison', '1997-05-10', 'Brazil', 18, 'Forward', 9),
('Mathys Tel', '2005-04-27', 'France', 18, 'Forward', 11),
('Timo Werner', '1996-03-06', 'Germany', 18, 'Forward', 18),
('Dominic Solanke', '1997-09-14', 'England', 18, 'Forward', 23),
('Brennan Johnson', '2001-05-23', 'Wales', 18, 'Forward', 20),
('Wilson Odobert', '2004-11-28', 'France', 18, 'Forward', 19),
('Dane Scarlett', '2004-03-24', 'England', 18, 'Forward', 47),


('Alphonse Areola', '1993-02-27', 'France', 19, 'Goalkeeper', 13),
('Łukasz Fabianski', '1985-04-18', 'Poland', 19, 'Goalkeeper', 1),
('Wes Foderingham', '1991-01-14', 'England', 19, 'Goalkeeper', 12),
('Vladimir Coufal', '1992-08-22', 'Czech Republic', 19, 'Defender', 5),
('Maximilian Kilman', '1997-05-23', 'England', 19, 'Defender', 23),
('Jean-Clair Todibo', '1999-12-30', 'France', 19, 'Defender', 4),
('Emerson Palmieri', '1994-08-03', 'Italy', 19, 'Defender', 33),
('Aaron Cresswell', '1989-12-15', 'England', 19, 'Defender', 3),
('Aaron Wan-Bissaka', '1997-11-26', 'England', 19, 'Defender', 29),
('Kurt Zouma', '1994-10-27', 'France', 19, 'Defender', 15),
('Konstantinos Mavropanos', '1997-12-11', 'Greece', 19, 'Defender', 16),
('Nayef Aguerd', '1996-03-30', 'Morocco', 19, 'Defender', 2),
('Edson Alvarez', '1997-10-24', 'Mexico', 19, 'Defensive Midfielder', 6),
('James Ward-Prowse', '1994-11-01', 'England', 19, 'Midfielder', 7),
('Carlos Soler', '1997-01-02', 'Spain', 19, 'Midfielder', 22),
('Tomas Soucek', '1995-02-27', 'Czech Republic', 19, 'Midfielder', 28),
('Guido Rodriguez', '1994-04-12', 'Argentina', 19, 'Midfielder', 18),
('Andy Irving', '2000-05-13', 'Scotland', 19, 'Midfielder', 8),
('Lucas Paqueta', '1997-08-27', 'Brazil', 19, 'Attacking Midfielder', 11),
('Jarrod Bowen', '1996-12-20', 'England', 19, 'Forward', 20),
('Mohammed Kudus', '2000-08-02', 'Ghana', 19, 'Forward', 14),
('Crysencio Summerville', '2001-10-30', 'Netherlands', 19, 'Forward', 19),
('Maxwel Cornet', '1996-09-27', 'Ivory Coast', 19, 'Forward', 27),
('Michail Antonio', '1990-03-28', 'Jamaica', 19, 'Forward', 30),
('Danny Ings', '1992-07-23', 'England', 19, 'Forward', 9),
('Evan Ferguson', '2004-10-19', 'Ireland', 19, 'Forward', 29),
('Ezra Mayers', '2005-01-01', 'England', 19, 'Forward', 35),


('Jose Sa', '1992-01-17', 'Portugal', 20, 'Goalkeeper', 1),
('Daniel Bentley', '1992-05-25', 'England', 20, 'Goalkeeper', 12),
('Sam Johnstone', '1993-01-31', 'England', 20, 'Goalkeeper', 13),
('Tom King', '1993-08-25', 'Wales', 20, 'Goalkeeper', 14),
('Matt Doherty', '1992-10-18', 'Republic of Ireland', 20, 'Defender', 2),
('Rayan Ait-Nouri', '2001-06-06', 'France', 20, 'Defender', 3),
('Santiago Bueno', '1998-01-23', 'Uruguay', 20, 'Defender', 4),
('Emmanuel Agbadou', '1999-12-11', 'Ivory Coast', 20, 'Defender', 5),
('Yerson Mosquera', '2001-05-02', 'Colombia', 20, 'Defender', 6),
('Craig Dawson', '1986-05-22', 'England', 20, 'Defender', 7),
('Nélson Semedo', '1993-11-16', 'Portugal', 20, 'Defender', 8),
('Toti', '1999-01-16', 'Portugal', 20, 'Defender', 9),
('Bastien Meupiyou', '2006-03-19', 'France', 20, 'Defender', 10),
('Boubacar Traore', '2002-06-30', 'Mali', 20, 'Midfielder', 15),
('Joao Gomes', '2000-06-20', 'Brazil', 20, 'Midfielder', 16),
('Jean-Ricner Bellegarde', '1997-05-27', 'France', 20, 'Midfielder', 17),
('Tommy Doyle', '2006-11-20', 'England', 20, 'Midfielder', 18),
('Luke Rawlings', '2006-03-25', 'England', 20, 'Midfielder', 19),
('Nathan Fraser', '2003-04-10', 'England', 20, 'Forward', 20),
('Jorgen Strand Larsen', '2005-06-20', 'Norway', 20, 'Forward', 21),
('Matheus Cunha', '1999-05-03', 'Brazil', 20, 'Forward', 22),
('Hwang Hee-chan', '1996-01-26', 'South Korea', 20, 'Forward', 23),
('Saša Kalajdzic', '1997-09-07', 'Austria', 20, 'Forward', 24),
('Rodrigo Gomes', '1997-01-09', 'Brazil', 20, 'Forward', 25),
('Pablo Sarabia', '1993-11-14', 'Spain', 20, 'Forward', 26),
('Carlos Forbs', '2001-04-03', 'Portugal', 20, 'Forward', 27),
('Gonçalo Guedes', '2002-09-21', 'Portugal', 20, 'Forward', 28),
('Enso González', '2003-09-21', 'Paraguay', 20, 'Forward', 29),
('Marshall Munetsi', '1996-01-25', 'Zimbabwe', 20, 'Midfielder', 30),
('Carlos Soler', '2004-01-03', 'Spain', 20, 'Midfielder', 31),
('Michael Cuisance', '2003-04-19', 'France', 20, 'Midfielder', 32),
('Jack Hinshelwood', '2003-06-21', 'England', 20, 'Midfielder', 33),
('Cameron Peupion', '2000-03-04', 'Australia', 20, 'Midfielder', 34),

('Jake Bidwell', '1993-03-21', 'England', 21, 'Defender', 21),
('Haji Wright', '1998-03-27', 'USA', 21, 'Forward', 11),
('Brandon Thomas-Asante', '1998-11-30', 'Ghana', 21, 'Forward', 23),
('Josh Eccles', '2000-04-06', 'England', 21, 'Midfielder', 28),
('Miguel Ángel Brau', '2001-12-27', 'Spain', 21, 'Defender', 33),
('Kaine Kesler-Hayden', '2002-10-23', 'England', 21, 'Midfielder', 20),
('Matt Grimes', '1995-07-15', 'England', 21, 'Midfielder', 6),
('Ephron Mason-Clark', '1999-08-25', 'England', 21, 'Midfielder', 10),
('Carl Rushworth', '2001-07-02', 'England', 21, 'Goalkeeper', 19),
('Victor Torp', '1999-07-30', 'Denmark', 21, 'Midfielder', 29),
('Jahnoah Markelo', '2004-01-03', 'Nigeria', 21, 'Forward', 24),
('Oliver Dovin', '2002-07-11', 'Sweden', 21, 'Goalkeeper', 1),
('Ellis Simms', '2001-01-05', 'England', 21, 'Forward', 9),
('Ben Wilson', '1992-08-09', 'England', 21, 'Goalkeeper', 13),
('Milan van Ewijk', '2000-09-08', 'Netherlands', 21, 'Defender', 27),
('Luke Woolfenden', '1998-10-21', 'England', 21, 'Defender', 26),
('Jay Dasilva', '1998-04-22', 'Wales', 21, 'Defender', 3),
('Yang Min-hyeok', '2006-04-16', 'South Korea', 21, 'Midfielder', 18),
('Jack Rudoni', '2001-06-14', 'England', 21, 'Midfielder', 5),
('Frank Onyeka', '1998-01-01', 'Nigeria', 21, 'Midfielder', 15),
('Jamie Allen', '1995-01-29', 'England', 21, 'Midfielder', 8),
('Liam Kitching', '1999-10-01', 'England', 21, 'Defender', 15),
('Joel Latibeaudiere', '2000-01-06', 'Jamaica', 21, 'Defender', 22),
('Bobby Thomas', '2001-01-30', 'England', 21, 'Defender', 4),
('Tatsuhiro Sakamoto', '1996-10-22', 'Japan', 21, 'Midfielder', 7),
('Romain Esse', '2005-05-13', 'England', 21, 'Midfielder', 21);






