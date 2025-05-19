DROP TABLE IF EXISTS dbo.settings;
CREATE TABLE dbo.settings (
  id INT AUTO_INCREMENT,
  label VARCHAR(100) NOT NULL,
  value VARCHAR(255) NOT NULL,
  is_verified BOOLEAN NOT NULL,
  PRIMARY KEY (id)
  );