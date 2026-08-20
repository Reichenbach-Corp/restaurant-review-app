insert into public.tags (tag_code, display_name, category, sentiment) values
('food_hot','Hot','food','positive'),
('food_cold','Cold','food','negative'),
('food_fresh','Fresh','food','positive'),
('food_stale','Stale','food','negative'),
('order_accurate','Order accurate','food','positive'),
('order_incorrect','Order incorrect','food','negative'),
('portion_good','Good portion','food','positive'),
('portion_poor','Poor portion','food','negative'),
('service_friendly','Friendly','service','positive'),
('service_helpful','Helpful','service','positive'),
('service_neutral','Neutral','service','neutral'),
('service_rude','Rude','service','negative'),
('location_clean','Clean','location','positive'),
('location_dirty','Dirty','location','negative'),
('location_busy','Busy','location','neutral')
on conflict (tag_code) do nothing;
