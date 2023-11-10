CREATE TABLE IF NOT EXISTS afk (
    userID varchar(255) PRIMARY KEY,
    guildID varchar(255) NOT NULL,
    reason varchar(255) NOT NULL,
    time INTEGER NOT NULL,
    AFK tinyint(1) NOT NULL
)