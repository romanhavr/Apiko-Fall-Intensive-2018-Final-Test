### This project is internet marketplace **“My internet SHOP”**.
It has such features as:
1.	The opportunity to **login** to the site:
    - Login page;
    -	Errors handling, such as: *“this field is required”*, *“enter valid email”*, *“Password should be at least 8 symbols”*, *“wrong email or password”*;
    -	After login user is redirected to **home page** and his name is shown in **header**.
2.	The opportunity to **register** on the site:
    - Register page;
    - Errors handling, such as: *“this field is required”*, *“enter valid email”*, *“Password should be at least 8 symbols”*;
    - After register user is redirected to **login page**.
3.	**Password restore page**. Where user can enter his email. After submit it shows message that new password is sent to entered email.
4.	**Home page**:
    - Product list;
    - By product clicking modal window with chosen product is shown;
    - Every product has **“Add to cart”** button that  adds chosen product to the cart;
    - Site header has **“Cart”** link with displaying number of products in the cart;
    - Site **logo** is a link that redirects user to **home page**.
5.	**Product page** consist of *picture of product*, its *title*, *price*, *description* and *“Add to cart”* button that adds product to the cart.
6.	**Cart page**:
    - Cart page is opening in **modal window**;
    - Cart page shows the list of products in the cart with its *picture*, *title*, *quantity* and *price*;
    - User can *increase* (by clicking **“+”**) or *decrease* (by clocking **“-”**) the **quantity** of chosen product;
    - Under all the product there is **total price** of all products in the cart;
    - In the bottom of cart page there is **“Pay”** button (that does nothing so far);
    - Modal window has *close* button (**“X”**) in the top right that closes it;
    - Modal window also *closes* by clicking anywhere **out** of it.
7.	**Admin page**. Only user with **“admin” role** can enter **admin page**. Else user is redirected to **login page**.
    - Admin page contains the list of all products;
    - Every product has **“Edit”** and **“Delete”** buttons;
    - Admin page has **“Add product”** button that shows modal add product window;
    - Admin user must fill *title*, *image URL*, *price* and *descriptions* fields. If any field is empty *alert* will be shown;
    - Admin user can *save* new product by clicking **“Save”** button in the right bottom.
8.	Admin user can *edit* any product in the list by clicking **“Edit”** button. *Edit window* is the same as *Add product window* but none of fields is required. Also *current value* of every field is shown before it. Admin user can *save* changes by clicking **“Save”** button.
9.	Cart elements are saved in **local storage**.

This project is created using **“react”**.

[Deployed project link.](https://my-internet-shop.herokuapp.com)
