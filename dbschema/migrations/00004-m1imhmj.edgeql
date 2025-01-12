CREATE MIGRATION m1imhmjiro5rc5bwqs7ykyvd6mancz7bkasg4qtobhzkxdiqmz6zya
    ONTO m1ktdeocvdhjymrm3hruao7xvmipsaujrzqyxayugwgo3ktznhwxsq
{
  ALTER TYPE default::NotificationToken {
      CREATE REQUIRED LINK user: default::User {
          ON TARGET DELETE DELETE SOURCE;
          SET REQUIRED USING (<default::User>{});
      };
      ALTER PROPERTY token {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
