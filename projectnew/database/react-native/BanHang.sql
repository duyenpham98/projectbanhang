-- phpMyAdmin SQL Dump
-- version 4.4.15.9
-- https://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2019 at 04:12 AM
-- Server version: 5.6.37
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `BanHang`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE IF NOT EXISTS `bill` (
  `id` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `date_order` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` float NOT NULL DEFAULT '0',
  `note` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id`, `id_customer`, `date_order`, `total`, `note`, `status`) VALUES
(2, 4, '2019-05-16 01:29:51', 267, NULL, NULL),
(3, 4, '2019-05-21 03:38:08', 143, NULL, NULL),
(4, 6, '2019-05-23 03:44:51', 124, NULL, NULL),
(5, 7, '2019-05-30 01:34:38', 143, NULL, NULL),
(6, 7, '2019-06-05 10:50:34', 281, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bill_detail`
--

CREATE TABLE IF NOT EXISTS `bill_detail` (
  `id` int(11) NOT NULL,
  `id_bill` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` float NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bill_detail`
--

INSERT INTO `bill_detail` (`id`, `id_bill`, `id_product`, `quantity`, `price`) VALUES
(1, 1, 5, 2, 124),
(2, 2, 9, 1, 124),
(3, 2, 3, 1, 143),
(4, 3, 3, 2, 143),
(5, 4, 8, 1, 124),
(6, 5, 3, 2, 143),
(7, 6, 6, 1, 135),
(8, 6, 7, 2, 146);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `link`, `id_product`) VALUES
(1, '54.jpeg', 1),
(2, '55.jpeg', 2),
(3, '56.jpeg', 3),
(4, '57.jpeg', 4),
(5, '58.jpeg', 5),
(6, '59.jpeg', 6),
(7, '60.jpeg', 7),
(8, '61.jpeg', 8),
(9, '62.jpeg', 9),
(10, '63.jpeg', 10),
(11, '64.jpeg', 11),
(12, '65.jpeg', 12),
(13, '66.jpeg', 13),
(14, '67.jpeg', 14),
(15, '70.jpeg', 15);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_type` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `material` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `new` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inCollection` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `id_type`, `price`, `color`, `material`, `description`, `new`, `inCollection`) VALUES
(3, 'star maxi dres', '2', '143', 'Wheat', 'fur', 'Command attention wherever you go in this dramatic maxi dress. A charming star design adds out-of-this-world appeal to your look, while a voluminous skirt sways with your every move.', '1', '0'),
(5, 'tropical print', '1', '157', 'DarkOliveGreen', 'cotton', 'Weddings or island destinations, this dress is ready for anything. With plunging keyhole cut-outs and skin-baring strappy sides, less is more when it comes to this dramatic look. Add a fab heel, and you''ve got effortlessly glamorous style on lock.', '0', '0'),
(6, 'high neck gode', '1', '135', 'DarkGreen', 'wool', 'A sexy, plunging neckline, open back and godet detailing on a flowing skirt...aka all the makings of our new favorite dress. Whisper-light with silky lining, this knockout number puts you at the center of attention every time. Be you, be fabulous.', '1', '1'),
(7, 'floral print s', '2', '146', 'DarkGoldenRod', 'silk', 'Let your shoulder steal the show in this sweet and sultry maxi dress featuring a smocked bodice and flowing skirt. The soft, stretchy fabric offers a perfectly comfortable fit every time, while a bold print keeps eyes on you.', '1', '0'),
(8, 'asymmetrical g', '2', '124', 'MediumSeaGreen', 'leather', 'Walk into the club or a party in confidence. An asymmetrical design adds modern flair to your look, while sleek fabric drapes over your curves comfortably. Metallic sheen draws the eye for a show-stopping ensemble.', '1', '0'),
(9, 'lace trim surp', '1', '107', 'Khaki', 'silk', 'Keep up that confidence on the breeziest evenings with this one-piece. It features the feminine charm of a wrap skirt with the coverage of shorts underneath. Pair its sexy plunging neckline with a lacy bralette to really turn up the heat.', '1', '0'),
(10, 'floral print s', '1', '123', 'Red', 'cotton', 'Let your shoulder steal the show in this sweet and sultry maxi dress featuring a smocked bodice and flowing skirt. The soft, stretchy fabric offers a perfectly comfortable fit every time, while a bold print keeps eyes on you.', '1', '0'),
(11, 'cold shoulder ', '3', '125', 'Magenta', 'silk', 'A floor-sweeping silhouette with easy wearability and a touch of elegance. The graceful flowing shape moves beautifully with each step, while cold shoulder sleeves make it flirty and fun. Glam it up with a few jewels for any special occasion.a', '0', '1'),
(12, 'chiffon halter', '3', '156', 'Cyan', 'polyesters', 'A long, flowy look with a skin-baring retro vibe, this square neck halter maxi dress is a guaranteed head-turner. Best way to turn up the drama while wearing this one? Polished bangles and a gentle breeze.', '0', '1'),
(13, 'cold shoulder ', '3', '147', 'Magenta', 'silk', 'A floor-sweeping silhouette with easy wearability and a touch of elegance. The graceful flowing shape moves beautifully with each step, while cold shoulder sleeves make it flirty and fun. Glam it up with a few jewels for any special occasion.a', '0', '0'),
(14, 'chiffon halter', '1', '189', 'Cyan', 'polyesters', 'A long, flowy look with a skin-baring retro vibe, this square neck halter maxi dress is a guaranteed head-turner. Best way to turn up the drama while wearing this one? Polished bangles and a gentle breeze.', '0', '1'),
(15, 'mesh embellish', '2', '149', 'Gainsboro', 'leather', 'Turn heads at your next get-together. Stretch-enhanced fabric clings to your curves for a slinky silhouette, while mesh panels reveal flirty peeks of skin. A circular design commands attention whether you''re on the dance floor or sipping champagne.', '1', '0');

-- --------------------------------------------------------

--
-- Table structure for table `product_type`
--

CREATE TABLE IF NOT EXISTS `product_type` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_type`
--

INSERT INTO `product_type` (`id`, `name`, `image`) VALUES
(1, 'Maxi Dress', 'maxi.jpg'),
(2, 'Party Dress', 'party.jpg'),
(3, 'Mini Dress', 'mini.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `phone`, `address`) VALUES
(4, 'duyenpham@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'duyen', '0999999', 'HCM'),
(6, 'hvgiang@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'giang', '0444444', 'Thu Duc'),
(7, 'duyen@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'duyen', '0111111', 'thu duc');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bill_detail`
--
ALTER TABLE `bill_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `bill_detail`
--
ALTER TABLE `bill_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
