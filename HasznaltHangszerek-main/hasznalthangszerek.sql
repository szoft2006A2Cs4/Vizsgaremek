-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 27. 10:48
-- Kiszolgáló verziója: 9.9.0
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `hh`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `category`
--

CREATE TABLE `category` (
  `cname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `category`
--

INSERT INTO `category` (`cname`) VALUES
('Billentyűs hangszerek'),
('Elektronikus hangszerek'),
('Fúvós hangszerek'),
('Húros hangszerek'),
('Ütős hangszerek');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `instrument`
--

CREATE TABLE `instrument` (
  `iid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `iname` varchar(100) NOT NULL,
  `cost` int(11) NOT NULL,
  `scname` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `sold` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderinfo`
--

CREATE TABLE `orderinfo` (
  `oid` int(11) NOT NULL,
  `dateOfPurchase` date NOT NULL,
  `deliveryCity` varchar(50) NOT NULL,
  `deliveryStreet` varchar(50) NOT NULL,
  `deliveryPC` int(11) NOT NULL,
  `iid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `subcategory`
--

CREATE TABLE `subcategory` (
  `scname` varchar(100) NOT NULL,
  `cname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `subcategory`
--

INSERT INTO `subcategory` (`scname`, `cname`) VALUES
('Csembaló', 'Billentyűs hangszerek'),
('Digitális Zongora', 'Billentyűs hangszerek'),
('MIDI billentyűzet', 'Billentyűs hangszerek'),
('Orgona', 'Billentyűs hangszerek'),
('Zongora', 'Billentyűs hangszerek'),
('Drum machine', 'Elektronikus hangszerek'),
('Groovebox', 'Elektronikus hangszerek'),
('Loop station', 'Elektronikus hangszerek'),
('Sampler', 'Elektronikus hangszerek'),
('Szintetizátor', 'Elektronikus hangszerek'),
('Theremin', 'Elektronikus hangszerek'),
('Duda', 'Fúvós hangszerek'),
('Fagott', 'Fúvós hangszerek'),
('Furulya', 'Fúvós hangszerek'),
('Fuvola', 'Fúvós hangszerek'),
('Harsona', 'Fúvós hangszerek'),
('Klarinét', 'Fúvós hangszerek'),
('Kürt', 'Fúvós hangszerek'),
('Oboa', 'Fúvós hangszerek'),
('Pánsíp', 'Fúvós hangszerek'),
('Pikoló', 'Fúvós hangszerek'),
('Szaxofon', 'Fúvós hangszerek'),
('Tilinkó', 'Fúvós hangszerek'),
('Trombita', 'Fúvós hangszerek'),
('Tuba', 'Fúvós hangszerek'),
('Akusztikus gitár', 'Húros hangszerek'),
('Banjo', 'Húros hangszerek'),
('Basszusgitár', 'Húros hangszerek'),
('Brácsa', 'Húros hangszerek'),
('Citera', 'Húros hangszerek'),
('Cselló', 'Húros hangszerek'),
('Hárfa', 'Húros hangszerek'),
('Hegedű', 'Húros hangszerek'),
('Lant', 'Húros hangszerek'),
('Mandolin', 'Húros hangszerek'),
('Nagybőgő', 'Húros hangszerek'),
('Ukulele', 'Húros hangszerek'),
('Cintányér', 'Ütős hangszerek'),
('Csörgődob', 'Ütős hangszerek'),
('Dobkészlet', 'Ütős hangszerek'),
('Elektromos dob', 'Ütős hangszerek'),
('Guiro', 'Ütős hangszerek'),
('Harangjáték', 'Ütős hangszerek'),
('Kalimba', 'Ütős hangszerek'),
('Kézi dob', 'Ütős hangszerek'),
('Maracas', 'Ütős hangszerek'),
('Shaker', 'Ütős hangszerek'),
('Tamburin', 'Ütős hangszerek'),
('Vibrafon', 'Ütős hangszerek');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `uname` varchar(75) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pnumber` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `review` float NOT NULL,
  `postalcode` int(11) NOT NULL,
  `city` varchar(100) NOT NULL,
  `streetHnum` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  `token` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`uid`, `uname`, `email`, `pnumber`, `password`, `review`, `postalcode`, `city`, `streetHnum`, `role`, `token`) VALUES
(1, 'Dodo', 'simon.dominik@hbsz.edu.hu', 306015420, 's2nTHSiywAIw++CkuOqU/Q==.oo5tkodA8DDSfRtqaoKSJTA23xdlOCijOBWloahMHyQ=', 5, 9700, 'Szombathely', 'Bogáti út 70', 'Admin', NULL),
(2, 'Czibi', 'czibók.bence@hbsz.edu.hu', 301234567, 'Th80l+sJoQiVdWVZAvNChA==.0F/tfWsW04TRO2re9SAZ/UW9czK4TiICOCQyzudw8n0=', 5, 9754, 'Pecöl', 'József Attila utca 2', 'User', NULL),
(17, 'Németh Balázs', 'nemeth.balazs@hbsz.edu.hu', 301234567, 'aTVWSCBL3lDQnErGPCnAmQ==.4WBe4nzLhfNGiU/fCrde4tqKbDy0uox91YIAjM4NscA=', 5, 9756, 'Bozzai', 'Petőfi Sándor u. 67', 'Guest', 'string');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cname`);

--
-- A tábla indexei `instrument`
--
ALTER TABLE `instrument`
  ADD PRIMARY KEY (`iid`),
  ADD KEY `fk_instrument_subcategory` (`scname`),
  ADD KEY `fk_instrument_user` (`uid`);

--
-- A tábla indexei `orderinfo`
--
ALTER TABLE `orderinfo`
  ADD PRIMARY KEY (`oid`),
  ADD UNIQUE KEY `iid` (`iid`);

--
-- A tábla indexei `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`scname`),
  ADD KEY `fk_subcategory_category` (`cname`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `instrument`
--
ALTER TABLE `instrument`
  MODIFY `iid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT a táblához `orderinfo`
--
ALTER TABLE `orderinfo`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `instrument`
--
ALTER TABLE `instrument`
  ADD CONSTRAINT `fk_instrument_subcategory` FOREIGN KEY (`scname`) REFERENCES `subcategory` (`scname`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_instrument_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `instrument_ibfk_2` FOREIGN KEY (`scname`) REFERENCES `subcategory` (`scname`);

--
-- Megkötések a táblához `orderinfo`
--
ALTER TABLE `orderinfo`
  ADD CONSTRAINT `orderinfo_ibfk_1` FOREIGN KEY (`iid`) REFERENCES `instrument` (`iid`);

--
-- Megkötések a táblához `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `fk_subcategory_category` FOREIGN KEY (`cname`) REFERENCES `category` (`cname`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
