insert into items
( product_name, price, rating, img, catagory, display_name )
values
( $1, $2, $3, $4, $5, $6 )
returning *;
