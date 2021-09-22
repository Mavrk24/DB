from flask import Flask, jsonify,request, session
from flask_cors import CORS
from qTree import display, getQ, returnQ,valuate
from anytree import Node, RenderTree,AsciiStyle,PreOrderIter
from anytree.dotexport import RenderTreeGraph
from operator import itemgetter
from MDP import MDP, valueiteration


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
data = [
        {
            "id": 1,
            "library": "Pandas",
            "language": "Python"
        },
        {
            "id": 2,
            "library": "requests",
            "language": "Python"
        },
        {
            "id": 3,
            "library": "NumPy",
            "language": "Python"
        }
    ]

@app.route('/')
def hello():
    return "Hello Flask-Heroku"


@app.route("/username", methods=['POST'])
def login():
    username = request.get_json()
    # username = request.form.get("username", "") or request.form["username"]
    session["username"]=username
    return {'user': username} # from flask import jsonify 


@app.route("/subentry" , methods=['POST'])
def sub():
    entry = request.get_json(force=True)
    return entry

@app.route("/request")
def getreq():
    key = [1,[1,0,1,0,1],[1,0,1,0,1],[1,0,1,0,1],0] #sample_data
    return {'r_key': key }

@app.route("/subrequest", methods=['POST'])
def getarr():
    arr = request.get_json
    return arr

@app.route("/display")
def tree():
    return {'text': getQ()}


def merge(list1, list2):
      
    merged_list = []
    for i in range(max((len(list1), len(list2)))):
  
        while True:
            try:
                tup = (list1[i], list2[i])
            except IndexError:
                if len(list1) > len(list2):
                    list2.append('')
                    tup = (list1[i], list2[i])
                elif len(list1) < len(list2):
                    list1.append('')
                    tup = (list1[i], list2[i])
                continue
  
            merged_list.append(tup)
            break
    return merged_list

@app.route("/intervention" , methods=['POST'])
def intervent():
    num=valuate()
    new_array = []
    arr = request.get_json(force=True)['payload']
    index = [0,1,2,3,4,5,6,7,8,9,10,11]
    array = merge(arr,index)
    array.sort(key=itemgetter(0),reverse=True)
    array = merge(array,num)
    new_array = sorted(array,key=itemgetter(1),reverse=True)
    return {'text': new_array}


@app.route("/mdp", methods=['POST'])
def markov():
    value = int(request.get_json(force=True)['int_value'])
    mdp = MDP(N=value)
    payload = valueiteration(mdp)
    data = {'action': list(payload.items())[-1][-1]}
    return jsonify(data)

@app.route('/api', methods=['GET'])
def get_api():
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=False)
