from flask import Flask, request, render_template
import pickle
import numpy as np
import sys
import joblib

#creating object of Flask class
app = Flask(__name__)

#loading the ml model
# model = pickle.load(open('models/bagging_model.pkl', 'rb'))
model = pickle.load(open('models/bagging_model.pkl', 'rb'))

# model = joblib.load('models\bagging_model.pkl')

#home page 
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    #all inputs from html are string so convert it inot float
    input1 = float(request.form['acceleration'])
    input2 = float(request.form['top_speed'])
    input3 = float(request.form['range_km'])
    input4 = float(request.form['fast_charge_speed'])
    input5 = float(request.form['segment'])
    
    # Convert the inputs into a NumPy array in [[x]] format
    feature = np.array([[input1, input2, input3, input4, input5]])

    prediction = model.predict(feature)
    
    # output = round(prediction[0], 2) #rounding off the output to 2 decimals
    print(prediction, file=sys.stderr)#console log in flask
    
    return render_template('index.html', prediction_text="Predicted price of EV is {}". format(prediction))

if __name__ == "__main__":
    app.run(debug=True, port=5005)


