CREATE MIGRATION m1ktdeocvdhjymrm3hruao7xvmipsaujrzqyxayugwgo3ktznhwxsq
    ONTO m1coyd5smo5q4js43jkbki2yzqq7au2cm76ioyuvvxktrk7tgaalfq
{
  CREATE TYPE default::NotificationToken {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY token: std::str;
      CREATE REQUIRED PROPERTY tournamentId: std::str;
  };
};
