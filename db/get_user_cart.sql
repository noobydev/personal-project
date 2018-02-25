select * from cart
join items on cart.item_id = items.id
where user_id = $1