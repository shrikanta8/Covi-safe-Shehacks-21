from flask import Flask, render_template, request
app = Flask(__name__)
import pickle

file = open('model.pkl', 'rb')
clf = pickle.load(file)
file.close()

@app.route('/', methods=["GET", "POST"])
def hello_world():
    if request.method == "POST":
        myDict = request.form
        fever = int(myDict['fever'])
        age = int(myDict['age'])
        pain = int(myDict['pain'])
        runnyNose = int(myDict['runnyNose'])
        diffBreath = int(myDict['diffBreath'])

        
        inputFeatures = [fever, pain, age, runnyNose, diffBreath]
        infProb = clf.predict_proba([inputFeatures])[0][1]
        print(infProb)

        if(round(infProb*100) <= 50):
            return render_template('showbelow.html', inf=round(infProb*100))
        else:
            return render_template('showabove.html', inf=round(infProb*100))

  
    return render_template('index.html')



if __name__ == "__main__":
    app.run(debug=True)
