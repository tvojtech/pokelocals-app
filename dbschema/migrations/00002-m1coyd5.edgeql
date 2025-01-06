CREATE MIGRATION m1coyd5smo5q4js43jkbki2yzqq7au2cm76ioyuvvxktrk7tgaalfq
    ONTO m1aldjjjtw5zar42ajkgwdpv73ckjrac6c3yrwmbxtfwx4vtfua3fa
{
  CREATE TYPE default::Feedback {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY description: std::str;
  };
};
