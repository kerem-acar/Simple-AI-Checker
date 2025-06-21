from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, fields, marshal_with, abort
from flask_cors import CORS
from flask import request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
import get_result

app = Flask(__name__)
cors = CORS(app, origins='*')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config["JWT_SECRET_KEY"] = 'test'
db = SQLAlchemy(app)
api = Api(app)
jwt = JWTManager(app)

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    input = db.Column(db.String(1000), nullable=False)
    result = db.Column(db.String(1000), nullable=False)

    

    def __repr__(self):
        return f"User(id = {self.id}, username = {self.username}, password = {self.password} input = {self.input}, result = {self.result})"
    
userFields = {
    'id':fields.Integer,
    'username':fields.String,
    'password':fields.String,
    'input':fields.String,
    'result':fields.String
}

class UserRegistration(Resource):
    @marshal_with(userFields)
    def post(self):
        data = request.get_json()
        
        if UserModel.query.filter_by(username=data['username']).first():
            return {"message": "Username taken"}, 400
        
        new_user = UserModel(username=data['username'], password=data['password'], input='', result='')

        db.session.add(new_user)
        db.session.commit()

        return new_user, 201

class UserLogin(Resource):
    def post(self):
        data = request.get_json()

        user = UserModel.query.filter_by(username=data['username']).first()

        if not user:
            return {"message": "Username not found"}, 401
        
        if user.password != data['password']:
            return {"message": "Incorrect password"}, 401
        
        access_token = create_access_token(identity=user.username)
        
        return jsonify(access_token=access_token)


class Users(Resource):
    @marshal_with(userFields)
    def get(self):
        users = UserModel.query.all()
        return users
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        if not current_user:
            return "Must be registered to use this application"
        data = request.get_json()
        user = UserModel.query.filter_by(username=current_user).first_or_404()
        user.input = data["input"]
        db.session.commit()
        return jsonify({"logged_in_as": current_user, "id": user.id, "message": "Input received"})

class User(Resource):
    @marshal_with(userFields)
    def get(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found')
        return user 
    
    @marshal_with(userFields)
    def patch(self, id):
        data = request.get_json()
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found')
        user.result = data["result"]
        db.session.commit()
        return user 
    
    @marshal_with(userFields)
    def delete(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, 'User not found')
        db.session.delete(user)
        db.session.commit()
        users = UserModel.query.all()
        return users 

class script(Resource):
    def get(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, message="User not Found")
        
        get_result.get_response_and_update(id)

        return "Script Exectued Succesfully"

api.add_resource(Users, '/api/users/')
api.add_resource(User, "/api/users/<int:id>/")
api.add_resource(script, "/api/users/<int:id>/script/")
api.add_resource(UserRegistration, "/api/register/")
api.add_resource(UserLogin, '/api/login/')

@app.route('/')
def home():
    return '<h1>Merab</h1>'


if __name__ == '__main__':
    app.run(debug=True)
