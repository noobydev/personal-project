insert into users
( authid, firstname, lastname )
values
( $1, $2, $3 )
returning *;