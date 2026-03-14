-- 1. Insert Tony Stark record
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2. Modify Tony Stark record to change account_type to 'Admin'
UPDATE public.account 
SET account_type = 'Admin' 
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark' AND account_email = 'tony@starkent.com';

-- 3. Delete the Tony Stark record
DELETE FROM public.account 
WHERE account_type = 'Admin' AND account_firstname = 'Tony' AND account_lastname = 'Stark';

-- 4. Update GM Hummer description (Replace 'small interiors' with 'a huge interior')
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5. Inner Join for 'Sport' category
SELECT inv_make, inv_model, classification_name
FROM public.inventory i
INNER JOIN public.classification c 
  ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6. Update all records to add "/vehicles" to file paths
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');