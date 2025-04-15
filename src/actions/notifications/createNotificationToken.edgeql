INSERT NotificationToken {
  token := <str>$token,
  tournamentId := <str>$tournamentId,
  user := (SELECT User FILTER .email = <str>$email LIMIT 1)
};