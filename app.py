from flask import Flask, request, render_template, redirect, url_for
import pickle
import numpy as np
import sklearn 

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/', methods=["GET", "POST"])
def gfg():

    with open('modelo_precios_rf.pkl', 'rb') as f:
        model = pickle.load(f)
    
    if request.method == "POST":
        
        bathrooms = int(request.form.get('nbathrooms'))
        bedrooms = int(request.form.get('nrooms'))
        parking = int(request.form.get('nparkings'))
        type = request.form.get('type')
        tot_meters = int(request.form.get('totmeters'))
        colonia = request.form.get('colonia')
        alcaldia = request.form.get('alcaldia')

        characteristics = np.array([tot_meters, bedrooms, bathrooms, parking])

        dict_alcaldia = {
            'ALVARO OBREGON' : 0, 
            'AZCAPOTZALCO' : 0, 
            'BENITO JUAREZ': 0, 
            'COYOACAN': 0,
            'CUAJIMALPA DE MORELOS': 0, 
            'CUAUHTEMOC': 0, 
            'GUSTAVO A. MADERO': 0, 
            'IZTACALCO': 0,
            'IZTAPALAPA': 0, 
            'LA MAGDALENA CONTRERAS': 0, 
            'MIGUEL HIDALGO': 0, 
            'MILPA ALTA': 0,
            'TLAHUAC': 0, 
            'TLALPAN': 0, 
            'VENUSTIANO CARRANZA': 0, 
            'XOCHIMILCO': 0
        }
        dict_alcaldia[alcaldia] = 1

        dict_tipo = {
            'Casa': 0,
            'Departamento': 0
        }
        dict_tipo[type] = 1

        predictors = [np.concatenate((characteristics, np.array(list(dict_alcaldia.values())), np.array(list(dict_tipo.values()))))]

        model_prediction = model.predict(predictors)
        
        prediction = 'MXN $' + str(round(model_prediction[0],1))
        
        return render_template("index.html", prediction = prediction)
    
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
