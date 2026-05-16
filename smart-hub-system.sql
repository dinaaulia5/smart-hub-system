/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80403 (8.4.3)
 Source Host           : localhost:3306
 Source Schema         : smart-hub-system

 Target Server Type    : MySQL
 Target Server Version : 80403 (8.4.3)
 File Encoding         : 65001

 Date: 16/05/2026 11:43:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity_logs
-- ----------------------------
DROP TABLE IF EXISTS `activity_logs`;
CREATE TABLE `activity_logs`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `loggable_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `loggable_type` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `browser` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `os` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `activity_logs_user_id_foreign`(`user_id` ASC) USING BTREE,
  CONSTRAINT `activity_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity_logs
-- ----------------------------
INSERT INTO `activity_logs` VALUES ('12f9e915-d1cf-4945-a130-8a8fe9d62cde', '019e2efc-34fa-7157-86be-7ef00cc7b4be', 'Dina Nur Auliana updated booking reservation', '019e2f00-ed20-7196-affb-db8428a1e7bc', 'App\\Models\\Booking', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:27:03', '2026-05-16 04:27:03');
INSERT INTO `activity_logs` VALUES ('13892a89-dfa3-4927-a15f-7a867eadc519', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Creted equipment data', '019e2ef7-8a90-7226-9dfd-eff49ce09e8b', 'App\\Models\\Equipment', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:07:15', '2026-05-16 04:07:15');
INSERT INTO `activity_logs` VALUES ('29b129fc-e0cb-4afc-b086-cffa5130725d', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Created room data', '019e2ef2-679a-73cf-8a57-c9e401b611c6', 'App\\Models\\Room', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:01:38', '2026-05-16 04:01:38');
INSERT INTO `activity_logs` VALUES ('3249a5de-d58e-4f15-846d-43319715d3e7', '019e2ef9-386e-72be-b9b9-ee9e4dee475d', 'Dina Nur Auliana created a new booking reservation from web', '019e2efb-a805-70a9-b833-11baa7535d2b', 'App\\Models\\Booking', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:11:45', '2026-05-16 04:11:45');
INSERT INTO `activity_logs` VALUES ('6a6578e2-38ab-4aa3-970d-903e0015b78b', '019e2ef9-386e-72be-b9b9-ee9e4dee475d', 'User logged out', '019e2ef9-386e-72be-b9b9-ee9e4dee475d', 'App\\Models\\User', '127.0.0.1', 'Unknown', 'Unknown', 'PostmanRuntime/7.54.0', '2026-05-16 04:25:49', '2026-05-16 04:25:49');
INSERT INTO `activity_logs` VALUES ('72159aca-a686-4e12-9b9a-77f567cd2122', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Created room data', '019e2ef5-f5ac-7220-932f-38faaf1ad278', 'App\\Models\\Room', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:05:31', '2026-05-16 04:05:31');
INSERT INTO `activity_logs` VALUES ('80daa07b-6018-485d-a7f1-381a620c09b1', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Creted equipment data', '019e2ef8-0d6e-7058-b6a1-50790a6e98c2', 'App\\Models\\Equipment', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:07:48', '2026-05-16 04:07:48');
INSERT INTO `activity_logs` VALUES ('87d6928e-3741-4a35-927a-a810ecf5f836', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana created user data', '019e2efc-34fa-7157-86be-7ef00cc7b4be', 'App\\Models\\User', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:12:21', '2026-05-16 04:12:21');
INSERT INTO `activity_logs` VALUES ('8c250aa7-feac-427d-8813-b644770dd276', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Created room data', '019e2ef2-e681-72d2-85ba-37739476ad48', 'App\\Models\\Room', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:02:11', '2026-05-16 04:02:11');
INSERT INTO `activity_logs` VALUES ('a3dbf03e-eb25-4a2f-91eb-2b1ae93e7cb7', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana created user data', '019e2ef9-386e-72be-b9b9-ee9e4dee475d', 'App\\Models\\User', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:09:05', '2026-05-16 04:09:05');
INSERT INTO `activity_logs` VALUES ('a785bdf6-f947-43de-8d8c-331fad035299', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Creted equipment data', '019e2ef8-69e7-720f-81f8-426a1a12a4b6', 'App\\Models\\Equipment', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:08:12', '2026-05-16 04:08:12');
INSERT INTO `activity_logs` VALUES ('b751a0bb-d888-4ef2-80f0-83622dbb73fc', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Creted equipment data', '019e2ef6-eda4-7260-b3e1-3a00d91c00d0', 'App\\Models\\Equipment', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:06:35', '2026-05-16 04:06:35');
INSERT INTO `activity_logs` VALUES ('b8a224b3-643a-4099-abc9-de510b86b78d', '019e2efc-34fa-7157-86be-7ef00cc7b4be', 'Dina Nur Auliana updated booking reservation', '019e2f00-ed20-7196-affb-db8428a1e7bc', 'App\\Models\\Booking', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:27:28', '2026-05-16 04:27:28');
INSERT INTO `activity_logs` VALUES ('c1430f9e-8fb2-4687-a3d8-f58668811e86', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Creted equipment data', '019e2ef6-7ffe-71dc-addb-56e3ce1eff64', 'App\\Models\\Equipment', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:06:07', '2026-05-16 04:06:07');
INSERT INTO `activity_logs` VALUES ('c9d688a7-443a-47c2-b1f5-6ff1ffdc9aba', '019e2ee6-abac-705d-b3a8-0ce5a2fe8690', 'Dina Nur Auliana created a new booking reservation from web', '019e2f00-ed20-7196-affb-db8428a1e7bc', 'App\\Models\\Booking', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:17:30', '2026-05-16 04:17:30');
INSERT INTO `activity_logs` VALUES ('de34ed3e-6bfa-42a9-9495-db0a9d3ad092', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Created room data', '019e2ef3-d1ba-73b9-9281-3d0356448ad8', 'App\\Models\\Room', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:03:11', '2026-05-16 04:03:11');
INSERT INTO `activity_logs` VALUES ('ea870e1c-9641-471e-892e-da3f8fb9de90', '019e2ef9-386e-72be-b9b9-ee9e4dee475d', 'User berhasil melakukan check-in booking', '019e2efb-a805-70a9-b833-11baa7535d2b', 'App\\Models\\Booking', '127.0.0.1', 'Unknown', 'Unknown', 'PostmanRuntime/7.54.0', '2026-05-16 04:25:09', '2026-05-16 04:25:09');
INSERT INTO `activity_logs` VALUES ('f118e4d1-7030-43aa-93f5-63c4596d8e3e', '019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana Created room data', '019e2ef3-634d-7107-a53b-bcc5c5325abf', 'App\\Models\\Room', '127.0.0.1', 'Chrome', 'Windows', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-16 04:02:43', '2026-05-16 04:02:43');
INSERT INTO `activity_logs` VALUES ('fc760531-5d1c-4869-945c-aa114e149286', '019e2efc-34fa-7157-86be-7ef00cc7b4be', 'User berhasil melakukan check-in booking', '019e2f00-ed20-7196-affb-db8428a1e7bc', 'App\\Models\\Booking', '127.0.0.1', 'Unknown', 'Unknown', 'PostmanRuntime/7.54.0', '2026-05-16 04:28:39', '2026-05-16 04:28:39');

-- ----------------------------
-- Table structure for booking_items
-- ----------------------------
DROP TABLE IF EXISTS `booking_items`;
CREATE TABLE `booking_items`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `booking_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookable_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bookable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `booking_items_booking_id_foreign`(`booking_id` ASC) USING BTREE,
  CONSTRAINT `booking_items_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of booking_items
-- ----------------------------
INSERT INTO `booking_items` VALUES ('019e2efb-a833-71eb-b713-eca16c7c6bc2', '019e2efb-a805-70a9-b833-11baa7535d2b', '019e2ef2-679a-73cf-8a57-c9e401b611c6', 'App\\Models\\Room', 1, '2026-05-16 04:11:45', '2026-05-16 04:11:45');
INSERT INTO `booking_items` VALUES ('019e2f0a-0c41-7294-93db-9e2a7bc1a40a', '019e2f00-ed20-7196-affb-db8428a1e7bc', '019e2ef6-7ffe-71dc-addb-56e3ce1eff64', 'App\\Models\\Equipment', 2, '2026-05-16 04:27:28', '2026-05-16 04:27:28');
INSERT INTO `booking_items` VALUES ('019e2f0a-0c51-73e7-a2ed-c7f87f91c8af', '019e2f00-ed20-7196-affb-db8428a1e7bc', '019e2ef2-e681-72d2-85ba-37739476ad48', 'App\\Models\\Room', 1, '2026-05-16 04:27:28', '2026-05-16 04:27:28');

-- ----------------------------
-- Table structure for bookings
-- ----------------------------
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `check_in_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','active','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bookings_user_id_foreign`(`user_id` ASC) USING BTREE,
  CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bookings
-- ----------------------------
INSERT INTO `bookings` VALUES ('019e2efb-a805-70a9-b833-11baa7535d2b', '019e2ef9-386e-72be-b9b9-ee9e4dee475d', '2026-05-16 11:15:00', '2026-05-16 13:00:00', '2026-05-16 11:25:09', 'active', '2026-05-16 04:11:45', '2026-05-16 04:25:09');
INSERT INTO `bookings` VALUES ('019e2f00-ed20-7196-affb-db8428a1e7bc', '019e2efc-34fa-7157-86be-7ef00cc7b4be', '2026-05-16 11:17:00', '2026-05-16 01:17:00', '2026-05-16 11:28:39', 'active', '2026-05-16 04:17:30', '2026-05-16 04:28:39');

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`) USING BTREE,
  INDEX `cache_expiration_index`(`expiration` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache
-- ----------------------------

-- ----------------------------
-- Table structure for cache_locks
-- ----------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`) USING BTREE,
  INDEX `cache_locks_expiration_index`(`expiration` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache_locks
-- ----------------------------

-- ----------------------------
-- Table structure for equipments
-- ----------------------------
DROP TABLE IF EXISTS `equipments`;
CREATE TABLE `equipments`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` smallint NOT NULL,
  `status` enum('available','maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of equipments
-- ----------------------------
INSERT INTO `equipments` VALUES ('019e2ef6-7ffe-71dc-addb-56e3ce1eff64', 'Kamera Canon EOS R50', 'Canon', 2, 'available', '2026-05-16 04:06:07', '2026-05-16 04:27:28');
INSERT INTO `equipments` VALUES ('019e2ef6-eda4-7260-b3e1-3a00d91c00d0', 'Microphone Wireless GO II', 'Rode', 8, 'available', '2026-05-16 04:06:35', '2026-05-16 04:06:35');
INSERT INTO `equipments` VALUES ('019e2ef7-8a90-7226-9dfd-eff49ce09e8b', 'Tripod Professional', 'Takara', 6, 'available', '2026-05-16 04:07:15', '2026-05-16 04:07:15');
INSERT INTO `equipments` VALUES ('019e2ef8-0d6e-7058-b6a1-50790a6e98c2', 'Laptop Editing', 'ASUS ROG', 3, 'available', '2026-05-16 04:07:48', '2026-05-16 04:07:48');
INSERT INTO `equipments` VALUES ('019e2ef8-69e7-720f-81f8-426a1a12a4b6', 'Lighting Softbox Kit', 'Godox', 4, 'available', '2026-05-16 04:08:12', '2026-05-16 04:08:12');

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for job_batches
-- ----------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `cancelled_at` int NULL DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job_batches
-- ----------------------------

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED NULL DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `jobs_queue_index`(`queue` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2026_05_10_061923_create_bookings_table', 1);
INSERT INTO `migrations` VALUES (5, '2026_05_10_075608_create_activity_logs_table', 1);
INSERT INTO `migrations` VALUES (6, '2026_05_10_080616_create_rooms_table', 1);
INSERT INTO `migrations` VALUES (7, '2026_05_10_080640_create_equipments_table', 1);
INSERT INTO `migrations` VALUES (8, '2026_05_11_081016_create_booking_items_table', 1);
INSERT INTO `migrations` VALUES (9, '2026_05_11_094144_create_personal_access_tokens_table', 1);

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token` ASC) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type` ASC, `tokenable_id` ASC) USING BTREE,
  INDEX `personal_access_tokens_expires_at_index`(`expires_at` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------
INSERT INTO `personal_access_tokens` VALUES (2, 'App\\Models\\User', '019e2efc-34fa-7157-86be-7ef00cc7b4be', 'api-token', '0992774ea5bd3b0d9c8a738c266abe27dd3bbaa9759f26883ae195ea18ff6eef', '[\"*\"]', '2026-05-16 04:28:39', NULL, '2026-05-16 04:26:15', '2026-05-16 04:28:39');

-- ----------------------------
-- Table structure for rooms
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` smallint NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('available','not_available') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES ('019e2ef2-679a-73cf-8a57-c9e401b611c6', 'Ruang Meeting Alpha', 'RM-001', 10, 'Lantai 1', 'not_available', '2026-05-16 04:01:38', '2026-05-16 04:11:45');
INSERT INTO `rooms` VALUES ('019e2ef2-e681-72d2-85ba-37739476ad48', 'Studio Podcast', 'RM-002', 4, 'Lantai 2', 'not_available', '2026-05-16 04:02:11', '2026-05-16 04:27:28');
INSERT INTO `rooms` VALUES ('019e2ef3-634d-7107-a53b-bcc5c5325abf', 'Co-Working Space A', 'RM-003', 20, 'Lantai 12', 'available', '2026-05-16 04:02:43', '2026-05-16 04:02:43');
INSERT INTO `rooms` VALUES ('019e2ef3-d1ba-73b9-9281-3d0356448ad8', 'Ruang Editing Video', 'RM-004', 6, 'Lantai 3', 'not_available', '2026-05-16 04:03:11', '2026-05-16 04:03:11');
INSERT INTO `rooms` VALUES ('019e2ef5-f5ac-7220-932f-38faaf1ad278', 'Studio Fotografi', 'RM-005', 1, 'Lantai 4', 'available', '2026-05-16 04:05:31', '2026-05-16 04:05:31');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NULL DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sessions_user_id_index`(`user_id` ASC) USING BTREE,
  INDEX `sessions_last_activity_index`(`last_activity` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('019e2ee6-abac-705d-b3a8-0ce5a2fe8690', 'Test User', 'test@example.com', '2026-05-16 03:48:49', '$2y$12$86GzPaeov1mKpeGoXMaPF.tcA3BncWibUV.LtEFN/lUa4CqA2gQMG', 'user', 'YJmDQDrnE2', '2026-05-16 03:48:49', '2026-05-16 03:48:49');
INSERT INTO `users` VALUES ('019e2eed-58bf-7337-93b3-ac78bf9713b9', 'Dina Nur Auliana', 'admin@test.com', NULL, '$2y$12$WkBJeKWGenD086C7r7vLouf2zR7jaO27eqF2fuslFHAqjfezT0ENG', 'admin', NULL, '2026-05-16 03:56:07', '2026-05-16 03:56:07');
INSERT INTO `users` VALUES ('019e2ef9-386e-72be-b9b9-ee9e4dee475d', 'Kayla Rahmadani', 'user@test.com', NULL, '$2y$12$UMV.nX/7j1a20zj1e/tfoejhZESKjh1zXMmWtfdOtRK52TRR3LVty', 'user', NULL, '2026-05-16 04:09:05', '2026-05-16 04:09:05');
INSERT INTO `users` VALUES ('019e2efc-34fa-7157-86be-7ef00cc7b4be', 'Aulia Rahma', 'user1@test.com', NULL, '$2y$12$GXlTEywfLdEvnhxKvoGbpudNBP.MUkPTeRotXIN8qvRKcvTUB276y', 'user', NULL, '2026-05-16 04:12:21', '2026-05-16 04:12:21');

SET FOREIGN_KEY_CHECKS = 1;
