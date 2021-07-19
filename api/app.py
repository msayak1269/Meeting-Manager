from flask import (
    Flask,request, jsonify,render_template,redirect,session,url_for
)
import os
import uuid
import json
from flask_cors import CORS

app = Flask(__name__,static_url_path="")
app.secret_key="secretKey"
CORS(app)
APP_ROOT = os.path.dirname(os.path.abspath(__file__))



@app.route('/api/login',methods=["POST"])
def login():
    user  = request.json
    with open(f"{APP_ROOT}/db/user.json","r") as json_file:
        allUser = json.load(json_file)
    userEmail = user["email"]
    userName = user["displayName"]
    userPhotoUrl = user["photoURL"]
    userMeetings=[]
    userAlreadyExist = False
    userDetail={}
    for u in allUser:
        if u["email"]==userEmail:
            userAlreadyExist = True
            userDetail=u
            break
    
    if not userAlreadyExist:
        newUser = {
        "id":str(uuid.uuid4()),
        "email":userEmail,
        "name":userName,
        "image":userPhotoUrl
        }
        userDetail=newUser
        allUser.append(newUser)
        json_file =  open(f"{APP_ROOT}/db/user.json","w")
        json_file.seek(0)
        json.dump(allUser,json_file,indent=2)
        json_file.close()
    if userAlreadyExist:
        with open(f"{APP_ROOT}/db/meetings.json","r") as json_file:
            allMeetings = json.load(json_file)
        for meeting in allMeetings:
            if(meeting["email"]==userEmail):
                userMeetings.append(meeting)
    resp = {
        "status":"ok",
        "user":userDetail,
        "meetings":userMeetings
    }
    return jsonify(resp)


@app.route("/api/userdetail/<userId>",methods=["GET"])
def getUserDetail(userId):
    with open(f"{APP_ROOT}/db/user.json","r") as json_file:
        allUser = json.load(json_file)
    userToBeSent = {}
    for user in allUser:
        if user["id"] == userId:
            userToBeSent=user
            break
    return jsonify(userToBeSent)

@app.route("/api/add/<userId>",methods=["POST"])
def add(userId):
    data = request.json
    name = data["meetName"]
    link = data["link"]
    with open(f"{APP_ROOT}/db/user.json","r") as json_file:
        allUser = json.load(json_file)
    userEmail = ""
    for user in allUser:
        if user["id"] == userId:
            userEmail=user["email"]
            break
    with open(f"{APP_ROOT}/db/meetings.json","r") as json_file:
        allMeetings = json.load(json_file)
    newMeeting = {
        "id":str(uuid.uuid4()),
        "email":userEmail,
        "meetName":name,
        "meetLink":link
    }
    allMeetings.append(newMeeting)
    json_file =  open(f"{APP_ROOT}/db/meetings.json","w")
    json_file.seek(0)
    json.dump(allMeetings,json_file,indent=2)
    json_file.close()
    resp ={
        "status":"ok"
    }
    return jsonify(resp)

@app.route("/api/getmeetings/<userId>",methods=["GET"])
def getMeetings(userId):
    with open(f"{APP_ROOT}/db/user.json","r") as json_file:
        allUser = json.load(json_file)
    userEmail = ""
    userMeetings=[]
    for user in allUser:
        if user["id"] == userId:
            userEmail=user["email"]
            break
    with open(f"{APP_ROOT}/db/meetings.json","r") as json_file:
        allMeetings = json.load(json_file)
    for meeting in allMeetings:
        if meeting["email"]==userEmail:
            userMeetings.append(meeting)
    resp = {
        "status":"ok",
        "meetings":userMeetings
    }
    return jsonify(resp)

@app.route("/api/delete/<id>",methods=["DELETE"])
def deleteMeeting(id):
    with open(f"{APP_ROOT}/db/meetings.json","r") as json_file:
        allMeetings = json.load(json_file)
    updatedAllMeetings=[]
    for meeting in allMeetings:
        if meeting["id"]!=id:
            updatedAllMeetings.append(meeting)
    json_file =  open(f"{APP_ROOT}/db/meetings.json","w")
    json_file.seek(0)
    json.dump(updatedAllMeetings,json_file,indent=2)
    json_file.close()
    resp = {
        "status":"ok"
    }
    return jsonify(resp)



if __name__=="__main__":
    app.run(port=5001,debug=True,host='0.0.0.0')
