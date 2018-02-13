insert into items
( product_name, price, rating, img, catagory, gender, display_name )
values
( $1, $2, $3, $4, $5, $6, $7 )
returning *;