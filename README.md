# Predicting House Prices in Mexico City

In the present project we developed several **web scrapers** to retreive **house pricing data** from various websites (inmuebles24, vivanuncios, lamudi) as well as the houses features (rooms, square meters, type of building, etc.) from **Mexico City**. After several data cleaning and **feature engineering** (such as assigning the geo coordinates to specific neighbourhoods or calculating distances to public transit hubs) we trained a machine learning model to predict house prices. The final selected model was a **random forest** which was exported as a **pkl file**. 

Secondly, we **developed and deployed a web app** were users can predict their ideal house price by inputing several parameters which were included in the model (how many rooms? how many parking spaces? how big? in which district?). The HTML input form retreives the feature values in a **Flask** app, imports the model and runs a **price prediction** which is then displayed in the app. 

This application could potentially be used by real estate developers to identify and estimate house pricing trends in specific areas of the city. It can also be used by common users searching for houses and who need to estimate an average commercial price for their ideal house.

![imagen](https://raw.githubusercontent.com/martinsingla/deploy_example/master/img.png)

